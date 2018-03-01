import React from 'react';
import PropTypes from 'react-peek/prop-types';
import _ from 'lodash';
import Portal from '../Portal/Portal';
import { createClass, getFirst, omitProps } from '../../util/component-types';
import {
	getAbsoluteBoundingClientRect,
	sharesAncestor,
} from '../../util/dom-helpers';
import { lucidClassNames } from '../../util/style-helpers';

const cx = lucidClassNames.bind('&-ContextMenu');

const { bool, node, func, number, object, oneOf, string } = PropTypes;

const ContextMenu = createClass({
	displayName: 'ContextMenu',

	statics: {
		peek: {
			description: `
				A ContextMenu component is used to render a target and a flyout which
				is positioned relative to the target.
			`,
			categories: ['utility'],
			madeFrom: ['Portal'],
		},
		CENTER: 'center',
		DOWN: 'down',
		END: 'end',
		LEFT: 'left',
		RIGHT: 'right',
		START: 'start',
		UP: 'up',
	},

	propTypes: {
		children: node`
			\`children\` should include exactly one ContextMenu.Target and one
			ContextMenu.FlyOut.
		`,

		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		style: object`
			Passed through to the root element.
		`,

		direction: oneOf(['down', 'up', 'right', 'left'])`
			direction of the FlyOut relative to Target.
		`,

		directonOffset: number`
			the px offset along the axis of the direction
		`,

		alignment: oneOf(['start', 'center', 'end'])`
			alignment of the Flyout relative to Target in the cross axis from
			\`direction\`.
		`,

		alignmentOffset: number`
			the px offset along the axis of the alignment
		`,

		getAlignmentOffset: func`
			an alternative to \`alignmentOffset\`, a function that is applied with
			the width/height of the flyout. the result is used as the
			\`alignmentOffset\`
		`,

		minWidthOffset: number`
			The number of px's to grow or shrink the minWidth of the FlyOut
		`,

		isExpanded: bool`
			Indicates whether the FlyOut will render or not.
		`,

		onClickOut: func`
			Called when a click event happenens outside of the ContextMenu, with the
			signature \`({ props, event }) => { ... }\`
		`,

		portalId: string`
			The \`id\` of the FlyOut portal element that is appended to
			\`document.body\`. Defaults to a generated \`id\`.
		`,
	},

	components: {
		Target: createClass({
			displayName: 'ContextMenu.Target',
			statics: {
				peek: {
					description: `
						Renders an element of \`elementType\` (defaults to \`<span>\`) that the menu \`FlyOut\` anchors to.
					`,
				},
			},
			propTypes: {
				elementType: string,
			},
			getDefaultProps() {
				return {
					elementType: 'span',
				};
			},
		}),
		FlyOut: createClass({
			displayName: 'ContextMenu.FlyOut',
			statics: {
				peek: {
					description: `
						Renders a \`<Portal>\` anchored to the \`Target\`.
					`,
				},
			},
			propTypes: {
				style: object,
			},
		}),
	},

	getDefaultProps() {
		return {
			direction: 'down',
			directonOffset: 0,
			minWidthOffset: 0,
			alignment: 'start',
			// no default alignmentOffset so it can default to result of `getAlignmentOffset`
			getAlignmentOffset: _.constant(0),
			isExpanded: true,
			onClickOut: null,
			portalId: null,
		};
	},

	getInitialState() {
		const { portalId } = this.props;
		return {
			portalId: portalId || _.uniqueId('ContextMenu-Portal-'),
			targetRect: {
				bottom: 0,
				top: 0,
				left: 0,
				right: 0,
				height: 0,
				width: 0,
			},
			flyOutHeight: 0,
			flyOutWidth: 0,
		};
	},

	handleAlignment() {
		if (this.continueAlignment) {
			if (this.props.isExpanded) {
				this.alignFlyOut(true);
			}
			window.requestAnimationFrame(this.handleAlignment);
		}
	},

	beginAlignment() {
		this.continueAlignment = true;
		window.requestAnimationFrame(this.handleAlignment);
	},

	endAlignment() {
		this.continueAlignment = false;
	},

	componentDidMount() {
		_.defer(() => this.alignFlyOut());
		this.beginAlignment();

		document.body.addEventListener('touchstart', this.handleBodyClick);
		document.body.addEventListener('click', this.handleBodyClick);
	},

	componentWillUnmount() {
		this.endAlignment();
		document.body.removeEventListener('click', this.handleBodyClick);
	},

	handleBodyClick(event) {
		const {
			props,
			props: { onClickOut },
			refs: { flyOutPortal, target },
		} = this;

		if (onClickOut && flyOutPortal) {
			const flyOutEl = flyOutPortal.portalElement.firstChild;
			const wasALabelClick =
				event.target.nodeName === 'INPUT' &&
				sharesAncestor(event.target, target, 'LABEL');

			// Attempt to detect <label> click and ignore it
			if (wasALabelClick) {
				return;
			}

			if (!(flyOutEl.contains(event.target) || target.contains(event.target))) {
				onClickOut({ props, event });
			}
		}
	},

	componentWillReceiveProps() {
		_.defer(() => this.alignFlyOut());
	},

	getFlyoutPosition() {
		const {
			props: { alignment, getAlignmentOffset, direction, directonOffset },
			state: {
				flyOutHeight,
				flyOutWidth,
				targetRect: { bottom, left, right, top, width, height },
			},
			refs: { flyOutPortal },
		} = this;

		if (!flyOutPortal) {
			return {};
		}

		const alignmentOffset = !_.isUndefined(this.props.alignmentOffset)
			? this.props.alignmentOffset
			: alignment === ContextMenu.CENTER
				? getAlignmentOffset(
						_.includes([ContextMenu.UP, ContextMenu.DOWN], direction)
							? flyOutWidth
							: flyOutHeight
					)
				: 0;

		const { CENTER, DOWN, END, LEFT, RIGHT, START, UP } = ContextMenu;

		const { clientWidth } = document.body;

		// default styling hides portal because its position can't be calculated
		// properly until after 1st render so here we unhide it if the ref exists
		const style = {
			opacity: 1,
			maxHeight: 'none',
			left: 'auto',
			top: 'auto',
		};
		const matcher = _.matches({ direction, alignment });

		if (matcher({ direction: UP, alignment: START })) {
			return {
				...style,
				top: top - flyOutHeight - directonOffset,
				left: left - alignmentOffset,
			};
		}
		if (matcher({ direction: UP, alignment: END })) {
			return {
				...style,
				top: top - flyOutHeight - directonOffset,
				right: clientWidth - right - alignmentOffset,
			};
		}
		if (matcher({ direction: UP, alignment: CENTER })) {
			return {
				...style,
				top: top - flyOutHeight - directonOffset,
				left: left + width / 2 - flyOutWidth / 2 + alignmentOffset,
			};
		}
		if (matcher({ direction: DOWN, alignment: START })) {
			return {
				...style,
				top: bottom + directonOffset,
				left: left - alignmentOffset,
			};
		}
		if (matcher({ direction: DOWN, alignment: END })) {
			return {
				...style,
				top: bottom + directonOffset,
				right: clientWidth - right - alignmentOffset,
			};
		}
		if (matcher({ direction: DOWN, alignment: CENTER })) {
			return {
				...style,
				top: bottom + directonOffset,
				left: left + width / 2 - flyOutWidth / 2 + alignmentOffset,
			};
		}
		if (matcher({ direction: LEFT, alignment: START })) {
			return {
				...style,
				top: top - alignmentOffset,
				right: clientWidth - left + directonOffset,
			};
		}
		if (matcher({ direction: LEFT, alignment: END })) {
			return {
				...style,
				top: top - flyOutHeight + height + alignmentOffset,
				right: clientWidth - left + directonOffset,
			};
		}
		if (matcher({ direction: LEFT, alignment: CENTER })) {
			return {
				...style,
				top: top - flyOutHeight / 2 + height / 2 + alignmentOffset,
				right: clientWidth - left + directonOffset,
			};
		}
		if (matcher({ direction: RIGHT, alignment: START })) {
			return {
				...style,
				top: top - alignmentOffset,
				left: left + width + directonOffset,
			};
		}
		if (matcher({ direction: RIGHT, alignment: END })) {
			return {
				...style,
				top: top - flyOutHeight + height + alignmentOffset,
				left: left + width + directonOffset,
			};
		}
		if (matcher({ direction: RIGHT, alignment: CENTER })) {
			return {
				...style,
				top: top - flyOutHeight / 2 + height / 2 + alignmentOffset,
				left: left + width + directonOffset,
			};
		}
	},

	alignFlyOut(doRedunancyCheck = false) {
		const { refs: { flyOutPortal, target } } = this;

		if (!target || !flyOutPortal) {
			return;
		}

		const targetRect = getAbsoluteBoundingClientRect(target);

		// Don't cause a state-change if target dimensions are the same
		if (
			doRedunancyCheck &&
			targetRect.left === this.state.targetRect.left &&
			targetRect.top === this.state.targetRect.top &&
			targetRect.height === this.state.targetRect.height &&
			targetRect.width === this.state.targetRect.width
		) {
			return;
		}

		if (!flyOutPortal) {
			return this.setState({
				targetRect,
			});
		}

		const flyOutEl = flyOutPortal.portalElement.firstChild;
		const { height, width } = flyOutEl.getBoundingClientRect();
		this.setState({
			targetRect,
			flyOutHeight: height,
			flyOutWidth: width,
		});
	},

	render() {
		const {
			props: {
				className,
				direction,
				isExpanded,
				style,
				minWidthOffset,
				...passThroughs
			},
			state: { portalId, targetRect },
		} = this;

		const targetElement = getFirst(this.props, ContextMenu.Target);
		const targetChildren = _.get(targetElement, 'props.children', null);
		const TargetElementType = targetElement.props.elementType;

		const flyoutElement = getFirst(this.props, ContextMenu.FlyOut);
		const flyProps = _.get(flyoutElement, 'props', {});

		return (
			<TargetElementType
				ref="target"
				{...omitProps(passThroughs, ContextMenu)}
				className={cx('&', className)}
				style={style}
			>
				{targetChildren}
				{isExpanded ? (
					<Portal
						ref="flyOutPortal"
						{...flyProps}
						className={cx(
							'&-FlyOut',
							`&-FlyOut-${direction}`,
							flyProps.className
						)}
						portalId={portalId}
						style={{
							minWidth: targetRect.width + minWidthOffset,
							...this.getFlyoutPosition(),
							...flyProps.style,
						}}
					>
						{flyProps.children}
					</Portal>
				) : null}
			</TargetElementType>
		);
	},
});

export default ContextMenu;
