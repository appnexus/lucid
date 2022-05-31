/* eslint-disable react/prop-types */
import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { buildModernHybridComponent } from '../../util/state-management';
import { partitionText, propsSearch } from '../../util/text-manipulation';
import {
	StandardProps,
	getFirst,
	findTypes,
	rejectTypes,
	addSpecialOmittedProps,
} from '../../util/component-types';
import {
	SearchFieldDumb as SearchField,
	ISearchFieldProps,
} from '../SearchField/SearchField';
import {
	IDropMenuProps,
	IDropMenuState,
	IDropMenuOptionProps,
	IDropMenuOptionGroupProps,
	IOptionsData,
	DropMenuDumb as DropMenu,
} from '../DropMenu/DropMenu';
import LoadingIcon from '../Icon/LoadingIcon/LoadingIcon';
import CheckboxLabeled from '../CheckboxLabeled/CheckboxLabeled';
import Selection, {
	ISelectionProps,
	ISelectionLabelProps,
} from '../Selection/Selection';
import { Validation } from '../Validation/Validation';

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

/** SearchableMultiSelect.SelectionOption */
const SelectionOption = (_props: ISelectionProps): null => null;
SelectionOption.displayName = 'SearchableMultiSelect.Option.Selection';
SelectionOption.propTypes = Selection.propTypes;
SelectionOption.propName = 'Selection';
SelectionOption.peek = {
	description: `
		Customizes the rendering of the Option when it is selected
		and is displayed instead of the Placeholder.
	`,
};

/** SearchableMultiSelect.Option.Selected */
const Selected = (_props: { children?: React.ReactNode }): null => null;
Selected.displayName = 'SearchableMultiSelect.Option.Selected';
Selected.peek = {
	description: `
		Customizes the rendering of the Option when it is selected
		and is displayed instead of the Placeholder.
	`,
};
Selected.propName = 'Selected';
Selected.propTypes = {};

/** SearchableMultiSelect.OptionGroup */
interface ISearchableSingleSelectOptionGroupProps
	extends IDropMenuOptionGroupProps {
	Selected?: React.ReactNode;
}
const OptionGroup = (_props: ISearchableSingleSelectOptionGroupProps): null =>
	null;
OptionGroup.displayName = 'SearchableMultiSelect.OptionGroup';
OptionGroup.peek = {
	description: `
		A special kind of \`Option\` that is always rendered at the top of
		the menu and has an \`optionIndex\` of \`null\`. Useful for
		unselect.
	`,
};
OptionGroup.propName = 'OptionGroup';
OptionGroup.propTypes = DropMenu.OptionGroup.propTypes;
OptionGroup.defaultProps = DropMenu.OptionGroup.defaultProps;
OptionGroup.Selected = Selected;

/** SearchableMultiSelect.SearchField */
const SearchFieldComponent = (_props: ISearchFieldProps): null => null;
SearchFieldComponent.displayName = 'SearchableMultiSelect.SearchField';
SearchFieldComponent.peek = {
	description: `
		Passes props through to the \`Search Field\`.
	`,
};
SearchFieldComponent.propName = 'SearchField';
SearchFieldComponent.propTypes = SearchField.propTypes;
SearchFieldComponent.defaultProps = SearchField.defaultProps;

/** Option Child Component */
type ISearchableMultiSelectOptionSelectionProps = Partial<ISelectionProps>;
export interface ISearchableMultiSelectOptionProps
	extends IDropMenuOptionProps {
	Selection?: ISearchableMultiSelectOptionSelectionProps;
	description?: string;
	name?: string;
	Selected?: React.ReactNode;
}

const Option = (_props: ISearchableMultiSelectOptionProps): null => null;

Option.displayName = 'SearchableMultiSelect.Option';
Option.peek = {
	description: `
		A selectable option in the list.
	`,
};
Option.Selection = SelectionOption;
Option.Selected = Selected;
Option.propName = 'Option';
Option.propTypes = {
	/**
		Customizes the rendering of the Option when it is selected and is
		displayed instead of the Placeholder.
  */
	Selected: any,
	/**
        Uses a Selection object for custom rendering of the selected option
    */
	Selection: any,
	value: string,
	filterText: string,
	...DropMenu.Option.propTypes,
};
Option.defaultProps = DropMenu.Option.defaultProps;

