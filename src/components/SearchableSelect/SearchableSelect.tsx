import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { StandardProps, findTypes, getFirst } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';
import { partitionText, propsSearch } from '../../util/text-manipulation';
import { buildModernHybridComponent } from '../../util/state-management';
import * as reducers from './SearchableSelect.reducers';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import {
	DropMenuDumb as DropMenu,
	IDropMenuOptionProps,
	IDropMenuOptionGroupProps,
	IDropMenuProps,
	IDropMenuState,
	IOptionsData,
} from '../DropMenu/DropMenu';
import LoadingIcon from '../Icon/LoadingIcon/LoadingIcon';
import { SearchFieldDumb as SearchField } from '../SearchField/SearchField';
import { Validation } from '../Validation/Validation';

const cx = lucidClassNames.bind('&-SearchableSelect');

const { any, bool, func, node, number, object, shape, string, oneOfType } =
	PropTypes;

/** Placeholder Child Component */
export interface ISearchableSelectPlaceholderProps extends StandardProps {
	description?: string;
}

const Placeholder = (_props: ISearchableSelectPlaceholderProps): null => null;
Placeholder.displayName = 'SearchableSelect.Placeholder';
Placeholder.peek = {
	description: `The content rendered in the control when there is no option is selected. Also rendered in the option list to remove current selection.`,
};
Placeholder.propName = 'Placeholder';
Placeholder.propTypes = {};

/** OptionGroup Child Component */
const OptionGroup = (_props: IDropMenuOptionGroupProps): null => null;
OptionGroup.displayName = 'SearchableSelect.OptionGroup';
OptionGroup.peek = {
	description: `A special kind of \`Option\` that is always rendered at the top of the menu and has an \`optionIndex\` of \`null\`. Useful for unselect.`,
};
OptionGroup.propName = 'OptionGroup';
OptionGroup.propTypes = DropMenu.OptionGroup.propTypes;
OptionGroup.defaultProps = DropMenu.OptionGroup.defaultProps;

export interface ISearchableSelectOptionProps extends IDropMenuOptionProps {
	description?: string;
	name?: string;
	Selected?: React.ReactNode;
}

/** Option.Selected Child Component */
const Selected = (_props: { children?: React.ReactNode }): null => null;

Selected.displayName = 'SearchableSelect.Option.Selected';
Selected.peek = {
	description: `Customizes the rendering of the \`Option\` when it is selected and is displayed instead of the \`Placeholder\`.`,
};
Selected.propName = 'Selected';
Selected.propTypes = {};

/** Option Child Component */
const Option = (_props: ISearchableSelectOptionProps): null => null;

Option.displayName = 'SearchableSelect.Option';
Option.peek = {
	description: `A selectable option in the list.`,
};
Option.Selected = Selected;
Option.propName = 'Option';
Option.propTypes = {
	/**
		Customizes the rendering of the Option when it is selected and is
		displayed instead of the Placeholder.
	*/
	Selected: any,
	value: string,
	filterText: string,
	...DropMenu.Option.propTypes,
};
Option.defaultProps = DropMenu.Option.defaultProps;

/** Searchable Select */
type ISearchableSelectDropMenuProps = Partial<IDropMenuProps>;

export interface ISearchableSelectProps extends StandardProps {
	hasReset: boolean;
	isDisabled: boolean;
	isInvisible: boolean;
	isLoading: boolean;
	isSelectionHighlighted: boolean;
	maxMenuHeight?: string | number;
	selectedIndex: number | null;
	searchText: string;
	DropMenu: ISearchableSelectDropMenuProps;
	Placeholder?: React.ReactNode;
	Option?: React.ReactNode;
	OptionGroup?: IDropMenuOptionGroupProps;
	Error: React.ReactNode;
	/** Called when an option is clicked, or when an option has focus and the
		Enter key is pressed. */
	onSelect: (
		optionIndex: number | null,
		{
			props,
			event,
		}: {
			props: IDropMenuOptionProps | undefined;
			event: React.KeyboardEvent | React.MouseEvent;
		}
	) => void;

	onSearch: (searchText: string, firstVisibleIndex: number | undefined) => void;

	optionFilter: (searchValue: string, props: any) => boolean;
}

export interface ISearchableSelectState {
	DropMenu: IDropMenuState;
	selectedIndex: number | null;
	searchText: string | null;
	optionGroups: IDropMenuOptionGroupProps[];
	flattenedOptionsData: IOptionsData[];
	ungroupedOptionData: IOptionsData[];
	optionGroupDataLookup: { [key: number]: IOptionsData[] };
	isFocusOnSearchFieldRequired: boolean;
}

const defaultProps = {
	hasReset: true,
	isSelectionHighlighted: true,
	isDisabled: false,
	isInvisible: false,
	isLoading: false,
	optionFilter: propsSearch,
	searchText: '',
	selectedIndex: null,
	DropMenu: DropMenu.defaultProps,
	Error: null,
	onSearch: _.noop,
	onSelect: _.noop,
};

/** SearchableSelect Component */
class SearchableSelect extends React.Component<
	ISearchableSelectProps,
	ISearchableSelectState
