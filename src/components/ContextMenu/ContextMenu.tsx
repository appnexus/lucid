/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import _, { isNil } from 'lodash';

import Portal from '../Portal/Portal';
import { getFirst, StandardProps } from '../../util/component-types';
import {
	getAbsoluteBoundingClientRect,
	sharesAncestor,
} from '../../util/dom-helpers';
import { lucidClassNames, uniqueName } from '../../util/style-helpers';

const cx = lucidClassNames.bind('&-ContextMenu');

const { bool, node, func, number, object, oneOf, string } = PropTypes;

export interface IContextMenuTargetProps extends StandardProps {
	elementType: string;
}
const ContextMenuTarget = (_props: IContextMenuTargetProps): null => null;
ContextMenuTarget.displayName = 'ContextMenu.Target';
ContextMenuTarget.propName = 'Target';
ContextMenuTarget.peek = {
	description: `Renders an element of \`elementType\` (defaults to \`<span>\`)
	that the menu \`FlyOut\` anchors to.`,
};
ContextMenuTarget.propTypes = {
	elementType: string,
};
ContextMenuTarget.defaultProps = {
	elementType: 'span',
};

export interface IContextMenuFlyOutProps
	extends React.HTMLAttributes<HTMLDivElement> {}
const ContextMenuFlyOut = (_props: IContextMenuFlyOutProps): null => null;
ContextMenuFlyOut.displayName = 'ContextMenu.FlyOut';
ContextMenuFlyOut.propName = 'FlyOut';
ContextMenuFlyOut.peek = {
	description: `Renders a \`<Portal>\` anchored to the \`Target\`.`,
};

/** These have to be lowercase because:
 * 1. the key and value have to match
 * 	(limitation of TypeScript, see: https://github.com/Microsoft/TypeScript/issues/17198)
 * 2. the values are currently lowercase in the propTypes
 * */
export enum EnumDirection {
	up = 'up',
	down = 'down',
	left = 'left',
	right = 'right',
}
export type Direction = keyof typeof EnumDirection;

export enum EnumAlignment {
	start = 'start',
	center = 'center',
	end = 'end',
}
export type Alignment = keyof typeof EnumAlignment;

export interface FlyoutPosition {
	opacity: number;
	maxHeight: string | number;
	left: string | number;
	top: string | number;
}

/** default styling hides portal because its position can't be calculated
 * properly until after 1st render so here we unhide it if the ref exists */
const defaultFlyoutPosition = {
	opacity: 1,
	maxHeight: 'none',
	left: 'auto',
	top: 'auto',
};

type GetAlignmentOffset = (n: number) => number;

// TODO: Is there a better way to add type checks for passThroughs in this case
// where the underling element could be anything vs just extending
// `React.HTMLProps<HTMLElement>`? Related to issue #1045
export interface IContextMenuProps
	extends StandardProps,
		React.HTMLAttributes<HTMLElement> {
	/** direction of the FlyOut relative to Target. */
	direction?: Direction;

	// TODO: fix this mispelling, but it's a breaking change :(
	/**	the px offset along the axis of the direction */
	directonOffset: number;

	/** alignment of the Flyout relative to Target in the cross axis from `direction`. */
	alignment: Alignment;

	/** the px offset along the axis of the alignment */
	alignmentOffset?: number;

	/** an alternative to `alignmentOffset` a function that is applied with
		the width/height of the flyout. the result is used as the
		`alignmentOffset` */
	getAlignmentOffset: GetAlignmentOffset;

	/** The number of px's to grow or shrink the minWidth of the FlyOut */
	minWidthOffset: number;

	/** Indicates whether the FlyOut will render or not. */
	isExpanded: boolean;

	/** Called when a click event happenens outside of the ContextMenu */
	onClickOut: ({
		event,
		props,
	}: {
		event: MouseEvent;
		props: IContextMenuProps;
	}) => void | null;

	/** The `id` of the FlyOut portal element that is appended to
		`document.body`. Defaults to a generated `id`. */
	portalId: string | null;

	FlyOut?: React.ReactNode;
	Target?: React.ReactNode;
}

/** TODO: Remove this constant when the component is converted to a functional component */
const nonPassThroughs = [
	'children',
	'className',
	'style',
	'direction',
	'directonOffset',
	'alignment',
	'alignmentOffset',
	'getAlignmentOffset',
	'minWidthOffset',
	'isExpanded',
	'onClickOut',
	'portalId',
	'FlyOut',
	'Target',
];

interface IContextMenuState {
	portalId: string;
	targetRect: {
		bottom: number;
		top: number;
		left: number;
		right: number;
		height: number;
		width: number;
	};
	flyOutHeight: number;
	flyOutWidth: number;
}

class ContextMenu extends React.Component<
	IContextMenuProps,
	IContextMenuState,
	{}
