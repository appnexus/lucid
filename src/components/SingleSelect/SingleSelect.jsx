import React from 'react';
import PropTypes from 'react-peek/prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, getFirst } from '../../util/component-types';
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

const SingleSelect = createClass({
	displayName: 'SingleSelect',

	statics: {
		peek: {
			description: `
				A selector control (like native \`<select>\`) which is used to select a
				single option from a dropdown list.  Supports option groups with and
				without labels.
			`,
			categories: ['controls', 'selectors'],
			madeFrom: ['DropMenu'],
		},
	},

	reducers,

	components: {
		Placeholder: createClass({
			displayName: 'SingleSelect.Placeholder',
			statics: {
				peek: {
					description: `
						Content this is displayed when nothing is selected.
					`,
				},
			},
			propName: 'Placeholder',
		}),
		Option: createClass({
			displayName: 'SingleSelect.Option',
			statics: {
				peek: {
					description: `
						A selectable option in the list.
					`,
				},
			},
			propName: 'Option',
			propTypes: {
				Selected: any`
					Customizes the rendering of the Option when it is selected and is
					displayed instead of the Placeholder.
				`,
				...DropMenu.Option.propTypes,
			},
			components: {
				Selected: createClass({
					displayName: 'SingleSelect.Option.Selected',
					statics: {
						peek: {
							description: `
								Customizes the rendering of the Option when it is selected
								and is displayed instead of the Placeholder.
							`,
						},
					},
					propName: 'Selected',
				}),
			},
		}),
		OptionGroup: createClass({
			displayName: 'SingleSelect.OptionGroup',
			statics: {
				peek: {
					description: `
						Groups \`Option\`s together with a non-selectable heading.
					`,
				},
			},
			propName: 'OptionGroup',
			propTypes: DropMenu.OptionGroup.propTypes,
		}),
	},

	propTypes: {
		children: node`
			Should be instances of {\`SingleSelect.Placeholder\`,
			\`SingleSelect.Option\`, \`SingleSelect.OptionGroup\`}. Other direct
			child elements will not render.
		`,

		className: string`
			Appended to the component-specific class names set on the root elements.
			Applies to *both* the control and the flyout menu.
		`,

		style: object`
			Styles that are passed through to root element.
		`,

		isSelectionHighlighted: bool`
			Applies primary color styling to the control when an item is selected.
		`,

		hasReset: bool`
			Allows user to reset the \`optionIndex\` to \`null\` if they select the
			placeholder at the top of the options list.  If \`false\`, it will not
			render the placeholder in the menu.
		`,

		isDisabled: bool`
			Disables the SingleSelect from being clicked or focused.
		`,

		selectedIndex: number`
			The currently selected \`SingleSelect.Option\` index or \`null\` if
			nothing is selected.
		`,

		maxMenuHeight: oneOfType([number, string])`
			The max height of the fly-out menu.
		`,

		DropMenu: shape(DropMenu.propTypes)`
			Object of DropMenu props which are passed thru to the underlying DropMenu
			component.
		`,

		onSelect: func`
			Called when an option is selected.  Has the signature \`(optionIndex,
			{props, event}) => {}\` where \`optionIndex\` is the new
			\`selectedIndex\` or \`null\` and \`props\` are the \`props\` for the
			selected \`Option\`.
		`,

		Placeholder: any`
			*Child Element* - The content rendered in the control when there is no
			option is selected. Also rendered in the option list to remove current
			selection.
		`,

		Option: any`
			*Child Element* - These are menu options. The \`optionIndex\` is in-order
			of rendering regardless of group nesting, starting with index \`0\`.
			Each \`Option\` may be passed a prop called \`isDisabled\` to disable
			selection of that \`Option\`.  Any other props pass to Option will be
			available from the \`onSelect\` handler.
		`,

		OptionGroup: any`
			*Child Element* - Used to group \`Option\`s within the menu. Any
			non-\`Option\`s passed in will be rendered as a label for the group.
		`,
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
							'&-Control-is-highlighted':
								(!isDisabled && isItemSelected && isSelectionHighlighted) ||
								(isExpanded && isSelectionHighlighted),
							'&-Control-is-selected':
								(!isDisabled && isItemSelected && isSelectionHighlighted) ||
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
								? _.get(
										getFirst(
											flattenedOptionsData[selectedIndex].optionProps,
											SingleSelect.Option.Selected
										),
										'props.children'
									) || flattenedOptionsData[selectedIndex].optionProps.children
								: placeholder}
						</span>
						<CaretIcon direction={isExpanded ? direction : 'down'} size={8} />
					</div>
				</DropMenu.Control>
				{hasReset && isItemSelected ? (
					<DropMenu.NullOption {...placeholderProps}>
						{placeholder}
					</DropMenu.NullOption>
				) : null}
				{// for each option group passed in, render a DropMenu.OptionGroup, any label will be included in it's children, render each option inside the group
				_.map(optionGroups, (optionGroupProps, optionGroupIndex) => (
					<DropMenu.OptionGroup
						key={'SingleSelectOptionGroup' + optionGroupIndex}
						{...optionGroupProps}
					>
						{optionGroupProps.children}
						{_.map(
							_.get(optionGroupDataLookup, optionGroupIndex),
							({ optionProps, optionIndex }) => (
								<DropMenu.Option
									key={'SingleSelectOption' + optionIndex}
									{..._.omit(optionProps, 'Selected')}
								/>
							)
						)}
					</DropMenu.OptionGroup>
				)).concat(
					// then render all the ungrouped options at the end
					_.map(ungroupedOptionData, ({ optionProps, optionIndex }) => (
						<DropMenu.Option
							key={'SingleSelectOption' + optionIndex}
							{..._.omit(optionProps, 'Selected')}
						/>
					))
				)}
			</DropMenu>
		);
	},
});

export default buildHybridComponent(SingleSelect);
export { SingleSelect as SingleSelectDumb };
