import _ from 'lodash';
import React from 'react';
import { bindClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition }  from '../../util/component-definition';
import Button from '../Button/Button';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';

const boundClassNames = bindClassNames('lucid-List');

const {
	func,
	bool,
	any,
	string,
	number,
} = React.PropTypes;

/**
 * {"categories": ["layout", "list"]}
 *
 * This component is designed to be used in Composits as a layout tool.
 * Please see examples for more information.
 */
const List = React.createClass(createLucidComponentDefinition({
	displayName: 'List',

	childProps: {
		ListItem: {
			/**
			 * Class names that are appended to the defaults.
			 */
			className: string,

			/**
			 * If `true` then the active list will be selected.
			 */
			isSelected: bool,

			/**
			 * Callback for when the user clicks a sublist. Called with the index of the
			 * list that was clicked.
			 */
			onSelect: func,

			/**
			 * If `true` then the active list will appear open.
			 */
			isOpen: bool,

			/**
			 * Indicates whether the component should appear and act disabled by
			 * having a "greyed out" palette and ignoring user interactions.
			 */
			isDisabled: bool,
		}
	},

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
		 * Indicates which of the `List.ListItem` children is currently selected. The
		 * index of the last `List.ListItem` child with `isSelected` equal to `true`
		 * takes precedence over this prop.
		 */
		selectedIndex: number,

		/**
		* Styles a tab as disabled.  This typically used with `isProgressive` to
		* to disabled steps that have not been compleated and should not be
		* selected until the current step has been compleated.
		*/
		isDisabled: bool,

		/**
		 * Indicates that this component follows the Y axis by default.
		 */
		isVertical: bool,

		/**
		 * Indicates that this component uses the expander styling
		 */
		hasExpander: bool,
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isVertical: true,
			hasExpander: false
		};
	},

	render() {
		const {
			isVertical,
			isDisabled,
			selectedIndex,
			hasExpander,
			isOpen,
			className,
			style,
			children,
			...passThroughs
		} = this.props;

		const listChildProps = List.ListItem.findInAllAsProps(this.props);
		const selectedIndexFromChildren = _.findLastIndex(listChildProps, {
			isSelected: true,
		});
		const actualSelectedIndex = selectedIndexFromChildren !== -1
			? selectedIndexFromChildren
			: selectedIndex;

		return (
			<ul {...passThroughs}
				className={boundClassNames('&', {
					'&-is-alignedOnX': isVertical === false,
					'&-is-disabled'  : isDisabled,
					'&-is-selected'  : isOpen,
					'&-has-expander' : hasExpander
				}, className)}
				style={style} >
				{_.map(listChildProps, (listChildProp, index) => {
					const hasChildList = _.isArray(listChildProp.children);
					listChildProp = _.defaults({}, listChildProp, {
						isSelected: false,
						onSelect: _.noop,
						isOpen: true,
						isDisabled: false
					});

					return (
						<li {...listChildProp.passThroughs}
							key={index}
							onClick={this.handleClicked}
							onTouchEnd={this.handleClicked}
							className={boundClassNames('&-ListItem', {
								'&-ListItem-is-parent' : hasChildList,
								'&-ListItem-is-active': index === actualSelectedIndex,
								'&-ListItem-is-open': isOpen,
							}, className)} >
							{hasChildList?
								<a>
									{ listChildProp.children[0]}
									{hasExpander?
										<Button
											className='lucid-List-expander'
											size='short'>
											<CaretIcon direction={isOpen?'up':'down'} openIcon />
										</Button>
										: null
									}
								</a>
								:
								<a>{listChildProp.children}</a>
							}
							{hasChildList? _.slice(listChildProp.children, 1) : null}
						</li>
					)
				})}
				{children}
			</ul>
		);
	},

	handleClicked(event) {
		const {
			isDisabled,
			isOpen,
			onSelect,
		} = this.props;

		event.preventDefault();

		if (!isDisabled && !isOpen) {
			onSelect(true, { event, props: this.props });

		}
	}

}));

export default List;
