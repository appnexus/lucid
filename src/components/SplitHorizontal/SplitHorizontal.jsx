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

const cx = lucidClassNames.bind('&-SplitHorizontal');

const { any, bool, func, node, number, string, oneOfType } = PropTypes;

/**
 * {"categories": ["helpers"], "madeFrom": ["DragCaptureZone"]}
 *
 * `SplitHorizontal` renders a vertical split.
 */
const SplitHorizontal = createClass({
	displayName: 'SplitHorizontal',

	_isPrivate: true,

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element. Value is run through the `classnames` library.
		 */
		className: any,
		/**
		 * Direct children must be types {Splitvertical.Toppane, Splitvertical.Divider, Splitvertical.BottomPane}.
		 * All content is composed as children of these respective elements.
		 */
		children: node,
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
		 * Signature: `(height, { event, props }) => {}`
		 */
		onResizing: func,
		/**
		 * Called when the user resizes the split with the Divider.
		 *
		 * Signature: `(height, { event, props }) => {}`
		 */
		onResize: func,
		/**
		 * Use this prop to shift the collapsed position by a known value.
		 */
		collapseShift: number,
	},

	components: {
		/**
		 * Top pane of the split.
		 */
		TopPane: createClass({
			displayName: 'SplitHorizontal.TopPane',
			propTypes: {
				/**
				 * Any valid React children.
				 */
				children: node,
				/**
				 * Set height of this pane.
				 */
				height: oneOfType([number, string]),
				/**
				 * Define this pane as the primary content pane. When the split is collapsed, this pane becomes full height.
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
		 * Bottom pane of the split.
		 */
		BottomPane: createClass({
			displayName: 'SplitHorizontal.BottomPane',
			propTypes: {
				/**
				 * Any valid React children.
				 */
				children: node,
				/**
				 * Set height of this pane.
				 */
				height: oneOfType([number, string]),
				/**
				 * Define this pane as the primary content pane. When the split is collapsed, this pane becomes full height.
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
			displayName: 'SplitHorizontal.Divider',
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
		};
	},

	getInitialState() {
		return {
			collapseAmount: 250,
		};
	},

	getPanes() {
		const { children } = this.props;
		const { topPane: topPaneRef, bottomPane: bottomPaneRef } = this.storedRefs;

		const topPaneElement = _.get(
			filterTypes(children, SplitHorizontal.TopPane),
			0,
			<SplitHorizontal.TopPane />
		);
		const bottomPaneElement = _.get(
			filterTypes(children, SplitHorizontal.BottomPane),
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
	},

	// Style changes to DOM nodes are updated here to shortcut the state -> render cycle for better performance. Also the Style updates in this
	// function are entirely transient and can be flushed with a props update to `height`.
	applyDeltaToSecondaryHeight(
		dY,
		isExpanded,
		secondaryStartRect,
		secondaryRef,
		secondary,
		bottom,
		innerRef,
		primaryRef,
		collapseShift = 0
	) {
		if (isExpanded) {
			secondaryRef.style.flexBasis = `${secondaryStartRect.height + dY * (secondary === bottom ? -1 : 1)}px`;
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
				secondaryRef.style.flexBasis = `${(dY + collapseShift) * (secondary === bottom ? -1 : 1)}px`;
				return (dY + collapseShift) * (secondary === bottom ? -1 : 1);
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

	handleDrag({ dY }, { event }) {
		const { isExpanded, collapseShift, onResizing } = this.props;

		const { secondaryRef, secondary, bottom, primaryRef } = this.panes;

		onResizing(
			this.applyDeltaToSecondaryHeight(
				dY,
				isExpanded,
				this.secondaryStartRect,
				secondaryRef,
				secondary,
				bottom,
				this.storedRefs.inner,
				primaryRef,
				collapseShift
			),
			{ props: this.props, event }
		);
	},

	handleDragEnd({ dY }, { event }) {
		const { isExpanded, collapseShift, onResize } = this.props;

		const { secondaryRef, secondary, bottom, primaryRef } = this.panes;

		onResize(
			this.applyDeltaToSecondaryHeight(
				dY,
				isExpanded,
				this.secondaryStartRect,
				secondaryRef,
				secondary,
				bottom,
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
					this.collapseSecondary(secondaryRect.height - collapseShift);
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
		const { isAnimated, isExpanded } = this.props;
		this.storedRefs = {};

		this.setState({
			isAnimated,
			isExpanded,
		});
	},

	render() {
		const { children, className, ...passThroughs } = this.props;

		const { isAnimated, isExpanded, collapseAmount } = this.state;

		const {
			top: topPaneProps,
			bottom: bottomPaneProps,
			secondary,
		} = this.getPanes();

		const dividerProps = _.get(
			_.first(filterTypes(children, SplitHorizontal.Divider)),
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
				{...omitProps(passThroughs, SplitHorizontal)}
				className={cx(
					'&',
					{
						'&-is-expanded': isExpanded,
						'&-is-animated': isAnimated,
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
							? _.mapValues(to, val => spring(val, QUICK_SLIDE_MOTION))
							: to
					}
				>
					{tween => (
						<div
							className={cx('&-inner')}
							ref={this.storeRef('inner')}
							style={{
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								transform: `translateY(${(isBottomSecondary ? 1 : -1) * Math.round(tween.slideAmount)}px)`,
							}}
						>
							<div
								{...omitProps(topPaneProps, SplitHorizontal.TopPane)}
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
										? topPaneProps === secondary ? 'calc(50% - 3px)' : '0%'
										: topPaneProps.height,
									marginTop: isBottomSecondary
										? -Math.round(tween.slideAmount)
										: null,
									overflow: 'auto',
									...topPaneProps.style,
								}}
								ref={this.storeRef('topPane')}
							>
								{topPaneProps.children}
							</div>
							<DragCaptureZone
								{...omitProps(dividerProps, SplitHorizontal.Divider, [], false)}
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
								{...omitProps(bottomPaneProps, SplitHorizontal.BottomPane)}
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
										? bottomPaneProps === secondary ? 'calc(50% - 3px)' : '0%'
										: bottomPaneProps.height,
									marginBottom: isBottomSecondary
										? null
										: -Math.round(tween.slideAmount),
									overflow: 'auto',
									...bottomPaneProps.style,
								}}
								ref={this.storeRef('bottomPane')}
							>
								{bottomPaneProps.children}
							</div>
						</div>
					)}
				</Motion>
			</div>
		);
	},
});

export default SplitHorizontal;
