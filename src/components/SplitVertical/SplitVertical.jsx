import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, filterTypes, omitProps } from '../../util/component-types';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';

const cx = lucidClassNames.bind('&-SplitVertical');

const {
	any,
	bool,
	func,
	node,
	number,
	string,
	oneOfType,
} = React.PropTypes;

/**
 * {"categories": ["helpers"]}
 *
 * `SplitVertical` renders a vertical split.
 */
const SplitVertical = createClass({
	displayName: 'SplitVertical',

	_lucidIsPrivate: true,

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
		 * Render as expanded or collapsed.
		 */
		isExpanded: bool,
		/**
		 * Allows animated expand and collapse behavior.
		 */
		isAnimated: bool,
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
			getDefaultProps(){
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
			getDefaultProps(){
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
			onResize: _.noop,
		};
	},

	getInitialState() {
		return {
			isAnimated: false, // to ensure first render doesn't show a collapse animation
		};
	},

	getPanes() {
		const { children } = this.props;
		const {
			leftPane: leftPaneRef,
			rightPane: rightPaneRef,
		} = this.refs;

		const leftPaneElement = _.get(filterTypes(children, SplitVertical.LeftPane), 0, <SplitVertical.LeftPane />)
		const rightPaneElement = _.get(filterTypes(children, SplitVertical.RightPane), 0, <SplitVertical.RightPane />)
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
	applyDeltaToSecondaryWidth(dX, isExpanded, secondaryStartRect, secondaryRef, secondary, right, innerRef, primaryRef, collapseShift=0) {
		if (isExpanded) {
			secondaryRef.style.flexBasis = `${secondaryStartRect.width + dX * (secondary === right ? -1 : 1)}px`;
			return (secondaryStartRect.width + dX * (secondary === right ? -1 : 1));
		} else {
			const overlapWidth = (secondary === right ? secondaryStartRect.width + dX : secondaryStartRect.width - dX) - collapseShift;

			if (overlapWidth > 0) {
				this.collapseSecondary(innerRef, secondary, right, primaryRef, overlapWidth);
				return (secondaryStartRect.width - overlapWidth);
			} else {
				this.expandSecondary(innerRef, secondary, right, primaryRef);
				secondaryRef.style.flexBasis = `${(dX + collapseShift) * (secondary === right ? -1 : 1)}px`;
				return ((dX + collapseShift) * (secondary === right ? -1 : 1));
			}
		}
	},

	expandSecondary(innerRef, secondary, right, primaryRef) {
		innerRef.style.transform = 'translateX(0)';
		if (secondary === right) {
			primaryRef.style.marginLeft = '0';
		} else{
			primaryRef.style.marginRight = '0';
		}
	},

	collapseSecondary(innerRef, secondary, right, primaryRef, collapseAmount) {
		if (secondary === right) {
			innerRef.style.transform = `translateX(${collapseAmount}px)`;
			primaryRef.style.marginLeft = `${-collapseAmount}px`;
		} else {
			innerRef.style.transform = `translateX(${-collapseAmount}px)`;
			primaryRef.style.marginRight = `${-collapseAmount}px`;
		}
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
		this.disableAnimation(this.refs.inner, secondaryRef, primaryRef);
	},

	handleDrag({ dX }) {
		const {
			isExpanded,
			collapseShift,
		} = this.props;

		const {
			secondaryRef,
			secondary,
			right,
			primaryRef,
		} = this.panes;

		this.applyDeltaToSecondaryWidth(dX, isExpanded, this.secondaryStartRect, secondaryRef, secondary, right, this.refs.inner, primaryRef, collapseShift);
	},

	handleDragEnd({ dX }, { event }) {
		const {
			isExpanded,
			collapseShift,
			onResize,
		} = this.props;

		const {
			secondaryRef,
			secondary,
			right,
			primaryRef,
		} = this.panes;

		onResize(
			this.applyDeltaToSecondaryWidth(dX, isExpanded, this.secondaryStartRect, secondaryRef, secondary, right, this.refs.inner, primaryRef, collapseShift),
			{ props: this.props, event }
		);

		this.resetAnimation(this.refs.inner, secondaryRef, primaryRef);
	},

	componentWillReceiveProps(nextProps) {
		const {
			isAnimated,
			isExpanded,
			collapseShift,
		} = nextProps;

		const {
			primaryRef,
			secondaryRef,
			secondary,
			right,
		} = this.getPanes();

		if (this.props.isExpanded && !isExpanded) { // collapse secondary
			const secondaryRect = secondaryRef.getBoundingClientRect();
			this.collapseSecondary(this.refs.inner, secondary, right, primaryRef, secondaryRect.width - collapseShift);
		} else if (!this.props.isExpanded && isExpanded) { // expand secondary
			this.expandSecondary(this.refs.inner, secondary, right, primaryRef);
		}

		if (this.state.isAnimated !== isAnimated) {
			this.setState({
				isAnimated,
			});
		}
	},

	componentDidMount() {
		const {
			isExpanded,
			isAnimated,
			collapseShift,
		} = this.props;

		const {
			primaryRef,
			secondaryRef,
			secondary,
			right,
		} = this.getPanes();

		const {
			inner,
		} = this.refs;

		_.defer(() => {
			if (!isExpanded) { // collapse secondary
				const secondaryRect = secondaryRef.getBoundingClientRect();
				this.collapseSecondary(inner, secondary, right, primaryRef, secondaryRect.width - collapseShift);
			}
			this.disableAnimation(inner, secondaryRef, primaryRef);

			_.defer(() => {
				if (isAnimated) {
					this.setState({ isAnimated });
				}
				this.resetAnimation(inner, secondaryRef, primaryRef);
			});
		});
	},

	render() {
		const {
			children,
			className,
			isExpanded,
			...passThroughs,
		} = this.props;

		const {
			isAnimated,
		} = this.state;

		const {
			left: leftPaneProps,
			right: rightPaneProps,
			secondary,
		} = this.getPanes();

		const dividerProps = _.get(_.first(filterTypes(children, SplitVertical.Divider)), 'props', {});

		return (
			<div
				{...omitProps(passThroughs, SplitVertical)}
				className={cx('&', {
					'&-is-expanded': isExpanded,
					'&-is-animated': isAnimated,
				}, className)}
			>
				<div className={cx('&-inner')} ref='inner'>
					<div
						{...omitProps(leftPaneProps, SplitVertical.LeftPane)}
						className={cx('&-LeftPane', {
							'&-is-secondary': leftPaneProps === secondary,
						}, leftPaneProps.className)}
						style={{
							flexBasis: _.isNil(leftPaneProps.width) ? (leftPaneProps === secondary ? 'calc(50% - 3px)' : null) : leftPaneProps.width,
							...leftPaneProps.style,
						}}
						ref='leftPane'
					>{leftPaneProps.children}</div>
					<DragCaptureZone
						{...omitProps(dividerProps, SplitVertical.Divider)}
						className={cx('&-Divider', dividerProps.className)}
						onDragStart={this.handleDragStart}
						onDrag={this.handleDrag}
						onDragEnd={this.handleDragEnd}
					>{dividerProps.children || ' '}</DragCaptureZone>
					<div
						{...omitProps(rightPaneProps, SplitVertical.RightPane)}
						className={cx('&-RightPane', {
							'&-is-secondary': rightPaneProps === secondary,
						}, rightPaneProps.className)}
						style={{
							flexBasis: _.isNil(rightPaneProps.width) ? (rightPaneProps === secondary ? 'calc(50% - 3px)' : null) : rightPaneProps.width,
							...rightPaneProps.style,
						}}
						ref='rightPane'
					>{rightPaneProps.children}</div>
				</div>
			</div>
		);
	},
});

export default SplitVertical;
