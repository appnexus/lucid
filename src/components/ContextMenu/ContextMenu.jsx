import React from 'react';
import _ from 'lodash';
import Portal from '../Portal/Portal';
import { createClass, findTypes } from '../../util/component-types';
import { getAbsoluteBoundingClientRect } from '../../util/dom-helpers';
import { lucidClassNames } from '../../util/style-helpers';

const cx = lucidClassNames.bind('&-ContextMenu');

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
 * {"categories": ["utility"], "madeFrom": ["Portal"]}
 *
 * A ContextMenu component is used to render a target and a flyout which is positioned relative to the target.
 */
const ContextMenu = createClass({
	displayName: 'ContextMenu',
	propTypes: {
		/**
		 * `children` should include exactly one ContextMenu.Target and one ContextMenu.FlyOut.
		 */
		children: node,
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/**
		 * Passed through to the root element.
		 */
		style: object,
		/**
		 * alignment of the FlyOut relative to Target. Defaults to `'down'`.
		 */
		direction: oneOf(['down', 'up']),
		/**
		 * Indicates whether the FlyOut will render or not. Defaults to `true`.
		 */
		isExpanded: bool,
		/**
		 * Called once when one of following happens:
		 *
		 * - Called with `BELOW_FOLD` if direction is `down` and FlyOut clips screen bottom.
		 * - Called with `ABOVE_FOLD` if direction is `up` and it has enough space to render down without clipping.
		 */
		onChangeBounds: func,
		/**
		 * Called when a click event happenens outside of the ContextMenu.
		 */
		onClickOut: func,
		/**
		 * The `id` of the FlyOut portal element that is appended to `document.body`. Defaults to a generated `id`.
		 */
		portalId: string
	},

	components: {
		Target: createClass({
			displayName: 'ContextMenu.Target',
			propName: 'Target',
		}),
		FlyOut: createClass({
			displayName: 'ContextMenu.FlyOut',
			propName: 'FlyOut',
			propTypes: {
				style: object
			}
		})
	},

	getDefaultProps() {
		return {
			direction: 'down',
			isExpanded: true,
			onChangeBounds: null,
			onClickOut: null,
			portalId: null
		};
	},

	getInitialState() {
		const {
			portalId,
			direction
		} = this.props;
		return {
			portalId: portalId || 'ContextMenu-Portal-' + Math.random().toString(16).substr(2),
			targetRect: {
				bottom: 0,
				top: 0,
				left: 0,
				right: 0,
				height: 0,
				width: 0
			},
			flyOutHeight: 0,
			isFlyoutBelowFold: direction !== ContextMenu.DOWN
		};
	},

	componentDidMount() {
		const targetDOMNode = this.refs.target;

		this.updateTargetRectangleIntervalId = setInterval(() => {
			this.alignFlyOut(targetDOMNode);
		}, 10);

		this.onClickBodyEventListener = window.addEventListener('click', (event) => {
			if (this.props.onClickOut && this.refs.flyOutPortal) {
				const flyOutEl = this.refs.flyOutPortal.portalElement.firstChild;
				if (!(flyOutEl.contains(event.target) || targetDOMNode.contains(event.target))) {
					this.props.onClickOut(event);
				}
			}
		});
	},

	componentWillUnmount() {
		clearInterval(this.updateTargetRectangleIntervalId);
		window.document.body.removeEventListener('click', this.onClickBodyEventListener);
	},

	componentWillReceiveProps() {
		const targetDOMNode = this.refs.target;

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
				const bodyRect = window.document.body.getBoundingClientRect();
				const targetElementRect = targetElement.getBoundingClientRect();
				yPosition = (yPosition === undefined ? targetElementRect.top : yPosition);
				return (yPosition + targetElementRect.height - bodyRect.top > window.innerHeight - bodyRect.top);
			} else {
				throw new Error('Browser only! Cannot access window object.');
			}
		}
	},

	alignFlyOut(targetDOMNode) {
		let flyOutHeight = this.state.flyOutHeight;
		if (this.refs.flyOutPortal) {
			const flyOutEl = this.refs.flyOutPortal.portalElement.firstChild;
			flyOutHeight = flyOutEl.getBoundingClientRect().height;

			if (this.props.onChangeBounds) {
				const isFlyoutBelowFold = ContextMenu.isElementBelowFold(flyOutEl, targetDOMNode.getBoundingClientRect().bottom);
				if (this.state.isFlyoutBelowFold !== isFlyoutBelowFold) {
					this.setState({
						isFlyoutBelowFold
					});
					this.props.onChangeBounds(isFlyoutBelowFold ? ContextMenu.BELOW_FOLD : ContextMenu.ABOVE_FOLD);
				}
			}
		}

		this.setState({
			targetRect: getAbsoluteBoundingClientRect(targetDOMNode),
			flyOutHeight
		});
	},

	render() {
		const {
			className,
			style,
			isExpanded,
			direction,
			...passThroughs
		} = this.props;

		const {
			portalId,
			targetRect,
			flyOutHeight
		} = this.state;

		const targetElement = _.first(findTypes(this.props, ContextMenu.Target));
		const targetChildren = _.get(targetElement, 'props.children', null);

		const flyoutElement = _.first(findTypes(this.props, ContextMenu.FlyOut));
		const flyProps = _.get(flyoutElement, 'props', {});


		return (
			<span ref='target' {...passThroughs} className={cx('&', className)} style={style}>
				{targetChildren}
				{isExpanded ? (
					<Portal
						ref='flyOutPortal'
						{...flyProps}
						className={cx('&-FlyOut', {
							'&-FlyOut-Up': direction === ContextMenu.UP,
							'&-FlyOut-Down': direction === ContextMenu.DOWN
						}, flyProps.className)}
						portalId={portalId}
						style={_.assign({}, flyProps.style, {
							position: 'absolute',
							left: targetRect.left,
							minWidth: targetRect.width,
							top: (direction === ContextMenu.UP ? targetRect.top - flyOutHeight : targetRect.bottom)
						})}
					>
						{flyProps.children}
					</Portal>
				) : null}
			</span>
		);
	}
});

export default ContextMenu;
