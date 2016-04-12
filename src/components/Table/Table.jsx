import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import { findElementsByType } from '../../util/child-component';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';

const boundClassNames = lucidClassNames.bind('&-Table');

const {
	object,
	string,
	bool
} = React.PropTypes;

/**
 * `Thead` renders <thead>.
 *
 * Any child `<Tr>` will have `isHeader` set to `true` unless otherwise specified.
 */
const Thead = React.createClass(createLucidComponentDefinition({
	render() {
		const {
			children
		} = this.props;

		return (
			<div {...this.props} className={boundClassNames('&-thead', this.props.className)}>
				{_.map(
					findElementsByType(children, [Tr]),
					(trElement, index) => React.createElement(
						trElement.type,
						{
							key: 'Tr-'+index,
							isHeader: true,
							...trElement.props
						}
					)
				)}
			</div>
		);
	}
}));

/**
 * `Tbody` renders <tbody>.
 */
const Tbody = React.createClass(createLucidComponentDefinition({
	render() {
		return (
			<div {...this.props} className={boundClassNames('&-tbody', this.props.className)} />
		);
	}
}));

/**
 * `Tr` renders <tr>.
 *
 * For children `<Td>`, `isAfterRowSpan` will be set to `true` on the second `<Td>` if the first `<Td>` has a `rowSpan` value greater than `1`, unless otherwise specified.
 */
const Tr = React.createClass(createLucidComponentDefinition({
	propTypes: {
		/**
		 * Should be `true` when rendered inside a thead.
		 */
		isHeader: bool,
		/**
		 * Applies disabled styles to the row.
		 */
		isDisabled: bool,
		/**
		 * Applies styles to the row for when the row is selected, usually by a checkbox.
		 */
		isSelected: bool,
		/**
		 * Applies active styles to the row, usually when the row has been clicked.
		 */
		isActive: bool,
		/**
		 * Applies the _has details_ styles to the row, used to show if a row is clickable or can be made active.
		 */
		hasDetails: bool,
	},
	getDefaultProps() {
		return {
			isDisabled: false,
			isSelected: false,
			isActive: false
		};
	},
	getInitialState() {
		return {
			isFirstItemRowSpan: false
		};
	},
	checkForRowSpan(props=this.props) {
		const {
			children
		} = props;
		const firstElement = _.first(React.Children.toArray(children));
		const rowSpanValue = _.get(firstElement, 'props.rowSpan', 1);

		return rowSpanValue > 1;
	},
	componentWillMount() {
		this.setState({
			isFirstItemRowSpan: this.checkForRowSpan()
		});
	},
	componentWillReceiveProps(nextProps) {
		this.setState({
			isFirstItemRowSpan: this.checkForRowSpan(nextProps)
		});
	},
	render() {
		const {
			children,
			className,
			isHeader,
			isDisabled,
			isSelected,
			hasDetails,
			isActive,
		} = this.props;

		const {
			isFirstItemRowSpan
		} = this.state;

		return (
			<div
				{...this.props}
				className={boundClassNames({
					'&-row': !isHeader,
					'&-thead-row': isHeader,
					'&-is-disabled': isDisabled,
					'&-is-selected': isSelected,
					'&-has-details': hasDetails,
					'&-is-active': isActive,
				}, className)}
				style={{
					display: 'flex',
				}}
			>
				{isFirstItemRowSpan ? React.Children.map(
					children,
					(childElement, index) => (
						index === 1
						? React.createElement(childElement.type, {
							isAfterRowSpan: true,
							...childElement.props
						})
						: childElement
					)
				) : children}
			</div>
		);
	}
}));

/**
 * `Th` renders <th>.
 *
 * Will Render a CaretIcon next to the children if `isSorted`.
 */
