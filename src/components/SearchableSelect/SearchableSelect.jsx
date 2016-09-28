import React from 'react';
import _ from 'lodash';
import { createClass, findTypes } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';
import { partitionText } from '../../util/text-manipulation';
import * as reducers from './SearchableSelect.reducers';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';
import DropMenu from '../DropMenu/DropMenu';
import LoadingIcon from '../Icon/LoadingIcon/LoadingIcon';
import SearchField from '../SearchField/SearchField';

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
} = React.PropTypes;

/**
 *
 * {"categories": ["controls", "selectors"], "madeFrom": ["DropMenu"]}
 *
 * A selector control (like native `<select>`) which is used to select a single option from a dropdown list.
 * Supports option groups with and without labels.
 */
const SearchableSelect = createClass({
	displayName: 'SearchableSelect',

	reducers,

	components: {
		/**
		 * Content this is displayed when nothing is selected.
		 */
		Placeholder: createClass({
			displayName: 'SearchableSelect.Placeholder',
			propName: 'Placeholder',
		}),
		/**
		 * A selectable option in the list.
		 */
		Option: createClass({
			displayName: 'SearchableSelect.Option',
			propName: 'Option',
			propTypes: DropMenu.Option.propTypes,
		}),
		/**
		 * Groups `Option`s together with a non-selectable heading.
		 */
		OptionGroup: createClass({
			displayName: 'SearchableSelect.OptionGroup',
			propName: 'OptionGroup',
			propTypes: DropMenu.OptionGroup.propTypes,
		}),
	},

	propTypes: {
		/**
		 * Should be instances of {`SearchableSelect.Placeholder`, `SearchableSelect.Option`, `SearchableSelect.OptionGroup`}. Other direct child elements will not render.
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
		 * Disables the SearchableSelect from being clicked or focused.
		 */
		isDisabled: bool,
		/**
		 * Displays a centered LoadingIcon to allow for asynchronous loading of options.
		 */
		isLoading: bool,
		/**
		 * Applies primary color styling to the control when an item is selected. Defaults to true.
		 */
		isSelectionHighlighted: bool,
		/**
		 * The max height of the fly-out menu.
		 */
		maxMenuHeight: oneOfType([number, string]),
		/**
		 * Called when the user enters a value to search for; the set of visible Options will be filtered using the value.
		 * Has the signature `(searchText, {props, event}) => {}` where `searchText` is the new `searchText` or `null`.
		 */
		onSearch: func,
		/**
		 * Called when an option is selected.
		 * Has the signature `(optionIndex, {props, event}) => {}` where `optionIndex` is the new `selectedIndex` or `null`.
		 */
		onSelect: func,
		/**
		 * The function that will be run against each Option's props to determine whether it should be visible or not.
		 * The default behavior of the function is to match, ignoring case, against any text node descendant of the `Option`.
		 *
		 * Has the signature `(searchText, optionProps)`
		 * If `true`, option will be visible. If `false`, the option will not be visible.
		 */
		optionFilter: func,
		/**
		 * This function will be run against Options with Rich Content for children to allow for special 'underlining' behavior.
		 * The default behavior of the function is to just return the rich content as is.
		 *
		 * Has the signature `(children, searchText)`
		 */
		richChildRenderer: func,
		/**
		 * The current search text to filter the list of options by.
		 */
		searchText: string,
		/**
		 * The currently selected `SearchableSelect.Option` index or `null` if nothing is selected.
		 */
		selectedIndex: number,
		/**
		 * Object of DropMenu props which are passed thru to the underlying DropMenu component.
		 */
		DropMenu: shape(DropMenu.propTypes),
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
			isLoading: false,
			optionFilter: this.defaultOptionFilter,
			richChildRenderer: _.identity,
			searchText: null,
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
			searchCache: {},
		}
	},

	statics: {
		getCombinedChildText(node) {
			if (!node.children) {
				return '';
			}

			if (_.isString(node.children)) {
				return node.children;
			}

			return node.children
							.filter(child => !_.isString(child))
							.map(child => this.getCombinedChildText(child.props))
							.reduce(((combinedText, childText) => combinedText + childText), _.find(node.children, _.isString) || '');
		},

		defaultOptionFilter(searchText, optionProps, optionIndex, state) {
			if (!searchText) {
				return true;
			}

			return state.searchCache[optionIndex].visible;
		},

		preprocessOptionData(props) {
			const {
				searchText,
			} = props;

			const {
				flattenedOptionsData,
				nullOptions,
				optionGroupDataLookup,
				optionGroups,
				ungroupedOptionData,
			} = DropMenu.preprocessOptionData(props, SearchableSelect);

			const searchCache = _.keyBy(_.map(flattenedOptionsData, ({optionIndex, optionProps}) => {
				return {
					optionIndex,
					combinedText: this.getCombinedChildText(optionProps),
				};
			}), 'optionIndex');

			// If there isn't any searchText, just return the existing list of options.
			if (_.isEmpty(searchText)) {
				return {
					flattenedOptionsData,
					nullOptions,
					optionGroupDataLookup,
					optionGroups,
					searchCache,
					ungroupedOptionData,
				};
			}

			const searchPattern = new RegExp(_.escapeRegExp(searchText), 'i');

			const filteredFlattenedOptionsData = _.filter(flattenedOptionsData, ({optionIndex}) => {
				const visible = searchPattern.test(searchCache[optionIndex].combinedText);
				searchCache[optionIndex].visible = visible;
				return visible;
			});

			return {
				flattenedOptionsData: filteredFlattenedOptionsData,
				nullOptions,
				optionGroupDataLookup,
				optionGroups,
				searchCache,
				ungroupedOptionData,
			};
		},
	},

	componentWillMount() {
		// preprocess the options data before rendering
		const preProcessedOptionData = SearchableSelect.preprocessOptionData(this.props);
		this.setState({
			...preProcessedOptionData,
		});
	},

	componentWillReceiveProps(nextProps) {
		// only preprocess options data when it changes (via new props) - better performance than doing this each render
		if (this.props.children !== nextProps.children || this.props.searchText !== nextProps.searchText) {
			const preProcessedOptionData = SearchableSelect.preprocessOptionData(nextProps);
			this.setState({
				...preProcessedOptionData,
			});
		}
	},

	handleClickSearchField(event) {
		event.stopPropagation();
	},

	renderUnderlinedChildren(childText, searchText) {
		const [pre, match, post] = partitionText(childText, new RegExp(_.escapeRegExp(searchText), 'i'), searchText.length);

		return (
			[
				pre && <span key='pre' className={cx('&-Option-underline-pre')}>{pre}</span>,
				match && <span key='match' className={cx('&-Option-underline-match')}>{match}</span>,
				post && <span key='post' className={cx('&-Option-underline-post')}>{post}</span>,
			]
		);
	},

	renderOption(optionProps, optionIndex) {
		const {
			isLoading,
			optionFilter,
			richChildRenderer,
			searchText,
		} = this.props;

		if (searchText) {
			return optionFilter(searchText, optionProps, optionIndex, this.state) && (
				<DropMenu.Option isDisabled={isLoading} key={'SearchableSelectOption' + optionIndex} {..._.omit(optionProps, ['children'])}>
					{_.isString(optionProps.children) ?
						this.renderUnderlinedChildren(optionProps.children, searchText)
						: richChildRenderer(optionProps.children, searchText)}
				</DropMenu.Option>
			);
		}

		return (
			<DropMenu.Option isDisabled={isLoading} key={'SearchableSelectOption' + optionIndex} {...optionProps} />
		);
	},

	renderOptions() {
		const {
			searchText,
		} = this.props;

		const {
			optionGroups,
			optionGroupDataLookup,
			ungroupedOptionData,
		} = this.state;

		// for each option group passed in, render a DropMenu.OptionGroup, any label will be included in it's children, render each option inside the group
		const options = _.map(optionGroups, (optionGroupProps, optionGroupIndex) => {
			const childOptions = _.map(_.get(optionGroupDataLookup, optionGroupIndex), ({ optionProps, optionIndex }) => (
				this.renderOption(optionProps, optionIndex)
			)).filter(childOption => childOption);

			return (
				childOptions.length > 0 &&
				<DropMenu.OptionGroup key={'SearchableSelectOptionGroup' + optionGroupIndex} {...optionGroupProps}>
					{optionGroupProps.children}
					{childOptions}
				</DropMenu.OptionGroup>
			);
		// then render all the ungrouped options at the end
		}).concat(_.map(ungroupedOptionData, ({ optionProps, optionIndex }) => (
			this.renderOption(optionProps, optionIndex)
		))).filter(option => option);

		return (
			options.length > 0 ? options : <DropMenu.Option isDisabled><span className={cx('&-noresults')}>No results match "{searchText}"</span></DropMenu.Option>
		);
	},

	render() {
		const {
			style,
			className,
			hasReset,
			isDisabled,
			isLoading,
			isSelectionHighlighted,
			maxMenuHeight,
			searchText,
			selectedIndex,
			onSearch,
			onSelect,
			DropMenu: dropMenuProps,
		} = this.props;

		const {
			direction,
			flyOutStyle,
			isExpanded,
		} = dropMenuProps;

		const {
			flattenedOptionsData,
		} = this.state;

		const placeholderProps = _.first(_.map(findTypes(this.props, SearchableSelect.Placeholder), 'props'));
		const placeholder = _.get(placeholderProps, 'children', 'Select');
		const isItemSelected = _.isNumber(selectedIndex);

		return (
			<DropMenu
				{...dropMenuProps}
				className={cx('&', className)}
				flyOutStyle={_.assign({}, flyOutStyle, !_.isNil(maxMenuHeight) ? { maxHeight: maxMenuHeight } : null)}
				isDisabled={isDisabled}
				isLoading={isLoading}
				onSelect={onSelect}
				selectedIndices={isItemSelected ? [selectedIndex] : []}
				style={style}
			>
				<DropMenu.Control>
					<div
						tabIndex={0}
						className={cx('&-Control', {
							'&-Control-is-highlighted': (!isDisabled && isItemSelected && isSelectionHighlighted) || (isExpanded && isSelectionHighlighted),
							'&-Control-is-selected': (!isDisabled && isItemSelected && isSelectionHighlighted) || (isExpanded && isSelectionHighlighted),
							'&-Control-is-expanded': isExpanded,
							'&-Control-is-disabled': isDisabled,
						})
					}>
						<span
							{...(!isItemSelected ? placeholderProps : null)}
							className={cx(
									'&-Control-content',
									(!isItemSelected ? _.get(placeholderProps, 'className') : null)
							)}
						>
							{isItemSelected ? flattenedOptionsData[selectedIndex].optionProps.children : placeholder}
						</span>
						<CaretIcon direction={isExpanded ? direction : 'down'} />
					</div>
					{
						isExpanded &&
						<div className={cx('&-Search-container')} onClick={this.handleClickSearchField}>
							<SearchField
								onChange={onSearch}
								value={searchText}
							/>
						</div>
					}
				</DropMenu.Control>
				{
					isLoading &&
					<DropMenu.Option key='SearchableSelectLoading' className={cx('&-Loading')} isDisabled><LoadingIcon /></DropMenu.Option>
				}
				{
					hasReset && isItemSelected &&
					<DropMenu.NullOption {...placeholderProps}>{placeholder}</DropMenu.NullOption>
				}
				{this.renderOptions()}
			</DropMenu>
		);
	},
});

export default SearchableSelect;