/** SearchableMultiSelect */
/** TODO: Remove these prop constants when the component is converted to a functional component */
const props = [
	'children',
	'className',
	'isDisabled',
	'isLoading',
	'maxMenuHeight',
	'onSearch',
	'onSelect',
	'onRemoveAll',
	'optionFilter',
	'searchText',
	'selectedIndices',
	'DropMenu',
	'Option',
	'responsiveMode',
	'hasRemoveAll',
	'hasSelections',
	'hasSelectAll',
	'selectAllText',
	'Error',
	'FixedOption',
	'NullOption',
	'OptionGroup',
	'SearchField',
	'Label',
];
const nonPassThroughs = addSpecialOmittedProps(props, true);

export type Size = 'large' | 'medium' | 'small';

export interface ISearchableMultiSelectProps extends StandardProps {
	isDisabled?: boolean;
	isLoading: boolean;
	maxMenuHeight?: string | null;
	hasRemoveAll: boolean;
	hasSelectAll?: boolean;
	selectAllText?: string;
	hasSelections?: boolean;
	searchText: string;
	initialState?: any;
	responsiveMode: Size;
	selectedIndices?: number[];
	SearchField?: React.ReactNode;
	DropMenu: IDropMenuProps;
	Option?: ISearchableMultiSelectOptionProps;
	OptionGroup?: IDropMenuOptionGroupProps;
	SelectionLabel?: ISelectionLabelProps;
	Error?: React.ReactNode;

	onSelect: (
		optionIndices: number[] | number,
		{
			props,
			event,
		}: {
			props: IDropMenuOptionProps | undefined;
			event: React.KeyboardEvent | React.MouseEvent;
		}
	) => void;

	onSearch: (
		searchText: string,
		firstVisibleIndex: number | null,
		{
			props,
			event,
		}: {
			props: IDropMenuOptionProps;
			event: React.KeyboardEvent | React.MouseEvent;
		}
	) => void;

	optionFilter: (searchValue: string, props: any) => boolean;

	onRemoveAll: ({
		props,
		event,
	}: {
		props: IDropMenuOptionProps;
		event: React.KeyboardEvent | React.MouseEvent;
	}) => void;
}

export interface ISearchableMultiSelectState {
	DropMenu: IDropMenuState;
	selectedIndices: number[];
	searchText: string | null;
	optionGroups: IDropMenuOptionGroupProps[];
	flattenedOptionsData: IOptionsData[];
	ungroupedOptionData: IOptionsData[];
	optionGroupDataLookup: { [key: number]: IOptionsData[] };
}

const defaultProps = {
	isDisabled: false,
	isLoading: false,
	hasRemoveAll: true,
	hasSelections: true,
	hasSelectAll: false,
	selectAllText: 'Select All',
	searchText: '',
	responsiveMode: 'large' as const,
	selectedIndices: [],
	DropMenu: DropMenu.defaultProps,
	Error: null,
	optionFilter: propsSearch,
	onSearch: _.noop,
	onRemoveAll: _.noop,
	onSelect: _.noop,
};

class SearchableMultiSelect extends React.Component<
	ISearchableMultiSelectProps,
	ISearchableMultiSelectState
