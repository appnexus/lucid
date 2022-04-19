import _, { omit } from 'lodash';
import React, { RefObject } from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { filterTypes, StandardProps } from '../../util/component-types';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';
import { Motion, spring, OpaqueConfig } from 'react-motion';
import { QUICK_SLIDE_MOTION } from '../../constants/motion-spring';

const cx = lucidClassNames.bind('&-SplitHorizontal');

const { bool, func, node, number, string, oneOfType } = PropTypes;

/** SplitHorizontal TopPane */

export interface ISplitHorizontalTopPaneProps extends StandardProps {
	/** Set height of this pane. */
	height?: number | string;

	/** Define this pane as the primary content pane. When the split is
		collapsed, this pane becomes full height. */
	isPrimary: boolean;
}
export const SplitHorizontalTopPane = (
	_props: ISplitHorizontalTopPaneProps
): null => null;
SplitHorizontalTopPane.displayName = 'SplitHorizontal.TopPane';
SplitHorizontalTopPane.peek = {
	description: `Top pane of the split.`,
};
SplitHorizontalTopPane.propName = 'TopPane';
SplitHorizontalTopPane.propTypes = {
	/**
		Any valid React children.
	*/
	children: node,
	/**
		Set height of this pane.
	*/
	height: oneOfType([number, string]),
	/**
		Define this pane as the primary content pane. When the split is
		collapsed, this pane becomes full height.
	*/
	isPrimary: bool,
};
SplitHorizontalTopPane.defaultProps = {
	isPrimary: false,
};

/** SplitHorizontal Bottom Pane */
export interface ISplitHorizontalBottomPaneProps extends StandardProps {
	/** Set height of this pane. */
	height?: number | string;
	/** Define this pane as the primary content pane. When the split is
		collapsed, this pane becomes full height. */
	isPrimary: boolean;
}
export const SplitHorizontalBottomPane = (
	_props: ISplitHorizontalBottomPaneProps
): null => null;
SplitHorizontalBottomPane.displayName = 'SplitHorizontal.BottomPane';
SplitHorizontalBottomPane.peek = {
	description: `Bottom pane of the split.`,
};
SplitHorizontalBottomPane.propName = 'BottomPane';
SplitHorizontalBottomPane.propTypes = {
	/**
		Any valid React children.
	*/
	children: node,
	/**
		Set height of this pane.
	*/
	height: oneOfType([number, string]),
	/**
		Define this pane as the primary content pane. When the split is
		collapsed, this pane becomes full height.
	*/
	isPrimary: bool,
};
SplitHorizontalBottomPane.defaultProps = {
	isPrimary: false,
};

/** SplitHorizontal Divider */
export interface ISplitHorizontalDividerProps extends StandardProps {}
const SplitHorizontalDivider = (_props: ISplitHorizontalDividerProps): null =>
	null;
SplitHorizontalDivider.displayName = 'SplitHorizontal.Divider';
SplitHorizontalDivider.peek = {
	description: `The area that separates the split panes. Can be dragged to resize them.`,
};
SplitHorizontalDivider.propName = 'Divider';
SplitHorizontalDivider.propTypes = {
	/**
		Any valid React children.
	*/
	children: node,
};

/** Split Horizontal */
export interface ISplitHorizontalProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/** Render as expanded or collapsed. */
	isExpanded: boolean;

	/** Allows animated expand and collapse behavior. */
	isAnimated: boolean;

	/** Called when the user is currently resizing the split with the Divider. */
	onResizing: (
		height: number,
		{
			event,
			props,
		}: {
			event: MouseEvent | TouchEvent;
			props: ISplitHorizontalProps;
		}
	) => void;

	/** Called when the user resizes the split with the Divider. */
	onResize: (
		height: number,
		{
			event,
			props,
		}: {
			event: MouseEvent | TouchEvent;
			props: ISplitHorizontalProps;
		}
	) => void;

	/** Use this prop to shift the collapsed position by a known value. */
	collapseShift: number;
}

const nonPassThroughs = [
	'className',
	'children',
	'isExpanded',
	'isAnimated',
	'onResizing',
	'onResize',
	'collapseShift',
	'TopPane',
	'BottomPane',
	'Divider',
	'onSelect',
	'onToggle',
	'initialState',
	'callbackId',
];

interface ISplitHorizontalState {
	collapseAmount: number;
	isAnimated: boolean;
	isExpanded: boolean;
}

class SplitHorizontal extends React.Component<
	ISplitHorizontalProps,
	ISplitHorizontalState,
	{}
