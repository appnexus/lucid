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
	bool,
	array,
	string,
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
			onSelect: _.noop,
			onExpand: _.noop,
			isDisabled: false,
			isVertical: true,
		};
	},

	_index: 0,

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

		this._index = -1;

		return (
			<ul {...passThroughs}
				className={boundClassNames('&', {
					'&-is-alignedOnX': isVertical === false,
					'&-is-disabled'  : isDisabled,
					'&-has-expander' : hasExpander
				}, className)}
				style={style} >
				{_.map(listItemChildProps, (listItemChildProp) => {
					this._index++;
					return this.renderListItem(listItemChildProp);
				})}
			</ul>
		);
	},

	renderListItem(childProps) {
		const childPropsWithDefaults = _.defaults({}, childProps, {
			onSelect: _.noop,
			onExpand: _.noop,
			isExpanded: _.includes(this.props.expandedIndices, this._index),
			isSelected: _.includes(this.props.selectedIndices, this._index),
			isDisabled: false,
			hasExpander: this.props.hasExpander,
		});

		const {
			children,
			className,
			style,
			onSelect,
			onExpand,
			isExpanded,
			isSelected,
			isDisabled,
			hasExpander,
			...passThroughs
		} = childPropsWithDefaults;

		const isParent = _.isArray(children);
		const classNames = boundClassNames('&-Item', {
			'&-Item-is-parent' : isParent,
			'&-Item-is-selected': isSelected,
			'&-Item-is-disabled': isDisabled,
			'&-Item-is-expanded': isExpanded,
			'&-Item-is-collapsed': !isExpanded && isParent,
		}, className);

		return (
			isParent ?
				<li className={classNames}>
					<a
						className={boundClassNames('&-Item-content')}
						onClick={_.partial(this.handleClickItem, this._index, childPropsWithDefaults)}
					>
						{children[0]}
						{hasExpander ?
							<Button
								className={boundClassNames('&-expander')}
								size='short'
								onClick={_.partial(this.handleClickExpander, this._index, childPropsWithDefaults)}
							>
								<CaretIcon direction={isExpanded ? 'up' : 'down'} isOutline />
							</Button>
						: null }
					</a>
					<ul className={boundClassNames('&-Item-sublist')}>
						{_.map(List.Item.findInAllAsProps(childProps), (child) => {
							this._index++;
							return this.renderListItem(child);
						})}
					</ul>
				</li>
			:
				<li className={classNames}>
					<a className={boundClassNames('&-Item-content')}
						onClick={_.partial(this.handleClickItem, this._index, childPropsWithDefaults)}
					>
						{children}
					</a>
				</li>
		);
	},

	handleClickExpander(index, props, { event }) {
		// When the user clicks the expander, we don't want that click event to
		// flow through to the `onSelect` handler as well
		event.stopPropagation();

		const {
			onExpand,
		} = this.props;

		const {
			isDisabled,
			isExpanded,
		} = props;

		if (!isDisabled) {
			onExpand(index, !isExpanded, { event, props });
		}
	},

	handleClickItem(index, props, event) {
		const {
			onSelect,
		} = this.props;

		const {
			isDisabled,
			isSelected,
		} = props;

		if (!isDisabled) {
			onSelect(index, !isSelected, { event, props });
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