> {
	static displayName = 'SearchableMultiSelect';
	static peek = {
		description: `A control used to select multiple options from a dropdown list using a \`SearchField\`.`,
		categories: ['controls', 'selectors'],
		madeFrom: [
			'Checkbox',
			'SearchField',
			'DropMenu',
			'LoadingIcon',
			'Selection',
		],
	};

	static defaultProps = defaultProps;
	static reducers = reducers;
	static Option = Option;
	static OptionGroup = OptionGroup;
	static SearchField = SearchFieldComponent;
	static NullOption = DropMenu.NullOption;
	static FixedOption = DropMenu.FixedOption;
	static DropMenu = DropMenu;
	static SelectionLabel = Selection.Label;

	static propTypes = {
		/**
			Should be instances of \`SearchableMultiSelect.Option\`. Other direct
			child elements will not render.
		*/
		children: node,

		/**
			Appended to the component-specific class names set on the root element.
		*/
		className: string,

		/**
			Disables the control from being clicked or focused.
		*/
		isDisabled: bool,

		/**
			Displays a LoadingIcon to allow for asynchronous loading of options.
		*/
		isLoading: bool,

		/**
			The max height of the fly-out menu.
		*/
		maxMenuHeight: oneOfType([number, string]),

		onSearch: func /**
			Called when the user enters a value to search for; the set of visible
			Options will be filtered using the value.  Signature: \`(searchText,
			firstVisibleIndex, {props, event}) => {}\` \`searchText\` is the value
			from the \`SearchField\` and \`firstVisibleIndex\` is the index of the
			first option that will be visible after filtering.
		*/,

		/**
			Called when an option is selected.  Signature: \`(optionIndex, {props,
			event}) => {}\` \`optionIndex\` is the new \`selectedIndex\` or \`null\`.
		*/
		onSelect: func,

		/**
			Called when the user clicks to remove all selections.  Signature:
			\`({props, event}) => {}\`.
		*/
		onRemoveAll: func,

		/**
			The function that will be run against each Option's props to determine
			whether it should be visible or not. The default behavior of the function
			is to match, ignoring case, against any text node descendant of the
			\`Option\`.  Signature: \`(searchText, optionProps) => {}\` If \`true\`
			is returned, the option will be visible. If \`false\`, the option will
			not be visible.
		*/
		optionFilter: func,

		/**
			The current search text to filter the list of options by.
		*/
		searchText: string,

		/**
			An array of currently selected \`SearchableMultiSelect.Option\` indices
			or \`null\` if nothing is selected.
		*/
		selectedIndices: arrayOf(number),

		/**
			Object of DropMenu props which are passed through to the underlying
			DropMenu component.
		*/
		DropMenu: shape(DropMenu.propTypes),

		Option: any /**
			*Child Element* - These are menu options. Each \`Option\` may be passed a
			prop called \`isDisabled\` to disable selection of that \`Option\`. Any
			other props pass to Option will be available from the \`onSelect\`
			handler.  It also support the \`Selection\` prop that can be used to
			forward along props to the underlying \`Selection\` component.
		*/,

		/**
			Adjusts the display of this component. This should typically be driven by
			screen size. Currently \`small\` and \`large\` are explicitly handled by
			this component.
		*/
		responsiveMode: oneOf(['small', 'medium', 'large']),

		/**
			Controls the visibility of the "remove all" button that's shown with the
			selected items.
		*/
		hasRemoveAll: bool,

		/**
			Controls the visibility of the \`Selection\` component that appears below
			the search field.
		*/
		hasSelections: bool,

		/**
			Controls whether to show a "Select All" option.
		*/
		hasSelectAll: bool,

		/**
			The select all text.
		*/
		selectAllText: string,

		/**
			In most cases this will be a string, but it also accepts any valid React
			element. If this is a falsey value, then no error message will be
			displayed.  If this is the literal \`true\`, it will add the
			\`-is-error\` class to the wrapper div, but not render the
			\`-error-content\` \`div\`.
    */
		Error: any,

		FixedOption: any /**
			*Child Element* - A special kind of \`Option\` that is always rendered at the top of
			the menu.
		*/,

		NullOption: any /**
			*Child Element* - A special kind of \`Option\` that is always rendered at
			the top of the menu and has an \`optionIndex\` of \`null\`. Useful for
			unselect.
		*/,

		OptionGroup: any /**
			*Child Element* - Used to group \`Option\`s within the menu. Any
			non-\`Option\`s passed in will be rendered as a label for the group.
    */,

		SearchField: any /**
			*Child Element* - The visual Search element that the user can pass text
			to.
		*/,

		Label: any /**
			*Child Element* - A custom label used as header text when options are
			selected.
		*/,
	};

	handleDropMenuSelect = (
		optionIndex: number | null,
		{
			event,
			props,
		}: {
			props: IDropMenuOptionProps | undefined;
			event: React.KeyboardEvent | React.MouseEvent;
		}
	): void => {
		const { onSelect } = this.props;

		event.preventDefault();

		if (optionIndex === 0) {
			return this.handleSelectAll({ event, props });
		}
		// this index is decremented to account for the "Select All" Option
		if (optionIndex) {
			return onSelect(optionIndex - 1, { event, props });
		}
	};

	handleSelectAll = ({
		event,
		props,
	}: {
		event: React.KeyboardEvent | React.MouseEvent;
		props: IDropMenuOptionProps | undefined;
	}): void => {
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

		return onSelect(indices, {
			props: props,
			event,
		});
	};

	handleSelectionRemove = ({
		event,
		props,
		props: { callbackId: optionIndex },
	}: {
		event: React.KeyboardEvent | React.MouseEvent;
		props: any;
	}): void => {
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
	};

	handleRemoveAll = ({
		event,
		props,
	}: {
		event: React.KeyboardEvent | React.MouseEvent;
		props: IDropMenuOptionProps;
	}): void => {
		this.props.onRemoveAll({ event, props });
	};

	handleSearch = (
		searchText: string,
		{ event }: { event: React.KeyboardEvent | React.MouseEvent }
	): void => {
		const {
			props,
			props: {
				onSearch,
				optionFilter,
				DropMenu: { onExpand },
			},
		} = this;

		const options = _.map(
			findTypes(props, SearchableMultiSelect.Option),
			'props'
		);

		const firstVisibleIndex = _.findIndex(options, (option) => {
			return optionFilter(searchText, option);
		});

		const trueIndex = firstVisibleIndex === -1 ? -1 : firstVisibleIndex + 1;

		const firstVisibleProps = options[trueIndex];
		const dropMenuProps = this.props.DropMenu;

		// Just an extra call to make sure the search results show up when a user
		// is typing
		onExpand &&
			onExpand({
				event,
				props: dropMenuProps,
			});

		return onSearch(searchText, trueIndex, {
			event,
			props: firstVisibleProps,
		});
	};

	UNSAFE_componentWillMount(): void {
		// preprocess the options data before rendering
		const {
			optionGroups,
			flattenedOptionsData,
			ungroupedOptionData,
			optionGroupDataLookup,
		} = DropMenu.preprocessOptionData(this.props, SearchableMultiSelect);

		this.setState({
			optionGroups,
			flattenedOptionsData,
			ungroupedOptionData,
			optionGroupDataLookup,
		});
	}

	UNSAFE_componentWillReceiveProps(
		nextProps: ISearchableMultiSelectProps
	): void {
		// only preprocess options data when it changes (via new props) - better performance than doing this each render
		const {
			optionGroups,
			flattenedOptionsData,
			ungroupedOptionData,
			optionGroupDataLookup,
		} = DropMenu.preprocessOptionData(nextProps, SearchableMultiSelect);

		this.setState({
			optionGroups,
			flattenedOptionsData,
			ungroupedOptionData,
			optionGroupDataLookup,
		});
	}

	renderUnderlinedChildren = (childText: string, searchText: string): any => {
		const [pre, match, post] = partitionText(
			childText,
			new RegExp(_.escapeRegExp(searchText), 'i'),
			searchText.length
		);

		return [
			pre && (
				<span key='pre' className={cx('&-Option-underline-pre')}>
					{pre}
				</span>
			),
			match && (
				<span key='match' className={cx('&-Option-underline-match')}>
					{match}
				</span>
			),
			post && (
				<span key='post' className={cx('&-Option-underline-post')}>
					{post}
				</span>
			),
		];
	};

	renderOption = ({
		optionProps,
		optionIndex,
	}: {
		optionProps: ISearchableMultiSelectOptionProps;
		optionIndex: number;
	}): React.ReactElement => {
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
					callbackId={optionIndex.toString()}
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
	};

	renderOptions = (): React.ReactElement[] | React.ReactElement | null => {
		const {
			searchText,
			isLoading,
			hasSelectAll,
			selectedIndices,
			selectAllText,
		} = this.props;

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
				>
					<CheckboxLabeled.Label>{selectAllText}</CheckboxLabeled.Label>
				</CheckboxLabeled>
			</DropMenu.FixedOption>,
		].concat(
			_.map(optionGroups, (optionGroupProps, optionGroupIndex) => (
				<DropMenu.OptionGroup
					key={'SearchableMultiSelectOptionGroup' + optionGroupIndex}
					{..._.omit(optionGroupProps, 'children', 'Selected')}
				>
					{optionGroupProps.children}
					{_.map(optionGroupDataLookup[optionGroupIndex], (option) =>
						this.renderOption(option)
					)}
				</DropMenu.OptionGroup>
			)).concat(
				// then render all the ungrouped options at the end
				_.map(ungroupedOptionData, (option) => this.renderOption(option))
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
	};

	render = () => {
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
		const { optionGroupDataLookup, optionGroups, ungroupedOptionData } =
			this.state;
		const searchFieldProps = _.get(
			getFirst(props, SearchableMultiSelect.SearchField),
			'props',
			{}
		);
		const errorChildProps = _.first(
			_.map(findTypes(props, Validation.Error), 'props')
		);
		const selectionLabel = _.get(
			getFirst(props, SearchableMultiSelect.SelectionLabel),
			'props',
			{}
		) || (
			<SearchableMultiSelect.SelectionLabel>
				Selected
			</SearchableMultiSelect.SelectionLabel>
		);
		const isSmall = responsiveMode === 'small';

		return (
			<div
				{...(omit(passThroughs, nonPassThroughs) as any)}
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
							autoComplete={searchFieldProps.autoComplete || 'off'}
							isDisabled={isDisabled}
							className={cx(
								'&-search',
								{
									'&-search-is-small': isSmall,
									'&-search-is-error':
										errorChildProps && errorChildProps.children,
								},
								searchFieldProps.className
							)}
							value={searchText}
							onChange={this.handleSearch}
						/>
					</DropMenu.Control>
					{isLoading ? (
						<DropMenu.Option
							key='SearchableMultiSelectLoading'
							className={cx('&-loading')}
							isDisabled
						>
							<LoadingIcon />
						</DropMenu.Option>
					) : null}
					{this.renderOptions()}
				</DropMenu>

				{hasSelections && !_.isEmpty(selectedIndices) ? (
					<div className={cx('&-Selection-padding')}>
						<Selection
							className={cx('&-Selection-section')}
							isBold
							hasBackground
							kind='container'
							onRemove={this.handleRemoveAll}
							responsiveMode={responsiveMode}
							isRemovable={hasRemoveAll}
						>
							<Selection.Label>
								{selectionLabel.children ? selectionLabel.children : 'Selected'}
							</Selection.Label>
							{_.map(
								optionGroupDataLookup,
								(groupedOptionsData: any[], optionGroupIndex: number) => {
									const selectedGroupedOptions = _.filter(
										groupedOptionsData,
										({ optionIndex }) =>
											_.includes(selectedIndices, optionIndex)
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
												kind='container'
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
																			? React.createElement(
																					optionProps.children
																			  )
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
							{_.map(selectedIndices, (selectedIndex) => {
								const selectedUngroupedOptionData = _.find(
									ungroupedOptionData,
									{
										optionIndex: selectedIndex,
									}
								);
								if (selectedUngroupedOptionData) {
									const { optionProps } = selectedUngroupedOptionData;
									const selectionProps = _.get(
										getFirst(
											optionProps,
											SearchableMultiSelect.Option.Selection
										),
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
					</div>
				) : null}
				{errorChildProps &&
				errorChildProps.children &&
				errorChildProps.children !== true ? (
					<div
						{...omit(errorChildProps, ['initialState', 'callbackId'])}
						className={cx('&-error-content')}
					>
						{errorChildProps.children}
					</div>
				) : null}
			</div>
		);
	};
}

export default buildModernHybridComponent<
	ISearchableMultiSelectProps,
	ISearchableMultiSelectState,
	typeof SearchableMultiSelect
>(SearchableMultiSelect as any, { reducers });
export { SearchableMultiSelect as SearchableMultiSelectDumb };
