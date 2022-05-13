import _, { omit } from 'lodash';
import React, { RefObject } from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { filterTypes, StandardProps } from '../../util/component-types';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';
import { Motion, spring } from 'react-motion';
import { QUICK_SLIDE_MOTION } from '../../constants/motion-spring';

const cx = lucidClassNames.bind('&-SplitVertical');

const { any, bool, func, node, number, string, oneOfType } = PropTypes;

/** SplitVertical Right Pane */
export interface ISplitVerticalRightPaneProps extends StandardProps {
	/** Set width of this pane. */
	width?: number | string;

	/** Define this pane as the primary content pane. When the split is
		collapsed, this pane becomes full width. */
	isPrimary: boolean;
}
export const SplitVerticalRightPane = (
	_props: ISplitVerticalRightPaneProps
): null => null;
SplitVerticalRightPane.displayName = 'SplitVertical.RightPane';
SplitVerticalRightPane.peek = {
	description: `Right pane of the split.`,
};
SplitVerticalRightPane.propName = 'RightPane';
SplitVerticalRightPane.propTypes = {
	/**
		Any valid React children.
	*/
	children: node,

	/**
		Set width of this pane.
	*/
	width: oneOfType([number, string]),

	/**
		Define this pane as the primary content pane. When the split is
		collapsed, this pane becomes full width.
	*/
	isPrimary: bool,
};
SplitVerticalRightPane.defaultProps = {
	isPrimary: false,
};

/** SplitVertical Left Pane */
export interface ISplitVerticalLeftPaneProps extends StandardProps {
	/** Set width of this pane. */
	width?: number | string;
	/** Define this pane as the primary content pane. When the split is
		collapsed, this pane becomes full width. */
	isPrimary: boolean;
}
export const SplitVerticalLeftPane = (
	_props: ISplitVerticalLeftPaneProps
): null => null;
SplitVerticalLeftPane.displayName = 'SplitVertical.LeftPane';
SplitVerticalLeftPane.peek = {
	description: `Left pane of the split.`,
};
SplitVerticalLeftPane.propName = 'LeftPane';
SplitVerticalLeftPane.propTypes = {
	/**
		Any valid React children.
	*/
	children: node,
	/**
		Set width of this pane.
	*/
	width: oneOfType([number, string]),
	/**
		Define this pane as the primary content pane. When the split is
		collapsed, this pane becomes full width.
	*/
	isPrimary: bool,
};
SplitVerticalLeftPane.defaultProps = {
	isPrimary: false,
};

/** SplitVertical Divider */
const SplitVerticalDivider = (_props: StandardProps): null => null;
SplitVerticalDivider.displayName = 'SplitVertical.Divider';
SplitVerticalDivider.peek = {
	description: `The area that separates the split panes. Can be dragged to resize them.`,
};
SplitVerticalDivider.propName = 'Divider';
SplitVerticalDivider.propTypes = {
	/**
		Any valid React children.
	*/
	children: node,
};

/** SplitVertical */
export interface ISplitVerticalProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/** Render as expanded or collapsed. */
	isExpanded: boolean;

	/** Allows animated expand and collapse behavior. */
	isAnimated: boolean;

	/** Allows draggable resizing of the SplitVertical */
	isResizeable: boolean;

	/** Called when the user is currently resizing the split with the Divider. */
	onResizing: (
		height: number,
		{
			event,
			props,
		}: {
			event: MouseEvent | TouchEvent;
			props: ISplitVerticalProps;
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
			props: ISplitVerticalProps;
		}
	) => void;

	/** Use this prop to shift the collapsed position by a known value. */
	collapseShift: number;
}
interface ISplitVerticalState {
	collapseAmount: number;
	isAnimated: boolean;
	isExpanded: boolean;
}

class SplitVertical extends React.Component<
	ISplitVerticalProps,
	ISplitVerticalState,
	{}