> {
	static displayName = 'ContextMenu';
	static peek = {
		description: `Use a \`ContextMenu\` to render a target and a flyout positioned relative to the target.`,
		categories: ['utility'],
		madeFrom: ['Portal'],
	};
	static propTypes = {
		/**
			\`children\` should include exactly one ContextMenu.Target and one
			ContextMenu.FlyOut.
		*/
		children: node,

		/**
			Appended to the component-specific class names set on the root element.
		*/
		className: string,

		/**
			Passed through to the root element.
		*/
		style: object,

		/**
			direction of the FlyOut relative to Target.
		*/
		direction: oneOf(['down', 'up', 'right', 'left']),

		/**
			the px offset along the axis of the direction
		*/
		directonOffset: number,

		/**
			alignment of the Flyout relative to Target in the cross axis from
			\`direction\`.
		*/
		alignment: oneOf(['start', 'center', 'end']),

		/**
			the px offset along the axis of the alignment
		*/
		alignmentOffset: number,

		/**
			an alternative to \`alignmentOffset\`, a function that is applied with
			the width/height of the flyout. the result is used as the
			\`alignmentOffset\`
		*/
		getAlignmentOffset: func,

		/**
			The number of px's to grow or shrink the minWidth of the FlyOut
		*/
		minWidthOffset: number,

		/**
			Indicates whether the FlyOut will render or not.
		*/
		isExpanded: bool,

		/**
			Called when a click event happenens outside of the ContextMenu, with the
			signature \`({ props, event }) => { ... }\`
		*/
		onClickOut: func,

		/**
			The \`id\` of the FlyOut portal element that is appended to
			\`document.body\`. Defaults to a generated \`id\`.
		*/
		portalId: string,

		FlyOut: node,
		Target: node,
	};

	// all of these should be removed, but it's a breaking change to do so :(
	static UP = EnumDirection.up;
	static DOWN = EnumDirection.down;
	static LEFT = EnumDirection.left;
	static RIGHT = EnumDirection.right;
	static START = EnumAlignment.start;
	static CENTER = EnumAlignment.center;
	static END = EnumAlignment.end;

	static Target = ContextMenuTarget;
	static FlyOut = ContextMenuFlyOut;

	private targetRef = React.createRef<HTMLDivElement>();
	private flyOutPortalRef = React.createRef<Portal>();

	static defaultProps = {
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

	state = {
		portalId: this.props.portalId || uniqueName('ContextMenu-Portal-'),
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

	// TODO: does this need to be instance property?
	continueAlignment = false;

	beginAlignment = (): void => {
		this.continueAlignment = true;
		window.requestAnimationFrame(this.handleAlignment);
	};

	endAlignment = (): void => {
		this.continueAlignment = false;
	};

	handleAlignment = (): void => {
		if (this.continueAlignment) {
			if (this.props.isExpanded) {
				this.alignFlyOut(true);
			}
			window.requestAnimationFrame(this.handleAlignment);
		}
	};

	handleBodyClick = (event: MouseEvent | TouchEvent): void => {
		const {
			props,
			props: { onClickOut },
			flyOutPortalRef,
			targetRef,
		} = this;

		// in this block, I assert the type of target because EventTarget -> Element -> HtmlElement (from general to specific typing)
		const eventTarget = event.target as HTMLElement | null;

		if (
			!isNil(onClickOut) &&
			flyOutPortalRef.current &&
			targetRef.current &&
			eventTarget &&
			eventTarget.nodeName
		) {
			const flyOutEl = flyOutPortalRef.current.portalElement.firstChild;
			const wasALabelClick =
				eventTarget.nodeName === 'INPUT' &&
				sharesAncestor(eventTarget, targetRef.current, 'LABEL');

			// Attempt to detect <label> click and ignore it
			if (wasALabelClick) {
				return;
			}

			if (
				!(
					(flyOutEl as HTMLDivElement).contains(eventTarget) ||
					targetRef.current.contains(eventTarget)
				) &&
				event.type === 'click'
			) {
				onClickOut({ props, event: event as MouseEvent });
			}
		}
	};

	calcAlignmentOffset = ({
		direction,
		alignment,
		getAlignmentOffset,
		flyOutHeight,
		flyOutWidth,
	}: {
		direction: Direction;
		alignment: Alignment;
		getAlignmentOffset: GetAlignmentOffset;
		flyOutHeight: number;
		flyOutWidth: number;
	}): number => {
		const { up: UP, down: DOWN } = EnumDirection;
		const { center: CENTER } = EnumAlignment;

		return !_.isUndefined(this.props.alignmentOffset)
			? this.props.alignmentOffset
			: alignment === CENTER
			? getAlignmentOffset(
					_.includes([UP, DOWN], direction) ? flyOutWidth : flyOutHeight
			  )
			: 0;
	};

	getMatch = ({
		direction,
		alignment,
		flyOutHeight,
		flyOutWidth,
		clientWidth,
		directonOffset,
		alignmentOffset,
		top,
		bottom,
		left,
		right,
		width,
		height,
	}: {
		direction: Direction;
		alignment: Alignment;
		flyOutHeight: number;
		flyOutWidth: number;
		clientWidth: number;
		directonOffset: number;
		alignmentOffset: number;
		top: number;
		bottom: number;
		left: number;
		right: number;
		width: number;
		height: number;
	}): FlyoutPosition => {
		const { up: UP, down: DOWN, left: LEFT, right: RIGHT } = EnumDirection;
		const { start: START, center: CENTER, end: END } = EnumAlignment;

		const options = {
			[UP]: {
				[START]: {
					top: top - flyOutHeight - directonOffset,
					left: left - alignmentOffset,
				},
				[CENTER]: {
					top: top - flyOutHeight - directonOffset,
					left: left + width / 2 - flyOutWidth / 2 + alignmentOffset,
				},
				[END]: {
					top: top - flyOutHeight - directonOffset,
					right: clientWidth - right - alignmentOffset,
				},
			},
			[DOWN]: {
				[START]: {
					top: bottom + directonOffset,
					left: left - alignmentOffset,
				},
				[CENTER]: {
					top: bottom + directonOffset,
					left: left + width / 2 - flyOutWidth / 2 + alignmentOffset,
				},
				[END]: {
					top: bottom + directonOffset,
					right: clientWidth - right - alignmentOffset,
				},
			},
			[LEFT]: {
				[START]: {
					top: top - alignmentOffset,
					right: clientWidth - left + directonOffset,
				},
				[CENTER]: {
					top: top - flyOutHeight / 2 + height / 2 + alignmentOffset,
					right: clientWidth - left + directonOffset,
				},
				[END]: {
					top: top - flyOutHeight + height + alignmentOffset,
					right: clientWidth - left + directonOffset,
				},
			},
			[RIGHT]: {
				[START]: {
					top: top - alignmentOffset,
					left: left + width + directonOffset,
				},
				[CENTER]: {
					top: top - flyOutHeight / 2 + height / 2 + alignmentOffset,
					left: left + width + directonOffset,
				},
				[END]: {
					top: top - flyOutHeight + height + alignmentOffset,
					left: left + width + directonOffset,
				},
			},
		};

		return {
			...defaultFlyoutPosition,
			...options[direction][alignment],
		};
	};

	getFlyoutPosition = (): FlyoutPosition | {} | undefined => {
		const {
			props: {
				direction,
				alignment,
				directonOffset = ContextMenu.defaultProps.directonOffset,
				getAlignmentOffset = ContextMenu.defaultProps.getAlignmentOffset,
			},
			state: {
				flyOutHeight,
				flyOutWidth,
				targetRect: { bottom, left, right, top, width, height },
			},
			flyOutPortalRef,
		} = this;

		const { clientWidth } = document.body;

		if (!flyOutPortalRef.current) return {};

		if (direction && alignment) {
			return this.getMatch({
				direction,
				alignment,
				flyOutHeight,
				flyOutWidth,
				clientWidth,
				directonOffset,
				alignmentOffset: this.calcAlignmentOffset({
					direction,
					alignment,
					getAlignmentOffset,
					flyOutHeight,
					flyOutWidth,
				}),
				top,
				bottom,
				left,
				right,
				width,
				height,
			});
		}
	};

	alignFlyOut = (doRedunancyCheck = false): void => {
		const { flyOutPortalRef, targetRef } = this;

		if (!targetRef.current || !flyOutPortalRef.current) {
			return;
		}

		const targetRect = getAbsoluteBoundingClientRect(
			targetRef.current as HTMLDivElement
		);
		const portalRef = flyOutPortalRef.current as Portal;

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

		if (portalRef) {
			const flyOutEl = portalRef.portalElement.firstChild;
			const { height, width } = (
				flyOutEl as HTMLDivElement
			).getBoundingClientRect();
			this.setState({
				targetRect,
				flyOutHeight: height,
				flyOutWidth: width,
			});
		}
	};

	UNSAFE_componentWillReceiveProps(): void {
		_.defer((): void => this.alignFlyOut());
	}

	componentDidMount(): void {
		_.defer((): void => this.alignFlyOut());
		this.beginAlignment();

		document.body.addEventListener('touchstart', this.handleBodyClick);
		document.body.addEventListener('click', this.handleBodyClick);
	}

	componentWillUnmount(): void {
		this.endAlignment();
		document.body.removeEventListener('click', this.handleBodyClick);
	}

	render(): React.ReactNode {
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

		const targetElement = getFirst(
			this.props,
			ContextMenu.Target
		) as React.ReactElement;
		const targetChildren = _.get(targetElement, 'props.children', null);
		const TargetElementType = targetElement.props.elementType;

		const flyoutElement = getFirst(this.props, ContextMenu.FlyOut);
		const flyProps = _.get(flyoutElement, 'props', {});

		return (
			<TargetElementType
				ref={this.targetRef}
				{..._.omit(passThroughs, nonPassThroughs)}
				className={cx('&', className)}
				style={style}
			>
				{targetChildren}
				{isExpanded ? (
					<Portal
						ref={this.flyOutPortalRef}
						{...flyProps}
						className={cx(
							'&-FlyOut',
							`&-FlyOut-${direction}`,
							flyProps.className
						)}
						portalId={portalId}
						style={{
							minWidth: targetRect.width + (minWidthOffset as number),
							...this.getFlyoutPosition(),
							...flyProps.style,
						}}
					>
						{flyProps.children}
					</Portal>
				) : null}
			</TargetElementType>
		);
	}
}

export default ContextMenu;
