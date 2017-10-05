import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	createClass,
	getFirst,
	findTypes,
	omitProps,
} from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';
import * as reducers from './Tabs.reducers';

const cx = lucidClassNames.bind('&-Tabs');

const { any, bool, func, node, number, string } = PropTypes;

/**
 *
 * Content that will be rendered in a tab. Be sure to nest a Title inside
 * each Tab or provide it as a prop. Props other than `isDisabled`, `isSelected`,
 * and `Title` can be inferred from the parent `Tabs` component, but directly
 * provided `props` will take precedence.
 */
const Tab = createClass({
	displayName: 'Tabs.Tab',

	propName: 'Tab',

	propTypes: {
		/**
		 * The index of this `Tab` within the list of `Tabs`.
		 */
		index: number,

		/**
		 * Styles a `Tab` as disabled. This is typically used with
		 * `isProgressive` to disable steps that have not been completed
		 * and should not be selected until the current step has been
		 * completed.
		 */
		isDisabled: bool,

		/**
		 * If `true`, this `Tab` is the last `Tab` in the list of `Tabs`.
		 */
		isLastTab: bool,

		/**
		 * If `true` then the active `Tab` will appear open on the bottom.
		 */
		isOpen: bool,

		/**
		 * If `true`, the `Tab` will appear as a `Progressive` tab.
		 */
		isProgressive: bool,

		/**
		 * If `true`, the `Tab` will appear selected.
		 */
		isSelected: bool,

		/**
		 * Callback for when the user clicks a `Tab`. Called with the index of the
		 * `Tab` that was clicked.
		 */
		onSelect: func,

		/**
		 * The content to be rendered as the `Title` of the `Tab`.
		 */
		Title: node,

		/**
		 * If `true` component will be styled to be more visually prominent for use with page-level navigation.
		 */
		isNavigation: bool,
	},

	handleClick(event) {
		const { props, props: { index, onSelect, ...passThroughs } } = this;

		if (!props.isDisabled) {
			onSelect(index, passThroughs, event);
		}
	},

	render() {
		const {
			isDisabled,
			isLastTab,
			isOpen,
			isProgressive,
			isSelected,
			Title,
			isNavigation,
			...passThroughs
		} = this.props;

		return (
			<li
				className={cx('&-Tab', {
					'&-Tab-is-active': isSelected,
					'&-Tab-is-disabled': isDisabled,
					'&-Tab-is-active-and-open': isOpen && isSelected,
					'&-Tab-is-progressive': isProgressive && !isLastTab,
				})}
				onClick={this.handleClick}
				{...passThroughs}
			>
				<span className={cx('&-Tab-content')}>{Title}</span>
				{isProgressive &&
					!isLastTab &&
					<span className={cx('&-Tab-arrow')}>
						<svg
							className={cx('&-Tab-arrow-svg')}
							viewBox={isNavigation ? '0 0 8 37' : '0 0 8 28'}
						>
							<polygon
								className={cx('&-Tab-arrow-background')}
								fill="#fff"
								points={isNavigation ? '0,0 8,18.5 0,37' : '0,0 8,14 0,28'}
							/>
							<polyline
								className={cx('&-Tab-arrow-tab-line')}
								fill="#fff"
								points="0,0 1,1 0,1"
							/>
							<polyline
								className={cx('&-Tab-arrow-line')}
								fill="none"
								stroke="#fff"
								strokeWidth="1"
								points={isNavigation ? '0,37 7.3,18.5 0,0' : '0,28 7.9,14 0,0'}
							/>
						</svg>
					</span>}
			</li>
		);
	},
});

/**
 *
 * {"categories": ["navigation"]}
 *
 * `Tabs` provides tabbed navigation. It has a flexible interface that allows
 * tab content to be passed as regular React children or through props.
 */
const Tabs = createClass({
	displayName: 'Tabs',

	components: {
		Tab,
		/**
		 * Titles can be provided as a child or prop to a Tab.
		 */
		Title: createClass({
			displayName: 'Tabs.Title',
			propName: 'Title',
		}),
	},

	reducers,

	propTypes: {
		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,

		/**
		 * Indicates which of the `Tabs.Tab` children is currently selected. The
		 * index of the last `Tabs.Tab` child with `isSelected` equal to `true`
		 * takes precedence over this prop.
		 */
		selectedIndex: number,

		/**
		 * Callback for when the user clicks a tab. Called with the index of the
		 * tab that was clicked.
		 */
		onSelect: func,

		/**
		 * If `true` then the active tab will appear open on the bottom.
		 */
		isOpen: bool,

		/**
		 * Style the tabs as a progression. This is typically used for a work flow
		 * where the user needs to move forward and backward through a series of
		 * steps.
		 */
		isProgressive: bool,

		/**
		 * Set the multiline className. This is typically used for styling the Tab.Title bar
		 * for improved readability when there are multiple React elements in the tab headers.
		 */
		hasMultilineTitle: bool,

		/**
		 *  If `true` the width will be evenly distributed to all tabs.  `False` typically used in conjunction with `Tab.width`
		 */
		hasFullWidthTabs: bool,

		/**
		 * If `true` component will be styled to be more visually prominent for use with page-level navigation.
		 */
		isNavigation: bool,

		/**
		 * *Child Element*
		 *
		 * Can be used to define one or more individual `Tab`s in the sequence of `Tabs`.
		 *
		 */
		Tab: any,
	},

	getDefaultProps() {
		return {
			selectedIndex: 0,
			onSelect: _.noop,
			isOpen: true,
			isProgressive: false,
			hasMultilineTitle: false,
			hasFullWidthTabs: true,
			isNavigation: false,
		};
	},

	handleClicked(index, tabProps, event) {
		const { onSelect } = this.props;

		onSelect(index, { event, props: tabProps });
	},

	render() {
		const {
			className,
			hasMultilineTitle,
			isOpen,
			isProgressive,
			selectedIndex,
			hasFullWidthTabs,
			isNavigation,
			...passThroughs
		} = this.props;

		// Grab props array from each Tab
		const tabChildProps = _.map(findTypes(this.props, Tab), 'props');

		const selectedIndexFromChildren = _.findLastIndex(tabChildProps, {
			isSelected: true,
		});

		const actualSelectedIndex = selectedIndexFromChildren !== -1
			? selectedIndexFromChildren
			: selectedIndex;

		return (
			<div {...omitProps(passThroughs, Tabs)} className={cx('&', className)}>
				<ul
					className={cx('&-bar', {
						'&-bar-is-multiline': hasMultilineTitle,
						'&-variable-width': !hasFullWidthTabs,
						'&-navigation-tabs': isNavigation,
					})}
				>
					{_.map(tabChildProps, (tabProps, index) => (
						<Tab
							key={index}
							index={index}
							isLastTab={index === tabChildProps.length - 1}
							isOpen={isOpen}
							isProgressive={isProgressive}
							isNavigation={isNavigation}
							isSelected={index === actualSelectedIndex}
							onSelect={this.handleClicked}
							Title={_.get(
								getFirst(tabProps, Tabs.Title),
								'props.children',
								''
							)}
							{...tabProps}
						/>
					))}
				</ul>
				<div className={cx('&-content')}>
					{_.get(tabChildProps, [actualSelectedIndex, 'children'])}
				</div>
			</div>
		);
	},
});

export default buildHybridComponent(Tabs);
export { Tabs as TabsDumb };
