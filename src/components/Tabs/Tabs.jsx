import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import { bindClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import reducers from './Tabs.reducers';

const boundClassNames = bindClassNames('Tabs');

const {
	any,
	string,
	number,
	bool,
	func,
} = React.PropTypes;

/**
 *
 * {"categories": ["navigation"]}
 *
 * `Tabs` provides tabbed navigation. It has a flexible interface that allows
 * tab content to be passed as regular React children or through props.
 */
const Tabs = React.createClass(createLucidComponentDefinition({
	displayName: 'Tabs',

	childProps: {
		Tab: {
			isSelected: bool
		},
		Title: null, // we're only interested in children
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

		/**
		 * If `true` then the active tab will appear open on the bottom.
		 */
		isOpen: bool,
	},

	getDefaultProps() {
		return {
			selectedIndex: 0,
			onSelect: _.noop,
			isOpen: true,
		};
	},

	render() {
		const {
			className,
			onSelect,
			selectedIndex,
			style,
			isOpen,
			...passThroughs,
		} = this.props;

		const tabChildProps = Tabs.Tab.findInAllAsProps(this.props);
		const selectedIndexFromChildren = _.findLastIndex(tabChildProps, {
			isSelected: true
		});

		const actualSelectedIndex = selectedIndexFromChildren !== -1
			? selectedIndexFromChildren
			: selectedIndex;

		return (
			<div
				{...passThroughs}
				style={style}
				className={classNames(className, boundClassNames('~'))}
			>
				<ul className={boundClassNames('bar')}>
					{_.map(tabChildProps, (tabChildProp, index) => {
						return (
							<li
								className={boundClassNames('Tab', {
									'Tab-is-active': index === actualSelectedIndex,
									'Tab-is-active-and-open': isOpen && index === actualSelectedIndex
								})}
								key={index}
								onClick={_.partial(onSelect, index)}
							>
								{_.get(_.first(Tabs.Title.findInAllAsProps(tabChildProp)), 'children', '')}
							</li>
						);
					})}
				</ul>
				<div className={boundClassNames('content')}>
					{_.get(tabChildProps[actualSelectedIndex], 'children', '')}
				</div>
			</div>
		);
	}
}));

export default Tabs;