const Th = React.createClass(createLucidComponentDefinition({
	propTypes: {
		/**
		 * Aligns the content of a cell. Can be `left`, `center`, or `right`.
		 */
		align: string,
		/**
		 * Should be `true` when the cell has a checkbox.
		 */
		hasCheckbox: bool,
		/**
		 * Should be `true` when the cell has an icon.
		 */
		hasIcon: bool,
		/**
		 * Should be `true` when the cell has a button.
		 */
		hasButton: bool,
		/**
		 * Styles the cell to allow column sorting.
		 */
		isSortable: bool,
		/**
		 * Styles the cell when a column is sorted.
		 */
		isSorted: bool,
		/**
		 * The direction of the caret in the sorted column.
		 */
		sortDirection: string
	},
	getDefaultProps() {
		return {
			align: 'left',
			hasCheckbox: false,
			hasIcon: false,
			hasButton: false,
			isSorted: false,
			sortDirection: 'up'
		};
	},
	render() {
		const {
			children,
			className,
			align,
			hasCheckbox,
			hasIcon,
			hasButton,
			isSortable,
			isSorted,
			sortDirection
		} = this.props;

		return (
			<div
				{...this.props}
				className={boundClassNames(
					'&-cell', {
					'&-align-left': align === 'left',
					'&-align-center': align === 'center',
					'&-align-right': align === 'right',
					'&-has-checkbox': hasCheckbox,
					'&-has-icon': hasIcon,
					'&-has-button': hasButton,
					'&-is-sortable': (isSortable === false ? isSortable : (isSorted || isSortable)),
					'&-is-sorted': isSorted,
				}, className)}
				style={{
					width: 200,
				}}
			>
				{isSorted ? (
					<ul className={boundClassNames('&-is-sorted-container')}>
						<li className={boundClassNames('&-is-sorted-title')}>{children}</li>
						<li className={boundClassNames('&-is-sorted-caret')}>
							<CaretIcon className={boundClassNames('&-sort-icon')} direction={sortDirection} size={6}/>
						</li>
					</ul>
				) : children}
			</div>
		);
	}
}));

/**
 * `Td` renders <td>.
 */
const Td = React.createClass(createLucidComponentDefinition({
	propTypes: {
		/**
		 * Aligns the content of a cell. Can be `left`, `center`, or `right`.
		 */
		align: string,
		/**
		 * Should be `true` when the cell has a checkbox.
		 */
		hasCheckbox: bool,
		/**
		 * Should be `true` when the cell has an icon.
		 */
		hasIcon: bool,
		/**
		 * Should be `true` when the cell has a button.
		 */
		hasButton: bool,
		/**
		 * Should be `true` to render a right border.
		 */
		hasBorderRight: bool,
		/**
		 * Should be `true` to render a left border.
		 */
		hasBorderLeft: bool,
		/**
		 * Should be set to `true` on the second cell in a table where the first cell has a rowspan greater than 1.
		 */
		isAfterRowSpan: bool
	},
	getDefaultProps() {
		return {
			align: 'left',
			hasCheckbox: false,
			hasIcon: false,
			hasButton: false,
			hasBorderRight: false,
			hasBorderLeft: false,
		};
	},
	render() {
		const {
			className,
			align,
			hasCheckbox,
			hasIcon,
			hasButton,
			rowSpan,
			hasBorderRight,
			hasBorderLeft,
			isAfterRowSpan
		} = this.props;

		return (
			<div
				{...this.props}
				className={boundClassNames(
					'&-cell', {
					'&-align-left': align === 'left',
					'&-align-center': align === 'center',
					'&-align-right': align === 'right',
					'&-has-checkbox': hasCheckbox,
					'&-has-icon': hasIcon,
					'&-has-button': hasButton,
					'&-has-rowspan': !_.isNil(rowSpan),
					'&-has-border-right': hasBorderRight,
					'&-has-border-left': hasBorderLeft,
					'&-is-after-rowspan': isAfterRowSpan
				}, className)}
				style={{
					width: 200,
				}}
			/>
		);
	}
}));

/**
 *
 * {"categories": ["table"]}
 *
 * `Table` provides the most basic components to create a lucid table.
 * It is recommended to create a wrapper around this component rather than using it directly in an app.
 */
