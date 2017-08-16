import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	createClass,
	findTypes,
	filterTypes,
	getFirst,
	omitProps,
} from '../../util/component-types';

import Checkbox from '../Checkbox/Checkbox';
import EmptyStateWrapper from '../EmptyStateWrapper/EmptyStateWrapper';
import ScrollTable from '../ScrollTable/ScrollTable';

const { Thead, Tbody, Tr, Th, Td } = ScrollTable;

const cx = lucidClassNames.bind('&-DataTable');

const { any, func, number, object, string, bool, arrayOf } = PropTypes;

/**
 *
 * {"categories": ["table"], "madeFrom": ["Checkbox", "EmptyStateWrapper", "ScrollTable"]}
 *
 * `DataTable` provides a simple abstraction over the `Table` component to make it easier to define data-driven tables and render an array of objects.
 */
const DataTable = createClass({
	displayName: 'DataTable',

	propTypes: {
		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,
		/**
		 * Array of objects to be rendered in the table. Object keys match the `field` of each defined `DataTable.Column`.
		 */
		data: arrayOf(object),
		/**
		 * The text to display in cells which have no data.
		 */
		emptyCellText: string,
		/**
		 * Render each row item to be navigable, allowing `onRowClick` to be triggered.
		 */
		isActionable: bool,
		/**
		 * If `true`, the table will be set to fill the width of its parent container.
		 */
		isFullWidth: bool,
		/**
		 * Controls the visibility of the `LoadingMessage`.
		 */
		isLoading: bool,
		/**
		 * Render a checkbox in the first column allowing `onSelect` and `onSelectAll` to be triggered.
		 */
		isSelectable: bool,
		/**
		 * Styles that are passed through to the root container.
		 */
		style: object,
		/**
		 * The minimum number of rows to rendered. If not enough data is provided, the remainder will be shown as empty rows.
		 */
		minRows: number,
		/**
		 * Handler for row click. Signature is `(object, index, { props, event }) => {...}`
		 */
		onRowClick: func,
		/**
		 * Handler for checkbox selection. Signature is `(object, index, { props, event }) => {...}`
		 */
		onSelect: func,
		/**
		 * Handler for checkbox selection in the table header. Signature is `({ props, event }) => {...}`
		 */
		onSelectAll: func,
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
			emptyCellText: '--',
			isActionable: false,
			isSelectable: false,
			onRowClick: _.noop,
			onSelect: _.noop,
			onSelectAll: _.noop,
			onSort: _.noop,
			minRows: 10,
		};
	},

	components: {
		/**
		 * Renders a `Th` for the table. It accepts all the props of `Table.Th`
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
		 * Renders a group of `Th`s.  It accepts all the props of Table.Th
		 */
		ColumnGroup: createClass({
			displayName: 'DataTable.ColumnGroup',
			propName: 'ColumnGroup',
			propTypes: {
				title: string,
			},
			getDefaultProps: () => ({ align: 'center' }),
		}),
		/**
		 * Renders wrapper when the data table has no data.
		 */
		EmptyStateWrapper: EmptyStateWrapper,
	},

	statics: {
		shouldColumnHandleSort(column) {
			return _.isNil(column.isSortable) ? column.isSorted : column.isSortable;
		},
	},

	handleSelect(rowIndex, { event }) {
		const { data, onSelect } = this.props;

		onSelect(data[rowIndex], rowIndex, { props: this.props, event });
	},

	handleSelectAll({ event }) {
		const { onSelectAll } = this.props;

		onSelectAll({ props: this.props, event });
	},

	handleRowClick(rowIndex, event) {
		const { data, onRowClick } = this.props;

		const targetTagName = event.target.tagName.toLowerCase();
		if (targetTagName === 'td' || targetTagName === 'tr') {
			onRowClick(data[rowIndex], rowIndex, { props: this.props, event });
		}
	},

	handleSort(field, event) {
		const { onSort } = this.props;

		event.stopPropagation();
		event.preventDefault();
		event.bubbles = false;
		onSort(field, { props: this.props, event });
	},

	render() {
		const {
			className,
			data,
			emptyCellText,
			isActionable,
			isFullWidth,
			isLoading,
			isSelectable,
			style,
			minRows,
			...passThroughs
		} = this.props;

		const childComponentElements = findTypes(this.props, [
			DataTable.Column,
			DataTable.ColumnGroup,
		]);
		const flattenedColumns = _.reduce(
			childComponentElements,
			(acc, childComponentElement) => {
				if (childComponentElement.type === DataTable.Column) {
					return acc.concat([
						{ props: childComponentElement.props, columnGroupProps: null },
					]);
				}
				if (childComponentElement.type === DataTable.ColumnGroup) {
					return acc.concat(
						_.map(
							findTypes(childComponentElement.props, DataTable.Column),
							columnChildComponent => ({
								props: columnChildComponent.props,
								columnGroupProps: childComponentElement.props,
							})
						)
					);
				}
			},
			[]
		);

		const hasGroupedColumns = _.some(
			childComponentElements,
			childComponentElement =>
				childComponentElement.type === DataTable.ColumnGroup
		);

		const emptyStateWrapper = getFirst(
			this.props,
			DataTable.EmptyStateWrapper,
			<DataTable.EmptyStateWrapper
				Title="No items found."
				Body="Try creating a new object or removing a filter."
			/>
		);

		const fillerRowCount = _.clamp(minRows - _.size(data), 0, Infinity);

		return (
			<EmptyStateWrapper
				{...emptyStateWrapper.props}
				isEmpty={_.isEmpty(data)}
				isLoading={isLoading}
			>
				{emptyStateWrapper.props.children}
				<ScrollTable
					style={style}
					tableWidth={isFullWidth ? '100%' : null}
					{...omitProps(passThroughs, DataTable, [], false)}
					className={cx(
						'&',
						{
							'&-full-width': isFullWidth,
						},
						className
					)}
				>
					<Thead>
						<Tr>
							{isSelectable
								? <Th rowSpan={hasGroupedColumns ? 2 : null} width={24}>
										<Checkbox
											isSelected={_.every(data, 'isSelected')}
											onSelect={this.handleSelectAll}
										/>
									</Th>
								: null}
							{_.map(
								childComponentElements,
								({ props, type }, index) =>
									(type === DataTable.Column
										? <Th
												{..._.omit(props, [
													'field',
													'children',
													'width',
													'title',
												])}
												onClick={
													DataTable.shouldColumnHandleSort(props)
														? _.partial(this.handleSort, props.field)
														: null
												}
												style={{
													width: props.width,
												}}
												rowSpan={hasGroupedColumns ? 2 : null}
												key={_.get(props, 'field', index)}
											>
												{props.title || props.children}
											</Th>
										: <Th
												colSpan={_.size(
													filterTypes(props.children, DataTable.Column)
												)}
												{..._.omit(props, [
													'field',
													'children',
													'width',
													'title',
												])}
												key={_.get(props, 'field', index)}
											>
												{props.title || props.children}
											</Th>)
							)}
						</Tr>
						{hasGroupedColumns
							? <Tr>
									{_.reduce(
										flattenedColumns,
										(acc, { props: columnProps, columnGroupProps }, index) =>
											acc.concat(
												_.isNull(columnGroupProps)
													? []
													: [
															<Th
																{...omitProps(
																	columnProps,
																	DataTable.Column,
																	[],
																	false
																)}
																onClick={
																	DataTable.shouldColumnHandleSort(columnProps)
																		? _.partial(
																				this.handleSort,
																				columnProps.field
																			)
																		: null
																}
																style={{
																	width: columnProps.width,
																}}
																key={_.get(columnProps, 'field', index)}
															>
																{columnProps.title || columnProps.children}
															</Th>,
														]
											),
										[]
									)}
								</Tr>
							: null}
					</Thead>
					<Tbody>
						{_.map(data, (row, index) => (
							<Tr
								{..._.pick(row, ['isDisabled', 'isActive', 'isSelected'])}
								onClick={_.partial(this.handleRowClick, index)}
								isActionable={isActionable}
								key={'row' + index}
							>
								{isSelectable
									? <Td>
											<Checkbox
												isSelected={row.isSelected}
												onSelect={_.partial(this.handleSelect, index)}
											/>
										</Td>
									: null}
								{_.map(flattenedColumns, ({
									props: columnProps,
								}, columnIndex) => {
									const cellValue = _.get(row, columnProps.field);
									const isEmpty = _.isEmpty(_.toString(cellValue));

									return (
										<Td
											{..._.omit(columnProps, [
												'field',
												'children',
												'width',
												'title',
												'isSortable',
												'isSorted',
												'isResizable',
											])}
											style={{
												width: columnProps.width,
											}}
											key={
												'row' + index + _.get(columnProps, 'field', columnIndex)
											}
										>
											{isEmpty ? emptyCellText : cellValue}
										</Td>
									);
								})}
							</Tr>
						))}
						{_.times(fillerRowCount, index => (
							<Tr isDisabled key={'row' + index} style={{ height: '32px' }}>
								{isSelectable ? <Td /> : null}
								{_.map(flattenedColumns, ({
									props: columnProps,
								}, columnIndex) => (
									<Td
										{..._.omit(columnProps, [
											'field',
											'children',
											'width',
											'title',
											'isSortable',
											'isSorted',
											'isResizable',
										])}
										style={{
											width: columnProps.width,
										}}
										key={
											'row' + index + _.get(columnProps, 'field', columnIndex)
										}
									/>
								))}
							</Tr>
						))}
					</Tbody>
				</ScrollTable>
			</EmptyStateWrapper>
		);
	},
});

export default DataTable;
