import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import classNames from 'classnames';
import Portal from '../Portal/Portal';
import { createChildComponent } from '../../util/child-component';
import { getAbsoluteBoundingClientRect } from '../../util/dom-helpers';

const {
	PropTypes: {
		bool,
		node,
		func,
		object,
		oneOf,
		string
	}
} = React;

/**
 *
 * {"categories": ["utility"]}
 *
 * A contextual menu with a target and a flyout.
 */
const ContextMenu = React.createClass({
	propTypes: {
		children: node,
		className: string,
		style: object,
		isExpanded: bool,
		direction: oneOf(['down', 'up']),
		portalId: string, 
		onChangeBounds: func,
		onClickOut: func
	},

	getDefaultProps() {
		return {
			isExpanded: true,
			direction: 'down',
			portalId: 'ContextMenu-Portal-' + Math.random().toString(16).substr(2),
			onChangeBounds: null,
			onClickOut: null
		};
	},

	getInitialState() {
		const { portalId } = this.props;
		return {
			portalId,
			targetRect: {
				bottom: 0,
				top: 0,
				left: 0,
				right: 0,
				height: 0,
				width: 0
			},
			flyOutHeight: 0,
			isFlyoutBelowFold: false
		};
	},

	componentDidMount() {
		let targetDOMNode = this.refs.target;

		this.updateTargetRectangleIntervalId = setInterval(() => {
			this.alignFlyOut(targetDOMNode);
		}, 10);

		this.onClickBodyEventListener = window.document.body.addEventListener('click', (event) => {
			if (this.props.onClickOut && this.refs.flyOutPortal) {
				let flyOutEl = this.refs.flyOutPortal.portalElement.firstChild;
				if (!(flyOutEl.contains(event.target) || targetDOMNode.contains(event.target))) {
					this.props.onClickOut(event);
				}
			}
		});
	},

	componentWillUnmount() {
		clearInterval(this.updateTargetRectangleIntervalId);
		window.document.body.removeEventListener(this.onClickBodyEventListener);
	},

	componentWillReceiveProps(nextProps) {
		let targetDOMNode = this.refs.target;

		if (targetDOMNode) {
			this.alignFlyOut(targetDOMNode);
		}
	},

	statics: {
		DOWN: 'down',
		UP: 'up',
		BELOW_FOLD: 'BELOW_FOLD',
		ABOVE_FOLD: 'ABOVE_FOLD',
		isElementBelowFold(targetElement, yPosition) {
			if (typeof window !== 'undefined') {
				let bodyRect = window.document.body.getBoundingClientRect();
				let targetElementRect = targetElement.getBoundingClientRect();
				yPosition = (yPosition === undefined ? targetElementRect.top : yPosition);
				if (yPosition + targetElementRect.height - bodyRect.top > window.innerHeight - bodyRect.top) {
					return true;
				} else {
					return false;
				}
			} else {
				throw new Error('Browser only! Cannot access window object.');
			}
		}
	},

	alignFlyOut(targetDOMNode) {
		let flyOutHeight = this.state.flyOutHeight;
		if (this.refs.flyOutPortal) {
			let flyOutEl = this.refs.flyOutPortal.portalElement.firstChild;
			flyOutHeight = flyOutEl.getBoundingClientRect().height;

			if (this.props.onChangeBounds) {
				let isFlyoutBelowFold = ContextMenu.isElementBelowFold(flyOutEl, targetDOMNode.getBoundingClientRect().bottom);
				if (this.state.isFlyoutBelowFold !== isFlyoutBelowFold) {
					this.setState({
						isFlyoutBelowFold: isFlyoutBelowFold
					});
					this.props.onChangeBounds(isFlyoutBelowFold ? ContextMenu.BELOW_FOLD : ContextMenu.ABOVE_FOLD);
				}
			}
		}

		this.setState({
			targetRect: getAbsoluteBoundingClientRect(targetDOMNode),
			flyOutHeight: flyOutHeight
		});
	},

	render() {
		const {
			children,
			className,
			style,
			isExpanded,
			direction
		} = this.props;

		const {
			portalId,
			targetRect,
			flyOutHeight
		} = this.state;

		const targetChildren = ContextMenu.Target.getOwnChildren(children);
		const flyProps = _.first(ContextMenu.FlyOut.getAllProps(children));
		const flyChildren = flyProps.children;


		return (
			<span ref="target" className={classNames('ArContextMenu', className)} style={style}>
				{targetChildren}
				{isExpanded ? (
					<Portal ref="flyOutPortal" {...flyProps} portalId={portalId} style={_.assign({}, flyProps.style, {
						position: 'absolute',
						left: targetRect.left,
						minWidth: targetRect.width
					}, (direction === ContextMenu.UP ? {
						top: targetRect.top - flyOutHeight
					} : {
						top: targetRect.bottom
					}))}>
						{flyChildren}
					</Portal>
				) : null}
			</span>
		);
	}
});
ContextMenu.Target = createChildComponent();
ContextMenu.FlyOut = createChildComponent();

export default ContextMenu;
