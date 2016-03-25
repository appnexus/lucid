import _ from 'lodash';
import React from 'react';
import { bindClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition }  from '../../util/component-definition';
import Button from '../Button/Button';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';
import * as reducers from './List.reducers';

const boundClassNames = bindClassNames('lucid-List');

const {
	func,
	arrayOf,
	bool,
	string,
	number,
	node,
	object,
} = React.PropTypes;

/**
 * {"categories": ["layout"]}
 *
 * This component is designed to be used in Composits as a layout tool.
 * Please see examples for more information.
 */
const List = React.createClass(createLucidComponentDefinition({
	displayName: 'List',

	reducers,

	childProps: {
		Item: {
			hasExpander: bool,
			isExpanded: bool,
			isSelected: bool,
			onSelect: func,
			onExpand: func,
		}
	},

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
		selectedIndices: arrayOf(number),

		/**
		 * TODO
		 */
		expandedIndices: arrayOf(number),

		/**
		 * TODO
		 */
		onSelect: func,

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
		onExpand: func,
	},

	// childProps: {
	// 	ListItem: {
	// 		/**
	// 		 * `children` can include additional nested lists.
	// 		 */
	// 		children: node,
	// 		/**
	// 		 * Appended to the component-specific class names set on the root element.
	// 		 */
	// 		className: string,
	// 		/**
	// 		 * Passed through to the root element.
	// 		 */
	// 		style: object,

	// 		/**
	// 		 * Indicates whether the nested Lists will render or not. Defaults to `true`.
	// 		 */
	// 		isExpanded: bool,

	// 		/**
	// 		 * If `true` then the active ListItem will be selected.
	// 		 */
	// 		isSelected: bool,

	// 		/**
	// 		 * Callback for when the user clicks a sublist. Called with the index of the
	// 		 * list that was clicked.
	// 		 */
	// 		onSelect: func,

	// 		/**
	// 		 * Indicates whether the ListItem should appear and act disabled by
	// 		 * having a "greyed out" palette and ignoring user interactions.
	// 		 */
	// 		isDisabled: bool,
	// 	}
	// },

	getDefaultProps() {
		return {
			onSelect: _.noop,
			onExpand: _.noop,
			isDisabled: false,
			isVertical: true,
			expandedIndices: [],
			selectedIndices: [],
		};
	},

	render() {
		const {
			children,
			className,
			style,
			selectedIndices,
			expandedIndices,
			isDisabled,
			isVertical,
			...passThroughs
		} = this.props;

		console.log(expandedIndices);

		const itemChildProps = List.Item.findInAllAsProps(this.props);

		return (
			<ul
				{...passThroughs}
				className={boundClassNames('&', {
					'&-is-alignedOnX': isVertical === false,
					'&-is-disabled': isDisabled,
				}, className)}
				style={style}
			>
				{_.map(itemChildProps, (itemChildProp, index) => {
					const {
						isExpanded = false,
						isSelected = false,
						isDisabled = false,
						hasExpander = false,
					} = itemChildProp;

					const itemChildrenAsArray = React.Children.toArray(itemChildProp.children);
					const listChildren = _.filter(itemChildrenAsArray, (child) => _.get(child, 'type.displayName', '') === 'List');
					const otherChildren = _.filter(itemChildrenAsArray, (child) => _.get(child, 'type.displayName', '') !== 'List');
					const isParent = listChildren.length > 0;

					return (
						<li
							{...itemChildProp.passThroughs}
							key={index}
							onClick={this.handleClicked}
							onTouchEnd={this.handleClicked}
							className={boundClassNames('&-Item', {
								'&-Item-is-parent': isParent,
								'&-Item-has-expander': hasExpander,
								'&-Item-is-expanded': isExpanded || _.includes(expandedIndices, index),
								'&-Item-is-selected': isSelected || _.includes(selectedIndices, index),
								'&-Item-is-disabled': isDisabled,
							}, className)}
						>
							<a
								className={boundClassNames('&-Item-content')}
								onClick={_.partial(this.handleClickItem, index, itemChildProp)}
							>
								{otherChildren}
								{hasExpander ?
									<Button
										className={boundClassNames('&-expander')}
										size='short'
										onClick={_.partial(this.handleClickExpander, index, itemChildProp)}
									>
										<CaretIcon direction={isExpanded || _.includes(expandedIndices, index) ? 'down' : 'up'} openIcon />
									</Button>
								: null}
							</a>
							{listChildren}
						</li>
					);
				})}
				{children}
			</ul>
		);
	},

	handleClickExpander(index, itemChildProp, { event }) {

		// Prevent the user from also selecting the current item.
		event.stopPropagation();

		this.props.onExpand(index, { event, itemChildProp });
	},

	handleClickItem(index, itemChildProp, event) {
		const {
			isDisabled,
			onSelect,
		} = itemChildProp;

		// event.preventDefault();

		if (!isDisabled) {
			this.props.onSelect(index, { event, itemChildProp });

			if (onSelect) {
				onSelect(index, { event, itemChildProp });
			}
		}
	}

}));

export default List;
