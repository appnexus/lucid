/* eslint-disable react/prop-types */
import _ from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { findTypes, filterTypes, getFirst } from '../../util/component-types';

import Checkbox from '../Checkbox/Checkbox';
import EmptyStateWrapper from '../EmptyStateWrapper/EmptyStateWrapper';
import ScrollTable from '../ScrollTable/ScrollTable';
import Table, { IThProps, ITableProps } from '../Table/Table';

const { Thead, Tbody, Tr, Th, Td } = ScrollTable;

const cx = lucidClassNames.bind('&-DataTable');
const cxe = lucidClassNames.bind('&-DataTable-EmptyStateWrapper');
const SELECTOR_COLUMN_WIDTH = 41;

const {
	any,
	func,
	number,
	object,
	string: stringProps,
	bool,
	arrayOf,
} = PropTypes;

export interface IDataTableProps
	extends ITableProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/*
	 * 	Array of objects to be rendered in the table. Object keys match the
	 * 	\`field\` of each defined \`DataTable.Column\`.
	 */
	data: object[];

	/*
	 * 	The text to display in cells which have no data.
	 */
	emptyCellText: string;

	/*
	 * 	Render each row item to be navigable, allowing \`onRowClick\` to be
	 * 	triggered.
	 */
	isActionable: boolean;

	/*
	 * 	If \`true\`, the table will be set to fill the width of its parent
	 * 	container.
	 */
	isFullWidth?: boolean;

	/*
	 * 	Controls the visibility of the \`LoadingMessage\`.
	 */
	isLoading?: boolean;

	/*
	 * 	Render a checkbox in the first column allowing \`onSelect\` and
	 * 	\`onSelectAll\` to be triggered.
	 */
	isSelectable: boolean;

	/*
	 * 	Position the \`EmptyMessage\` and \`LoadingMessage\` near the top of the container.
	 * 	By default, they are vertically aligned to the middle of the table. Useful
	 * 	for tables with many rows that extend past the viewport.
	 */
	anchorMessage?: boolean;

	/*
	 * 	Styles that are passed through to the root container.
	 */
	style?: object;

	/*
	 * 	The minimum number of rows to rendered. If not enough data is provided,
	 * 	the remainder will be shown as empty rows.
	 */
	minRows: number;

	/*
	 * 	Handler for row click. Signature is
	 * 	\`(object, index, { props, event }) => {...}\`
	 */
	onRowClick: any;

	/*
	 * 	Handler for checkbox selection. Signature is
	 * 	\`(object, index, { props, event }) => {...}\`
	 */
	onSelect: any;

	/*
	 * 	Handler for checkbox selection in the table header. Signature is
	 * 	\`({ props, event }) => {...}\`
	 */
	onSelectAll: any;

	/*
	 * 	Handler for column header click (for sorting). Signature is
	 * 	\`(field, { props, event }) => {...}\`
	 */
	onSort: any;

	/*
	 * 	If \`true\` the table will have a fixed header set. *Note* this feature
	 * 	imposes some limitations with respect to the styling and usage of your
	 * 	table. Here are those caveats:

	 * 	- Each \`DataTable.Column\` *must* have an explicit pixel width defined
	 * 		on it. If the combined width of all the columns is greater than the
	 * 		parent container, the user will be able to horizontally scroll.
	 * 	- The outermost wrapper element emitted by this component will be set to
	 * 		100% height. It's your responsibility to put this component inside
	 * 		another container that limits its height so that the resulting table can
	 * 		scroll vertically and keep the fixed headers.
	 * 	- Scroll bars will always be present. This is prevent misalignment of the
	 * 		header and the table body that can occur when scroll bars show up and
	 * 		take width. MacOS browsers depend on OS level settings to determine how
	 * 		scrollbars show up. Having them always present saves us from writing a
	 * 		bunch of terrible code to detect scroll bars and account for their width.
	 * 	- Using fixed headers means multiple tables will be rendered under the
	 * 		hood. We use \`table-layout: fixed\` behavior to make sure we can sync
	 * 		columns widths between the header and the body.
	 * 	- Does not support \`DataTable.ColumnGroup\`s at this time. It's possible
	 * 		we could support them at some point but its not a priority at the moment.
	 * 	- You have to be careful about table cell height overflow. There are
	 * 		cases where this can break the alignment of fixed columns.
	 */
	hasFixedHeader: boolean;

	/*
	 * 	Sets the number of columns you want to have fixed. You must specify
	 * 	\`fixedRowHeight\` and enable \`hasFixedHeader\`when setting this prop.
	 */
	fixedColumnCount: number;

	/*
	 * 	Determines the height of every row in the DataTable. It's required when
	 * 	using the \`fixedColumnCount\` prop.
	 */
	fixedRowHeight?: number;

	/* Truncates \`Table.Td\` content with ellipses, must be used with \`hasFixedHeader\` */
	truncateContent?: boolean;

	/*
	 * 	*Child Element*

	 * 	Used to define a column of the table. It accepts the same props as
	 * 	\`Table.Th\` in addition to:

	 * 	- the required prop \`field\`
	 * 	- the optional prop \`title\`
	 */
	Column?: any;

	/*
	 * 	*Child Element*

	 * 	_Note_: column groups are *not* compatible with \`hasFixedHeader\`.

	 * 	Used to Group defined \`Column\`s in the table. It accepts the same props
	 * 	as \`Table.Th\` in addition to:

	 * 	- the optional prop \`title\`
	 */
	ColumnGroup?: any;

	/*
	 * If \`isResizable\` is true,
	 * it is called when the user resizes the a header cell in the table.
	 */
	onResize?: any;
}

