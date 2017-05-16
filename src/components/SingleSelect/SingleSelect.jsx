import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes } from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';
import * as reducers from './SingleSelect.reducers';
import { DropMenuDumb as DropMenu } from '../DropMenu/DropMenu';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';

const cx = lucidClassNames.bind('&-SingleSelect');

const {
	any,
	bool,
	func,
	node,
	number,
	object,
	shape,
	string,
	oneOfType,
} = PropTypes;

/**
 *
 * {"categories": ["controls", "selectors"], "madeFrom": ["DropMenu"]}
 *
 * A selector control (like native `<select>`) which is used to select a single option from a dropdown list.
 * Supports option groups with and without labels.
 */

const SingleSelect = createClass({
	displayName: 'SingleSelect',

	reducers,

	components: {
		/**
		 * Content this is displayed when nothing is selected.
		 */
		Placeholder: createClass({
			displayName: 'SingleSelect.Placeholder',
			propName: 'Placeholder',
		}),
		/**
		 * A selectable option in the list.
		 */
		Option: createClass({
			displayName: 'SingleSelect.Option',
			propName: 'Option',
			propTypes: DropMenu.Option.propTypes,
		}),
		/**
		 * Groups `Option`s together with a non-selectable heading.
		 */
		OptionGroup: createClass({
			displayName: 'SingleSelect.OptionGroup',
			propName: 'OptionGroup',
			propTypes: DropMenu.OptionGroup.propTypes,
		}),
	},

	propTypes: {
		/**
		 * Should be instances of {`SingleSelect.Placeholder`, `SingleSelect.Option`, `SingleSelect.OptionGroup`}. Other direct child elements will not render.
		 */
		children: node,
		/**
		 * Appended to the component-specific class names set on the root elements. Applies to *both* the control and the flyout menu.
		 */
		className: string,
		/**
		 * Styles that are passed through to root element.
		 */
		style: object,
		/**
		 * Applies primary color styling to the control when an item is selected. Defaults to true.
		 */
		isSelectionHighlighted: bool,
		/**
		 * Allows user to reset the `optionIndex` to `null` if they select the placeholder at the top of the options list.
		 * If `false`, it will not render the placeholder in the menu.
		 */
		hasReset: bool,
		/**
		 * Disables the SingleSelect from being clicked or focused.
		 */
		isDisabled: bool,
		/**
		 * The currently selected `SingleSelect.Option` index or `null` if nothing is selected.
		 */
		selectedIndex: number,
		/**
		 * The max height of the fly-out menu.
		 */
		maxMenuHeight: oneOfType([number, string]),
		/**
		 * Object of DropMenu props which are passed thru to the underlying DropMenu component.
		 */
		DropMenu: shape(DropMenu.propTypes),
		/**
		 * Called when an option is selected.
		 * Has the signature `(optionIndex, {props, event}) => {}` where `optionIndex` is the new `selectedIndex` or `null` and `props` are the `props` for the selected `Option`.
		 */
		onSelect: func,
		/**
		 * *Child Element* - The content rendered in the control when there is no option is selected. Also rendered in the option list to remove current selection.
		 */
		Placeholder: any,
		/**
		 * *Child Element* - These are menu options. The `optionIndex` is in-order of rendering regardless of group nesting, starting with index `0`.
		 * Each `Option` may be passed a prop called `isDisabled` to disable selection of that `Option`.
		 * Any other props pass to Option will be available from the `onSelect` handler.
		 */
		Option: any,
		/**
		 * *Child Element* - Used to group `Option`s within the menu. Any non-`Option`s passed in will be rendered as a label for the group.
		 */
		OptionGroup: any,
	},

	getDefaultProps() {
		return {
			hasReset: true,
			isSelectionHighlighted: true,
			isDisabled: false,
			selectedIndex: null,
			DropMenu: DropMenu.getDefaultProps(),
		};
	},

	getInitialState() {
		return {
			optionGroups: [],
			flattenedOptionsData: [],
			ungroupedOptionData: [],
			optionGroupDataLookup: {},
		};
	},

	componentWillMount() {
		// preprocess the options data before rendering
		this.setState(DropMenu.preprocessOptionData(this.props, SingleSelect));
	},

	componentWillReceiveProps(nextProps) {
		// only preprocess options data when it changes (via new props) - better performance than doing this each render
		this.setState(DropMenu.preprocessOptionData(nextProps, SingleSelect));
	},

	render() {
		const {
			style,
			className,
			hasReset,
			isDisabled,
			isSelectionHighlighted,
			selectedIndex,
			maxMenuHeight,
			onSelect,
			DropMenu: dropMenuProps,
		} = this.props;

		const { direction, isExpanded, flyOutStyle } = dropMenuProps;

		const {
			optionGroups,
			optionGroupDataLookup,
			ungroupedOptionData,
			flattenedOptionsData,
		} = this.state;

		const placeholderProps = _.first(
			_.map(findTypes(this.props, SingleSelect.Placeholder), 'props')
		);
		const placeholder = _.get(placeholderProps, 'children', 'Select');
		const isItemSelected = _.isNumber(selectedIndex);

		return (
			<DropMenu
				{...dropMenuProps}
				isDisabled={isDisabled}
				selectedIndices={isItemSelected ? [selectedIndex] : []}
				className={cx('&', className)}
				onSelect={onSelect}
				style={style}
				flyOutStyle={_.assign(
					{},
					flyOutStyle,
					!_.isNil(maxMenuHeight) ? { maxHeight: maxMenuHeight } : null
				)}
			>
				<DropMenu.Control>
					<div
						tabIndex={0}
						className={cx('&-Control', {
							'&-Control-is-highlighted': (!isDisabled &&
								isItemSelected &&
								isSelectionHighlighted) ||
								(isExpanded && isSelectionHighlighted),
							'&-Control-is-selected': (!isDisabled &&
								isItemSelected &&
								isSelectionHighlighted) ||
								(isExpanded && isSelectionHighlighted),
							'&-Control-is-expanded': isExpanded,
							'&-Control-is-disabled': isDisabled,
						})}
					>
						<span
							{...(!isItemSelected ? placeholderProps : null)}
							className={cx(
								'&-Control-content',
								!isItemSelected ? _.get(placeholderProps, 'className') : null
							)}
						>
							{isItemSelected
								? flattenedOptionsData[selectedIndex].optionProps.children
								: placeholder}
						</span>
						<CaretIcon direction={isExpanded ? direction : 'down'} size={8} />
					</div>
				</DropMenu.Control>
				{hasReset && isItemSelected
					? <DropMenu.NullOption {...placeholderProps}>
							{placeholder}
						</DropMenu.NullOption>
					: null}
				{// for each option group passed in, render a DropMenu.OptionGroup, any label will be included in it's children, render each option inside the group
				_.map(optionGroups, (optionGroupProps, optionGroupIndex) => (
					<DropMenu.OptionGroup
						key={'SingleSelectOptionGroup' + optionGroupIndex}
						{...optionGroupProps}
					>
						{optionGroupProps.children}
						{_.map(_.get(optionGroupDataLookup, optionGroupIndex), ({
							optionProps,
							optionIndex,
						}) => (
							<DropMenu.Option
								key={'SingleSelectOption' + optionIndex}
								{...optionProps}
							/>
						))}
					</DropMenu.OptionGroup>
				)).concat(
					// then render all the ungrouped options at the end
					_.map(ungroupedOptionData, ({ optionProps, optionIndex }) => (
						<DropMenu.Option
							key={'SingleSelectOption' + optionIndex}
							{...optionProps}
						/>
					))
				)}
			</DropMenu>
		);
	},
});

export default buildHybridComponent(SingleSelect);
export { SingleSelect as SingleSelectDumb };
