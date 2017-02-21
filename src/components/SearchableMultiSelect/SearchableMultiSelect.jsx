import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { buildHybridComponent } from '../../util/state-management';
import {
	partitionText,
	searchText,
} from '../../util/text-manipulation';
import {
	createClass,
	omitProps,
	getFirst,
	findTypes,
	// filterTypes,
	// rejectTypes,
} from '../../util/component-types';
import { SearchFieldDumb as SearchField } from '../SearchField/SearchField';
import { DropMenuDumb as DropMenu } from '../DropMenu/DropMenu';
import Checkbox from '../Checkbox/Checkbox';
import Selection from '../Selection/Selection';

import * as reducers from './SearchableMultiSelect.reducers';

const {
	any,
	arrayOf,
	bool,
	func,
	number,
	object,
	oneOfType,
	shape,
	string,
} = React.PropTypes;

const cx = lucidClassNames.bind('&-SearchableMultiSelect');

/**
 *
 * {"categories": ["controls", "selectors"]}
 *
 * A control used to select a multiple option from a dropdown list using a
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
		}),
	},

	propTypes: {
		/**
		 * Styles that are passed through to root element.
		 */
		style: object,
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
		 * *Child Element* - These are menu options. The `optionIndex` is in-order
		 * of rendering regardless of group nesting, starting with index `0`. Each
		 * `Option` may be passed a prop called `isDisabled` to disable selection
		 * of that `Option`. Any other props pass to Option will be available from
		 * the `onSelect` handler.
		 */
		Option: any,
	},

	getDefaultProps() {
		return {
			hasReset: true,
			isSelectionHighlighted: true,
			isDisabled: false,
			isLoading: false,
			optionFilter: searchText,
			searchText: null,
			selectedIndices: [],
			DropMenu: DropMenu.getDefaultProps(),
			SearchField: SearchField.getDefaultProps(),
		};
	},

	handleDropMenuSelect(optionIndex, { event }) {
		console.log('handleDropMenuSelect', event.target);
		const { onSelect } = this.props;

		return onSelect(optionIndex);
	},

	handleCheckboxSelect(_isSelected, {
		// TODO: make sure the consumer can do callbackId somehow
		event,
		props: { callbackId: optionIndex },
	}) {
		console.log('handleCheckboxSelect', event.target);
		event.stopPropagation();
		event.preventDefault();

		const { onSelect } = this.props;

		return onSelect(optionIndex);
	},

	render() {
		const {
			props,
			props: {
				className,
				isLoading,
				isDisabled,
				maxMenuHeight,
				onSelect,
				style,
				selectedIndices,
				DropMenu: dropMenuProps,
			},
		} = this;

		const {
			direction,
			optionContainerStyle,
			isExpanded,
		} = dropMenuProps;

		const searchFieldProps = _.get(getFirst(props, SearchField, <SearchField />), 'props');
		const optionsProps = _.map(findTypes(props, SearchableMultiSelect.Option), 'props');

		return (
			<div className={cx('&')}>
				<DropMenu
					{...dropMenuProps}
					selectedIndices={null}
					className={cx('&-DropMenu', dropMenuProps.className)}
					optionContainerStyle={_.assign({}, optionContainerStyle, !_.isNil(maxMenuHeight) ? { maxHeight: maxMenuHeight } : null)}
					isDisabled={isDisabled}
					isLoading={isLoading}
					onSelect={this.handleDropMenuSelect}
					style={style}
				>
					<DropMenu.Control>
						<SearchField
							{...searchFieldProps}
							className={cx('&-search', searchFieldProps.className)}
						/>
					</DropMenu.Control>
					{_.map(optionsProps, (optionProps, optionIndex) => (
						<DropMenu.Option {..._.omit(optionProps, 'children')}>
							<div className={cx('&-checkbox')}>
								<Checkbox
									onSelect={this.handleCheckboxSelect}
									callbackId={optionIndex}
									isSelected={_.includes(selectedIndices, optionIndex)}
								/>
								<div className={cx('&-checkbox-label')}>
									{optionProps.children}
								</div>
							</div>
						</DropMenu.Option>
					))}
				</DropMenu>
				{!_.isEmpty(selectedIndices) ?
					<Selection isBold hasBackground Label='Selected' kind='container'>
						{_.map(selectedIndices, (selectedIndex) => (
							<Selection>
								<Selection.Label>
									{optionsProps[selectedIndex].children}
								</Selection.Label>
							</Selection>
						))}
					</Selection>
				: null}
			</div>
		);
	},
});

export default buildHybridComponent(SearchableMultiSelect);
export { SearchableMultiSelect as SearchableSelectDumb };
