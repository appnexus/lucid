/* eslint-disable react/prop-types */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { buildModernHybridComponent } from '../../util/state-management';
import { partitionText, propsSearch } from '../../util/text-manipulation';
import {
	StandardProps,
	omitProps,
	getFirst,
	findTypes,
} from '../../util/component-types';
import { SearchFieldDumb as SearchField } from '../SearchField/SearchField';
import {
	IDropMenuProps,
	IDropMenuState,
	IDropMenuOptionProps,
	IDropMenuOptionGroupProps,
	DropMenuDumb as DropMenu,
} from '../DropMenu/DropMenu';
import LoadingIcon from '../Icon/LoadingIcon/LoadingIcon';
import Selection from '../Selection/Selection';
import { Validation } from '../Validation/Validation';
import * as reducers from './SearchableSingleSelect.reducers';
import { onSelect } from '../Tabs/Tabs.reducers';

const { any, bool, func, number, oneOfType, shape, string, node } = PropTypes;

const cx = lucidClassNames.bind('&-SearchableSingleSelect');

const OptionGroup = (_props: IDropMenuOptionGroupProps): null => null;
OptionGroup.displayName = 'SearchableSingleSelect.OptionGroup';
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

/** Option Child Component */
export interface ISearchableSingleSelectOptionProps extends IDropMenuOptionProps {
	description?: string;
	name?: string;
	Selected?: React.ReactNode;
}

const Selected = (_props: { children?: React.ReactNode }): null => null;

Selected.displayName = 'SearchableSingleSelect.Option.Selected';
Selected.peek = {
	description: `
		Customizes the rendering of the Option when it is selected
		and is displayed instead of the Placeholder.
	`,
};
Selected.propName = 'Selected';
Selected.propTypes = {};

const Option = (_props: ISearchableSingleSelectOptionProps): null => null;

Option.displayName = 'SearchableSingleSelect.Option';
Option.peek = {
	description: `
		A selectable option in the list.
	`,
};
Option.Selected = Selected;
Option.propName = 'Option';
Option.propTypes = {
	Selected: any`
		Customizes the rendering of the Option when it is selected and is
		displayed instead of the Placeholder.
	`,
	value: string,
	filterText: string,
	...DropMenu.Option.propTypes,
};
Option.defaultProps = DropMenu.Option.defaultProps;

type ISearchableSingleSelectDropMenuProps = Partial<IDropMenuProps>;

export interface ISearchableSingleSelectProps extends StandardProps {
	hasReset: boolean;
	isDisabled: boolean;
	isLoading: boolean;
	maxMenuHeight?: string;
	selectedIndex: number | null;
	searchText: string;
	DropMenu: ISearchableSingleSelectDropMenuProps;
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
			props: IDropMenuOptionProps;
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

	optionFilter: (
		searchValue: string,
		props: any
	) => boolean;

}

export interface ISearchableSingleSelectState extends IDropMenuState {
	DropMenu: IDropMenuState;
	selectedIndex: number | null;
	searchText: string | null;
}

const defaultProps = {
	isDisabled: false,
	isLoading: false,
	optionFilter: propsSearch,
	searchText: '',
	selectedIndex: null,
	DropMenu: DropMenu.defaultProps,
	Error: null,
	onSearch: _.noop,
	onSelect: _.noop,
}

class SearchableSingleSelect extends React.Component<ISearchableSingleSelectProps, ISearchableSingleSelectState> {
	static displayName = 'SearchableSingleSelect';
	static peek = {
		description: `
			A control used to select a single option from a dropdown list using a SearchField.
		`,
		categories: ['controls', 'selectors'],
		madeFrom: ['Checkbox', 'SearchField', 'DropMenu', 'LoadingIcon'],
	};

	static defaultProps = defaultProps;
	static reducers = reducers;
	static Option = Option;
	static OptionGroup = OptionGroup;
	static SearchField = SearchField;
	static NullOption = DropMenu.NullOption;
	static FixedOption = DropMenu.FixedOption;
	static DropMenu = DropMenu;

