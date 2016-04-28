import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-definition';
import reducers from './Tabs.reducers';

const boundClassNames = lucidClassNames.bind('&-Tabs');

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
const Tabs = createClass({
	displayName: 'Tabs',

	childProps: {
		Tab: {
			isSelected: bool,
			/**
			* Styles a tab as disabled.  This typically used with `isProgressive` to
			* to disabled steps that have not been compleated and should not be
			* selected until the current step has been compleated.
			*/
			isDisabled: bool,
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

		/**
		 * Style the tabs as a progression. This is typically used for a work flow
		 * where the user needs to move forward and backward through a series of
		 * steps.
		 */
		isProgressive: bool,
	},

	getDefaultProps() {
		return {
			selectedIndex: 0,
			onSelect: _.noop,
			isOpen: true,
			isProgressive: false,
		};
	},

	render() {
		const {
			className,
			onSelect,
			selectedIndex,
			style,
			isOpen,
			isProgressive,
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
				className={boundClassNames('&', className)}
			>
				<ul className={boundClassNames('&-bar')}>
					{_.map(tabChildProps, (tabChildProp, index) => {
						return (
							<li
								className={boundClassNames('&-Tab', {
									'&-Tab-is-active': index === actualSelectedIndex,
									'&-Tab-is-disabled': tabChildProp.isDisabled,
									'&-Tab-is-active-and-open': isOpen && index === actualSelectedIndex,
									'&-Tab-is-progressive': isProgressive && index !== tabChildProps.length - 1,
								})}
								key={index}
								onClick={_.partial(onSelect, index, tabChildProp)}
							>
								{_.get(_.first(Tabs.Title.findInAllAsProps(tabChildProp)), 'children', '')}
								{isProgressive && index !== tabChildProps.length - 1 ?
									<svg className={boundClassNames('&-Tab-arrow')} xmlns='http://www.w3.org/2000/svg' width='8px' height='28px' viewBox='0 0 8 28' >
										<polygon className={boundClassNames('&-Tab-arrow-background')} fill='#fff' points='0,0 8,14 0,28'/>
										<polyline className={boundClassNames('&-Tab-arrow-tab-line')} fill='#fff' points='0,0 1.7,3 0,3'/>
										<polyline className={boundClassNames('&-Tab-arrow-line')} fill='none' stroke='#fff' strokeWidth='1' points='0,28 7.9,14 0,0'/>
									</svg>
								: null}
							</li>
						);
					})}
				</ul>
				<div className={boundClassNames('&-content')}>
					{_.get(tabChildProps[actualSelectedIndex], 'children', '')}
				</div>
			</div>
		);
	}
});

export default Tabs;
