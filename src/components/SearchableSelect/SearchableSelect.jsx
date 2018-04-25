import React from 'react';
import PropTypes from 'react-peek/prop-types';
import _ from 'lodash';
import { createClass, findTypes, getFirst } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';
import { partitionText, propsSearch } from '../../util/text-manipulation';
import { buildHybridComponent } from '../../util/state-management';
import * as reducers from './SearchableSelect.reducers';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';
import { DropMenuDumb as DropMenu } from '../DropMenu/DropMenu';
import LoadingIcon from '../Icon/LoadingIcon/LoadingIcon';
import { SearchFieldDumb as SearchField } from '../SearchField/SearchField';

const cx = lucidClassNames.bind('&-SearchableSelect');

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

const SearchableSelect = createClass({
	displayName: 'SearchableSelect',

	statics: {
		peek: {
			description: `
				A selector control (like native \`<select>\`) which is used to select a
				single option from a dropdown list using a SearchField.  Supports
				option groups with and without labels.
			`,
			categories: ['controls', 'selectors'],
			madeFrom: ['DropMenu', 'SearchField'],
		},
	},

	reducers,

	components: {
		Placeholder: createClass({
			displayName: 'SearchableSelect.Placeholder',
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
			displayName: 'SearchableSelect.Option',
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
				filterText: string`
					Text used to filter options when searching. By default, this is the
					text rendered in the Option, but it can be customized further with
					this prop.
				`,
				...DropMenu.Option.propTypes,
			},
			components: {
				Selected: createClass({
					displayName: 'SearchableSelect.Option.Selected',
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
			displayName: 'SearchableSelect.OptionGroup',
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
		SearchField,
	},

	propTypes: {
		children: node`
			Should be instances of {\`SearchableSelect.Placeholder\`,
			\`SearchableSelect.Option\`, \`SearchableSelect.OptionGroup\`}. Other
			direct child elements will not render.
		`,

		className: string`
			Appended to the component-specific class names set on the root elements.
			Applies to *both* the control and the flyout menu.
		`,

		style: object`
			Styles that are passed through to root element.
		`,

		hasReset: bool`
			Allows user to reset the \`optionIndex\` to \`null\` if they select the
			placeholder at the top of the options list.  If \`false\`, it will not
			render the placeholder in the menu.
		`,

		isDisabled: bool`
			Disables the SearchableSelect from being clicked or focused.
		`,

		isLoading: bool`
			Displays a centered LoadingIcon to allow for asynchronous loading of
			options.
		`,

		isSelectionHighlighted: bool`
			Applies primary color styling to the control when an item is selected.
		`,

		maxMenuHeight: oneOfType([number, string])`
			The max height of the fly-out menu.
		`,

		onSearch: func`
			Called when the user enters a value to search for; the set of visible
			Options will be filtered using the value.  Has the signature
			\`(searchText, firstVisibleIndex, {props, event}) => {}\` where
			\`searchText\` is the value from the \`SearchField\` and
			\`firstVisibleIndex\` is the index of the first option that will be
			visible after filtering.
		`,

		onSelect: func`
			Called when an option is selected.  Has the signature
			\`(optionIndex, {props, event}) => {}\` where \`optionIndex\` is the new
			\`selectedIndex\` or \`null\`.
		`,

		optionFilter: func`
			The function that will be run against each Option's props to determine
			whether it should be visible or not. The default behavior of the function
			is to match, ignoring case, against any text node descendant of the
			\`Option\`.  Has the signature \`(searchText, optionProps)\` If \`true\`,
			option will be visible. If \`false\`, the option will not be visible.
		`,

		searchText: string`
			The current search text to filter the list of options by.
		`,

		selectedIndex: number`
			The currently selected \`SearchableSelect.Option\` index or \`null\` if
			nothing is selected.
		`,

		DropMenu: shape(DropMenu.propTypes)`
			Object of DropMenu props which are passed thru to the underlying DropMenu
			component.
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
			isLoading: false,
			optionFilter: propsSearch,
			searchText: '',
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
		this.setState(DropMenu.preprocessOptionData(this.props, SearchableSelect));
	},

	componentWillReceiveProps(nextProps) {
		// only preprocess options data when it changes (via new props) - better performance than doing this each render
		this.setState(DropMenu.preprocessOptionData(nextProps, SearchableSelect));
	},

	handleSearch(searchText) {
		const { props: { onSearch, optionFilter } } = this;

		const { flattenedOptionsData } = this.state;

		const firstVisibleIndex = _.get(
			_.find(flattenedOptionsData, ({ optionProps }) => {
				return optionFilter(searchText, optionProps);
			}),
			'optionIndex'
		);

		onSearch(searchText, firstVisibleIndex);
	},

	renderUnderlinedChildren(childText, searchText) {
		const [pre, match, post] = partitionText(
			childText,
			new RegExp(_.escapeRegExp(searchText), 'i'),
			searchText.length
		);

		return [
			pre && (
				<span key="pre" className={cx('&-Option-underline-pre')}>
					{pre}
				</span>
			),
			match && (
				<span key="match" className={cx('&-Option-underline-match')}>
					{match}
				</span>
			),
			post && (
				<span key="post" className={cx('&-Option-underline-post')}>
					{post}
				</span>
			),
		];
	},

	renderOption(optionProps, optionIndex) {
		const { isLoading, optionFilter, searchText } = this.props;

		if (searchText) {
			return (
				<DropMenu.Option
					isDisabled={isLoading}
					{..._.omit(optionProps, ['children', 'Selected', 'filterText'])}
					isHidden={!optionFilter(searchText, optionProps)}
					key={'SearchableSelectOption' + optionIndex}
				>
					{_.isString(optionProps.children)
						? this.renderUnderlinedChildren(optionProps.children, searchText)
						: _.isFunction(optionProps.children)
							? React.createElement(optionProps.children, { searchText })
							: optionProps.children}
				</DropMenu.Option>
			);
		}

		return (
			<DropMenu.Option
				key={'SearchableSelectOption' + optionIndex}
				{..._.omit(optionProps, ['children', 'Selected', 'filterText'])}
				isDisabled={optionProps.isDisabled || isLoading}
			>
				{_.isFunction(optionProps.children)
					? React.createElement(optionProps.children, { searchText })
					: optionProps.children}
			</DropMenu.Option>
		);
	},

	renderOptions() {
		const { searchText } = this.props;

		const {
			optionGroups,
			optionGroupDataLookup,
			ungroupedOptionData,
		} = this.state;

		// for each option group passed in, render a DropMenu.OptionGroup, any
		// label will be included in it's children, render each option inside the
		// group
		const options = _.map(
			optionGroups,
			(optionGroupProps, optionGroupIndex) => {
				const childOptions = _.map(
					_.get(optionGroupDataLookup, optionGroupIndex),
					({ optionProps, optionIndex }) =>
						this.renderOption(optionProps, optionIndex)
				);
				const visibleChildrenCount = _.filter(
					childOptions,
					option => !option.props.isHidden
				).length;

				return (
					<DropMenu.OptionGroup
						isHidden={visibleChildrenCount === 0}
						key={'SearchableSelectOptionGroup' + optionGroupIndex}
						{...optionGroupProps}
					>
						{optionGroupProps.children}
						{childOptions}
					</DropMenu.OptionGroup>
				);
				// then render all the ungrouped options at the end
			}
		).concat(
			_.map(ungroupedOptionData, ({ optionProps, optionIndex }) =>
				this.renderOption(optionProps, optionIndex)
			)
		);

		const visibleOptionsCount = _.filter(
			options,
			option => !option.props.isHidden
		).length;

		return visibleOptionsCount > 0 ? (
			options
		) : (
			<DropMenu.Option isDisabled>
				<span className={cx('&-noresults')}>
					No results match "{searchText}"
				</span>
			</DropMenu.Option>
		);
	},

	render() {
		const {
			props,
			props: {
				style,
				className,
				hasReset,
				isDisabled,
				isLoading,
				isSelectionHighlighted,
				maxMenuHeight,
				searchText,
				selectedIndex,
				onSelect,
				DropMenu: dropMenuProps,
			},
		} = this;

		const { direction, optionContainerStyle, isExpanded } = dropMenuProps;

		const { flattenedOptionsData } = this.state;

		const searchFieldProps = _.get(
			getFirst(props, SearchField) || <SearchField />,
			'props'
		);
		const placeholderProps = _.first(
			_.map(findTypes(this.props, SearchableSelect.Placeholder), 'props')
		);
		const placeholder = _.get(placeholderProps, 'children', 'Select');
		const isItemSelected = _.isNumber(selectedIndex);

		return (
			<DropMenu
				{...dropMenuProps}
				className={cx('&', className)}
				optionContainerStyle={_.assign(
					{},
					optionContainerStyle,
					!_.isNil(maxMenuHeight) ? { maxHeight: maxMenuHeight } : null
				)}
				isDisabled={isDisabled}
				onSelect={onSelect}
				selectedIndices={isItemSelected ? [selectedIndex] : []}
				style={style}
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
											SearchableSelect.Option.Selected
										),
										'props.children'
									) ||
									(Children =>
										_.isFunction(Children) ? <Children /> : Children)(
										flattenedOptionsData[selectedIndex].optionProps.children
									)
								: placeholder}
						</span>
						<CaretIcon direction={isExpanded ? direction : 'down'} size={8} />
					</div>
				</DropMenu.Control>
				<DropMenu.Header className={cx('&-Search-container')}>
					<SearchField
						{...searchFieldProps}
						onChange={this.handleSearch}
						value={searchText}
					/>
				</DropMenu.Header>
				{isLoading && (
					<DropMenu.Option
						key="SearchableSelectLoading"
						className={cx('&-Loading')}
						isDisabled
					>
						<LoadingIcon />
					</DropMenu.Option>
				)}
				{hasReset &&
					isItemSelected && (
						<DropMenu.NullOption {...placeholderProps}>
							{placeholder}
						</DropMenu.NullOption>
					)}
				{this.renderOptions()}
			</DropMenu>
		);
	},
});

export default buildHybridComponent(SearchableSelect);
export { SearchableSelect as SearchableSelectDumb };
