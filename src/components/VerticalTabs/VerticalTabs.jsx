import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, getFirst, findTypes, omitProps } from '../../util/component-types';
import reducers from './VerticalTabs.reducers';
import VerticalListMenu from '../VerticalListMenu/VerticalListMenu';

const cx = lucidClassNames.bind('&-VerticalTabs');

const {
	any,
	string,
	number,
	bool,
	func,
} = React.PropTypes;

/**
 *
 * {"categories": ["navigation"], "madeFrom": ["VerticalListMenu"]}
 *
 * `Tabs` provides tabbed navigation. It has a flexible interface that allows
 * tab content to be passed as regular React children or through props.
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
		 * Styles that are passed through to the root container.
		 */
		style: any,

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
	},

	getDefaultProps() {
		return {
			selectedIndex: 0,
			onSelect: _.noop,
		};
	},

	render() {
		const {
			className,
			selectedIndex,
			style,
			...passThroughs,
		} = this.props;

		// Grab props array from each Tab
		const tabChildProps = _.map(findTypes(this.props, VerticalTabs.Tab), 'props');

		const selectedIndexFromChildren = _.findLastIndex(tabChildProps, {
			isSelected: true,
		});

		const actualSelectedIndex = selectedIndexFromChildren !== -1
			? selectedIndexFromChildren
			: selectedIndex;

		return (
			<div
				{...omitProps(passThroughs, VerticalTabs)}
				style={style}
				className={cx('&', className)}
			>
				<VerticalListMenu
					selectedIndices={[actualSelectedIndex]}
				>
					{_.map(tabChildProps, (tabChildProp, index) => {
						return (
							<VerticalListMenu.Item
								className={cx('&-Tab')}
								key={index}
								onSelect={_.partial(this.handleClicked, index, tabChildProp)}
							>
								<span className={cx('&-Tab-content')}>{_.get(getFirst(tabChildProp, VerticalTabs.Title), 'props.children', '')}</span>
							</VerticalListMenu.Item>
						);
					})}
				</VerticalListMenu>
				<div className={cx('&-content')}>
					{_.get(tabChildProps[actualSelectedIndex], 'children', '')}
				</div>
			</div>
		);
	},

	handleClicked(index, tabProps, event) {
		const {
			onSelect,
		} = this.props;

		onSelect(index, { event, props: tabProps });
	},
});

export default VerticalTabs;
