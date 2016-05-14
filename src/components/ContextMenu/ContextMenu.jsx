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
		number,
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
		 * direction of the FlyOut relative to Target. Defaults to `'down'`.
		 */
		direction: oneOf(['down', 'up', 'right', 'left']),
		/**
		 * the px offset along the axis of the direction
		 */
		directonOffset: number,
		/**
		 * alignment of the Flyout relative to Target in the cross axis from `direction` Defaults to `'start'`
		 */
		alignment: oneOf(['start', 'center', 'end']),
		/**
		 * the px offset along the axis of the alignment
		 */
		alignmentOffset: number,
		/**
		 * an alternative to `alignmentOffset`, a function that is applied with the width/height of the flyout. the result is used as the `alignmentOffset`
		 */
		getAlignmentOffset: func,
		/**
		 * Indicates whether the FlyOut will render or not. Defaults to `true`.
		 */
		isExpanded: bool,
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
			directonOffset: 0,
			alignment: 'start',
			// no default alignmentOffset so it can default to result of `getAlignmentOffset`
			getAlignmentOffset: _.constant(0),
			isExpanded: true,
			onClickOut: null,
			portalId: null
		};
	},

	getInitialState() {
		const {
			portalId
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
			flyOutWidth: 0,
		};
	},

	componentDidMount() {

		this.alignFlyOut();
		this.updateTargetRectangleIntervalId = setInterval(() => {
			this.alignFlyOut();
		}, 10);

		this.onClickBodyEventListener = window.addEventListener('click', (event) => {
			if (this.props.onClickOut && this.refs.flyOutPortal) {
				const flyOutEl = this.refs.flyOutPortal.portalElement.firstChild;
				if (!(flyOutEl.contains(event.target) || this.refs.target.contains(event.target))) {
					this.props.onClickOut(event);
				}
			}
		});
	},

	componentWillUnmount() {
		clearInterval(this.updateTargetRectangleIntervalId);
		document.body.removeEventListener('click', this.onClickBodyEventListener);
	},

	componentWillReceiveProps() {
		this.alignFlyOut();
	},

	statics: {
		CENTER: 'center',
		DOWN: 'down',
		END: 'end',
		LEFT: 'left',
		RIGHT: 'right',
		START: 'start',
		UP: 'up',
	},

	alignFlyOut() {

		const {
			refs: {
				flyOutPortal,
				target
			}
		} = this;

		if (!target || !flyOutPortal) {
			return;
		}

		const targetRect = getAbsoluteBoundingClientRect(target);

		if (!flyOutPortal) {
			return this.setState({
				targetRect
			});
		}

		const flyOutEl = flyOutPortal.portalElement.firstChild;
		const {
			height,
			width,
		} = flyOutEl.getBoundingClientRect();
		this.setState({
			targetRect,
			flyOutHeight: height,
			flyOutWidth: width
		});
	},

	render() {
		const {
			props: {
				alignment,
				alignmentOffset,
				getAlignmentOffset,
				className,
				direction,
				directonOffset,
				isExpanded,
				position,
				style,
				...passThroughs
			},
			state: {
				portalId,
				targetRect,
				flyOutHeight,
				flyOutWidth
			}
		} = this;

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
							minWidth: targetRect.width,
						}, getFlyoutPosition({
							direction,
							alignment,
							targetRect,
							flyOutHeight,
							flyOutWidth,
							directonOffset,
							getAlignmentOffset,
							alignmentOffset,
						}))}
					>
						{flyProps.children}
					</Portal>
				) : null}
			</span>
		);
	}
});

export default ContextMenu;

function getFlyoutPosition({
	direction,
	alignment,
	targetRect,
	flyOutHeight,
	flyOutWidth,
	directonOffset,
	getAlignmentOffset,
	alignmentOffset = alignment === ContextMenu.CENTER
		? getAlignmentOffset(_.includes([ContextMenu.UP, ContextMenu.DOWN], direction) ? flyOutWidth : flyOutHeight)
		: 0,
}) {

	const {
		CENTER,
		DOWN,
		END,
		LEFT,
		RIGHT,
		START,
		UP,
	} = ContextMenu;

	const {
		bottom,
		left,
		right,
		top,
		width,
		height,
	} = targetRect;

	const {
		clientWidth,
	} = document.body;

	const matcher = _.matches({ direction, alignment });

	if (matcher({ direction: UP, alignment: START })) {
		return {
			top: top - flyOutHeight - directonOffset,
			left: left - alignmentOffset
		};
	}
	if (matcher({ direction: UP, alignment: END })) {
		return {
			top: top - flyOutHeight - directonOffset,
			right: clientWidth - right - alignmentOffset
		};
	}
	if (matcher({ direction: UP, alignment: CENTER })) {
		return {
			top: top - flyOutHeight - directonOffset,
			left: left + (width / 2) - (flyOutWidth / 2) + alignmentOffset
		};
	}
	if (matcher({ direction: DOWN, alignment: START })) {
		return {
			top: bottom + directonOffset,
			left: left - alignmentOffset
		};
	}
	if (matcher({ direction: DOWN, alignment: END })) {
		return {
			top: bottom + directonOffset,
			right: clientWidth - right - alignmentOffset
		};
	}
	if (matcher({ direction: DOWN, alignment: CENTER })) {
		return {
			top: bottom + directonOffset,
			left: left + (width / 2) - (flyOutWidth / 2) + alignmentOffset
		};
	}
	if (matcher({ direction: LEFT, alignment: START })) {
		return {
			top: top - alignmentOffset,
			right: clientWidth - left + directonOffset
		};
	}
	if (matcher({ direction: LEFT, alignment: END })) {
		return {
			top: top - flyOutHeight + height + alignmentOffset,
			right: clientWidth - left + directonOffset
		};
	}
	if (matcher({ direction: LEFT, alignment: CENTER })) {
		return {
			top: top - (flyOutHeight / 2) + (height / 2) + alignmentOffset,
			right: clientWidth - left + directonOffset
		};
	}
	if (matcher({ direction: RIGHT, alignment: START })) {
		return {
			top: top - alignmentOffset,
			left: left + width + directonOffset
		};
	}
	if (matcher({ direction: RIGHT, alignment: END })) {
		return {
			top: top - flyOutHeight + height + alignmentOffset,
			left: left + width + directonOffset
		};
	}
	if (matcher({ direction: RIGHT, alignment: CENTER })) {
		return {
			top: top - (flyOutHeight / 2) + (height / 2) + alignmentOffset,
			left: left + width + directonOffset
		};
	}

}
