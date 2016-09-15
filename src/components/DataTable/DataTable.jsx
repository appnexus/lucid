import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, filterTypes, omitProps } from '../../util/component-types';

import Checkbox from '../Checkbox/Checkbox';
import ScrollTable from '../ScrollTable/ScrollTable';
import EmptyIndicator from './EmptyIndicator';

const {
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} = ScrollTable;

const cx = lucidClassNames.bind('&-DataTable');

const {
	any,
	func,
	object,
	string,
	bool,
	arrayOf,
} = React.PropTypes;

/**
 *
 * {"categories": ["table"], "madeFrom": ["ScrollTable", "Checkbox"]}
 *
 * `DataTable` provides a simple abstraction over the `Table` component to make it easier to define data-driven tables and render an array of objects.
 */
const DataTable = createClass({
	displayName: 'DataTable',

	propTypes: {
		/**
		 * Styles that are passed through to the root container.
		 */
		style: object,
		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,
		/**
		 * Array of objects to be rendered in the table. Object keys match the `field` of each defined `DataTable.Column`.
		 */
		data: arrayOf(object),
		emptyMessageBody: string,
		emptyMessageTitle: string,
		emptyMessageImageUrl: string,
		/**
		 * Render a checkbox in the first column allowing `onSelect` and `onSelectAll` to be triggered.
		 */
		isSelectable: bool,
		/**
		 * Render each row item to be navigable, allowing `onRowClick` to be triggered.
		 */
		isActionable: bool,
		/**
		 * Handler for checkbox selection. Signature is `(object, index, { props, event }) => {...}`
		 */
		onSelect: func,
		/**
		 * Handler for checkbox selection in the table header. Signature is `({ props, event }) => {...}`
		 */
		onSelectAll: func,
		/**
		 * Handler for row click. Signature is `(object, index, { props, event }) => {...}`
		 */
		onRowClick: func,
		/**
		 * Handler for column header click (for sorting). Signature is `(field, { props, event }) => {...}`
		 */
		onSort: func,
		/**
		 * *Child Element*
		 *
		 * Used to define a column of the table. It accepts the same props as `Table.Th` in addition to:
		 *
		 * - the required prop `field`
		 * - the optional prop `title`
		 */
		Column: any,
		/**
		 * *Child Element*
		 *
		 * Used to Group defined `Column`s in the table. It accepts the same props as `Table.Th` in addition to:
		 *
		 * - the optional prop `title`
		 */
		ColumnGroup: any,
	},

	getDefaultProps() {
		return {
			isSelectable: false,
			isActionable: false,
			onSelect: _.noop,
			onSelectAll: _.noop,
			onRowClick: _.noop,
			onSort: _.noop,
		};
	},

	components: {
		/**
		 * Renders a `Th` for the table.
		 */
		Column: createClass({
			displayName: 'DataTable.Column',
			propName: 'Column',
			propTypes: {
				field: string.isRequired,
				title: string,
			},
		}),
		/**
		 * Renders a group of `Th`s.
		 */
		ColumnGroup: createClass({
			displayName: 'DataTable.ColumnGroup',
			propName: 'ColumnGroup',
			propTypes: {
				title: string,
			},
			getDefaultProps: () => ({ align: 'center' }),
		}),
	},

	statics: {
		shouldColumnHandleSort(column) {
			return _.isNil(column.isSortable) ? column.isSorted : column.isSortable;
		},
	},

	handleSelect(rowIndex, { event }) {
		const {
			data,
			onSelect,
		} = this.props;

		onSelect(data[rowIndex], rowIndex, { props: this.props, event });
	},

	handleSelectAll({ event }) {
		const {
			onSelectAll,
		} = this.props;

		onSelectAll({ props: this.props, event });
	},

	handleRowClick(rowIndex, event) {
		const {
			data,
			onRowClick,
		} = this.props;

		const targetTagName = event.target.tagName.toLowerCase();
		if (targetTagName === 'td' || targetTagName === 'tr') {
			onRowClick(data[rowIndex], rowIndex, { props: this.props, event });
		}
	},

	handleSort(field, event) {
		const {
			onSort,
		} = this.props;

		event.stopPropagation();
		event.preventDefault();
		event.bubbles = false;
		onSort(field, {props: this.props, event});
	},

	render() {

		const {
			className,
			data,
			emptyMessageBody,
			emptyMessageTitle,
			emptyMessageImageUrl,
			isActionable,
			isSelectable,
			style,
			...passThroughs,
		} = this.props;


		const childComponentElements = findTypes(this.props, [DataTable.Column, DataTable.ColumnGroup]);
		const flattenedColumns = _.reduce(childComponentElements, (acc, childComponentElement) => {
			if (childComponentElement.type === DataTable.Column) {
				return acc.concat([{props: childComponentElement.props, columnGroupProps: null}]);
			}
			if (childComponentElement.type === DataTable.ColumnGroup) {
				return acc.concat(_.map(
					findTypes(childComponentElement.props, DataTable.Column),
					(columnChildComponent) => ({
						props: columnChildComponent.props,
						columnGroupProps: childComponentElement.props,
					})
				));
			}
		}, []);

		const hasGroupedColumns = _.some(
			childComponentElements,
			(childComponentElement) => childComponentElement.type === DataTable.ColumnGroup
		);

		return (
			<ScrollTable
				style={style}
				{...omitProps(passThroughs, DataTable)}
				className={cx('&', className)}
			>
				{!data.length &&
					<ScrollTable.OverlayContainer>
						<EmptyIndicator
							body={emptyMessageBody}
							imageUrl={emptyMessageImageUrl}
							title={emptyMessageTitle}
						/>
					</ScrollTable.OverlayContainer>
				}
				<Thead>
					<Tr>
						{isSelectable ? (
							<Th
								rowSpan={hasGroupedColumns ? 2 : null}
							>
								<Checkbox
									isSelected={_.every(data, 'isSelected')}
									onSelect={this.handleSelectAll}
								/>
							</Th>
						) : null}
						{_.map(childComponentElements, ({ props, type }, index) => type === DataTable.Column ? (
							<Th
								{..._.omit(props, ['field', 'children', 'width', 'title'])}
								onClick={DataTable.shouldColumnHandleSort(props) ? _.partial(this.handleSort, props.field) : null}
								style={{
									width: props.width,
								}}
								rowSpan={hasGroupedColumns ? 2 : null}
								key={_.get(props, 'field', index)}
							>
								{props.title || props.children}
							</Th>
						) : (
							<Th
								colSpan={_.size(filterTypes(props.children, DataTable.Column))}
								{..._.omit(props, ['field', 'children', 'width', 'title'])}
								key={_.get(props, 'field', index)}
							>
								{props.title || props.children}
							</Th>
						))}
					</Tr>
					{hasGroupedColumns ? (
						<Tr>
							{_.reduce(flattenedColumns, (acc, { props: columnProps, columnGroupProps }, index) => acc.concat(_.isNull(columnGroupProps) ? [] : [(
								<Th
									{...omitProps(columnProps, DataTable.Column)}
									onClick={DataTable.shouldColumnHandleSort(columnProps) ? _.partial(this.handleSort, columnProps.field) : null}
									style={{
										width: columnProps.width,
									}}
									key={_.get(columnProps, 'field', index)}
								>
									{columnProps.title || columnProps.children}
								</Th>
							)]), [])}
						</Tr>
					) : null}
				</Thead>
				<Tbody>
					{data.length ?
						_.map(data, (row, index) => (
							<Tr
								{..._.pick(row, ['isDisabled', 'isActive', 'isSelected'])}
								onClick={_.partial(this.handleRowClick, index)}
								isActionable={isActionable}
								key={'row' + index}
							>
								{isSelectable ? (
									<Td>
										<Checkbox
											isSelected={row.isSelected}
											onSelect={_.partial(this.handleSelect, index)}
										/>
									</Td>
								) : null}
								{_.map(flattenedColumns, ({ props: columnProps }, columnIndex) => (
									<Td
										{..._.omit(columnProps, ['field', 'children', 'width', 'title', 'isSortable', 'isSorted'])}
										style={{
											width: columnProps.width,
										}}
										key={'row' + index + _.get(columnProps, 'field', columnIndex)}
									>
										{_.get(row, columnProps.field, '')}
									</Td>
								))}
							</Tr>
					))
					:
					_.times(10, (index) => (
						<Tr
							isDisabled
							key={'row' + index}
							style={{height: '32px'}}
						>
								{isSelectable ? (
									<Td>
									</Td>
								) : null}
								{_.map(flattenedColumns, ({ props: columnProps }, columnIndex) => (
									<Td
										{..._.omit(columnProps, ['field', 'children', 'width', 'title', 'isSortable', 'isSorted'])}
										style={{
											width: columnProps.width,
										}}
										key={'row' + index + _.get(columnProps, 'field', columnIndex)}
									/>
								))}
						</Tr>
					))
				}
				</Tbody>
			</ScrollTable>
		);
	},
});

export default DataTable;
