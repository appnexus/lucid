import React from 'react';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import * as reducers from './SingleSelect.reducers';
import DropMenu from '../DropMenu/DropMenu';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';

const boundClassNames = lucidClassNames.bind('&-SingleSelect');

const {
	any,
	bool,
	func,
	node,
	number,
	object,
	shape,
	string
} = React.PropTypes;

/**
 *
 * {"categories": ["controls", "selectors"], "madeFrom": ["DropMenu"]}
 *
 * A selector control (like native `<select>`) which is used to select a single option from a dropdown list.
 * Supports option groups with and without labels.
 */

const SingleSelect = React.createClass(createLucidComponentDefinition({
	displayName: 'SingleSelect',

	reducers,

	childProps: {
		Placeholder: null,
		Option: DropMenu.Option.propTypes,
		OptionGroup: DropMenu.OptionGroup.propTypes
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
		 * Object of DropMenu props which are passed thru to the underlying DropMenu component.
		 */
		DropMenu: shape(DropMenu.propTypes),
		/**
		 * Called when an option is selected.
		 * Has the signature `(optionIndex, {props, event}) => {}` where `optionIndex` is the new `selectedIndex` or `null`.
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
			isDisabled: false,
			selectedIndex: null,
			DropMenu: DropMenu.getDefaultProps()
		};
	},

	getInitialState() {
		return {
			optionGroups: [],
			flattenedOptionsData: [],
			ungroupedOptionData: [],
			optionGroupDataLookup: {}
		}
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
			selectedIndex,
			onSelect,
			DropMenu: dropMenuProps
		} = this.props;

		const {
			direction,
			isExpanded
		} = dropMenuProps;

		const {
			optionGroups,
			optionGroupDataLookup,
			ungroupedOptionData,
			flattenedOptionsData
		} = this.state;

		const placeholderProps = _.first(SingleSelect.Placeholder.findInAllAsProps(this.props));
		const placeholder = _.get(placeholderProps, 'children', 'Select');
		const isItemSelected = _.isNumber(selectedIndex);

		return (
			<DropMenu
				{...dropMenuProps}
				isDisabled={isDisabled}
				selectedIndices={isItemSelected ? [selectedIndex] : []}
				className={boundClassNames('&', className)}
				onSelect={onSelect}
				style={style}
			>
				<DropMenu.Control>
					<div className={boundClassNames('&-Control', {
						'&-Control-is-selected': !isDisabled && isItemSelected,
						'&-Control-is-expanded': isExpanded,
						'&-Control-is-disabled': isDisabled
					})}>
						<span
							{...(!isItemSelected ? placeholderProps : null)}
							className={boundClassNames(
									'&-Control-content',
									(!isItemSelected ? _.get(placeholderProps, 'className') : null)
							)}
						>
							{isItemSelected ? flattenedOptionsData[selectedIndex].optionProps.children : placeholder}
						</span>
						<CaretIcon direction={isExpanded ? direction : 'down'} />
					</div>
				</DropMenu.Control>
				{hasReset && isItemSelected ? (
					<DropMenu.NullOption {...placeholderProps}>{placeholder}</DropMenu.NullOption>
				) : null}
				{
					// for each option group passed in, render a DropMenu.OptionGroup, any label will be included in it's children, render each option inside the group
					_.map(optionGroups, (optionGroupProps, optionGroupIndex) => (
							<DropMenu.OptionGroup key={'SingleSelectOptionGroup' + optionGroupIndex} {...optionGroupProps}>
								{optionGroupProps.children}
								{_.map(_.get(optionGroupDataLookup, optionGroupIndex), ({ optionProps, optionIndex }) => (
									<DropMenu.Option key={'SingleSelectOption' + optionIndex} {...optionProps} />
								))}
							</DropMenu.OptionGroup>
						// then render all the ungrouped options at the end
						)).concat(_.map(ungroupedOptionData, ({ optionProps, optionIndex }) => (<DropMenu.Option key={'SingleSelectOption' + optionIndex} {...optionProps} />)))
				}
			</DropMenu>
		);
	}
}));

export default SingleSelect;
