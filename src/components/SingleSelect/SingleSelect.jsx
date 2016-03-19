import React from 'react';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import * as reducers from './SingleSelect.reducers';
import DropMenu from '../DropMenu/DropMenu';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';

const boundClassNames = lucidClassNames.bind('&-SingleSelect');

const {
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
 * {"categories": ["controls", "selectors"]}
 *
 * A basic drop menu. Any props that are not explicitly called out below will be
 * passed through.
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
		 * children
		 */
		children: node,
		/**
		 * class names that are appended to the defaults
		 */
		className: string,
		/**
		 * Styles that are passed through to root element.
		 */
		style: object,
		/**
		 * Allows user to reset the selection to `null` if they select the placeholder at the top of the options list.
		 */
		allowReset: bool,
		/**
		 * the index of the selected option or null if no selection
		 */
		isDisabled: bool,
		/**
		 * the index of the selected option or null if no selection
		 */
		selectedIndex: number,
		/**
		 * props passed thru to DropMenu
		 */
		DropMenu: shape(DropMenu.propTypes),
		/**
		 * Called when an option is selected.
		 * Has the signature `(optionIndex, {props, event}) => {}` where optionIndex can be a number or `null`.
		 */
		onSelect: func
	},

	getDefaultProps() {
		return {
			allowReset: true,
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
			allowReset,
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
				{allowReset && isItemSelected ? (
					<DropMenu.NullOption {...placeholderProps}>{placeholder}</DropMenu.NullOption>
				) : null}
				{
					// for each option group passed in, render a DropMenu.OptionGroup, any label will be included in it's children, render each option inside the group
					_.map(optionGroups, (optionGroupProps, optionGroupIndex) => {
						return (
							<DropMenu.OptionGroup key={'SingleSelectOptionGroup' + optionGroupIndex} {...optionGroupProps}>
								{optionGroupProps.children}
								{_.map(_.get(optionGroupDataLookup, optionGroupIndex), ({ optionProps, optionIndex }) => (
									<DropMenu.Option key={'SingleSelectOption' + optionIndex} {...optionProps} />
								))}
							</DropMenu.OptionGroup>
						);
					// then render all the ungrouped options at the end
					}).concat(_.map(ungroupedOptionData, ({ optionProps, optionIndex }) => (<DropMenu.Option key={'SingleSelectOption' + optionIndex} {...optionProps} />)))
				}
			</DropMenu>
		);
	}
}));

export default SingleSelect;