/** TODO: Remove the nonPassThroughs when the component is converted to a functional component */
const nonPassThroughs = [
	'className',
	'data',
	'emptyCellText',
	'isActionable',
	'isFullWidth',
	'isLoading',
	'isSelectable',
	'anchorMessage',
	'style',
	'minRows',
	'hasFixedHeader',
	'fixedColumnCount',
	'fixedRowHeight',
	'truncateContent',
	'initialState',
	'onRowClick',
	'onSelect',
	'onSelectAll',
	'onSort',
	'Column',
	'ColumnGroup',
	'onResize',
];

/** TODO: Remove the nonColumnProps when the component is converted to a functional component */
const omittedColumnProps = ['field', 'title', 'initialState'];

const defaultProps = {
	emptyCellText: '--',
	isActionable: false,
	isSelectable: false,
	onRowClick: _.noop,
	onSelect: _.noop,
	onSelectAll: _.noop,
	onSort: _.noop,
	minRows: 10,
	hasFixedHeader: false,
	fixedColumnCount: 0,
};

const defaultState = {
	// Represents the actively changing width as the cell is resized.
	activeWidth: {},
};

export const DataTable = (props: IDataTableProps) => {
	const [state, setState] = useState(defaultState);

	let fixedHeaderUnfixedColumnsRef: any;
	let fixedBodyFixedColumnsRef: any;

	const handleSelect = (rowIndex: any, { event }: any) => {
		const { data, onSelect } = props;

		onSelect(data[rowIndex], rowIndex, { props: props, event });
	};

	const handleSelectAll = ({ event }: any) => {
		const { onSelectAll } = props;

		onSelectAll({ props: props, event });
	};

	const handleRowClick = (rowIndex: any, event: any) => {
		const { data, onRowClick } = props;

		const targetTagName = event.target.tagName.toLowerCase();
		if (targetTagName === 'td' || targetTagName === 'tr') {
			onRowClick(data[rowIndex], rowIndex, { props: props, event });
		}
	};

	const handleSort = (field: any, event: any) => {
		const { onSort } = props;

		event.stopPropagation();
		event.preventDefault();
		event.bubbles = false;
		onSort(field, { props: props, event });
	};

	const handleFixedBodyUnfixedColumnsScroll = (event: any) => {
		fixedHeaderUnfixedColumnsRef &&
			(fixedHeaderUnfixedColumnsRef.scrollLeft = event.target.scrollLeft);
		fixedBodyFixedColumnsRef &&
			(fixedBodyFixedColumnsRef.scrollTop = event.target.scrollTop);
	};

	const handleResize = (columnWidth: any, { props: { field } }: any) => {
		// setting latest column width to Tbody
		setState((state) => ({
			activeWidth: {
				...state.activeWidth,
				[field]: columnWidth,
			},
		}));
	};

	const renderHeader = (
		startColumn: any,
		endColumn: any,
		childComponentElements: any,
		flattenedColumns: any
	) => {
		const { isSelectable, data, truncateContent } = props;

		const hasGroupedColumns = _.some(
			childComponentElements,
			(childComponentElement) =>
				childComponentElement.type === DataTable.ColumnGroup
		);

		const columnSlicer = _.flow(_.compact, (columns) =>
			_.slice(columns, startColumn, endColumn)
		);
		const allSelected = _.every(data, 'isSelected');

		return (
			<Thead>
				<Tr>
					{columnSlicer(
						[
							isSelectable ? (
								<Th
									key={cx('&-row-selector')}
									rowSpan={hasGroupedColumns ? 2 : null}
									width={SELECTOR_COLUMN_WIDTH}
								>
									<Checkbox
										isDisabled={!data || !data.length}
										isSelected={!!data && data.length > 0 && allSelected}
										isIndeterminate={
											!allSelected && !!data.find((d: any) => d.isSelected)
										}
										onSelect={handleSelectAll}
									/>
								</Th>
							) : null,
						].concat(
							_.map(childComponentElements, ({ props, type }, index) =>
								type === DataTable.Column ? (
									<Th
										onResize={props.isResizable ? (handleResize as any) : null}
										{..._.omit(props, ['children', 'title'])}
										onClick={
											DataTable.shouldColumnHandleSort(props)
												? (_.partial(handleSort, props.field) as any)
												: null
										}
										rowSpan={hasGroupedColumns ? 2 : null}
										field={props.field || index}
										key={_.get(props, 'field', index)}
										truncateContent={truncateContent}
									>
										{props.title || props.children}
									</Th>
								) : (
									<Th
										colSpan={_.size(
											filterTypes(props.children, DataTable.Column)
										)}
										{..._.omit(props, ['field', 'children', 'width', 'title'])}
										key={_.get(props, 'field', index)}
									>
										{props.title || props.children}
									</Th>
								)
							)
						)
					)}
				</Tr>
				{hasGroupedColumns ? (
					<Tr>
						{_.reduce(
							flattenedColumns,
							(acc: any, { props: columnProps, columnGroupProps }, index) =>
								acc.concat(
									_.isNull(columnGroupProps)
										? []
										: [
												<Th
													{..._.omit(columnProps, omittedColumnProps)}
													onClick={
														DataTable.shouldColumnHandleSort(columnProps)
															? (_.partial(
																	handleSort,
																	columnProps.field
															  ) as any)
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
				) : null}
			</Thead>
		);
	};

	const renderBody = (
		startColumn: any,
		endColumn: any,
		flattenedColumns: any
	) => {
		const {
			data,
			isSelectable,
			isActionable,
			minRows,
			emptyCellText,
			fixedRowHeight,
			truncateContent,
		} = props;

		const fillerRowCount = _.clamp(minRows - _.size(data), 0, Infinity);
		const isFixedColumn = endColumn < Infinity;
		const columnSlicer = _.flow(_.compact, (columns) =>
			_.slice(columns, startColumn, endColumn)
		);

		return (
			<Tbody>
				{_.map(data, (row: any, index) => (
					<Tr
						{..._.pick(row, ['isDisabled', 'isActive', 'isSelected'])}
						isActionable={isActionable}
						onClick={_.partial(handleRowClick, index)}
						key={'row' + index}
						style={_.assign(
							row.style,
							fixedRowHeight ? { height: fixedRowHeight } : {}
						)}
					>
						{columnSlicer(
							[
								isSelectable ? (
									<Td
										key={cx('&-row-selector')}
										width={SELECTOR_COLUMN_WIDTH}
										hasBorderRight={
											isFixedColumn && flattenedColumns.length === 0
										}
									>
										<Checkbox
											isSelected={row.isSelected}
											onSelect={_.partial(handleSelect, index)}
										/>
									</Td>
								) : null,
							].concat(
								_.map(
									flattenedColumns,
									({ props: columnProps }, columnIndex) => {
										const cellValue = _.get(row, columnProps.field);
										const isEmpty = _.isEmpty(_.toString(cellValue));
										const currentWidth =
											state.activeWidth[columnProps.field || columnIndex] ||
											columnProps.width;
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
												hasBorderRight={
													!_.isNil(columnProps.hasBorderRight)
														? columnProps.hasBorderRight
														: isFixedColumn &&
														  columnIndex + 1 + (isSelectable ? 1 : 0) ===
																endColumn
												}
												style={{ width: currentWidth }}
												key={
													'row' +
													index +
													_.get(columnProps, 'field', columnIndex)
												}
												truncateContent={truncateContent}
											>
												{isEmpty
													? emptyCellText
													: _.isFunction(cellValue)
													? cellValue(currentWidth)
													: cellValue}
											</Td>
										);
									}
								)
							)
						)}
					</Tr>
				))}
				{_.times(fillerRowCount, (index) => (
					<Tr
						isDisabled
						key={'row' + index}
						style={{ height: fixedRowHeight || '32px' }}
					>
						{columnSlicer(
							[isSelectable ? <Td key={cx('&-row-selector')} /> : null].concat(
								_.map(
									flattenedColumns,
									({ props: columnProps }, columnIndex) => (
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
									)
								)
							)
						)}
					</Tr>
				))}
			</Tbody>
		);
	};

	const {
		className,
		data,
		isFullWidth,
		isLoading,
		style,
		hasFixedHeader,
		fixedColumnCount,
		anchorMessage,
		...passThroughs
	} = props;

	const childComponentElements = findTypes(props, [
		DataTable.Column,
		DataTable.ColumnGroup,
	]);

	const flattenedColumns = _.reduce(
		childComponentElements,
		(acc: any, childComponentElement: any) => {
			if (childComponentElement.type === DataTable.Column) {
				return acc.concat([
					{ props: childComponentElement.props, columnGroupProps: null },
				]);
			}
			if (childComponentElement.type === DataTable.ColumnGroup) {
				return acc.concat(
					_.map(
						findTypes(childComponentElement.props, DataTable.Column),
						(columnChildComponent: any) => ({
							props: columnChildComponent.props,
							columnGroupProps: childComponentElement.props,
						})
					)
				);
			}
		},
		[]
	);

	const emptyStateWrapper: any = getFirst(
		props,
		DataTable.EmptyStateWrapper
	) || (
		<DataTable.EmptyStateWrapper
			Title='No items found.'
			Body='Try creating a new object or removing a filter.'
		/>
	);

	const emptyStateWrapperClassName = cxe(
		{
			'&-has-fixed-header': hasFixedHeader,
		},
		emptyStateWrapper.props.className
	);

	return (
		<EmptyStateWrapper
			{...emptyStateWrapper.props}
			isEmpty={_.isEmpty(data)}
			isLoading={isLoading}
			className={emptyStateWrapperClassName}
			anchorMessage={anchorMessage}
		>
			{emptyStateWrapper.props.children}
			{hasFixedHeader ? (
				<div className={cx('&-fixed')}>
					<div className={cx('&-fixed-header')}>
						<div className={cx('&-fixed-header-fixed-columns')}>
							{fixedColumnCount > 0 ? (
								<Table
									{..._.omit(passThroughs, nonPassThroughs)}
									style={style}
									className={cx('&-fixed-header-fixed-columns-Table')}
								>
									{renderHeader(
										0,
										fixedColumnCount,
										childComponentElements,
										flattenedColumns
									)}
								</Table>
							) : null}
						</div>
						<div
							className={cx('&-fixed-header-unfixed-columns')}
							ref={(ref) => (fixedHeaderUnfixedColumnsRef = ref)}
						>
							<Table
								{..._.omit(passThroughs, nonPassThroughs)}
								style={style}
								className={cx('&-fixed-header-unfixed-columns-Table')}
							>
								{renderHeader(
									fixedColumnCount,
									Infinity,
									childComponentElements,
									flattenedColumns
								)}
							</Table>
						</div>
					</div>
					<div className={cx('&-fixed-body')}>
						<div
							className={cx('&-fixed-body-fixed-columns')}
							ref={(ref) => (fixedBodyFixedColumnsRef = ref)}
						>
							{fixedColumnCount > 0 ? (
								<Table
									{..._.omit(passThroughs, nonPassThroughs)}
									style={style}
									className={cx('&-fixed-body-fixed-columns-Table')}
									hasWordWrap={
										false /* try to protect against vertical overflow */
									}
								>
									{renderBody(0, fixedColumnCount, flattenedColumns)}
								</Table>
							) : null}
						</div>
						<div
							onScroll={handleFixedBodyUnfixedColumnsScroll}
							className={cx('&-fixed-body-unfixed-columns')}
						>
							<span className={cx('&-fixed-body-unfixed-columns-shadow')} />
							<Table
								{..._.omit(passThroughs, nonPassThroughs)}
								style={style}
								className={cx('&-fixed-body-unfixed-columns-Table')}
								hasWordWrap={
									false /* try to protect against vertical overflow */
								}
							>
								{renderBody(fixedColumnCount, Infinity, flattenedColumns)}
							</Table>
						</div>
					</div>
				</div>
			) : (
				<ScrollTable
					style={style}
					tableWidth={isFullWidth ? '100%' : undefined}
					{..._.omit(passThroughs, nonPassThroughs)}
					className={cx(
						'&',
						{
							'&-full-width': isFullWidth,
						},
						className
					)}
				>
					{renderHeader(0, Infinity, childComponentElements, flattenedColumns)}
					{renderBody(0, Infinity, flattenedColumns)}
				</ScrollTable>
			)}
		</EmptyStateWrapper>
	);
};

DataTable.displayName = 'DataTable';

DataTable.propTypes = {
	/**
		Class names that are appended to the defaults.
	*/
	className: stringProps,

	/**
		Array of objects to be rendered in the table. Object keys match the
		\`field\` of each defined \`DataTable.Column\`.
	*/
	data: arrayOf(object),

	/**
		The text to display in cells which have no data.
	*/
	emptyCellText: stringProps,

	/**
		Render each row item to be navigable, allowing \`onRowClick\` to be
		triggered.
	*/
	isActionable: bool,

	/**
		If \`true\`, the table will be set to fill the width of its parent
		container.
	*/
	isFullWidth: bool,

	/**
		Controls the visibility of the \`LoadingMessage\`.
	*/
	isLoading: bool,

	/**
		Render a checkbox in the first column allowing \`onSelect\` and
		\`onSelectAll\` to be triggered.
	*/
	isSelectable: bool,

	/**
		Position the \`EmptyMessage\` and \`LoadingMessage\` near the top of the container. 
		By default, they are vertically aligned to the middle of the table. Useful
		for tables with many rows that extend past the viewport.
	*/
	anchorMessage: bool,

	/**
		Styles that are passed through to the root container.
	*/
	style: object,

	/**
		The minimum number of rows to rendered. If not enough data is provided,
		the remainder will be shown as empty rows.
	*/
	minRows: number,

	/**
		Handler for row click. Signature is
		\`(object, index, { props, event }) => {...}\`
	*/
	onRowClick: func,

	/**
		Handler for checkbox selection. Signature is
		\`(object, index, { props, event }) => {...}\`
	*/
	onSelect: func,

	/**
		Handler for checkbox selection in the table header. Signature is
		\`({ props, event }) => {...}\`
	*/
	onSelectAll: func,

	/**
		Handler for column header click (for sorting). Signature is
		\`(field, { props, event }) => {...}\`
	*/
	onSort: func,

	hasFixedHeader: bool /**
		If \`true\` the table will have a fixed header set. *Note* this feature
		imposes some limitations with respect to the styling and usage of your
		table. Here are those caveats:

		- Each \`DataTable.Column\` *must* have an explicit pixel width defined
			on it. If the combined width of all the columns is greater than the
			parent container, the user will be able to horizontally scroll.
		- The outermost wrapper element emitted by this component will be set to
			100% height. It's your responsibility to put this component inside
			another container that limits its height so that the resulting table can
			scroll vertically and keep the fixed headers.
		- Scroll bars will always be present. This is prevent misalignment of the
			header and the table body that can occur when scroll bars show up and
			take width. MacOS browsers depend on OS level settings to determine how
			scrollbars show up. Having them always present saves us from writing a
			bunch of terrible code to detect scroll bars and account for their width.
		- Using fixed headers means multiple tables will be rendered under the
			hood. We use \`table-layout: fixed\` behavior to make sure we can sync
			columns widths between the header and the body.
		- Does not support \`DataTable.ColumnGroup\`s at this time. It's possible
			we could support them at some point but its not a priority at the moment.
		- You have to be careful about table cell height overflow. There are
			cases where this can break the alignment of fixed columns.
	*/,

	/**
		Sets the number of columns you want to have fixed. You must specify
		\`fixedRowHeight\` and enable \`hasFixedHeader\`when setting this prop.
	*/
	fixedColumnCount: number,

	/**
		Determines the height of every row in the DataTable. It's required when
		using the \`fixedColumnCount\` prop.
	*/
	fixedRowHeight: number,

	/**
		Truncates \`Table.Td\` content with ellipses, must be used with \`hasFixedHeader\`
	*/
	truncateContent: bool,

	Column: any /**
		*Child Element*

		Used to define a column of the table. It accepts the same props as
		\`Table.Th\` in addition to:

		- the required prop \`field\`
		- the optional prop \`title\`
	*/,

	ColumnGroup: any /**
		*Child Element*

		_Note_: column groups are *not* compatible with \`hasFixedHeader\`.

		Used to Group defined \`Column\`s in the table. It accepts the same props
		as \`Table.Th\` in addition to:

		- the optional prop \`title\`
	*/,

	/**
		 If \`isResizable\` is true,
		it is called when the user resizes the a header cell in the table.
	 */
	onResize: func,
};

DataTable.defaultProps = defaultProps;

DataTable.peek = {
	description: `\`DataTable\` provides a simple abstraction over the \`Table\` component to make it easier to define data-driven tables and render an array of objects.`,
	notes: {
		overview: `
			\`DataTable\` provides a simple abstraction over the \`Table\`
			component to make it easier to define data-driven tables and render an
			array of objects.
		`,
		intendedUse: `
			\`DataTable\` is optimized for our two main uses, full page and in-line tables.

			**Full page table**
			
			Tables that cover the entire page, or are the main focus on the page. Generally used for managing and monitoring objects.
			
			**In-line tables**
			
			Tables insides containers such as \`Dialog\` or \`Panel\`. Generally used for details panels and actions dialogs.
								
			**Styling notes**
			
			- Preferred column alignment shown in \`basic\` example, column header alignment should match column content
				- strings left-aligned
				- currency right-aligned
				- icons/buttons centered
			- Use grey footer for full page tables, \`hasLightFooter={false}\`
			- Use white footer for in-line tables, \`hasLightFooter={true}\`
		`,
		technicalRecommendations: `
			- There is a pre-styled state for tables with no data, see the \`empty\` example
			- There should be no row hover state if the rows are not clickable, see example (?)
		`,
	},
	categories: ['table'],
	madeFrom: ['Checkbox', 'EmptyStateWrapper', 'ScrollTable'],
};

DataTable.EmptyStateWrapper = EmptyStateWrapper;

export interface IColumnProps extends IThProps {
	field: string;
	title?: string;
}

// type IColumnProps = Overwrite<typeof Th, IColumnPropsRaw>;

const Column = (props: IColumnProps) => {
	return null;
};

Column.displayName = 'DataTable.Column';

Column.peek = {
	description: `
		Renders a \`Th\` for the table. It accepts all the props of \`Table.Th\`
	`,
};

Column.propTypes = {
	field: stringProps.isRequired,
	title: stringProps,
	isResizable: bool,
};

DataTable.Column = Column;

export interface IColumnGroupProps {
	children?: any;
	title?: string;
}

const ColumnGroup = ({ children }: IColumnGroupProps) => {
	return children;
};

ColumnGroup.displayName = 'DataTable.ColumnGroup';

ColumnGroup.peek = {
	description: `
		Renders a group of \`Th\`s.  It accepts all the props of Table.Th
	`,
};

ColumnGroup.propTypes = {
	title: stringProps,
};

ColumnGroup.defaultProps = {
	align: 'center',
};

DataTable.ColumnGroup = ColumnGroup;

DataTable.shouldColumnHandleSort = (column: any) => {
	return _.isNil(column.isSortable) ? column.isSorted : column.isSortable;
};

export default DataTable;