const Table = React.createClass(createLucidComponentDefinition({
	displayName: 'Table',

	childProps: {
		Thead: null,
		Tbody: null,
		Tr: null,
		Th: null,
		Td: null,
	},

	//statics: {
	//	Thead,
	//	Tbody,
	//	Tr,
	//	Th,
	//	Td,
	//},

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
		 * Adjusts the style of the table to have more spacing within the table cells
		 */
		hasExtraWhitespace: bool,
	},

	getDefaultProps() {
		return {
			hasExtraWhitespace: false,
		};
	},
	
	renderCell(cell, handleRef=_.noop) {
		if (_.isNil(cell)){
			return null;
		}

		const {
			className,
			align,
			hasCheckbox,
			hasIcon,
			hasButton,
			rowSpan,
			hasBorderRight,
			hasBorderLeft,
			isAfterRowSpan,
			...passThrus
		} = cell;

		return !_.isNil(cell) ? (
			<div
				{...passThrus}
				className={boundClassNames('&-cell', {
					'&-align-left': align === 'left',
					'&-align-center': align === 'center',
					'&-align-right': align === 'right',
					//'&-has-checkbox': hasCheckbox,
					//'&-has-icon': hasIcon,
					//'&-has-button': hasButton,
					//'&-has-rowspan': !_.isNil(rowSpan),
					'&-has-border-right': hasBorderRight,
					'&-has-border-left': hasBorderLeft,
					//'&-is-after-rowspan': isAfterRowSpan
				}, className)}
				style={{
					//border: '1px solid gray',
					//borderWidth: '0 1px 1px 0',
					//padding: 4,
					display: 'flex',
					alignItems: 'center',
				}}
				ref={handleRef}
			/>
		) : null;
	},

	renderColumnList(columnList, columnIndex, startRowIndex=0, rowManagerKey, columnManagerKey) {
		return (
			<div
				className={boundClassNames('&-column')}
				style={{
					display: 'flex',
					flexDirection: 'column',
				}}
				ref={this.getGridColumnWidthManager(columnManagerKey).onColumnRender(columnIndex)}
			>
				{_.map(columnList, (cell, index) => this.renderCell(cell, this.getGridRowHeightManager(rowManagerKey).onCellRender(startRowIndex + index, cell)))}
			</div>
		);
	},

	renderSubGrid(grid, startRowIndex=0, startColumnIndex=0, rowManagerKey='subgrid', columnManagerKey='subgrid', props={}) {
		const elements = [];
		for (let columnIndex=0; columnIndex < grid.length; columnIndex++) {
			const column = grid[columnIndex];
			if (!_.isEmpty(column) && !_.every(column, _.isEmpty)) {
				const maxColSpanCell = _.maxBy(column, (cell) => (!_.isNil(cell) && _.isNumber(cell.colSpan) ? cell.colSpan : 1));
				const maxColSpan = !_.isNil(maxColSpanCell) && _.isNumber(maxColSpanCell.colSpan) ? maxColSpanCell.colSpan : 1;
				if (maxColSpan > 1) {
					const maxColSpanCellIndex = _.indexOf(column, maxColSpanCell);
					const colSpanColumns = _.slice(grid, columnIndex, columnIndex + maxColSpan);
					const topSubGrid = _.map(colSpanColumns, (subColumnList) => _.slice(subColumnList, 0, maxColSpanCellIndex));
					const bottomSubGrid = _.map(colSpanColumns, (subColumnList) => _.slice(subColumnList, maxColSpanCellIndex + 1));
					elements.push(
						<div
							className={boundClassNames('&-wrapper')}
							style={{
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							{[
								(maxColSpanCellIndex !== 0 ? this.renderSubGrid(topSubGrid, startRowIndex, columnIndex, rowManagerKey, columnManagerKey): null),
								(this.renderCell(maxColSpanCell, this.getGridRowHeightManager(rowManagerKey).onCellRender(maxColSpanCellIndex, maxColSpanCell))),
								(this.renderSubGrid(bottomSubGrid, maxColSpanCellIndex + 1, columnIndex, rowManagerKey, columnManagerKey))
							]}
						</div>
					);
					columnIndex += maxColSpan - 1;
				} else {
					elements.push(this.renderColumnList(column, startColumnIndex + columnIndex, startRowIndex, rowManagerKey, columnManagerKey));
				}
			}
		}

		if (_.isEmpty(elements)) {
			return null;
		}

		return (
			<div
				className={boundClassNames('&-subGrid', props.className)}
				style={{
					display: 'flex'
				}}
			>
				{elements}
			</div>
		);
	},

	getGridRowHeightManager(rowManagerKey) {
		if (_.isNil(this.gridRowHeightManagers)) {
			this.gridRowHeightManagers = {};
		}
		if (_.isNil(this.gridRowHeightManagers[rowManagerKey])) {
			this.gridRowHeightManagers[rowManagerKey] = GridRowHeightManager.create();
		}
		return this.gridRowHeightManagers[rowManagerKey];
	},

	getGridColumnWidthManager(columnManagerKey) {
		if (_.isNil(this.gridColumnWidthManagers)) {
			this.gridColumnWidthManagers = {};
		}
		if (_.isNil(this.gridColumnWidthManagers[columnManagerKey])) {
			this.gridColumnWidthManagers[columnManagerKey] = GridColumnWidthManager.create();
		}
		return this.gridColumnWidthManagers[columnManagerKey];
	},

	componentDidUpdate() {
		if (!_.isNil(this.gridRowHeightManagers)) {
			_.forEach(this.gridRowHeightManagers, (manager) => {
				manager.normalizeHeights();
			});
		}
		if (!_.isNil(this.gridColumnWidthManagers)) {
			_.forEach(this.gridColumnWidthManagers, (manager) => {
				manager.normalizeWidths();
			});
		}
	},

	render() {

		const {
			children,
			className,
			hasExtraWhitespace,
		} = this.props;

		const theadProps = _.first(Table.Thead.findInAllAsProps(this.props));
		const theadTrPropsList = Table.Tr.findInAllAsProps(theadProps);
		const thPropsListList = _.map(theadTrPropsList, (theadTrProps) => Table.Th.findInAllAsProps(theadTrProps));
		const tbodyProps = _.first(Table.Tbody.findInAllAsProps(this.props));
		const tbodyTrPropsList = Table.Tr.findInAllAsProps(tbodyProps);
		const tdPropsListList = _.map(tbodyTrPropsList, (tbodyTrProps) => Table.Td.findInAllAsProps(tbodyTrProps));

		//console.log(thPropsListList);
		const headerGrid = rowToColumnGrid(gridify(thPropsListList, false));
		const bodyGrid = rowToColumnGrid(gridify(tdPropsListList, false));
		//console.log(headerGrid);

		return (
			<div {...this.props} className={boundClassNames('&', {
				'&-has-extra-whitespace': hasExtraWhitespace,
			}, className)}>
				{this.renderSubGrid(headerGrid, 0, 0, 'header', 'table', {
					className: boundClassNames('&-thead'),
				})}
				{this.renderSubGrid(bodyGrid, 0, 0, 'body', 'table', {
					className: boundClassNames('&-tbody'),
				})}
			</div>
		);
	}
}));

class GridRowHeightManager {
	constructor() {
		this.rows = {};
		this.debouncedNormalizeHeights = _.debounce(() => this.normalizeHeights(), 10);
	}

	static create(...args) {
		return new GridRowHeightManager(...args);
	}

	onCellRender(rowIndex, props={}) {
		if (_.isNil(this.rows[rowIndex])) {
			this.rows[rowIndex] = [];
		}
		return (node) => {
			this.rows[rowIndex].push({props, node});
			this.debouncedNormalizeHeights();
		};
	}

	getMaxHeightForRow(rowIndex) {
		const rowCells = _.get(this.rows, rowIndex, []);
		return _.max(_.map(rowCells, ({node, props}) => _.get(props, 'rowSpan', 1) === 1 ? node.getBoundingClientRect().height : 0));
	}

	sumRowHeights(rowIndices) {
		return _.sum(_.map(rowIndices, (rowIndex) => this.getMaxHeightForRow(rowIndex)));
	}

	setRowHeight(rowIndex, height) {
		const rowCells = _.get(this.rows, rowIndex, []);
		_.forEach(rowCells, ({props, node}) => {
			const rowSpan = _.get(props, 'rowSpan', 1);
			if(rowSpan === 1) {
				node.style.height = height + 'px';
			}
		})
	}

	normalizeHeights() {
		const rowIndices = _.map(_.keys(this.rows), _.parseInt);
		_.forEach(rowIndices, (rowIndex) => {
			const row = this.rows[rowIndex];
			this.setRowHeight(rowIndex, this.getMaxHeightForRow(rowIndex));
			_.forEach(row, ({props, node}) => {
				const rowSpan = _.get(props, 'rowSpan', 1);
				if(rowSpan > 1) {
					const rowSpanHeight = this.sumRowHeights(_.filter(rowIndices, (idx) => _.inRange(idx, rowIndex, rowIndex + rowSpan)));
					node.style.height = rowSpanHeight + 'px';
				}
			});
		});
	}
}

class GridColumnWidthManager {
	constructor() {
		this.columns = {};
		this.debouncedNormalizeWidths = _.debounce(() => this.normalizeWidths(), 10);
	}

	static create(...args) {
		return new GridColumnWidthManager(...args);
	}

	onColumnRender(columnIndex) {
		if (_.isNil(this.columns[columnIndex])) {
			this.columns[columnIndex] = [];
		}
		return (node) => {
			this.columns[columnIndex].push({node});
			this.debouncedNormalizeWidths();
		};
	}

	getMaxWidthForColumn(columnIndex) {
		const columns = _.get(this.columns, columnIndex, []);
		return _.max(_.map(columns, ({node}) => node.getBoundingClientRect().width));
	}

	setColumnWidth(columnIndex, width) {
		const columns = _.get(this.columns, columnIndex, []);
		_.forEach(columns, ({node}) => {
			node.style.width = width + 'px';
		});
	}

	normalizeWidths() {
		const columnIndices = _.map(_.keys(this.columns), _.parseInt);
		_.forEach(columnIndices, (columnIndex) => {
			this.setColumnWidth(columnIndex, this.getMaxWidthForColumn(columnIndex));
		});
	}

}

function gridify(cellRowList, hasDuplicates=true) {
	const grid = [];

	_.forEach(cellRowList, (cellRow, rowIndex) => {
		if (_.isNil(grid[rowIndex])) {
			grid[rowIndex] = [];
		}
		_.forEach(cellRow, (cell) => {
			let rowSpan = 1;
			let colSpan = 1;
			let isCellIncluded = false;

			if (_.isNumber(cell.rowSpan)) {
				rowSpan = cell.rowSpan;
			}
			if (_.isNumber(cell.colSpan)) {
				colSpan = cell.colSpan;
			}

			let rowSpanCount = 0;
			_.times(rowSpan, () => {
				_.times(colSpan, () => {
					if (_.isNil(grid[rowIndex + rowSpanCount])) {
						grid[rowIndex + rowSpanCount] = [];
					}
					if (hasDuplicates || !isCellIncluded) {
						grid[rowIndex + rowSpanCount].push(cell);
						isCellIncluded = true;
					} else {
						grid[rowIndex + rowSpanCount].push(null);
					}
				});
				rowSpanCount++;
			});
		});
	});

	return grid;
}

function someInGrid(grid, predicate) {
	for (let rowIndex=0; rowIndex < grid.length; rowIndex++) {
		for (let columnIndex=0; columnIndex < grid[rowIndex].length; columnIndex++) {
			if (predicate(grid[rowIndex][columnIndex], [rowIndex, columnIndex], grid)) {
				return true;
			}
		}
	}
	return false;
}

function rowToColumnGrid(rowBasedGrid) {
	return _.unzip(rowBasedGrid);
}

export default Table;
