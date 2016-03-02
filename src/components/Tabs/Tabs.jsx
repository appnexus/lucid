import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import { bindClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import reducers from './Tabs.reducers';

const boundClassNames = bindClassNames('Tabs');

const {
	any,
	node,
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
	childProps: {
		Tab: {
			Title: node, // TODO: can this be a proper child component itself?
			isSelected: bool,
		}
	},

	reducers,

	propTypes: {
		/**
		 * Styles that are passed through to the root container.
		 */
		style: any,

		/**
		 * While you can pass tab content through this prop, it's better to use the
		 * child component instead. See the examples for details.
		 */
		Tab: any,

		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,

		/**
		 * Index of the currently selected tab.
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
		hasOpenTabs: bool,
	},

	getDefaultProps() {
		return {
			style: null,
			className: null,
			selectedIndex: 0,
			onSelect: _.noop,
			hasOpenTabs: true,
		};
	},

	render() {
		const {
			className,
			onSelect,
			selectedIndex,
			style,
			hasOpenTabs,
			...passThroughs,
		} = this.props;

		const tabChildProps = Tabs.Tab.findInAllAsProps(this.props);

		const rootClasses = classNames(className, boundClassNames('~'));

		return (
			<div
				{...passThroughs}
				style={style}
				className={rootClasses}
			>
				<ul className={boundClassNames('bar')}>
					{_.map(tabChildProps, (tabChildProp, index) => {
						return (
							<li
								className={boundClassNames('bar-item', {
									'bar-item-is-active': index === selectedIndex
								})}
								key={index}
								onClick={_.partial(onSelect, index)}
							>
								<div className={boundClassNames('bar-spacer', {
									'bar-spacer-is-active': index === selectedIndex,
									'bar-spacer-is-first': index === 0,
								})} />
								<div className={boundClassNames('bar-content', {
									'bar-content-is-open': hasOpenTabs && index === selectedIndex,
									'bar-content-is-first': index === 0,
								})}>
									{tabChildProp.Title}
								</div>
							</li>
						)
					})}
				</ul>
				<div>
					{tabChildProps[selectedIndex].children}
				</div>
			</div>
		);
	}
}));

export default Tabs;
