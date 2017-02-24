import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { buildHybridComponent } from '../../util/state-management';
import {
	partitionText,
	propsSearch,
} from '../../util/text-manipulation';
import {
	createClass,
	omitProps,
	getFirst,
	findTypes,
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
} = React.PropTypes;

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
		 * Object of SearchField props which are passed through to the underlying
		 * SearchField component.
		 */
		SearchField: shape(SearchField.propTypes),
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
			SearchField: SearchField.getDefaultProps(),
			responsiveMode: 'large',
			hasRemoveAll: true,
		};
	},

	handleDropMenuSelect(optionIndex, { event, props }) {
		const { onSelect } = this.props;

		return onSelect(optionIndex, { event, props });
	},

	handleCheckboxSelect(_isSelected, {
		// TODO: make sure the consumer can do callbackId somehow
		event,
		props: { callbackId: optionIndex },
	}) {
		// This is needed otherwise clicking the checkbox will double fire this
		// event _and_ the `handleDropMenuSelect` handler
		event.stopPropagation();

		// We don't want to send the consumer the checkbox's props so we have to
		// lookup the option they clicked and send its props along
		const selectedOptionProps = _.get(findTypes(this.props, SearchableMultiSelect.Option), `[${optionIndex}].props`);

		return this.props.onSelect(optionIndex, { event, props: selectedOptionProps });
	},

	handleSelectionRemove({
		event,
		props,
		props: {
			callbackId: optionIndex,
		},
	}) {
		// We don't want to send the consumer the selection's props so we have to
		// lookup the option they clicked and send its props along
		const selectedOptionProps = _.get(findTypes(this.props, SearchableMultiSelect.Option), `[${optionIndex}].props`);

		return this.props.onSelect(optionIndex, { event, props: selectedOptionProps });
	},

	handleRemoveAll({ event }) {
		this.props.onRemoveAll({ event, props: this.props });
	},

	handleSearch(searchText, { event }) {
		const {
			props,
			props: {
				onSearch,
				optionFilter,
				DropMenu: {
					onExpand,
				},
			},
		} = this;

		const options = _.map(findTypes(props, SearchableMultiSelect.Option), 'props');
		const firstVisibleIndex = _.findIndex(options, (option) => {
			return optionFilter(searchText, option);
		});
		const firstVisibleProps = options[firstVisibleIndex];

		// Just an extra call to make sure the search results show up when a user
		// is typing
		onExpand();

		return onSearch(searchText, firstVisibleIndex, { event, props: firstVisibleProps });
	},

	renderUnderlinedChildren(childText, searchText) {
		const [pre, match, post] = partitionText(childText, new RegExp(_.escapeRegExp(searchText), 'i'), searchText.length);

		return [
			pre && <span key='pre' className={cx('&-Option-underline-pre')}>{pre}</span>,
			match && <span key='match' className={cx('&-Option-underline-match')}>{match}</span>,
			post && <span key='post' className={cx('&-Option-underline-post')}>{post}</span>,
		];
	},

	renderOptions(optionsProps) {
		const {
			optionFilter,
			searchText,
			selectedIndices,
			isLoading,
		} = this.props;

		const options = _.map(optionsProps, (optionProps, optionIndex) => (
			<DropMenu.Option
				{..._.omit(optionProps, 'children')}
				isHidden={!optionFilter(searchText, optionProps)}
				key={optionIndex}
				isDisabled={isLoading}
			>
				<div className={cx('&-checkbox')}>
					<Checkbox
						onSelect={this.handleCheckboxSelect}
						callbackId={optionIndex}
						isSelected={_.includes(selectedIndices, optionIndex)}
					/>
					<div className={cx('&-checkbox-label')}>
						{_.isString(optionProps.children) ?
							this.renderUnderlinedChildren(optionProps.children, searchText)
						: optionProps.children}
					</div>
				</div>
			</DropMenu.Option>
		));

		const visibleOptionsCount = _.filter(options, (option) => !option.props.isHidden).length;

		return visibleOptionsCount > 0
			? options
			: <DropMenu.Option isDisabled>
				<span className={cx('&-noresults')}>No results match "{searchText}"</span>
			</DropMenu.Option>;
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
				responsiveMode,
				searchText,
				hasRemoveAll,
				...passThroughs
			},
		} = this;

		const {
			optionContainerStyle,
		} = dropMenuProps;

		const searchFieldProps = _.get(getFirst(props, SearchField), 'props', {});
		const optionsProps = _.map(findTypes(props, SearchableMultiSelect.Option), 'props');
		const isSmall = responsiveMode === 'small';

		return (
			<div
				{...omitProps(passThroughs, SearchableMultiSelect)}
				className={cx('&', className)}
			>
				<DropMenu
					{...dropMenuProps}
					selectedIndices={null}
					className={cx('&-DropMenu', {
						'&-DropMenu-is-small': isSmall,
					}, dropMenuProps.className)}
					optionContainerStyle={_.assign({}, optionContainerStyle, !_.isNil(maxMenuHeight) ? { maxHeight: maxMenuHeight } : null)}
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
							className={cx('&-search', {
								'&-search-is-small': isSmall,
							}, searchFieldProps.className)}
							value={searchText}
							onChange={this.handleSearch}
						/>
					</DropMenu.Control>
					{isLoading ?
						<DropMenu.Option key='SearchableMultiSelectLoading' className={cx('&-loading')} isDisabled>
							<LoadingIcon />
						</DropMenu.Option>
					: null}
					{this.renderOptions(optionsProps)}
				</DropMenu>

				{!_.isEmpty(selectedIndices) ?
					<Selection
						isBold
						hasBackground
						Label='Selected'
						kind='container'
						onRemove={this.handleRemoveAll}
						responsiveMode={responsiveMode}
						isRemovable={hasRemoveAll}
					>
						{_.map(selectedIndices, (selectedIndex) => {
							const optionProps = optionsProps[selectedIndex];
							const selectionProps = _.get(getFirst(optionProps, SearchableMultiSelect.Option.Selection), 'props');

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
						})}
					</Selection>
				: null}
			</div>
		);
	},
});

export default buildHybridComponent(SearchableMultiSelect);
export { SearchableMultiSelect as SearchableMultiSelectDumb };