> {
	static displayName = 'SplitVertical';
	static peek = {
		description: `\`SplitVertical\` renders a vertical split.`,
		categories: ['helpers'],
		madeFrom: ['DragCaptureZone'],
	};
	static _isPrivate = true;
	static propTypes = {
		/**
			Appended to the component-specific class names set on the root element.
			Value is run through the \`classnames\` library.
		*/
		className: any,

		/**
			Direct children must be types {SplitVertical.Leftpane,
			SplitVertical.Divider, SplitVertical.RightPane}.  
			All content is composed as children of these respective elements.
		*/
		children: node,

		/**
			Allows draggable resizing of the SplitVertical
		*/
		isResizeable: bool,

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
			Signature: \`(width, { event, props }) => {}\`
		*/
		onResizing: func,

		/**
			Called when the user resizes the split with the Divider.  Signature:
			\`(width, { event, props }) => {}\`
		*/
		onResize: func,

		/**
			Use this prop to shift the collapsed position by a known value.
		*/
		collapseShift: number,

		/**
			Direct child of SplitVertical
		 */
		RightPane: node,

		/**
			Direct child of SplitVertical
		 */
		LeftPane: node,

		/**
		 	Direct child of SplitVertical.
		 	Rendered when `isResizeable` is true.
		 */
		Divider: node,
	};

	static defaultProps = {
		isExpanded: true,
		isAnimated: false,
		collapseShift: 0,
		onResizing: _.noop,
		onResize: _.noop,
		isResizeable: true,
	};

	state = {
		isAnimated: false, // to ensure first render doesn't show a collapse animation
		isExpanded: true,
		collapseAmount: 250,
	};

	static RightPane = SplitVerticalRightPane;
	static LeftPane = SplitVerticalLeftPane;
	static Divider = SplitVerticalDivider;

	private innerRef = React.createRef<HTMLDivElement>();
	private leftPaneRef = React.createRef<HTMLDivElement>();
	private rightPaneRef = React.createRef<HTMLDivElement>();

	secondaryStartRect = this.leftPaneRef.current
		? this.leftPaneRef.current.getBoundingClientRect()
		: null;

	getPanes = (): {
		right: ISplitVerticalRightPaneProps;
		left: ISplitVerticalLeftPaneProps;
		primary: ISplitVerticalRightPaneProps | ISplitVerticalLeftPaneProps;
		secondary: ISplitVerticalRightPaneProps | ISplitVerticalLeftPaneProps;
		primaryRef: React.RefObject<HTMLDivElement>;
		secondaryRef: React.RefObject<HTMLDivElement>;
	} => {
		const { children } = this.props;
		const { leftPaneRef, rightPaneRef } = this;

		const leftPaneElement = _.get(
			filterTypes(children, SplitVertical.LeftPane),
			0,
			<SplitVertical.LeftPane />
		);
		const rightPaneElement = _.get(
			filterTypes(children, SplitVertical.RightPane),
			0,
			<SplitVertical.RightPane />
		);
		let primaryElement, primaryRef;
		let secondaryElement, secondaryRef;

		if (leftPaneElement.props.isPrimary && !rightPaneElement.props.isPrimary) {
			primaryElement = leftPaneElement;
			primaryRef = leftPaneRef;
			secondaryElement = rightPaneElement;
			secondaryRef = rightPaneRef;
		} else {
			primaryElement = rightPaneElement;
			primaryRef = rightPaneRef;
			secondaryElement = leftPaneElement;
			secondaryRef = leftPaneRef;
		}

		return {
			left: leftPaneElement.props,
			right: rightPaneElement.props,
			primary: primaryElement.props,
			primaryRef,
			secondary: secondaryElement.props,
			secondaryRef,
		};
	};

	panes = this.getPanes();

	// Style changes to DOM nodes are updated here to shortcut the state -> render cycle for better performance. Also the Style updates in this
	// function are entirely transient and can be flushed with a props update to `width`.
	applyDeltaToSecondaryWidth = (
		dX: number,
		isExpanded: boolean,
		secondaryStartRect: ClientRect | DOMRect,
		secondaryRef: React.RefObject<HTMLDivElement>,
		secondary: ISplitVerticalRightPaneProps | ISplitVerticalLeftPaneProps,
		right: ISplitVerticalRightPaneProps,
		innerRef: React.RefObject<HTMLDivElement>,
		primaryRef: React.RefObject<HTMLDivElement>,
		collapseShift = 0
	): number => {
		if (isExpanded) {
			(secondaryRef.current as HTMLDivElement).style.flexBasis = `${
				secondaryStartRect.width + dX * (secondary === right ? -1 : 1)
			}px`;
			return secondaryStartRect.width + dX * (secondary === right ? -1 : 1);
		} else {
			const overlapWidth =
				(secondary === right
					? secondaryStartRect.width + dX
					: secondaryStartRect.width - dX) - collapseShift;

			if (overlapWidth > 0) {
				this.collapseSecondary(overlapWidth);
				return secondaryStartRect.width - overlapWidth;
			} else {
				this.expandSecondary();
				(secondaryRef.current as HTMLDivElement).style.flexBasis = `${
					(dX + collapseShift) * (secondary === right ? -1 : 1)
				}px`;
				return (dX + collapseShift) * (secondary === right ? -1 : 1);
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
		(innerRef.current as HTMLDivElement).style.transitionDuration = '0s';
		(secondaryRef.current as HTMLDivElement).style.transitionDuration = '0s';
		(primaryRef.current as HTMLDivElement).style.transitionDuration = '0s';
	};

	resetAnimation = (
		innerRef: RefObject<HTMLDivElement>,
		secondaryRef: RefObject<HTMLDivElement>,
		primaryRef: RefObject<HTMLDivElement>
	): void => {
		(innerRef.current as HTMLDivElement).style.transitionDuration = '';
		(secondaryRef.current as HTMLDivElement).style.transitionDuration = '';
		(primaryRef.current as HTMLDivElement).style.transitionDuration = '';
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
		{ dX }: { dX: number },
		{ event }: { event: MouseEvent | TouchEvent }
	): void => {
		const { isExpanded, collapseShift, onResizing } = this.props;

		const { secondaryRef, secondary, right, primaryRef } = this.panes;

		this.secondaryStartRect &&
			onResizing(
				this.applyDeltaToSecondaryWidth(
					dX,
					isExpanded,
					this.secondaryStartRect,
					secondaryRef,
					secondary,
					right,
					this.innerRef,
					primaryRef,
					collapseShift
				),
				{ props: this.props, event }
			);
	};

	handleDragEnd = (
		{ dX }: { dX: number },
		{ event }: { event: MouseEvent | TouchEvent }
	): void => {
		const { isExpanded, collapseShift, onResize } = this.props;

		const { secondaryRef, secondary, right, primaryRef } = this.panes;

		this.secondaryStartRect &&
			onResize(
				this.applyDeltaToSecondaryWidth(
					dX,
					isExpanded,
					this.secondaryStartRect,
					secondaryRef,
					secondary,
					right,
					this.innerRef,
					primaryRef,
					collapseShift
				),
				{ props: this.props, event }
			);

		this.resetAnimation(this.innerRef, secondaryRef, primaryRef);
	};

	UNSAFE_componentWillReceiveProps(nextProps: ISplitVerticalProps): void {
		const { isAnimated, isExpanded, collapseShift } = nextProps;

		const { secondaryRef } = this.getPanes();

		if (
			!isExpanded && // check if collapseShift changed or secondary pane collapsed
			(this.props.isExpanded || this.props.collapseShift !== collapseShift)
		) {
			// collapse secondary
			const secondaryRect = (
				secondaryRef.current as HTMLDivElement
			).getBoundingClientRect();
			this.collapseSecondary(secondaryRect.width - collapseShift);
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
			const secondaryRect = (
				secondaryRef.current as HTMLDivElement
			).getBoundingClientRect();
			this.collapseSecondary(secondaryRect.width - collapseShift);
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
		const { children, className, isResizeable, ...passThroughs } = this.props;

		const { isAnimated, isExpanded, collapseAmount } = this.state;

		const {
			left: leftPaneProps,
			right: rightPaneProps,
			secondary,
		} = this.getPanes();

		const dividerProps = _.get(
			_.first(filterTypes(children, SplitVertical.Divider)),
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

		const isRightSecondary = rightPaneProps === secondary;

		return (
			<div
				{...omit(passThroughs, [
					'className',
					'children',
					'isExpanded',
					'isAnimated',
					'onResizing',
					'onResize',
					'collapseShift',
					'RightPane',
					'LeftPane',
					'Divider',
					'initialState',
					'callbackId',
				])}
				className={cx(
					'&',
					{
						'&-is-expanded': isExpanded,
						'&-is-animated': isAnimated,
					},
					className
				)}
				style={{
					overflow: 'hidden',
					...passThroughs.style,
				}}
			>
				<Motion
					defaultStyle={from}
					style={
						isAnimated
							? _.mapValues(to, (val) => spring(val, QUICK_SLIDE_MOTION))
							: to
					}
				>
					{(tween): JSX.Element => (
						<div
							className={cx('&-inner')}
							ref={this.innerRef}
							style={{
								display: 'flex',
								transform: `translateX(${
									(isRightSecondary ? 1 : -1) * Math.round(tween.slideAmount)
								}px)`,
							}}
						>
							<div
								{...omit(
									leftPaneProps,
									['children', 'isPrimary', 'width'].concat([
										'initialState',
										'callbackId',
									])
								)}
								className={cx(
									'&-LeftPane',
									{
										'&-is-secondary': leftPaneProps === secondary,
									},
									leftPaneProps.className
								)}
								style={{
									flexGrow: isRightSecondary ? 1 : 0,
									flexShrink: isRightSecondary ? 1 : 0,
									flexBasis: _.isNil(leftPaneProps.width)
										? leftPaneProps === secondary
											? 'calc(50% - 3px)'
											: '0%'
										: leftPaneProps.width,
									marginLeft: isRightSecondary
										? -Math.round(tween.slideAmount)
										: undefined,
									overflow: 'auto',
									...leftPaneProps.style,
								}}
								ref={this.leftPaneRef}
							>
								{leftPaneProps.children}
							</div>
							{isResizeable ? (
								<DragCaptureZone
									{...omit(dividerProps, ['children'].concat('initialState'))}
									className={cx(
										'&-Divider',
										'&-Divider-is-resizeable',
										dividerProps.className
									)}
									onDragStart={this.handleDragStart}
									onDrag={this.handleDrag}
									onDragEnd={this.handleDragEnd}
									style={{
										width: '6px',
										boxSizing: 'border-box',
										...dividerProps.style,
									}}
								>
									{dividerProps.children || ' '}
								</DragCaptureZone>
							) : (
								<div
									{...omit(
										dividerProps,
										['children'].concat('initialState', 'callbackId')
									)}
									className={cx('&-Divider', dividerProps.className)}
								>
									{dividerProps.children || ' '}
								</div>
							)}
							<div
								{...omit(
									rightPaneProps,
									['children', 'isPrimary', 'width'].concat([
										'initialState',
										'callbackId',
									])
								)}
								className={cx(
									'&-RightPane',
									{
										'&-is-secondary': rightPaneProps === secondary,
									},
									rightPaneProps.className
								)}
								style={{
									flexGrow: !isRightSecondary ? 1 : 0,
									flexShrink: !isRightSecondary ? 1 : 0,
									flexBasis: _.isNil(rightPaneProps.width)
										? rightPaneProps === secondary
											? 'calc(50% - 3px)'
											: '0%'
										: rightPaneProps.width,
									marginRight: isRightSecondary
										? undefined
										: -Math.round(tween.slideAmount),
									overflow: 'auto',
									...rightPaneProps.style,
								}}
								ref={this.rightPaneRef}
							>
								{rightPaneProps.children}
							</div>
						</div>
					)}
				</Motion>
			</div>
		);
	}
}

export default SplitVertical;