> {
	static displayName = 'SearchableSelect';
	static peek = {
		description: `A selector control (like native \`<select>\`) which is used to select a single option from a dropdown list using a \`SearchField\`. Supports option groups with and without labels.`,
		categories: ['controls', 'selectors'],
		madeFrom: ['DropMenu', 'SearchField'],
	};

	static defaultProps = defaultProps;
	static reducers = reducers;
	static Placeholder = Placeholder;
	static Option = Option;
	static OptionGroup = OptionGroup;
	static SearchField = SearchField;
	static NullOption = DropMenu.NullOption;
	static FixedOption = DropMenu.FixedOption;

	static propTypes = {
		/**
			Should be instances of {\`SearchableSelect.Placeholder\`,
			\`SearchableSelect.Option\`, \`SearchableSelect.OptionGroup\`}. Other
			direct child elements will not render.
		*/
		children: node,

		className: string /**
			Appended to the component-specific class names set on the root elements.
			Applies to *both* the control and the flyout menu.
		*/,

		/**
			Styles that are passed through to root element.
		*/
		style: object,

		/**
			Allows user to reset the \`optionIndex\` to \`null\` if they select the
			placeholder at the top of the options list.  If \`false\`, it will not
			render the placeholder in the menu.
		*/
		hasReset: bool,

		/**
			Disables the SearchableSelect from being clicked or focused.
		*/
		isDisabled: bool,

		/**
			The SearchableSelect will be invisible.
		*/
		isInvisible: bool,

		/**
			Displays a centered LoadingIcon to allow for asynchronous loading of
			options.
		*/
		isLoading: bool,

		/**
			Applies primary color styling to the control when an item is selected.
		*/
		isSelectionHighlighted: bool,

		/**
			The max height of the fly-out menu.
		*/
		maxMenuHeight: oneOfType([number, string]),

		onSearch: func /**
			Called when the user enters a value to search for; the set of visible
			Options will be filtered using the value.  Has the signature
			\`(searchText, firstVisibleIndex, {props, event}) => {}\` where
			\`searchText\` is the value from the \`SearchField\` and
			\`firstVisibleIndex\` is the index of the first option that will be
			visible after filtering.
		*/,

		/**
			Called when an option is selected.  Has the signature
			\`(optionIndex, {props, event}) => {}\` where \`optionIndex\` is the new
			\`selectedIndex\` or \`null\`.
		*/
		onSelect: func,

		/**
			The function that will be run against each Option's props to determine
			whether it should be visible or not. The default behavior of the function
			is to match, ignoring case, against any text node descendant of the
			\`Option\`.  Has the signature \`(searchText, optionProps)\` If \`true\`,
			option will be visible. If \`false\`, the option will not be visible.
		*/
		optionFilter: func,

		/**
			The current search text to filter the list of options by.
		*/
		searchText: string,

		/**
			The currently selected \`SearchableSelect.Option\` index or \`null\` if
			nothing is selected.
		*/
		selectedIndex: number,

		/**
			Object of DropMenu props which are passed thru to the underlying DropMenu
			component.
		*/
		DropMenu: shape(DropMenu.propTypes),

		Placeholder: any /**
			*Child Element* - The content rendered in the control when there is no
			option is selected. Also rendered in the option list to remove current
			selection.
		*/,

		Option: any /**
			*Child Element* - These are menu options. The \`optionIndex\` is in-order
			of rendering regardless of group nesting, starting with index \`0\`.
			Each \`Option\` may be passed a prop called \`isDisabled\` to disable
			selection of that \`Option\`.  Any other props pass to Option will be
			available from the \`onSelect\` handler.
		*/,

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

		/**
			In most cases this will be a string, but it also accepts any valid React
			element. If this is a falsey value, then no error message will be
			displayed.  If this is the literal \`true\`, it will add the
			\`-is-error\` class to the wrapper div, but not render the
			\`-error-content\` \`div\`.
		*/
		Error: any,
	};

	UNSAFE_componentWillMount() {
		// preprocess the options data before rendering
		const {
			optionGroups,
			flattenedOptionsData,
			ungroupedOptionData,
			optionGroupDataLookup,
		} = DropMenu.preprocessOptionData(this.props, SearchableSelect);

		this.setState({
			optionGroups,
			flattenedOptionsData,
			ungroupedOptionData,
			optionGroupDataLookup,
		});
	}

	UNSAFE_componentWillReceiveProps = (nextProps: ISearchableSelectProps) => {
		// only preprocess options data when it changes (via new props) - better performance than doing this each render
		const {
			optionGroups,
			flattenedOptionsData,
			ungroupedOptionData,
			optionGroupDataLookup,
		} = DropMenu.preprocessOptionData(nextProps, SearchableSelect);

		this.setState({
			optionGroups,
			flattenedOptionsData,
			ungroupedOptionData,
			optionGroupDataLookup,
		});
	};

	handleSearch = (searchText: string) => {
		const {
			props: { onSearch, optionFilter },
		} = this;

		const { flattenedOptionsData } = this.state;

		const firstVisibleIndex = _.get(
			_.find(flattenedOptionsData, ({ optionProps }) => {
				return optionFilter(searchText, optionProps);
			}),
			'optionIndex'
		);

		onSearch(searchText, firstVisibleIndex);
	};

	handleExpand = ({
		props,
		event,
	}: {
		props: IDropMenuProps;
		event: React.KeyboardEvent | React.MouseEvent;
	}): void => {
		const dropMenuProps = this.props.DropMenu;
		dropMenuProps.onExpand && dropMenuProps.onExpand({ event, props: props });
		this.setState({ isFocusOnSearchFieldRequired: true });
	};

	setSearchField = (e: SearchField) => {
		if (e && this.state.isFocusOnSearchFieldRequired) {
			this.setState({ isFocusOnSearchFieldRequired: false });
			// use setTimeout to prevent scroll from safari
			setTimeout(() => {
				e.focus({ preventScroll: true });
			}, 0);
		}
	};

	renderUnderlinedChildren = (childText: string, searchText: string) => {
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

	renderOption = (optionProps: IDropMenuOptionProps, optionIndex: number) => {
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
	};

	renderOptions() {
		const { searchText } = this.props;

		const { optionGroups, optionGroupDataLookup, ungroupedOptionData } =
			this.state;

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
					(option) => !option.props.isHidden
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
			(option) => !option.props.isHidden
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
	}

	render() {
		const {
			props,
			props: {
				style,
				className,
				hasReset,
				isDisabled,
				isInvisible,
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
			getFirst(props, SearchField) || <SearchField placeholder='Search...' />,
			'props'
		);

		const placeholderProps = _.first(
			_.map(findTypes(this.props, SearchableSelect.Placeholder), 'props')
		);

		const errorChildProps = _.first(
			_.map(findTypes(props, Validation.Error), 'props')
		);

		const placeholder = _.get(placeholderProps, 'children', 'Select');

		const isItemSelected = _.isNumber(selectedIndex);

		return (
			<div className={cx('&', className)} style={style}>
				<DropMenu
					{...dropMenuProps}
					optionContainerStyle={_.assign(
						{},
						optionContainerStyle,
						!_.isNil(maxMenuHeight) ? { maxHeight: maxMenuHeight } : null
					)}
					isDisabled={isDisabled}
					onSelect={onSelect}
					selectedIndices={_.isNumber(selectedIndex) ? [selectedIndex] : []}
					onExpand={this.handleExpand}
				>
					<DropMenu.Control>
						<div
							tabIndex={0}
							className={cx('&-Control', {
								'&-Control-is-highlighted':
									(!isDisabled && isItemSelected && isSelectionHighlighted) ||
									(isExpanded && isSelectionHighlighted),
								'&-Control-is-selected':
									!isDisabled &&
									isItemSelected &&
									isSelectionHighlighted &&
									!(errorChildProps && errorChildProps.children),
								'&-Control-is-expanded': isExpanded,
								'&-Control-is-invisible': isInvisible,
								'&-Control-is-disabled': isDisabled,
								'&-Control-is-error':
									errorChildProps && errorChildProps.children,
							})}
						>
							<span
								{...(!isItemSelected ? placeholderProps : null)}
								className={cx(
									'&-Control-content',
									!isItemSelected ? _.get(placeholderProps, 'className') : null
								)}
							>
								{_.isNumber(selectedIndex)
									? _.get(
											getFirst(
												flattenedOptionsData[selectedIndex].optionProps,
												SearchableSelect.Option.Selected
											),
											'props.children'
									  ) ||
									  ((Children) =>
											_.isFunction(Children) ? <Children /> : Children)(
											flattenedOptionsData[selectedIndex].optionProps.children
									  )
									: placeholder}
							</span>
							<ChevronIcon
								size={12}
								direction={isExpanded ? direction : 'down'}
							/>
						</div>
					</DropMenu.Control>
					<DropMenu.Header className={cx('&-Search-container')}>
						<SearchField
							{...searchFieldProps}
							autoComplete={searchFieldProps.autoComplete || 'off'}
							onChange={this.handleSearch}
							value={searchText}
							ref={this.setSearchField}
						/>
					</DropMenu.Header>
					{isLoading && (
						<DropMenu.Option
							key='SearchableSelectLoading'
							className={cx('&-Loading')}
							isDisabled
						>
							<LoadingIcon />
						</DropMenu.Option>
					)}
					{hasReset && isItemSelected && (
						<DropMenu.NullOption {...placeholderProps}>
							{placeholder}
						</DropMenu.NullOption>
					)}
					{this.renderOptions()}
				</DropMenu>
				{errorChildProps &&
				errorChildProps.children &&
				errorChildProps.children !== true ? (
					<div
						{..._.omit(errorChildProps, ['initialState', 'callbackId'])}
						className={cx('&-error-content')}
					>
						{errorChildProps.children}
					</div>
				) : null}
			</div>
		);
	}
}

export default buildModernHybridComponent<
	ISearchableSelectProps,
	ISearchableSelectState,
	typeof SearchableSelect
>(SearchableSelect as any, { reducers });
export { SearchableSelect as SearchableSelectDumb };
