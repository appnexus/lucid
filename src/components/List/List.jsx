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
	array,
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
		 * Indicates which of the `List.Item` children is currently selected. The
		 * index of the last `List.Item` child with `isSelected` equal to `true`
		 * takes precedence over this prop.
		 */
		selectedIndices: array,

		/**
		 * Indicates which of the `List.Item` children is currently expanded.
		 */
		expandedIndices: array,

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
		isVertical: bool
	},

	childProps: {
		Item: {
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
			 * If `true` then the active Item will be selected.
			 */
			isSelected: bool,

			/**
			 * Callback for when the user clicks a sublist. Called with the index of the
			 * list that was clicked.
			 */
			onSelect: func,

			/**
			 * Indicates whether the Item should appear and act disabled by
			 * having a "greyed out" palette and ignoring user interactions.
			 */
			isDisabled: bool,

			/**
			 * Indicates that this component uses the expander styling.
			 * Defaults to `false`
			 */
			hasExpander: bool,

			/**
			 * Indicates whether the nested Lists will render or not. Defaults to `true`.
			 */
			isExpanded: bool,

			/**
			 * Indicates whether the Item should appear and act disabled by
			 * having a "greyed out" palette and ignoring user interactions.
			 */
			isDisabled: bool,

			/**
			 * If `true` then the active Item will be selected.
			 */
			isSelected: bool,

			/**
			 * Callback for when the user clicks a sublist. Called with the index of the
			 * list that was clicked.
			 */
			onSelect: func,
		}
	},


	getDefaultProps() {
		return {
			isDisabled: false,
			isVertical: true
		};
	},

	render() {
		const {
			children,
			className,
			style,
			isExpanded,
			selectedIndices,
			isDisabled,
			isVertical,
			hasExpander,
			...passThroughs
		} = this.props;

		const listItemDefaultProps = {
			isSelected: false,
			isDisabled: false,
		}
		const listItemChildProps = List.Item.findInAllAsProps(this.props);

		// const selectedIndicesFromChildren = _.findLastIndex(listItemChildProps, {
		// 	isSelected: true,
		// });

		// const actualSelectedIndex = selectedIndicesFromChildren !== -1
		// 	? selectedIndicesFromChildren
		// 	: selectedIndices;

		return (
			<ul {...passThroughs}
				className={boundClassNames('&', {
					'&-is-alignedOnX': isVertical === false,
					'&-is-disabled'  : isDisabled,
					'&-has-expander' : hasExpander
				}, className)}
				style={style} >
				{_.map(listItemChildProps, (listItemChildProp) => {
					return this.renderListItem(listItemChildProp);
				} )}
			</ul>
		);
	},

	renderListItem(childProps, selectedIndices){
		const {
			children,
			className,
			style,
			onSelect = _.noop,
			isExpanded = false,
			isSelected = false,
			isDisabled = false,
			hasExpander = this.props.hasExpander,
			...passThroughs
		} = childProps;

		const isParent = _.isArray(children);
		const classNames = boundClassNames('&-Item', {
				'&-Item-is-parent' : isParent,
				/*'&-Item-is-active': index === actualSelectedIndex,*/
				'&-Item-is-selected': isSelected,
				'&-Item-is-disabled' : isDisabled,
				'&-Item-is-expanded' : isExpanded,
			}, className);

		return (
			isParent?
				<li className={classNames}>
					<a className={boundClassNames('&-Item-content')}>
						{children[0]}
						{hasExpander ?
							<Button
								className={boundClassNames('&-expander')}
								size='short'>
								<CaretIcon direction={isExpanded ? 'up' : 'down'} isOutline />
							</Button>
						: null }
					</a>
					<ul className={boundClassNames('&-Item-sublist')}>
						{_.map(List.Item.findInAllAsProps(childProps), (child, index) => {
							return this.renderListItem(child);
						})}
					</ul>
				</li>
			:
			<li className={classNames}><a className={boundClassNames('&-Item-content')}>{children}</a></li>
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



// <ul {...passThroughs}
// 	className={boundClassNames('&', {
// 		'&-is-alignedOnX': isVertical === false,
// 		'&-is-disabled'  : isDisabled,
// 		'&-has-expander' : hasExpander
// 	}, className)}
// 	style={style} >
// 	{_.map(listItemChildProps, (listItemChildProp, index) => {
// 		const hasChildList = _.isArray(listItemChildProp.children);
// 		listItemChildProp = _.defaults({}, listItemChildProp, {
// 			isSelected: false,
// 			isExpanded: true,
// 			onSelect: _.noop,
// 			isDisabled: false
// 		});
//
// 		console.log(listItemChildProp);
// 		console.log(hasChildList);
// 		return (
// 			<li {...listItemChildProp.passThroughs}
// 				key={index}
// 				onClick={this.handleClicked}
// 				onTouchEnd={this.handleClicked}
// 				className={boundClassNames('&-Item', {
// 					'&-Item-is-parent' : hasChildList,
// 					/*'&-Item-is-active': index === actualSelectedIndex,*/
// 					'&-Item-is-selected': listItemChildProp.isSelected,
// 					'&-Item-is-disabled' : listItemChildProp.isDisabled,
// 				}, className)} >
// 				{hasChildList?
// 					<a>
// 						{ listItemChildProp.children[0]}
// 						{hasExpander?
// 							<Button
// 								className='lucid-List-expander'
// 								size='short'>
// 								<CaretIcon direction={isExpanded?'up':'down'} isOutline />
// 							</Button>
// 							: null
// 						}
// 					</a>
// 					:
// 					<a>{listItemChildProp.children}</a>
// 				}
// 				{hasChildList?
// 					<ul>
// 						{_.slice(listItemChildProp.children, 1)}
// 					</ul>
// 					: null
// 				}
// 			</li>
// 		)
// 	})}
// 	{children}
// </ul>