> {
	static displayName = 'SplitHorizontal';
	static peek = {
		description: `\`SplitHorizontal\` renders a vertical split.`,
		categories: ['helpers'],
		madeFrom: ['DragCaptureZone'],
	};
	static _isPrivate = true;
	static propTypes = {
		/**
			Appended to the component-specific class names set on the root element.
			Value is run through the \`classnames\` library.
		*/
		className: string,

		/**
			Direct children must be types {Splitvertical.Toppane,
			Splitvertical.Divider, Splitvertical.BottomPane}.	All content is
			composed as children of these respective elements.
		*/
		children: node,

		/**
			Render as expanded or collapsed.
		*/
		isExpanded: bool,

		/**
			Allows animated expand and collapse behavior.
		*/
		isAnimated: bool,

		/**
			Called when the user is currently resizing the split with the Divider.
			Signature: \`(height, { event, props }) => {}\`
		*/
		onResizing: func,

		/**
			Called when the user resizes the split with the Divider.	Signature:
			\`(height, { event, props }) => {}\`
		*/
		onResize: func,

		/**
			Use this prop to shift the collapsed position by a known value.
		*/
		collapseShift: number,

		TopPane: node,
		BottomPane: node,
		Divider: node,
	};

	static defaultProps = {
		isExpanded: true,
		isAnimated: false,
		collapseShift: 0,
		onResizing: _.noop,
		onResize: _.noop,
	};

	state = {
		collapseAmount: 250,
		isAnimated: false,
		isExpanded: false,
	};

	static TopPane = SplitHorizontalTopPane;
	static BottomPane = SplitHorizontalBottomPane;
	static Divider = SplitHorizontalDivider;

	private innerRef = React.createRef<HTMLDivElement>();
	private topPaneRef = React.createRef<HTMLDivElement>();
	private bottomPaneRef = React.createRef<HTMLDivElement>();

	secondaryStartRect = this.topPaneRef.current
		? this.topPaneRef.current.getBoundingClientRect()
		: null;

	getPanes = (): {
		top: ISplitHorizontalTopPaneProps;
		bottom: ISplitHorizontalBottomPaneProps;
		primary: ISplitHorizontalTopPaneProps | ISplitHorizontalBottomPaneProps;
		secondary: ISplitHorizontalTopPaneProps | ISplitHorizontalBottomPaneProps;
		primaryRef: React.RefObject<HTMLDivElement>;
		secondaryRef: React.RefObject<HTMLDivElement>;
	} => {
		const { children } = this.props;
		const { topPaneRef, bottomPaneRef } = this;

		const topPaneElement = _.get(
			filterTypes<ISplitHorizontalProps>(children, SplitHorizontal.TopPane),
			0,
			<SplitHorizontal.TopPane />
		);
		const bottomPaneElement = _.get(
			filterTypes<ISplitHorizontalProps>(children, SplitHorizontal.BottomPane),
			0,
			<SplitHorizontal.BottomPane />
		);
		let primaryElement, primaryRef;
		let secondaryElement, secondaryRef;

		if (topPaneElement.props.isPrimary && !bottomPaneElement.props.isPrimary) {
			primaryElement = topPaneElement;
			primaryRef = topPaneRef;
			secondaryElement = bottomPaneElement;
			secondaryRef = bottomPaneRef;
		} else {
			primaryElement = bottomPaneElement;
			primaryRef = bottomPaneRef;
			secondaryElement = topPaneElement;
			secondaryRef = topPaneRef;
		}

		return {
			top: topPaneElement.props,
			bottom: bottomPaneElement.props,
			primary: primaryElement.props,
			primaryRef,
			secondary: secondaryElement.props,
			secondaryRef,
		};
	};

	panes = this.getPanes();

	// Style changes to DOM nodes are updated here to shortcut the state -> render cycle for better performance. Also the Style updates in this
	// function are entirely transient and can be flushed with a props update to `height`.
	applyDeltaToSecondaryHeight = (
		dY: number,
		isExpanded: boolean,
		secondaryStartRect: ClientRect | DOMRect,
		secondaryRef: React.RefObject<HTMLDivElement>,
		secondary: ISplitHorizontalTopPaneProps | ISplitHorizontalBottomPaneProps,
		bottom: ISplitHorizontalBottomPaneProps,
		innerRef: React.RefObject<HTMLDivElement>,
		primaryRef: React.RefObject<HTMLDivElement>,
		collapseShift = 0
	): number => {
		if (isExpanded) {
			(secondaryRef.current as HTMLDivElement).style.flexBasis = `${
				secondaryStartRect.height + dY * (secondary === bottom ? -1 : 1)
			}px`;
			return secondaryStartRect.height + dY * (secondary === bottom ? -1 : 1);
		} else {
			const overlapHeight =
				(secondary === bottom
					? secondaryStartRect.height + dY
					: secondaryStartRect.height - dY) - collapseShift;

			if (overlapHeight > 0) {
				this.collapseSecondary(overlapHeight);
				return secondaryStartRect.height - overlapHeight;
			} else {
				this.expandSecondary();
				(secondaryRef.current as HTMLDivElement).style.flexBasis = `${
					(dY + collapseShift) * (secondary === bottom ? -1 : 1)
				}px`;
				return (dY + collapseShift) * (secondary === bottom ? -1 : 1);
			}
		}
	};

	expandSecondary = (): void => {
		this.setState({ isExpanded: true });
	};

	collapseSecondary = (collapseAmount: number): void => {
		this.setState({ isExpanded: false, collapseAmount });
	};

	disableAnimation = (
		innerRef: RefObject<HTMLDivElement>,
		secondaryRef: RefObject<HTMLDivElement>,
		primaryRef: RefObject<HTMLDivElement>
	): void => {
		(innerRef.current as HTMLDivElement).style.transition = 'all 0s';
		(secondaryRef.current as HTMLDivElement).style.transition = 'all 0s';
		(primaryRef.current as HTMLDivElement).style.transition = 'all 0s';
	};

	resetAnimation = (
		innerRef: RefObject<HTMLDivElement>,
		secondaryRef: RefObject<HTMLDivElement>,
		primaryRef: RefObject<HTMLDivElement>
	): void => {
		(innerRef.current as HTMLDivElement).style.transition = '';
		(secondaryRef.current as HTMLDivElement).style.transition = '';
		(primaryRef.current as HTMLDivElement).style.transition = '';
	};

	handleDragStart = (): void => {
		this.panes = this.getPanes();
		const { secondaryRef, primaryRef } = this.panes;
		this.secondaryStartRect = secondaryRef.current
			? secondaryRef.current.getBoundingClientRect()
			: null;
		this.disableAnimation(this.innerRef, secondaryRef, primaryRef);
	};

	handleDrag = (
		{ dY }: { dY: number },
		{ event }: { event: MouseEvent | TouchEvent }
	): void => {
		const { isExpanded, collapseShift, onResizing } = this.props;

		const { secondaryRef, secondary, bottom, primaryRef } = this.panes;

		this.secondaryStartRect &&
			onResizing(
				this.applyDeltaToSecondaryHeight(
					dY,
					isExpanded,
					this.secondaryStartRect,
					secondaryRef,
					secondary,
					bottom,
					this.innerRef,
					primaryRef,
					collapseShift
				),
				{ event, props: this.props }
			);
	};

	handleDragEnd = (
		{ dY }: { dY: number },
		{ event }: { event: MouseEvent | TouchEvent }
	): void => {
		const { isExpanded, collapseShift, onResize } = this.props;

		const { secondaryRef, secondary, bottom, primaryRef } = this.panes;

		this.secondaryStartRect &&
			onResize(
				this.applyDeltaToSecondaryHeight(
					dY,
					isExpanded,
					this.secondaryStartRect,
					secondaryRef,
					secondary,
					bottom,
					this.innerRef,
					primaryRef,
					collapseShift
				),
				{ event, props: this.props }
			);

		this.resetAnimation(this.innerRef, secondaryRef, primaryRef);
	};

	UNSAFE_componentWillReceiveProps(nextProps: ISplitHorizontalProps): void {
		const { isAnimated, isExpanded, collapseShift } = nextProps;

		const { secondaryRef } = this.getPanes();

		if (
			!isExpanded && // check if collapseShift changed or secondary pane collapsed
			(this.props.isExpanded || this.props.collapseShift !== collapseShift)
		) {
			// collapse secondary
			const secondaryRect = secondaryRef.current
				? secondaryRef.current.getBoundingClientRect()
				: null;
			secondaryRect &&
				this.collapseSecondary(secondaryRect.height - collapseShift);
		} else if (!this.props.isExpanded && isExpanded) {
			// expand secondary
			this.expandSecondary();
		}

		if (this.state.isAnimated !== isAnimated) {
			this.setState({
				isAnimated,
			});
		}
	}

	componentDidMount(): void {
		const { isAnimated, isExpanded, collapseShift } = this.props;

		const { secondaryRef } = this.getPanes();

		if (isExpanded) {
			// expand secondary
			this.expandSecondary();
		} else {
			// collapse secondary
			const secondaryRect = secondaryRef.current
				? secondaryRef.current.getBoundingClientRect()
				: null;
			secondaryRect &&
				this.collapseSecondary(secondaryRect.height - collapseShift);
		}

		if (this.state.isAnimated !== isAnimated) {
			_.defer((): void => {
				this.setState({
					isAnimated,
				});
			});
		}
	}

	render(): React.ReactNode {
		const { children, className, ...passThroughs } = this.props;

		const { isAnimated, isExpanded, collapseAmount } = this.state;

		const {
			top: topPaneProps,
			bottom: bottomPaneProps,
			secondary,
		} = this.getPanes();

		const dividerProps = _.get(
			_.first(filterTypes(children, SplitHorizontalDivider)),
			'props',
			{}
		);

		let from, to;

		if (!isExpanded) {
			from = { slideAmount: 0 };
			to = { slideAmount: collapseAmount };
		} else {
			from = { slideAmount: 0 };
			to = { slideAmount: 0 };
		}

		const isBottomSecondary = bottomPaneProps === secondary;

		return (
			<div
				{...omit(passThroughs, nonPassThroughs)}
				className={cx(
					'&',
					{
						'&-is-expanded': this.props.isExpanded,
						'&-is-animated': this.props.isAnimated,
					},
					className
				)}
				style={{
					flex: 1,
					overflow: 'hidden',
					...passThroughs.style,
				}}
			>
				<Motion
					defaultStyle={from}
					style={
						isAnimated
							? _.mapValues(
									to,
									(val): OpaqueConfig => spring(val, QUICK_SLIDE_MOTION)
							  )
							: to
					}
				>
					{(tween): JSX.Element => (
						<div
							className={cx('&-inner')}
							ref={this.innerRef}
							style={{
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								transform: `translateY(${
									(isBottomSecondary ? 1 : -1) * Math.round(tween.slideAmount)
								}px)`,
							}}
						>
							<div
								{...omit(topPaneProps, [
									'height',
									'isPrimary',
									'initialState',
									'callbackId',
								])}
								className={cx(
									'&-TopPane',
									{
										'&-is-secondary': topPaneProps === secondary,
									},
									topPaneProps.className
								)}
								style={{
									flexGrow: isBottomSecondary ? 1 : 0,
									flexShrink: isBottomSecondary ? 1 : 0,
									flexBasis: _.isNil(topPaneProps.height)
										? topPaneProps === secondary
											? 'calc(50% - 3px)'
											: '0%'
										: topPaneProps.height,
									marginTop: isBottomSecondary
										? -Math.round(tween.slideAmount)
										: undefined,
									overflow: 'auto',
									...topPaneProps.style,
								}}
								ref={this.topPaneRef}
							>
								{topPaneProps.children}
							</div>
							<DragCaptureZone
								{...omit(dividerProps, [
									'children',
									'initialState',
									'callbackId',
								])}
								className={cx('&-Divider', dividerProps.className)}
								onDragStart={this.handleDragStart}
								onDrag={this.handleDrag}
								onDragEnd={this.handleDragEnd}
								style={{
									height: '6px',
									boxSizing: 'border-box',
									...dividerProps.style,
								}}
							>
								{dividerProps.children || ' '}
							</DragCaptureZone>
							<div
								{...omit(bottomPaneProps, [
									'height',
									'isPrimary',
									'initialState',
									'callbackId',
								])}
								className={cx(
									'&-BottomPane',
									{
										'&-is-secondary': bottomPaneProps === secondary,
									},
									bottomPaneProps.className
								)}
								style={{
									flexGrow: !isBottomSecondary ? 1 : 0,
									flexShrink: !isBottomSecondary ? 1 : 0,
									flexBasis: _.isNil(bottomPaneProps.height)
										? bottomPaneProps === secondary
											? 'calc(50% - 3px)'
											: '0%'
										: bottomPaneProps.height,
									marginBottom: isBottomSecondary
										? undefined
										: -Math.round(tween.slideAmount),
									overflow: 'auto',
									...bottomPaneProps.style,
								}}
								ref={this.bottomPaneRef}
							>
								{bottomPaneProps.children}
							</div>
						</div>
					)}
				</Motion>
			</div>
		);
	}
}

export default SplitHorizontal;
