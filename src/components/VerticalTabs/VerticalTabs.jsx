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
import * as reducers from './VerticalTabs.reducers';
import {
	VerticalListMenuDumb as VerticalListMenu,
} from '../VerticalListMenu/VerticalListMenu';

const cx = lucidClassNames.bind('&-VerticalTabs');

const { string, number, bool, func } = PropTypes;

/**
 *
 * {"categories": ["navigation"], "madeFrom": ["VerticalListMenu"]}
 *
 * `VerticalTabs` provides vertically tabbed navigation. It has a flexible
 * interface that allows tab content to be passed as regular React children or
 * through props.
 */
const VerticalTabs = createClass({
	displayName: 'VerticalTabs',

	components: {
		/**
		 * Content that will be rendered in a tab. Be sure to nest a Title inside
		 * each Tab or provide it as a prop.
		 */
		Tab: createClass({
			displayName: 'VerticalTabs.Tab',
			propName: 'Tab',
			propTypes: {
				/**
				 * Determines if the Tab is selected.
				 */
				isSelected: bool,
			},
		}),
		/**
		 * Titles can be provided as a child or prop to a Tab.
		 */
		Title: createClass({
			displayName: 'VerticalTabs.Title',
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
		 * Indicates which of the `VerticalTabs.Tab` children is currently
		 * selected. The index of the last `VerticalTabs.Tab` child with
		 * `isSelected` equal to `true` takes precedence over this prop.
		 */
		selectedIndex: number,

		/**
		 * Callback for when the user clicks a tab. Called with the index of the
		 * tab that was clicked.
		 *
		 * Signature: `(index, { event, props}) => {}`
		 */
		onSelect: func,
	},

	getDefaultProps() {
		return {
			selectedIndex: 0,
			onSelect: _.noop,
		};
	},

	render() {
		const { className, onSelect, selectedIndex, ...passThroughs } = this.props;

		// Grab props array from each Tab
		const tabChildProps = _.map(
			findTypes(this.props, VerticalTabs.Tab),
			'props'
		);

		const selectedIndexFromChildren = _.findLastIndex(tabChildProps, {
			isSelected: true,
		});

		const actualSelectedIndex = selectedIndexFromChildren !== -1
			? selectedIndexFromChildren
			: selectedIndex;

		return (
			<div
				{...omitProps(passThroughs, VerticalTabs)}
				className={cx('&', className)}
			>
				<VerticalListMenu
					selectedIndices={[actualSelectedIndex]}
					onSelect={onSelect}
				>
					{_.map(tabChildProps, (tabChildProp, index) => (
						<VerticalListMenu.Item
							className={cx('&-Tab', {
								'&-Tab-is-active': actualSelectedIndex === index,
							})}
							key={index}
						>
							<span className={cx('&-Tab-content')}>
								{_.get(
									getFirst(tabChildProp, VerticalTabs.Title),
									'props.children',
									''
								)}
							</span>
						</VerticalListMenu.Item>
					))}
				</VerticalListMenu>
				<div className={cx('&-content')}>
					{_.get(tabChildProps, [actualSelectedIndex, 'children'])}
				</div>
			</div>
		);
	},
});

export default buildHybridComponent(VerticalTabs);
export { VerticalTabs as VerticalTabsDumb };