	static propTypes: any = {
		children: node`
			Should be instances of {\`SearchableSingleSelect.Option\`}. Other direct
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

		selectedIndex: number`
			Currently selected \`SearchableSingleSelect.Option\` index
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

		Error: any`
			In most cases this will be a string, but it also accepts any valid React
			element. If this is a falsey value, then no error message will be
			displayed.  If this is the literal \`true\`, it will add the
			\`-is-error\` class to the wrapper div, but not render the
			\`-error-content\` \`div\`.
		`,

		FixedOption: any`
			*Child Element* - A special kind of \`Option\` that is always rendered at the top of
			the menu.
		`,

		NullOption: any`
			*Child Element* - A special kind of \`Option\` that is always rendered at
			the top of the menu and has an \`optionIndex\` of \`null\`. Useful for
			unselect.
		`
	};

	getInitialState(): any {
		return {
			optionGroups: [],
			flattenedOptionsData: [],
			ungroupedOptionData: [],
			optionGroupDataLookup: {},
		};
	};

	componentWillMount(): void {
		// preprocess the options data before rendering
		this.setState(
			DropMenu.preprocessOptionData(
				this.props,
				SearchableSingleSelect
			)
		);
	};

	componentWillReceiveProps(nextProps: ISearchableSingleSelectProps): void {
		// only preprocess options data when it changes (via new props) - better performance than doing this each render
		this.setState(
			DropMenu.preprocessOptionData(
				nextProps,
				SearchableSingleSelect
			)
		);
	};

