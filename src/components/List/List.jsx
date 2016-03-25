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
	node,
	object,
} = React.PropTypes;

/**
 * {"categories": ["layout", "list"]}
 *
 * This component is designed to be used in Composits as a layout tool.
 * Please see examples for more information.
 */
const List = React.createClass(createLucidComponentDefinition({
	displayName: 'List',

	propTypes: {
		/**
		 * `children` .
		 */
		children: node,
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/**
		 * Passed through to the root element.
		 */
		style: object,

		/**
		 * Indicates which of the `List.ListItem` children is currently selected. The
		 * index of the last `List.ListItem` child with `isSelected` equal to `true`
		 * takes precedence over this prop.
		 */
		selectedIndex: number,

		/**
		 * Indicates whether the List should appear and act disabled by
		 * having a "greyed out" palette and ignoring user interactions.
		 * defaults to `false`
		 */
		isDisabled: bool,

		/**
		 * Indicates that the primary axis the component should follow
		 * is the Y axis. defaults to `true`
		 */
		isVertical: bool,

		/**
		 * Indicates that this component uses the expander styling.
		 * Defaults to `false`
		 */
		hasExpander: bool,
	},

	childProps: {
		ListItem: {
			/**
			 * `children` can include additional nested lists.
			 */
			children: node,
			/**
			 * Appended to the component-specific class names set on the root element.
			 */
			className: string,
			/**
			 * Passed through to the root element.
			 */
			style: object,

			/**
			 * Indicates whether the nested Lists will render or not. Defaults to `true`.
			 */
			isExpanded: bool,

			/**
			 * If `true` then the active ListItem will be selected.
			 */
			isSelected: bool,

			/**
			 * Callback for when the user clicks a sublist. Called with the index of the
			 * list that was clicked.
			 */
			onSelect: func,

			/**
			 * Indicates whether the ListItem should appear and act disabled by
			 * having a "greyed out" palette and ignoring user interactions.
			 */
			isDisabled: bool,
		}
	},


	getDefaultProps() {
		return {
			isDisabled: false,
			isVertical: true,
			hasExpander: false,
		};
	},

	render() {
		const {
			children,
			className,
			style,
			isExpanded,
			selectedIndex,
			isDisabled,
			isVertical,
			hasExpander,
			...passThroughs
		} = this.props;

		const listItemDefaultProps = {
			isSelected: false,
			isDisabled: false,
		}
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
					'&-has-expander' : hasExpander
				}, className)}
				style={style} >
				{_.map(listChildProps, (listChildProp, index) => {
					const hasChildList = _.isArray(listChildProp.children);
					listChildProp = _.defaults({}, listChildProp, {
						isSelected: false,
						isExpanded: true,
						onSelect: _.noop,
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
								'&-ListItem-is-selected': listChildProp.isSelected,
								'&-ListItem-is-disabled' : listChildProp.isDisabled,
							}, className)} >
							{hasChildList?
								<a>
									{ listChildProp.children[0]}
									{hasExpander?
										<Button
											className='lucid-List-expander'
											size='short'>
											<CaretIcon direction={isExpanded?'up':'down'} openIcon />
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
