import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { buildHybridComponent } from '../../util/state-management';
import { partitionText, propsSearch } from '../../util/text-manipulation';
import {
	createClass,
	omitProps,
	getFirst,
	findTypes,
	rejectTypes,
} from '../../util/component-types';
import { SearchFieldDumb as SearchField } from '../SearchField/SearchField';
import { DropMenuDumb as DropMenu } from '../DropMenu/DropMenu';
import LoadingIcon from '../Icon/LoadingIcon/LoadingIcon';
import CheckboxLabeled from '../CheckboxLabeled/CheckboxLabeled';
import Selection from '../Selection/Selection';

import * as reducers from './SearchableMultiSelect.reducers';

const {
	any,
	arrayOf,
	bool,
	func,
	number,
	oneOfType,
	shape,
	string,
	oneOf,
	node,
} = PropTypes;

const cx = lucidClassNames.bind('&-SearchableMultiSelect');

const SearchableMultiSelect = createClass({
	displayName: 'SearchableMultiSelect',

	statics: {
		peek: {
			description: `
				A control used to select multiple options from a dropdown list using a
				SearchField.
			`,
			categories: ['controls', 'selectors'],
			madeFrom: [
				'Checkbox',
				'SearchField',
				'DropMenu',
				'LoadingIcon',
				'Selection',
			],
		},
	},

	reducers,

	components: {
		Option: createClass({
			displayName: 'SearchableMultiSelect.Option',
			statics: {
				peek: {
					description: `
						A selectable option in the list.
					`,
				},
			},
			propName: 'Option',
			propTypes: {
				filterText: string`
					Text used to filter options when searching. By default, this is the
					text rendered in the Option, but it can be customized further with
					this prop.
				`,
				...DropMenu.Option.propTypes,
			},
			components: {
				Selected: createClass({
					displayName: 'SearchableMultiSelect.Option.Selected',
					statics: {
						peek: {
							description: `
								Customizes the rendering of the Option label when it is
								selected and is displayed .
							`,
						},
					},
					propName: 'Selected',
				}),
				Selection: createClass({
					displayName: 'SearchableMultiSelect.Option.Selection',
					propName: 'Selection',
					propTypes: Selection.propTypes,
				}),
			},
		}),
		SearchField: createClass({
			displayName: 'SearchableMultiSelect.SearchField',
			statics: {
				peek: {
					description: `
						Passes props through to the \`SearchField\` component.
					`,
				},
			},
			propName: 'SearchField',
			propTypes: SearchField.propTypes,
		}),

		OptionGroup: createClass({
			displayName: 'SearchableMultiSelect.OptionGroup',
			statics: {
				peek: {
					description: `
						Groups \`Option\`s together with a non-selectable heading.
					`,
				},
			},
			propName: 'OptionGroup',
			propTypes: DropMenu.OptionGroup.propTypes,
			components: {
				Selected: createClass({
					displayName: 'SearchableMultiSelect.OptionGroup.Selected',
					statics: {
						peek: {
							description: `
								Customizes the rendering of the OptionGroup label when it is
								selected and is displayed.
							`,
						},
					},
					propName: 'Selected',
				}),
			},
		}),

		SelectionLabel: createClass({
			displayName: 'SearchableMultiSelect.SelectionLabel',
			statics: {
				peek: {
					description: `
						Label for the selected section header.
					`,
				},
			},
			propName: 'SelectionLabel',
		}),
	},

	propTypes: {
		children: node`
			Should be instances of {\`SearchableMultiSelect.Option\`}. Other direct
			child elements will not render.
		`,

		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		isDisabled: bool`
			Disables the control from being clicked or focused.
		`,

		isLoading: bool`
			Displays a LoadingIcon to allow for asynchronous loading of options.
		`,

		maxMenuHeight: oneOfType([number, string])`
			The max height of the fly-out menu.
		`,

		onSearch: func`
			Called when the user enters a value to search for; the set of visible
			Options will be filtered using the value.  Signature: \`(searchText,
			firstVisibleIndex, {props, event}) => {}\` \`searchText\` is the value
			from the \`SearchField\` and \`firstVisibleIndex\` is the index of the
			first option that will be visible after filtering.
		`,

		onSelect: func`
			Called when an option is selected.  Signature: \`(optionIndex, {props,
			event}) => {}\` \`optionIndex\` is the new \`selectedIndex\` or \`null\`.
		`,

		onRemoveAll: func`
			Called when the user clicks to remove all selections.  Signature:
			\`({props, event}) => {}\`
		`,

		optionFilter: func`
			The function that will be run against each Option's props to determine
			whether it should be visible or not. The default behavior of the function
			is to match, ignoring case, against any text node descendant of the
			\`Option\`.  Signature: \`(searchText, optionProps) => {}\` If \`true\`
			is returned, the option will be visible. If \`false\`, the option will
			not be visible.
		`,

		searchText: string`
			The current search text to filter the list of options by.
		`,

		selectedIndices: arrayOf(number)`
			An array of currently selected \`SearchableMultiSelect.Option\` indices
			or \`null\` if nothing is selected.
		`,

		DropMenu: shape(DropMenu.propTypes)`
			Object of DropMenu props which are passed through to the underlying
			DropMenu component.
		`,

		Option: any`
			*Child Element* - These are menu options. Each \`Option\` may be passed a
			prop called \`isDisabled\` to disable selection of that \`Option\`. Any
			other props pass to Option will be available from the \`onSelect\`
			handler.  It also support the \`Selection\` prop that can be used to
			forward along props to the underlying \`Selection\` component.
		`,

		responsiveMode: oneOf(['small', 'medium', 'large'])`
			Adjusts the display of this component. This should typically be driven by
			screen size. Currently \`small\` and \`large\` are explicitly handled by
			this component.
		`,

		hasRemoveAll: bool`
			Controls the visibility of the "remove all" button that's shown with the
			selected items.
		`,

		hasSelections: bool`
			Controls the visibility of the \`Selection\` component that appears below
			the search field.
		`,

		hasSelectAll: bool`
			Controls whether to show a "Select All" option.
		`,
	},

	getInitialState() {
		return {
			optionGroups: [],
			flattenedOptionsData: [],
			ungroupedOptionData: [],
			optionGroupDataLookup: {},
		};
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isLoading: false,
			onRemoveAll: _.noop,
			optionFilter: propsSearch,
			searchText: '',
			selectedIndices: [],
			DropMenu: DropMenu.getDefaultProps(),
			responsiveMode: 'large',
			hasRemoveAll: true,
			hasSelections: true,
			hasSelectAll: false,
		};
	},

	handleDropMenuSelect(optionIndex, { event, props }) {
		const { onSelect } = this.props;

		event.preventDefault();

		if (optionIndex === 0) {
			return this.handleSelectAll(event);
		}
		// this index is decremented to account for the "Select All" Option
		return onSelect(optionIndex - 1, { event, props });
	},

	handleSelectAll(event) {
		// This is needed otherwise clicking the checkbox will double fire this
		// event _and_ the `handleDropMenuSelect` handler
		const {
			props: { selectedIndices, onSelect },
			state: { flattenedOptionsData },
		} = this;

		event.preventDefault();

		const visibleOptions = _.reject(
			flattenedOptionsData,
			'optionProps.isHidden'
		);

		const [selected, unselected] = _.partition(
			visibleOptions,
			({ optionIndex }) => _.includes(selectedIndices, optionIndex)
		);

		const indices = _.isEmpty(unselected)
			? _.map(selected, 'optionIndex')
			: _.map(unselected, 'optionIndex');

		return onSelect(indices);
	},

	handleSelectionRemove({ event, props, props: { callbackId: optionIndex } }) {
		// We don't want to send the consumer the selection's props so we have to
		// lookup the option they clicked and send its props along
		const selectedOptionProps = _.get(
			findTypes(this.props, SearchableMultiSelect.Option),
			`[${optionIndex}].props`
		);

		return this.props.onSelect(optionIndex, {
			event,
			props: selectedOptionProps,
		});
	},

	handleRemoveAll({ event }) {
		this.props.onRemoveAll({ event, props: this.props });
	},

	handleSearch(searchText, { event }) {
		const {
			props,
			props: { onSearch, optionFilter, DropMenu: { onExpand } },
		} = this;

		const options = _.map(
			findTypes(props, SearchableMultiSelect.Option),
			'props'
		);
		const firstVisibleIndex = _.findIndex(options, option => {
			return optionFilter(searchText, option);
		});
		const firstVisibleProps = options[firstVisibleIndex];

		// Just an extra call to make sure the search results show up when a user
		// is typing
		onExpand();

		return onSearch(searchText, firstVisibleIndex, {
			event,
			props: firstVisibleProps,
		});
	},

	componentWillMount() {
		// preprocess the options data before rendering
		this.setState(
			DropMenu.preprocessOptionData(
				this.props,
				SearchableMultiSelect,
				props => !this.props.optionFilter(this.props.searchText, props)
			)
		);
	},

	componentWillReceiveProps(nextProps) {
		// only preprocess options data when it changes (via new props) - better performance than doing this each render
		this.setState(
			DropMenu.preprocessOptionData(
				nextProps,
				SearchableMultiSelect,
				props => !this.props.optionFilter(nextProps.searchText, props)
			)
		);
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

	renderOption({ optionProps, optionIndex }) {
		const { searchText, selectedIndices, isLoading, optionFilter } = this.props;

		return (
			<DropMenu.Option
				key={'SearchableMultiSelectOption' + optionIndex}
				{..._.omit(optionProps, ['children', 'Selected', 'filterText'])}
				isHidden={!optionFilter(searchText, optionProps)}
				isDisabled={optionProps.isDisabled || isLoading}
			>
				<CheckboxLabeled
					className={cx('&-CheckboxLabeled')}
					callbackId={optionIndex}
					isSelected={_.includes(selectedIndices, optionIndex)}
				>
					<CheckboxLabeled.Label>
						{_.isString(optionProps.children)
							? this.renderUnderlinedChildren(optionProps.children, searchText)
							: _.isFunction(optionProps.children)
								? React.createElement(optionProps.children, { searchText })
								: optionProps.children}
					</CheckboxLabeled.Label>
				</CheckboxLabeled>
			</DropMenu.Option>
		);
	},

	renderOptions() {
		const { searchText, isLoading, hasSelectAll, selectedIndices } = this.props;

		const {
			optionGroups,
			optionGroupDataLookup,
			ungroupedOptionData,
			flattenedOptionsData,
		} = this.state;

		const visibleOptions = _.reject(
			flattenedOptionsData,
			'optionProps.isHidden'
		);

		const isAllOptionsHidden = _.isEmpty(visibleOptions);

		const isEveryVisibleOptionSelected = _.every(
			visibleOptions,
			({ optionIndex }) => _.includes(selectedIndices, optionIndex)
		);

		const isAnyVisibleOptionSelected = _.some(
			visibleOptions,
			({ optionIndex }) => _.includes(selectedIndices, optionIndex)
		);

		// for each option group passed in, render a DropMenu.OptionGroup, any label will be included in it's children, render each option inside the group
		const dropMenuOptions = [
			<DropMenu.FixedOption
				className={cx('&-Option-select-all')}
				key={'SearchableMultiSelectOption-select-all'}
				isHidden={!hasSelectAll}
				isDisabled={isLoading}
			>
				<CheckboxLabeled
					className={cx('&-CheckboxLabeled')}
					isSelected={isEveryVisibleOptionSelected}
					isIndeterminate={
						!isEveryVisibleOptionSelected && isAnyVisibleOptionSelected
					}
					Label="Select All"
				/>
			</DropMenu.FixedOption>,
		].concat(
			_.map(optionGroups, (optionGroupProps, optionGroupIndex) => (
				<DropMenu.OptionGroup
					key={'SearchableMultiSelectOptionGroup' + optionGroupIndex}
					{..._.omit(optionGroupProps, 'children', 'Selected')}
				>
					{optionGroupProps.children}
					{_.map(optionGroupDataLookup[optionGroupIndex], this.renderOption)}
				</DropMenu.OptionGroup>
			)).concat(
				// then render all the ungrouped options at the end
				_.map(ungroupedOptionData, this.renderOption)
			)
		);

		if (!isAllOptionsHidden || _.isEmpty(searchText)) {
			return dropMenuOptions;
		}

		if (!isLoading) {
			return (
				<DropMenu.Option isDisabled>
					<span className={cx('&-noresults')}>
						No results match "{searchText}"
					</span>
				</DropMenu.Option>
			);
		}

		return null;
	},

	render() {
		const {
			props,
			props: {
				className,
				isLoading,
				isDisabled,
				maxMenuHeight,
				selectedIndices,
				DropMenu: dropMenuProps,
				DropMenu: { optionContainerStyle },
				responsiveMode,
				searchText,
				hasRemoveAll,
				hasSelections,
				...passThroughs
			},
		} = this;

		const {
			optionGroupDataLookup,
			optionGroups,
			ungroupedOptionData,
		} = this.state;

		const searchFieldProps = _.get(
			getFirst(props, SearchableMultiSelect.SearchField),
			'props',
			{}
		);
		const selectionLabel = getFirst(
			props,
			SearchableMultiSelect.SelectionLabel
		) || (
			<SearchableMultiSelect.SelectionLabel>
				Selected
			</SearchableMultiSelect.SelectionLabel>
		);
		const isSmall = responsiveMode === 'small';

		return (
			<div
				{...omitProps(passThroughs, SearchableMultiSelect)}
				className={cx('&', className)}
			>
				<DropMenu
					{...dropMenuProps}
					selectedIndices={null}
					className={cx(
						'&-DropMenu',
						{
							'&-DropMenu-is-small': isSmall,
						},
						dropMenuProps.className
					)}
					optionContainerStyle={_.assign(
						{},
						optionContainerStyle,
						!_.isNil(maxMenuHeight) ? { maxHeight: maxMenuHeight } : null
					)}
					isDisabled={isDisabled}
					onSelect={this.handleDropMenuSelect}
					ContextMenu={{
						alignmentOffset: -13,
						directonOffset: -1,
						minWidthOffset: -28,
					}}
				>
					<DropMenu.Control>
						<SearchField
							{...searchFieldProps}
							isDisabled={isDisabled}
							className={cx(
								'&-search',
								{
									'&-search-is-small': isSmall,
								},
								searchFieldProps.className
							)}
							value={searchText}
							onChange={this.handleSearch}
						/>
					</DropMenu.Control>
					{isLoading ? (
						<DropMenu.Option
							key="SearchableMultiSelectLoading"
							className={cx('&-loading')}
							isDisabled
						>
							<LoadingIcon />
						</DropMenu.Option>
					) : null}
					{this.renderOptions()}
				</DropMenu>

				{hasSelections && !_.isEmpty(selectedIndices) ? (
					<Selection
						className={cx('&-Selection-section')}
						isBold
						hasBackground
						kind="container"
						onRemove={this.handleRemoveAll}
						responsiveMode={responsiveMode}
						isRemovable={hasRemoveAll}
					>
						<Selection.Label>{selectionLabel.props.children}</Selection.Label>
						{_.map(
							optionGroupDataLookup,
							(groupedOptionsData, optionGroupIndex) => {
								const selectedGroupedOptions = _.filter(
									groupedOptionsData,
									({ optionIndex }) => _.includes(selectedIndices, optionIndex)
								);
								if (!_.isEmpty(selectedGroupedOptions)) {
									const selectedOptionGroupChildren = _.get(
										getFirst(
											optionGroups[optionGroupIndex],
											SearchableMultiSelect.OptionGroup.Selected
										),
										'props.children'
									);
									return (
										<Selection
											className={cx('&-Selection-group')}
											key={'optionGroup-' + optionGroupIndex}
											responsiveMode={responsiveMode}
											isRemovable={false}
											isBold
											kind="container"
										>
											<Selection.Label>
												{!_.isNil(selectedOptionGroupChildren)
													? selectedOptionGroupChildren
													: _.first(
															rejectTypes(
																optionGroups[optionGroupIndex].children,
																SearchableMultiSelect.Option
															)
														)}
											</Selection.Label>
											{_.map(
												selectedGroupedOptions,
												({ optionIndex, optionProps }) => {
													const selectionProps = _.get(
														getFirst(
															optionProps,
															SearchableMultiSelect.Option.Selection
														),
														'props'
													);
													return (
														<Selection
															key={optionIndex}
															{...selectionProps}
															callbackId={optionIndex}
															responsiveMode={responsiveMode}
															onRemove={this.handleSelectionRemove}
														>
															<Selection.Label>
																{_.get(
																	getFirst(
																		optionProps,
																		SearchableMultiSelect.Option.Selected
																	),
																	'props.children'
																) ||
																	(_.isFunction(optionProps.children)
																		? React.createElement(optionProps.children)
																		: optionProps.children)}
															</Selection.Label>
														</Selection>
													);
												}
											)}
										</Selection>
									);
								}
								return null;
							}
						)}
						{_.map(selectedIndices, selectedIndex => {
							const selectedUngroupedOptionData = _.find(ungroupedOptionData, {
								optionIndex: selectedIndex,
							});

							if (selectedUngroupedOptionData) {
								const { optionProps } = selectedUngroupedOptionData;
								const selectionProps = _.get(
									getFirst(optionProps, SearchableMultiSelect.Option.Selection),
									'props'
								);
								return (
									<Selection
										key={selectedIndex}
										{...selectionProps}
										callbackId={selectedIndex}
										responsiveMode={responsiveMode}
										onRemove={this.handleSelectionRemove}
									>
										<Selection.Label>
											{_.get(
												getFirst(
													optionProps,
													SearchableMultiSelect.Option.Selected
												),
												'props.children'
											) ||
												(_.isFunction(optionProps.children)
													? React.createElement(optionProps.children)
													: optionProps.children)}
										</Selection.Label>
									</Selection>
								);
							}
							return null;
						})}
					</Selection>
				) : null}
			</div>
		);
	},
});

export default buildHybridComponent(SearchableMultiSelect);
export { SearchableMultiSelect as SearchableMultiSelectDumb };
