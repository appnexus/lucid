import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	createClass,
	filterTypes,
	omitProps,
} from '../../util/component-types';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';
import { Motion, spring } from 'react-motion';
import { QUICK_SLIDE_MOTION } from '../../constants/motion-spring';

const cx = lucidClassNames.bind('&-SplitVertical');

const { any, bool, func, node, number, string, oneOfType } = PropTypes;

/**
 * {"categories": ["helpers"]}
 *
 * `SplitVertical` renders a vertical split.
 */
const SplitVertical = createClass({
	displayName: 'SplitVertical',

	_isPrivate: true,

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element. Value is run through the `classnames` library.
		 */
		className: any,
		/**
		 * Direct children must be types {Splitvertical.Leftpane, Splitvertical.Divider, Splitvertical.RightPane}.
		 * All content is composed as children of these respective elements.
		 */
		children: node,
		/**
		 * Allows draggable resizing of the SplitVertical
		 */
		isResizeable: bool,
		/**
		 * Render as expanded or collapsed.
		 */
		isExpanded: bool,
		/**
		 * Allows animated expand and collapse behavior.
		 */
		isAnimated: bool,
		/**
		 * Called when the user is currently resizing the split with the Divider.
		 *
		 * Signature: `(width, { event, props }) => {}`
		 */
		onResizing: func,
		/**
		 * Called when the user resizes the split with the Divider.
		 *
		 * Signature: `(width, { event, props }) => {}`
		 */
		onResize: func,
		/**
		 * Use this prop to shift the collapsed position by a known value.
		 */
		collapseShift: number,
	},

	components: {
		/**
		 * Left pane of the split.
		 */
		LeftPane: createClass({
			displayName: 'SplitVertical.LeftPane',
			propTypes: {
				/**
				 * Any valid React children.
				 */
				children: node,
				/**
				 * Set width of this pane.
				 */
				width: oneOfType([number, string]),
				/**
				 * Define this pane as the primary content pane. When the split is collapsed, this pane becomes full width.
				 */
				isPrimary: bool,
			},
			getDefaultProps() {
				return {
					isPrimary: false,
				};
			},
		}),

		/**
		 * Right pane of the split.
		 */
		RightPane: createClass({
			displayName: 'SplitVertical.RightPane',
			propTypes: {
				/**
				 * Any valid React children.
				 */
				children: node,
				/**
				 * Set width of this pane.
				 */
				width: oneOfType([number, string]),
				/**
				 * Define this pane as the primary content pane. When the split is collapsed, this pane becomes full width.
				 */
				isPrimary: bool,
			},
			getDefaultProps() {
				return {
					isPrimary: false,
				};
			},
		}),

		/**
		 * The area that separates the split panes. Can be dragged to resize them.
		 */
		Divider: createClass({
			displayName: 'SplitVertical.Divider',
			propTypes: {
				/**
				 * Any valid React children.
				 */
				children: node,
			},
		}),
	},

	getDefaultProps() {
		return {
			isExpanded: true,
			isAnimated: false,
			collapseShift: 0,
			onResizing: _.noop,
			onResize: _.noop,
			isResizeable: true,
		};
	},

	getInitialState() {
		return {
			isAnimated: false, // to ensure first render doesn't show a collapse animation
			isExpanded: true,
			collapseAmount: 250,
		};
	},

	getPanes() {
		const { children } = this.props;
		const { leftPane: leftPaneRef, rightPane: rightPaneRef } = this.storedRefs;

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
	},

	// Style changes to DOM nodes are updated here to shortcut the state -> render cycle for better performance. Also the Style updates in this
	// function are entirely transient and can be flushed with a props update to `width`.
	applyDeltaToSecondaryWidth(
		dX,
		isExpanded,
		secondaryStartRect,
		secondaryRef,
		secondary,
		right,
		innerRef,
		primaryRef,
		collapseShift = 0
	) {
		if (isExpanded) {
			secondaryRef.style.flexBasis = `${secondaryStartRect.width + dX * (secondary === right ? -1 : 1)}px`;
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
				secondaryRef.style.flexBasis = `${(dX + collapseShift) * (secondary === right ? -1 : 1)}px`;
				return (dX + collapseShift) * (secondary === right ? -1 : 1);
			}
		}
	},

	expandSecondary() {
		this.setState({ isExpanded: true });
	},

	collapseSecondary(collapseAmount) {
		this.setState({ isExpanded: false, collapseAmount });
	},

	disableAnimation(innerRef, secondaryRef, primaryRef) {
		innerRef.style.transition = 'all 0s';
		secondaryRef.style.transition = 'all 0s';
		primaryRef.style.transition = 'all 0s';
	},

	resetAnimation(innerRef, secondaryRef, primaryRef) {
		innerRef.style.transition = '';
		secondaryRef.style.transition = '';
		primaryRef.style.transition = '';
	},

	handleDragStart() {
		this.panes = this.getPanes();
		const { secondaryRef, primaryRef } = this.panes;
		this.secondaryStartRect = secondaryRef.getBoundingClientRect();
		this.disableAnimation(this.storedRefs.inner, secondaryRef, primaryRef);
	},

	handleDrag({ dX }, { event }) {
		const { isExpanded, collapseShift, onResizing } = this.props;

		const { secondaryRef, secondary, right, primaryRef } = this.panes;

		onResizing(
			this.applyDeltaToSecondaryWidth(
				dX,
				isExpanded,
				this.secondaryStartRect,
				secondaryRef,
				secondary,
				right,
				this.storedRefs.inner,
				primaryRef,
				collapseShift
			),
			{ props: this.props, event }
		);
	},

	handleDragEnd({ dX }, { event }) {
		const { isExpanded, collapseShift, onResize } = this.props;

		const { secondaryRef, secondary, right, primaryRef } = this.panes;

		onResize(
			this.applyDeltaToSecondaryWidth(
				dX,
				isExpanded,
				this.secondaryStartRect,
				secondaryRef,
				secondary,
				right,
				this.storedRefs.inner,
				primaryRef,
				collapseShift
			),
			{ props: this.props, event }
		);

		this.resetAnimation(this.storedRefs.inner, secondaryRef, primaryRef);
	},

	componentWillReceiveProps(nextProps) {
		const { isAnimated, isExpanded, collapseShift } = nextProps;

		const { secondaryRef } = this.getPanes();

		if (
			!isExpanded && // check if collapseShift changed or secondary pane collapsed
			(this.props.isExpanded || this.props.collapseShift !== collapseShift)
		) {
			// collapse secondary
			const secondaryRect = secondaryRef.getBoundingClientRect();
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
	},

	componentDidMount() {
		const { isExpanded, isAnimated, collapseShift } = this.props;

		const { primaryRef, secondaryRef } = this.getPanes();

		const { inner } = this.storedRefs;

		_.defer(() => {
			this.disableAnimation(inner, secondaryRef, primaryRef);
			inner.style.visibility = 'hidden';
			_.defer(() => {
				if (!isExpanded) {
					// collapse secondary
					const secondaryRect = secondaryRef.getBoundingClientRect();
					this.collapseSecondary(secondaryRect.width - collapseShift);
				}

				_.defer(() => {
					if (isAnimated) {
						this.setState({ isAnimated });
					}
					_.defer(() => {
						inner.style.visibility = '';
						this.resetAnimation(inner, secondaryRef, primaryRef);
					});
				});
			});
		});
	},

	storeRef(name) {
		return ref => {
			this.storedRefs[name] = ref;
		};
	},

	componentWillMount() {
		this.storedRefs = {};
	},

	render() {
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
				{...omitProps(passThroughs, SplitVertical)}
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
							? _.mapValues(to, val => spring(val, QUICK_SLIDE_MOTION))
							: to
					}
				>
					{tween => (
						<div
							className={cx('&-inner')}
							ref={this.storeRef('inner')}
							style={{
								display: 'flex',
								transform: `translateX(${(isRightSecondary ? 1 : -1) * Math.round(tween.slideAmount)}px)`,
							}}
						>
							<div
								{...omitProps(leftPaneProps, SplitVertical.LeftPane)}
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
										? leftPaneProps === secondary ? 'calc(50% - 3px)' : '0%'
										: leftPaneProps.width,
									marginLeft: isRightSecondary
										? -Math.round(tween.slideAmount)
										: null,
									overflow: 'auto',
									...leftPaneProps.style,
								}}
								ref={this.storeRef('leftPane')}
							>
								{leftPaneProps.children}
							</div>
							{isResizeable
								? <DragCaptureZone
										{...omitProps(
											dividerProps,
											SplitVertical.Divider,
											[],
											false
										)}
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
								: <div
										{...omitProps(dividerProps, SplitVertical.Divider)}
										className={cx('&-Divider', dividerProps.className)}
									>
										{dividerProps.children || ' '}
									</div>}
							<div
								{...omitProps(rightPaneProps, SplitVertical.RightPane)}
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
										? rightPaneProps === secondary ? 'calc(50% - 3px)' : '0%'
										: rightPaneProps.width,
									marginRight: isRightSecondary
										? null
										: -Math.round(tween.slideAmount),
									overflow: 'auto',
									...rightPaneProps.style,
								}}
								ref={this.storeRef('rightPane')}
							>
								{rightPaneProps.children}
							</div>
						</div>
					)}
				</Motion>
			</div>
		);
	},
});

export default SplitVertical;
