/* eslint-disable react/prop-types */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
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
import Table from '../Table/Table';

const { Thead, Tbody, Tr, Th, Td } = ScrollTable;

const cx = lucidClassNames.bind('&-DataTable');
const cxe = lucidClassNames.bind('&-DataTable-EmptyStateWrapper');
const SELECTOR_COLUMN_WIDTH = 41;

const { any, func, number, object, string, bool, arrayOf } = PropTypes;

const DataTable = createClass({
	displayName: 'DataTable',

	statics: {
		peek: {
			description: `
				\`DataTable\` provides a simple abstraction over the \`Table\`
				component to make it easier to define data-driven tables and render an
				array of objects.
			`,
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
		},

		shouldColumnHandleSort(column) {
			return _.isNil(column.isSortable) ? column.isSorted : column.isSortable;
		},
	},

	propTypes: {
		className: string`
			Class names that are appended to the defaults.
		`,

		data: arrayOf(object)`
			Array of objects to be rendered in the table. Object keys match the
			\`field\` of each defined \`DataTable.Column\`.
		`,

		emptyCellText: string`
			The text to display in cells which have no data.
		`,

		isActionable: bool`
			Render each row item to be navigable, allowing \`onRowClick\` to be
			triggered.
		`,

		isFullWidth: bool`
			If \`true\`, the table will be set to fill the width of its parent
			container.
		`,

		isLoading: bool`
			Controls the visibility of the \`LoadingMessage\`.
		`,

		isSelectable: bool`
			Render a checkbox in the first column allowing \`onSelect\` and
			\`onSelectAll\` to be triggered.
		`,

		anchorMessage: bool`
			Position the \`EmptyMessage\` and \`LoadingMessage\` near the top of the container. 
			By default, they are vertically aligned to the middle of the table. Useful
			for tables with many rows that extend past the viewport.
		`,

		style: object`
			Styles that are passed through to the root container.
		`,

		minRows: number`
			The minimum number of rows to rendered. If not enough data is provided,
			the remainder will be shown as empty rows.
		`,

		onRowClick: func`
			Handler for row click. Signature is
			\`(object, index, { props, event }) => {...}\`
		`,

		onSelect: func`
			Handler for checkbox selection. Signature is
			\`(object, index, { props, event }) => {...}\`
		`,

		onSelectAll: func`
			Handler for checkbox selection in the table header. Signature is
			\`({ props, event }) => {...}\`
		`,

		onSort: func`
			Handler for column header click (for sorting). Signature is
			\`(field, { props, event }) => {...}\`
		`,

		hasFixedHeader: bool`
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
		`,

		fixedColumnCount: number`
			Sets the number of columns you want to have fixed. You must specify
			\`fixedRowHeight\` and enable \`hasFixedHeader\`when setting this prop.
		`,

		fixedRowHeight: number`
			Determines the height of every row in the DataTable. It's required when
			using the \`fixedColumnCount\` prop.
		`,

		truncateContent: bool`
			Truncates \`Table.Td\` content with ellipses, must be used with \`hasFixedHeader\`
		`,

		Column: any`
			*Child Element*

			Used to define a column of the table. It accepts the same props as
			\`Table.Th\` in addition to:

			- the required prop \`field\`
			- the optional prop \`title\`
		`,

		ColumnGroup: any`
			*Child Element*

			_Note_: column groups are *not* compatible with \`hasFixedHeader\`.

			Used to Group defined \`Column\`s in the table. It accepts the same props
			as \`Table.Th\` in addition to:

			- the optional prop \`title\`
		`,
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
			hasFixedHeader: false,
			fixedColumnCount: 0,
			truncateContent: false,
		};
	},

	getInitialState() {
		return {
			// Represents the actively changing width as the cell is resized.
			activeWidth: {},
		};
	},

	components: {
		Column: createClass({
			displayName: 'DataTable.Column',
			statics: {
				peek: {
					description: `
						Renders a \`Th\` for the table. It accepts all the props of \`Table.Th\`
					`,
				},
			},
			propName: 'Column',
			propTypes: {
				field: string.isRequired,
				title: string,
			},
		}),
		ColumnGroup: createClass({
			displayName: 'DataTable.ColumnGroup',
			statics: {
				peek: {
					description: `
						Renders a group of \`Th\`s.  It accepts all the props of Table.Th
					`,
				},
			},
			propName: 'ColumnGroup',
			propTypes: {
				title: string,
			},
			getDefaultProps: () => ({ align: 'center' }),
		}),
		EmptyStateWrapper: EmptyStateWrapper,
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

	handleFixedBodyUnfixedColumnsScroll(event) {
		this.fixedHeaderUnfixedColumnsRef.scrollLeft = event.target.scrollLeft;
		this.fixedBodyFixedColumnsRef.scrollTop = event.target.scrollTop;
	},
	handleResize(
		columnWidth,
		{
			props: { field },
		}
	) {
		// setting latest column width to Tbody
		this.setState(state => ({
			activeWidth: {
				...state.activeWidth,
				[field]: columnWidth,
			},
		}));
	},
	renderHeader(
		startColumn,
		endColumn,
		childComponentElements,
		flattenedColumns
	) {
		const { isSelectable, data } = this.props;

		const hasGroupedColumns = _.some(
			childComponentElements,
			childComponentElement =>
				childComponentElement.type === DataTable.ColumnGroup
		);

		const columnSlicer = _.flow(
			_.compact,
			columns => _.slice(columns, startColumn, endColumn)
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
											!allSelected && !!data.find(d => d.isSelected)
										}
										onSelect={this.handleSelectAll}
									/>
								</Th>
							) : null,
						].concat(
							_.map(childComponentElements, ({ props, type }, index) =>
								type === DataTable.Column ? (
									<Th
										onResize={props.isResizable ? this.handleResize : null}
										{..._.omit(props, ['children', 'title'])}
										onClick={
											DataTable.shouldColumnHandleSort(props)
												? _.partial(this.handleSort, props.field)
												: null
										}
										rowSpan={hasGroupedColumns ? 2 : null}
										field={props.field || index}
										key={_.get(props, 'field', index)}
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
															? _.partial(this.handleSort, columnProps.field)
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
	},

	renderBody(startColumn, endColumn, flattenedColumns) {
		const {
			data,
			isSelectable,
			isActionable,
			minRows,
			emptyCellText,
			fixedRowHeight,
			truncateContent
		} = this.props;

		const fillerRowCount = _.clamp(minRows - _.size(data), 0, Infinity);
		const isFixedColumn = endColumn < Infinity;
		const columnSlicer = _.flow(
			_.compact,
			columns => _.slice(columns, startColumn, endColumn)
		);

		return (
			<Tbody>
				{_.map(data, (row, index) => (
					<Tr
						{..._.pick(row, ['isDisabled', 'isActive', 'isSelected'])}
						isActionable={isActionable}
						onClick={_.partial(this.handleRowClick, index)}
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
											onSelect={_.partial(this.handleSelect, index)}
										/>
									</Td>
								) : null,
							].concat(
								_.map(
									flattenedColumns,
									({ props: columnProps }, columnIndex) => {
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
												hasBorderRight={
													!_.isNil(columnProps.hasBorderRight)
														? columnProps.hasBorderRight
														: isFixedColumn &&
														  columnIndex + 1 + (isSelectable ? 1 : 0) ===
																endColumn
												}
												style={{
													width:
														this.state.activeWidth[
															columnProps.field || columnIndex
														] || columnProps.width,
												}}
												key={
													'row' +
													index +
													_.get(columnProps, 'field', columnIndex)
												}
												truncateContent={truncateContent}
											>
												{isEmpty ? emptyCellText : cellValue}
											</Td>
										);
									}
								)
							)
						)}
					</Tr>
				))}
				{_.times(fillerRowCount, index => (
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
	},

	render() {
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

		const emptyStateWrapper = getFirst(
			this.props,
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
										{...omitProps(passThroughs, DataTable, [], false)}
										style={style}
										className={cx('&-fixed-header-fixed-columns-Table')}
									>
										{this.renderHeader(
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
								ref={ref => (this.fixedHeaderUnfixedColumnsRef = ref)}
							>
								<Table
									{...omitProps(passThroughs, DataTable, [], false)}
									style={style}
									className={cx('&-fixed-header-unfixed-columns-Table')}
								>
									{this.renderHeader(
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
								ref={ref => (this.fixedBodyFixedColumnsRef = ref)}
							>
								{fixedColumnCount > 0 ? (
									<Table
										{...omitProps(passThroughs, DataTable, [], false)}
										style={style}
										className={cx('&-fixed-body-fixed-columns-Table')}
										hasWordWrap={
											false /* try to protect against vertical overflow */
										}
									>
										{this.renderBody(0, fixedColumnCount, flattenedColumns)}
									</Table>
								) : null}
							</div>
							<div
								onScroll={this.handleFixedBodyUnfixedColumnsScroll}
								className={cx('&-fixed-body-unfixed-columns')}
							>
								<span className={cx('&-fixed-body-unfixed-columns-shadow')} />
								<Table
									{...omitProps(passThroughs, DataTable, [], false)}
									style={style}
									className={cx('&-fixed-body-unfixed-columns-Table')}
									hasWordWrap={
										false /* try to protect against vertical overflow */
									}
								>
									{this.renderBody(
										fixedColumnCount,
										Infinity,
										flattenedColumns
									)}
								</Table>
							</div>
						</div>
					</div>
				) : (
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
						{this.renderHeader(
							0,
							Infinity,
							childComponentElements,
							flattenedColumns
						)}
						{this.renderBody(0, Infinity, flattenedColumns)}
					</ScrollTable>
				)}
			</EmptyStateWrapper>
		);
	},
});

export default DataTable;