	handleSearch = (searchText: string, { event }: { event: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent> }) => {
		const {
			props,
			props: {
				onSearch,
				optionFilter,
				DropMenu: { onExpand },
			},
		} = this;

		const options = _.map(
			findTypes(props, SearchableSingleSelect.Option),
			'props'
		);
		const firstVisibleIndex = _.findIndex(options, option => {
			return optionFilter(searchText, option);
		});
		const firstVisibleProps = options[firstVisibleIndex];

		// Just an extra call to make sure the search results show up when a user
		// is typing
		onExpand;

		return onSearch(searchText, firstVisibleIndex, {
			event,
			props: firstVisibleProps,
		});
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

	renderOptionContent = (optionProps: ISearchableSingleSelectOptionProps, searchText: string) => {
		return _.isString(optionProps.children) &&
			_.isString(searchText) &&
			searchText.length > 0
			? this.renderUnderlinedChildren(optionProps.children, searchText)
			: _.isFunction(optionProps.children)
				? React.createElement(optionProps.children, { searchText })
				: optionProps.children;
	};

	renderOption = ({ optionProps, optionIndex }: { optionProps: ISearchableSingleSelectOptionProps, optionIndex: number | null}) => {
		const { searchText, isLoading, optionFilter } = this.props;
		return (
			<DropMenu.Option
				key={'SearchableSingleSelectOption' + optionIndex}
				{..._.omit(optionProps, ['children', 'Selected', 'filterText'])}
				isHidden={!optionFilter(searchText, optionProps)}
				isDisabled={optionProps.isDisabled || isLoading}
			>
				{this.renderOptionContent(optionProps, searchText)}
			</DropMenu.Option>
		);
	};

	renderOptions = () => {
		const { searchText, isLoading } = this.props;

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

		// for each option group passed in, render a DropMenu.OptionGroup, any label will be included in it's children, render each option inside the group
		const dropMenuOptions = _.map(
			optionGroups,
			(optionGroupProps, optionGroupIndex) => (
				<DropMenu.OptionGroup
					key={'SearchableSingleSelectOptionGroup' + optionGroupIndex}
					{..._.omit(optionGroupProps, 'children', 'Selected')}
				>
					{optionGroupProps.children}
					{_.map(optionGroupDataLookup[optionGroupIndex], this.renderOption)}
				</DropMenu.OptionGroup>
			)
		).concat(
			// then render all the ungrouped options at the end
			_.map(ungroupedOptionData, options => this.renderOption(options))
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

	// need to figure out how to trigger the onCollapse with different props
	// specifically IDropMenuProps
	removeSelection = ({ event, props }: 
		{
			event: React.KeyboardEvent<Element> | React.MouseEvent<Element, MouseEvent>, 
			props: ISearchableSingleSelectOptionProps
		}) => {
		this.props.DropMenu.onCollapse;
		this.props.onSearch('', null, {event, props});
		this.props.onSelect(null, { event, props });
	};

	render = () => {
		const {
			props,
			props: {
				className,
				isLoading,
				isDisabled,
				maxMenuHeight,
				DropMenu: dropMenuProps,
				DropMenu: { optionContainerStyle },
				searchText,
				selectedIndex,
				onSelect,
				...passThroughs
			},
		} = this;

		const searchFieldProps = _.get(
			getFirst(props, SearchableSingleSelect.SearchField),
			'props',
			{}
		);
		const errorChildProps = _.first(
			_.map(findTypes(props, Validation.Error), 'props')
		);

		//user made a selection
		if (!_.isNil(selectedIndex)) {
			const selectedOptionProps = this.state.flattenedOptionsData[
				selectedIndex
			].optionProps;

			return (
				<div
					{...omitProps(passThroughs, undefined)}
					className={cx('&', className)}
				>
					<Selection
						Label={
							_.isNil(selectedOptionProps.Selected)
								? this.renderOptionContent(selectedOptionProps, '')
								: selectedOptionProps.Selected
						}
						className={cx('&', {
							'&-select-error': errorChildProps && errorChildProps.children && errorChildProps.children !== true
						}, className)}
						onRemove={this.removeSelection}
						kind='default'
					/>
					{errorChildProps &&
						errorChildProps.children &&
						errorChildProps.children !== true ? (
							<div
								{...omitProps(errorChildProps, undefined)}
								className={cx('&-error-select-content')}
							>
								{errorChildProps.children}
							</div>
						) : null}
				</div>
			);
		}

		return (
			<div
				{...omitProps(passThroughs, undefined)}
				className={cx('&', className)}
			>
				<DropMenu
					{...dropMenuProps}
					selectedIndices={null}
					className={cx(
						'&-DropMenu',
						{
							'&-DropMenu-is-small': true,
						},
						dropMenuProps.className
					)}
					optionContainerStyle={_.assign(
						{},
						optionContainerStyle,
						!_.isNil(maxMenuHeight) ? { maxHeight: maxMenuHeight } : null
					)}
					isDisabled={isDisabled}
					onSelect={onSelect}
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
							className={cx('&-search', {
								'&-search-is-error': errorChildProps && errorChildProps.children
							},
								searchFieldProps.className)}
							value={searchText}
							onChange={this.handleSearch}
						/>
					</DropMenu.Control>
					{isLoading ? (
						<DropMenu.Option
							key='SearchableSingleSelectLoading'
							className={cx('&-loading')}
							isDisabled
						>
							<LoadingIcon />
						</DropMenu.Option>
					) : null}
					{this.renderOptions()}
				</DropMenu>
				{errorChildProps &&
					errorChildProps.children &&
					errorChildProps.children !== true ? (
						<div
							{...omitProps(errorChildProps, undefined)}
							className={cx('&-error-content')}
						>
							{errorChildProps.children}
						</div>
					) : null}
			</div>
		);
	}
}

// const SearchableSingleSelect = createClass({
// 	displayName: 'SearchableSingleSelect',

// 	statics: {
// 		peek: {
// 			description: `
// 				A control used to select a single option from a dropdown list using a SearchField.
// 			`,
// 			categories: ['controls', 'selectors'],
// 			madeFrom: ['Checkbox', 'SearchField', 'DropMenu', 'LoadingIcon'],
// 		},
// 	},

// 	reducers,

// 	components: {
// 		Option: createClass({
// 			displayName: 'SearchableSingleSelect.Option',
// 			statics: {
// 				peek: {
// 					description: `
// 						A selectable option in the list.
// 					`,
// 				},
// 			},
// 			propName: 'Option',
// 			propTypes: {
// 				filterText: string`
// 					Text used to filter options when searching. By default, this is the
// 					text rendered in the Option, but it can be customized further with
// 					this prop.
// 				`,
// 				...DropMenu.Option.propTypes,
// 			},
// 			components: {
// 				Selected: createClass({
// 					displayName: 'SearchableSingleSelect.Option.Selected',
// 					statics: {
// 						peek: {
// 							description: `
// 								Customizes the rendering of the Option label when it is
// 								selected and is displayed .
// 							`,
// 						},
// 					},
// 					propName: 'Selected',
// 				}),
// 			},
// 		}),
// 		SearchField: createClass({
// 			displayName: 'SearchableSingleSelect.SearchField',
// 			statics: {
// 				peek: {
// 					description: `
// 						Passes props through to the \`SearchField\` component.
// 					`,
// 				},
// 			},
// 			propName: 'SearchField',
// 			propTypes: SearchField.propTypes,
// 		}),

// 		OptionGroup: createClass({
// 			displayName: 'SearchableSingleSelect.OptionGroup',
// 			statics: {
// 				peek: {
// 					description: `
// 						Groups \`Option\`s together with a non-selectable heading.
// 					`,
// 				},
// 			},
// 			propName: 'OptionGroup',
// 			propTypes: DropMenu.OptionGroup.propTypes,
// 			components: {
// 				Selected: createClass({
// 					displayName: 'SearchableSingleSelect.OptionGroup.Selected',
// 					statics: {
// 						peek: {
// 							description: `
// 								Customizes the rendering of the OptionGroup label when it is
// 								selected and is displayed.
// 							`,
// 						},
// 					},
// 					propName: 'Selected',
// 				}),
// 			},
// 		}),
// 	},

// 	propTypes: {
// 		children: node`
// 			Should be instances of {\`SearchableSingleSelect.Option\`}. Other direct
// 			child elements will not render.
// 		`,

// 		className: string`
// 			Appended to the component-specific class names set on the root element.
// 		`,

// 		isDisabled: bool`
// 			Disables the control from being clicked or focused.
// 		`,

// 		isLoading: bool`
// 			Displays a LoadingIcon to allow for asynchronous loading of options.
// 		`,

// 		maxMenuHeight: oneOfType([number, string])`
// 			The max height of the fly-out menu.
// 		`,

// 		onSearch: func`
// 			Called when the user enters a value to search for; the set of visible
// 			Options will be filtered using the value.  Signature: \`(searchText,
// 			firstVisibleIndex, {props, event}) => {}\` \`searchText\` is the value
// 			from the \`SearchField\` and \`firstVisibleIndex\` is the index of the
// 			first option that will be visible after filtering.
// 		`,

// 		onSelect: func`
// 			Called when an option is selected.  Signature: \`(optionIndex, {props,
// 			event}) => {}\` \`optionIndex\` is the new \`selectedIndex\` or \`null\`.
// 		`,

// 		optionFilter: func`
// 			The function that will be run against each Option's props to determine
// 			whether it should be visible or not. The default behavior of the function
// 			is to match, ignoring case, against any text node descendant of the
// 			\`Option\`.  Signature: \`(searchText, optionProps) => {}\` If \`true\`
// 			is returned, the option will be visible. If \`false\`, the option will
// 			not be visible.
// 		`,

// 		searchText: string`
// 			The current search text to filter the list of options by.
// 		`,

// 		selectedIndex: number`
// 			Currently selected \`SearchableSingleSelect.Option\` index
// 			or \`null\` if nothing is selected.
// 		`,

// 		DropMenu: shape(DropMenu.propTypes)`
// 			Object of DropMenu props which are passed through to the underlying
// 			DropMenu component.
// 		`,

// 		Option: any`
// 			*Child Element* - These are menu options. Each \`Option\` may be passed a
// 			prop called \`isDisabled\` to disable selection of that \`Option\`. Any
// 			other props pass to Option will be available from the \`onSelect\`
// 			handler.  It also support the \`Selection\` prop that can be used to
// 			forward along props to the underlying \`Selection\` component.
// 		`,

// 		Error: any`
// 			In most cases this will be a string, but it also accepts any valid React
// 			element. If this is a falsey value, then no error message will be
// 			displayed.  If this is the literal \`true\`, it will add the
// 			\`-is-error\` class to the wrapper div, but not render the
// 			\`-error-content\` \`div\`.
// 		`
// 	},

// 	getInitialState() {
// 		return {
// 			optionGroups: [],
// 			flattenedOptionsData: [],
// 			ungroupedOptionData: [],
// 			optionGroupDataLookup: {},
// 		};
// 	},

// 	getDefaultProps() {
// 		return {
// 			isDisabled: false,
// 			isLoading: false,
// 			optionFilter: propsSearch,
// 			searchText: '',
// 			selectedIndex: null,
// 			DropMenu: DropMenu.defaultProps,
// 			Error: null
// 		};
// 	},

// 	handleDropMenuSelect(optionIndex, { event, props }) {
// 		const { onSelect } = this.props;

// 		event.preventDefault();

// 		return onSelect(optionIndex, { event, props });
// 	},

// 	handleSearch(searchText, { event }) {
// 		const {
// 			props,
// 			props: {
// 				onSearch,
// 				optionFilter,
// 				DropMenu: { onExpand },
// 			},
// 		} = this;

// 		const options = _.map(
// 			findTypes(props, SearchableSingleSelect.Option),
// 			'props'
// 		);
// 		const firstVisibleIndex = _.findIndex(options, option => {
// 			return optionFilter(searchText, option);
// 		});
// 		const firstVisibleProps = options[firstVisibleIndex];

// 		// Just an extra call to make sure the search results show up when a user
// 		// is typing
// 		onExpand();

// 		return onSearch(searchText, firstVisibleIndex, {
// 			event,
// 			props: firstVisibleProps,
// 		});
// 	},

// 	componentWillMount() {
// 		// preprocess the options data before rendering
// 		this.setState(
// 			DropMenu.preprocessOptionData(
// 				this.props,
// 				SearchableSingleSelect,
// 				props => !this.props.optionFilter(this.props.searchText, props)
// 			)
// 		);
// 	},

// 	componentWillReceiveProps(nextProps) {
// 		// only preprocess options data when it changes (via new props) - better performance than doing this each render
// 		this.setState(
// 			DropMenu.preprocessOptionData(
// 				nextProps,
// 				SearchableSingleSelect,
// 				props => !this.props.optionFilter(nextProps.searchText, props)
// 			)
// 		);
// 	},

// 	renderUnderlinedChildren(childText, searchText) {
// 		const [pre, match, post] = partitionText(
// 			childText,
// 			new RegExp(_.escapeRegExp(searchText), 'i'),
// 			searchText.length
// 		);

// 		return [
// 			pre && (
// 				<span key='pre' className={cx('&-Option-underline-pre')}>
// 					{pre}
// 				</span>
// 			),
// 			match && (
// 				<span key='match' className={cx('&-Option-underline-match')}>
// 					{match}
// 				</span>
// 			),
// 			post && (
// 				<span key='post' className={cx('&-Option-underline-post')}>
// 					{post}
// 				</span>
// 			),
// 		];
// 	},

// 	renderOptionContent(optionProps, searchText) {
// 		return _.isString(optionProps.children) &&
// 			_.isString(searchText) &&
// 			searchText.length > 0
// 			? this.renderUnderlinedChildren(optionProps.children, searchText)
// 			: _.isFunction(optionProps.children)
// 				? React.createElement(optionProps.children, { searchText })
// 				: optionProps.children;
// 	},

// 	renderOption({ optionProps, optionIndex }) {
// 		const { searchText, isLoading, optionFilter } = this.props;
// 		return (
// 			<DropMenu.Option
// 				key={'SearchableSingleSelectOption' + optionIndex}
// 				{..._.omit(optionProps, ['children', 'Selected', 'filterText'])}
// 				isHidden={!optionFilter(searchText, optionProps)}
// 				isDisabled={optionProps.isDisabled || isLoading}
// 			>
// 				{this.renderOptionContent(optionProps, searchText)}
// 			</DropMenu.Option>
// 		);
// 	},

// 	renderOptions() {
// 		const { searchText, isLoading } = this.props;

// 		const {
// 			optionGroups,
// 			optionGroupDataLookup,
// 			ungroupedOptionData,
// 			flattenedOptionsData,
// 		} = this.state;
// 		const visibleOptions = _.reject(
// 			flattenedOptionsData,
// 			'optionProps.isHidden'
// 		);

// 		const isAllOptionsHidden = _.isEmpty(visibleOptions);

// 		// for each option group passed in, render a DropMenu.OptionGroup, any label will be included in it's children, render each option inside the group
// 		const dropMenuOptions = _.map(
// 			optionGroups,
// 			(optionGroupProps, optionGroupIndex) => (
// 				<DropMenu.OptionGroup
// 					key={'SearchableSingleSelectOptionGroup' + optionGroupIndex}
// 					{..._.omit(optionGroupProps, 'children', 'Selected')}
// 				>
// 					{optionGroupProps.children}
// 					{_.map(optionGroupDataLookup[optionGroupIndex], this.renderOption)}
// 				</DropMenu.OptionGroup>
// 			)
// 		).concat(
// 			// then render all the ungrouped options at the end
// 			_.map(ungroupedOptionData, this.renderOption)
// 		);

// 		if (!isAllOptionsHidden || _.isEmpty(searchText)) {
// 			return dropMenuOptions;
// 		}

// 		if (!isLoading) {
// 			return (
// 				<DropMenu.Option isDisabled>
// 					<span className={cx('&-noresults')}>
// 						No results match "{searchText}"
// 					</span>
// 				</DropMenu.Option>
// 			);
// 		}

// 		return null;
// 	},

// 	removeSelection() {
// 		this.props.DropMenu.onCollapse();
// 		this.props.onSearch('');
// 		this.props.onSelect(null);
// 	},

// 	render() {
// 		const {
// 			props,
// 			props: {
// 				className,
// 				isLoading,
// 				isDisabled,
// 				maxMenuHeight,
// 				DropMenu: dropMenuProps,
// 				DropMenu: { optionContainerStyle },
// 				searchText,
// 				...passThroughs
// 			},
// 		} = this;

// 		const searchFieldProps = _.get(
// 			getFirst(props, SearchableSingleSelect.SearchField),
// 			'props',
// 			{}
// 		);
// 		const errorChildProps = _.first(
// 			_.map(findTypes(props, Validation.Error), 'props')
// 		);

// 		//user made a selection
// 		if (!_.isNil(props.selectedIndex)) {
// 			const selectedOptionProps = this.state.flattenedOptionsData[
// 				props.selectedIndex
// 			].optionProps;

// 			return (
// 				<div
// 					{...omitProps(passThroughs, SearchableSingleSelect)}
// 					className={cx('&', className)}
// 				>
// 					<Selection
// 						Label={
// 							_.isNil(selectedOptionProps.Selected)
// 								? this.renderOptionContent(selectedOptionProps, '')
// 								: selectedOptionProps.Selected
// 						}
// 						className={cx('&', {
// 							'&-select-error': errorChildProps && errorChildProps.children && errorChildProps.children !== true
// 						}, className)}
// 						onRemove={this.removeSelection}
// 						kind='default'
// 					/>
// 					{errorChildProps &&
// 						errorChildProps.children &&
// 						errorChildProps.children !== true ? (
// 							<div
// 								{...omitProps(errorChildProps, undefined)}
// 								className={cx('&-error-select-content')}
// 							>
// 								{errorChildProps.children}
// 							</div>
// 						) : null}
// 				</div>
// 			);
// 		}

// 		return (
// 			<div
// 				{...omitProps(passThroughs, SearchableSingleSelect)}
// 				className={cx('&', className)}
// 			>
// 				<DropMenu
// 					Error={errorChildProps}
// 					{...dropMenuProps}
// 					selectedIndices={null}
// 					className={cx(
// 						'&-DropMenu',
// 						{
// 							'&-DropMenu-is-small': true,
// 						},
// 						dropMenuProps.className
// 					)}
// 					optionContainerStyle={_.assign(
// 						{},
// 						optionContainerStyle,
// 						!_.isNil(maxMenuHeight) ? { maxHeight: maxMenuHeight } : null
// 					)}
// 					isDisabled={isDisabled}
// 					onSelect={this.handleDropMenuSelect}
// 					ContextMenu={{
// 						alignmentOffset: -13,
// 						directonOffset: -1,
// 						minWidthOffset: -28,
// 					}}
// 				>
// 					<DropMenu.Control>
// 						<SearchField
// 							{...searchFieldProps}
// 							autoComplete={searchFieldProps.autoComplete || 'off'}
// 							isDisabled={isDisabled}
// 							className={cx('&-search', {
// 								'&-search-is-error': errorChildProps && errorChildProps.children
// 							},
// 								searchFieldProps.className)}
// 							value={searchText}
// 							onChange={this.handleSearch}
// 						/>
// 					</DropMenu.Control>
// 					{isLoading ? (
// 						<DropMenu.Option
// 							key='SearchableSingleSelectLoading'
// 							className={cx('&-loading')}
// 							isDisabled
// 						>
// 							<LoadingIcon />
// 						</DropMenu.Option>
// 					) : null}
// 					{this.renderOptions()}
// 				</DropMenu>
// 				{errorChildProps &&
// 					errorChildProps.children &&
// 					errorChildProps.children !== true ? (
// 						<div
// 							{...omitProps(errorChildProps, undefined)}
// 							className={cx('&-error-content')}
// 						>
// 							{errorChildProps.children}
// 						</div>
// 					) : null}
// 			</div>
// 		);
// 	},
// });

export default buildModernHybridComponent<ISearchableSingleSelectProps,
	ISearchableSingleSelectState,
	typeof SearchableSingleSelect
>(SearchableSingleSelect, { reducers });
export { SearchableSingleSelect as SearchableSingleSelectDumb };
