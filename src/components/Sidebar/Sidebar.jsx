import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	createClass,
	filterTypes,
	findTypes,
	omitProps,
} from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';
import * as reducers from './Sidebar.reducers';
import SplitVertical from '../SplitVertical/SplitVertical';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import GripperVerticalIcon
	from '../Icon/GripperVerticalIcon/GripperVerticalIcon';

const cx = lucidClassNames.bind('&-Sidebar');

const {
	any,
	bool,
	func,
	node,
	number,
	string,
	object,
	oneOf,
	oneOfType,
} = PropTypes;

/**
 * {"categories": ["layout"]}
 *
 * `Sidebar` renders a collapsible, resizeable side bar panel next to primary content.
 */
const Sidebar = createClass({
	displayName: 'Sidebar',

	reducers,

	propTypes: {
		/**
		 * Style object that gets applied to the outer element.
		 */
		style: object,

		/**
		 * Appended to the component-specific class names set on the root
		 * element. Value is run through the `classnames` library.
		 */
		className: string,
		/**
		 * Direct children must be types {Sidebar.Primary, Sidebar.Bar, Sidebar.Title}.
		 * All content is composed as children of these respective elements.
		 */
		children: node,
		/**
		 * Sets the starting width of the Bar.
		 */
		width: oneOfType([number, string]),
		/**
		 * Force the Sidebar to be expanded or collapsed.
		 */
		isExpanded: bool,
		/**
		 * Allows animated expand and collapse behavior.
		 */
		isAnimated: bool,
		/**
		 * Render the Sidebar to the left or right of primary content.
		 */
		position: oneOf(['left', 'right']),
		/**
		 * Disable user resizing of the Sidebar.
		 */
		isResizeDisabled: bool,
		/**
		 * Set the title of the Sidebar. (alias for `Title` and `Sidebar.Title`)
		 */
		title: any,
		/**
		 * Set the title of the Sidebar. (alias for `title` and `Sidebar.Title`)
		 */
		Title: any,
		/**
		 * Called when the user is currently resizing the Sidebar.
		 *
		 * Signature: `(width, { event, props }) => {}`
		 */
		onResizing: func,
		/**
		 * Called when the user resizes the Sidebar.
		 *
		 * Signature: `(width, { event, props }) => {}`
		 */
		onResize: func,
		/**
		 * Called when the user expands or collapses the Sidebar.
		 *
		 * Signature: `({ event, props }) => {}`
		 */
		onToggle: func,
	},

	components: {
		/**
		 * Content to be placed alongside the Primary pane.
		 */
		Bar: createClass({
			displayName: 'Sidebar.Bar',
			propTypes: {
				/**
				 * Sidebar content. Also can define <Sidebar.Title> here as well.
				 */
				children: node,
				/**
				 * Set the title of the Sidebar. (alias for `Title` and `Sidebar.Title`)
				 */
				title: any,
				/**
				 * Set the title of the Sidebar. (alias for `title` and `Sidebar.Title`)
				 */
				Title: any,
				/**
				 * Adds default padding to the sidebar content.
				 */
				hasGutters: bool,
			},
			getDefaultProps() {
				return {
					hasGutters: true,
				};
			},
		}),

		/**
		 * Main pane content that will have a paired `Bar`.
		 */
		Primary: createClass({
			displayName: 'SplitVertical.Primary',
			propTypes: {
				/**
				 * Primary content rendered beside the Sidebar.
				 */
				children: node,
			},
		}),

		/**
		 * Content that will be displayed as the title of the Bar. It's only shown
		 * when the user has the Bar expanded.
		 */
		Title: createClass({
			displayName: 'Sidebar.Title',
			propName: ['Title', 'title'],
			propTypes: {
				/**
				 * Sidebar title.
				 */
				children: node,
			},
		}),
	},

	getDefaultProps() {
		return {
			isExpanded: true,
			isAnimated: true,
			width: 250,
			position: 'left',
			isResizeDisabled: false,
			onResizing: _.noop,
			onResize: _.noop,
			onToggle: _.noop,
		};
	},

	handleExpanderClick(event) {
		const { onToggle } = this.props;

		onToggle({ props: this.props, event });
	},

	handleResizing(width, { event }) {
		const { onResizing } = this.props;

		onResizing(width, { props: this.props, event });
	},

	handleResize(width, { event }) {
		const { onResize } = this.props;

		onResize(width, { props: this.props, event });
	},

	render() {
		const {
			children,
			style,
			className,
			isExpanded,
			isAnimated,
			position,
			isResizeDisabled,
			width,
			...passThroughs
		} = this.props;

		const primaryProps = _.get(
			_.first(filterTypes(children, Sidebar.Primary)),
			'props',
			{}
		); // props from first Primary
		const barProps = _.get(
			_.first(filterTypes(children, Sidebar.Bar)),
			'props',
			{}
		); // props from first Bar
		const titleProps = _.get(
			findTypes(barProps, Sidebar.Title).concat(
				findTypes(this.props, Sidebar.Title)
			), // get titles from Bar and parent Sidebar
			'[0].props', // select props from the first title element
			<Sidebar.Title>Title</Sidebar.Title>.props // default props
		);

		let PrimaryPane, BarPane; // using Left/Right Pane as primary depends on position
		if (position !== 'right') {
			PrimaryPane = SplitVertical.RightPane;
			BarPane = SplitVertical.LeftPane;
		} else {
			PrimaryPane = SplitVertical.LeftPane;
			BarPane = SplitVertical.RightPane;
		}

		return (
			<SplitVertical
				{...omitProps(passThroughs, Sidebar, [], false)}
				style={{
					minWidth: isExpanded
						? _.isNumber(width) ? width + 6 : `calc(${width} + 6px)`
						: null,
					...style,
				}}
				className={cx(
					'&',
					{
						'&-is-resize-disabled': isResizeDisabled,
						'&-is-position-right': position === 'right',
						'&-is-position-left': position !== 'right',
					},
					className
				)}
				isAnimated={isAnimated}
				isExpanded={isExpanded}
				collapseShift={33} // leave 33px of sidebar to stick out when collapsed
				onResizing={this.handleResizing}
				onResize={this.handleResize}
			>
				<BarPane
					{...omitProps(barProps, Sidebar.Bar, [], false)}
					className={cx('&-Bar', barProps.className)}
					width={width}
					style={{
						overflow: isExpanded ? 'auto' : 'hidden',
					}}
				>
					<div className={cx('&-Bar-overlay')} />
					<div className={cx('&-Bar-header')}>
						<div
							{...titleProps}
							className={cx('&-Bar-Title', titleProps.className)}
						/>
						<div
							className={cx('&-expander')}
							onMouseDown={this.handleExpanderClick}
						>
							<ChevronIcon
								direction={
									(isExpanded && position === 'right') ||
										(!isExpanded && position !== 'right')
										? 'right'
										: 'left'
								}
							/>
						</div>
					</div>
					<div
						className={cx('&-Bar-content', {
							'&-Bar-content-has-gutters': barProps.hasGutters,
						})}
					>
						{barProps.children}
					</div>
				</BarPane>
				<SplitVertical.Divider className={cx('&-Divider')} style={{ width: 7 }}>
					<GripperVerticalIcon className={cx('&-Divider-gripper')} />
				</SplitVertical.Divider>
				<PrimaryPane
					{...primaryProps}
					className={cx('&-Primary', primaryProps.className)}
					isPrimary
				/>
			</SplitVertical>
		);
	},
});

export default buildHybridComponent(Sidebar);
export { Sidebar as SidebarDumb };
