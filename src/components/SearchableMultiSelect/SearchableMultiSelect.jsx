import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
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
import Checkbox from '../Checkbox/Checkbox';
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

/**
 *
 * {"categories": ["controls", "selectors"], "madeFrom": ["Checkbox", "SearchField", "DropMenu", "LoadingIcon", "Selection"]}
 *
 * A control used to select multiple options from a dropdown list using a
 * SearchField.
 */
const SearchableMultiSelect = createClass({
	displayName: 'SearchableMultiSelect',

	reducers,

	components: {
		/**
		 * A selectable option in the list.
		 */
		Option: createClass({
			displayName: 'SearchableMultiSelect.Option',
			propName: 'Option',
			propTypes: DropMenu.Option.propTypes,
			components: {
				Selection: createClass({
					displayName: 'SearchableMultiSelect.Option.Selection',
					propName: 'Selection',
					propTypes: Selection.propTypes,
				}),
			},
		}),
		/**
		 * Passes props through to the `SearchField` component.
		 */
		SearchField: createClass({
			displayName: 'SearchableMultiSelect.SearchField',
			propName: 'SearchField',
			propTypes: SearchField.propTypes,
		}),

		/**
		 * Groups `Option`s together with a non-selectable heading.
		 */
		OptionGroup: createClass({
			displayName: 'SearchableMultiSelect.OptionGroup',
			propName: 'OptionGroup',
			propTypes: DropMenu.OptionGroup.propTypes,
		}),

		/**
		 * Label for the selected section header.
		 */
		SelectionLabel: createClass({
			displayName: 'SearchableMultiSelect.SelectionLabel',
			propName: 'SelectionLabel',
		}),
	},

	propTypes: {
		/**
		 * Should be instances of {`SearchableMultiSelect.Option`}. Other direct child elements will not render.
		 */
		children: node,
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/**
		 * Disables the control from being clicked or focused.
		 */
		isDisabled: bool,
		/**
		 * Displays a LoadingIcon to allow for asynchronous loading of options.
		 */
		isLoading: bool,
		/**
		 * The max height of the fly-out menu.
		 */
		maxMenuHeight: oneOfType([number, string]),
		/**
		 * Called when the user enters a value to search for; the set of visible
		 * Options will be filtered using the value.
		 *
		 * Signature: `(searchText, firstVisibleIndex, {props, event}) => {}`
		 *
		 * `searchText` is the value from the `SearchField` and `firstVisibleIndex`
		 * is the index of the first option that will be visible after filtering.
		 */
		onSearch: func,
		/**
		 * Called when an option is selected.
		 *
		 * Signature: `(optionIndex, {props, event}) => {}`
		 *
		 * `optionIndex` is the new `selectedIndex` or `null`.
		 */
		onSelect: func,
		/**
		 * Called when the user clicks to remove all selections.
		 *
		 * Signature: `({props, event}) => {}`
		 */
		onRemoveAll: func,
		/**
		 * The function that will be run against each Option's props to determine
		 * whether it should be visible or not. The default behavior of the
		 * function is to match, ignoring case, against any text node descendant of
		 * the `Option`.
		 *
		 * Signature: `(searchText, optionProps) => {}`
		 *
		 * If `true` is returned, the option will be visible. If `false`, the
		 * option will not be visible.
		 */
		optionFilter: func,
		/**
		 * The current search text to filter the list of options by.
		 */
		searchText: string,
		/**
		 * An array of currently selected `SearchableMultiSelect.Option` indices or
		 * `null` if nothing is selected.
		 */
		selectedIndices: arrayOf(number),
		/**
		 * Object of DropMenu props which are passed through to the underlying
		 * DropMenu component.
		 */
		DropMenu: shape(DropMenu.propTypes),
		/**
		 * *Child Element* - These are menu options. Each `Option` may be passed a
		 * prop called `isDisabled` to disable selection of that `Option`. Any
		 * other props pass to Option will be available from the `onSelect`
		 * handler.
		 *
		 * It also support the `Selection` prop that can be used to forward along
		 * props to the underlying `Selection` component.
		 */
		Option: any,
		/**
		 * Adjusts the display of this component. This should typically be driven
		 * by screen size. Currently `small` and `large` are explicitly handled
		 * by this component.
		 */
		responsiveMode: oneOf(['small', 'medium', 'large']),
		/**
		 * Controls the visibility of the "remove all" button that's shown with the
		 * selected items.
		 */
		hasRemoveAll: bool,
		/**
		 * Controls the visibility of the `Selection` component that appears below
		 * the search field.
		 */
		hasSelections: bool,
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
		};
	},

	handleDropMenuSelect(optionIndex, { event, props }) {
		const { onSelect } = this.props;

		return onSelect(optionIndex, { event, props });
	},

	handleCheckboxSelect(
		_isSelected,
		{
			// TODO: make sure the consumer can do callbackId somehow
			event,
			props: { callbackId: optionIndex },
		}
	) {
		// This is needed otherwise clicking the checkbox will double fire this
		// event _and_ the `handleDropMenuSelect` handler
		event.stopPropagation();

		// We don't want to send the consumer the checkbox's props so we have to
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
			DropMenu.preprocessOptionData(this.props, SearchableMultiSelect)
		);
	},

	componentWillReceiveProps(nextProps) {
		// only preprocess options data when it changes (via new props) - better performance than doing this each render
		this.setState(
			DropMenu.preprocessOptionData(nextProps, SearchableMultiSelect)
		);
	},

	renderUnderlinedChildren(childText, searchText) {
		const [pre, match, post] = partitionText(
			childText,
			new RegExp(_.escapeRegExp(searchText), 'i'),
			searchText.length
		);

		return [
			pre &&
				<span key="pre" className={cx('&-Option-underline-pre')}>{pre}</span>,
			match &&
				<span key="match" className={cx('&-Option-underline-match')}>
					{match}
				</span>,
			post &&
				<span key="post" className={cx('&-Option-underline-post')}>
					{post}
				</span>,
		];
	},

	renderOption({ optionProps, optionIndex }) {
		const { optionFilter, searchText, selectedIndices, isLoading } = this.props;

		return (
			<DropMenu.Option
				key={'SearchableMultiSelectOption' + optionIndex}
				{..._.omit(optionProps, 'children')}
				isHidden={!optionFilter(searchText, optionProps)}
				isDisabled={isLoading}
			>
				<div className={cx('&-checkbox')}>
					<Checkbox
						onSelect={this.handleCheckboxSelect}
						callbackId={optionIndex}
						isSelected={_.includes(selectedIndices, optionIndex)}
					/>
					<label className={cx('&-checkbox-label')}>
						{_.isString(optionProps.children)
							? this.renderUnderlinedChildren(optionProps.children, searchText)
							: optionProps.children}
					</label>
				</div>
			</DropMenu.Option>
		);
	},

	renderOptions() {
		const { optionFilter, searchText, isLoading } = this.props;

		const {
			optionGroups,
			optionGroupDataLookup,
			ungroupedOptionData,
			flattenedOptionsData,
		} = this.state;

		const isAllOptionsHidden = _.every(
			flattenedOptionsData,
			({ optionProps }) => !optionFilter(searchText, optionProps)
		);

		// for each option group passed in, render a DropMenu.OptionGroup, any label will be included in it's children, render each option inside the group
		const dropMenuOptions = _.map(
			optionGroups,
			(optionGroupProps, optionGroupIndex) => (
				<DropMenu.OptionGroup
					key={'SearchableMultiSelectOptionGroup' + optionGroupIndex}
					{..._.omit(optionGroupProps, 'children')}
				>
					{optionGroupProps.children}
					{_.map(optionGroupDataLookup[optionGroupIndex], this.renderOption)}
				</DropMenu.OptionGroup>
			)
		).concat(
			// then render all the ungrouped options at the end
			_.map(ungroupedOptionData, this.renderOption)
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
			SearchableMultiSelect.SelectionLabel,
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
					isLoading={isLoading}
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
					{isLoading
						? <DropMenu.Option
								key="SearchableMultiSelectLoading"
								className={cx('&-loading')}
								isDisabled
							>
								<LoadingIcon />
							</DropMenu.Option>
						: null}
					{this.renderOptions()}
				</DropMenu>

				{hasSelections && !_.isEmpty(selectedIndices)
					? <Selection
							className={cx('&-Selection-section')}
							isBold
							hasBackground
							kind="container"
							onRemove={this.handleRemoveAll}
							responsiveMode={responsiveMode}
							isRemovable={hasRemoveAll}
						>
							<Selection.Label>
								{selectionLabel.props.children}
							</Selection.Label>
							{_.map(
								optionGroupDataLookup,
								(groupedOptionsData, optionGroupIndex) => {
									const selectedGroupedOptions = _.filter(groupedOptionsData, ({
										optionIndex,
									}) => _.includes(selectedIndices, optionIndex));
									if (!_.isEmpty(selectedGroupedOptions)) {
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
													{_.first(
														rejectTypes(
															optionGroups[optionGroupIndex].children,
															SearchableMultiSelect.Option
														)
													)}
												</Selection.Label>
												{_.map(selectedGroupedOptions, ({
													optionIndex,
													optionProps,
												}) => {
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
																{optionProps.children}
															</Selection.Label>
														</Selection>
													);
												})}
											</Selection>
										);
									}
									return null;
								}
							)}
							{_.map(selectedIndices, selectedIndex => {
								const selectedUngroupedOptionData = _.find(
									ungroupedOptionData,
									{ optionIndex: selectedIndex }
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
												{optionProps.children}
											</Selection.Label>
										</Selection>
									);
								}
								return null;
							})}
						</Selection>
					: null}
			</div>
		);
	},
});

export default buildHybridComponent(SearchableMultiSelect);
export { SearchableMultiSelect as SearchableMultiSelectDumb };
