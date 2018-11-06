import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	createClass,
	filterTypes,
	omitProps,
} from '../../util/component-types';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';

const cx = lucidClassNames.bind('&-Table');

const { any, bool, func, node, number, object, string, oneOf } = PropTypes;

const Thead = createClass({
	displayName: 'Table.Thead',

	statics: {
		peek: {
			description: `
				\`Thead\` renders <thead>.
			`,
		},
	},

	propTypes: {
		className: any`
			Appended to the component-specific class names set on the root element.
			Value is run through the \`classnames\` library.
		`,

		children: node`
			any valid React children
		`,
	},

	render() {
		const { children, className, ...passThroughs } = this.props;

		return (
			<thead
				{...omitProps(passThroughs, Thead)}
				className={cx('&-Thead', className)}
			>
				{renderRowsWithIdentifiedEdges(filterTypes(children, Tr), Th)}
			</thead>
		);
	},
});

const Tbody = createClass({
	displayName: 'Table.Tbody',

	statics: {
		peek: {
			description: `
				\`Tbody\` renders <tbody>.
			`,
		},
	},

	propTypes: {
		className: any`
			Appended to the component-specific class names set on the root element.
			Value is run through the \`classnames\` library.
		`,

		children: node`
			any valid React children
		`,
	},

	render() {
		const { children, className, ...passThroughs } = this.props;

		return (
			<tbody
				{...omitProps(passThroughs, Tbody)}
				className={cx('&-Tbody', className)}
			>
				{renderRowsWithIdentifiedEdges(filterTypes(children, Tr), Td)}
			</tbody>
		);
	},
});

const Tr = createClass({
	displayName: 'Table.Tr',

	statics: {
		peek: {
			description: `
				\`Tr\` renders <tr>.
			`,
		},
	},

	propTypes: {
		children: node`
			any valid React children
		`,

		className: any`
			Appended to the component-specific class names set on the root element.
			Value is run through the \`classnames\` library.
		`,

		isDisabled: bool`
			Applies disabled styles to the row.
		`,

		isSelected: bool`
			Applies styles to the row for when the row is selected, usually by a
			checkbox.
		`,

		isActive: bool`
			Applies active styles to the row, usually when the row has been clicked.
		`,

		isActionable: bool`
			Applies styles to the row, used to show if a row is clickable / can be
			made active.
		`,
	},

	getDefaultProps() {
		return {
			isDisabled: false,
			isSelected: false,
			isActive: false,
			isActionable: false,
		};
	},

	render() {
		const {
			className,
			children,
			isDisabled,
			isSelected,
			isActionable,
			isActive,
			...passThroughs
		} = this.props;

		return (
			<tr
				{...omitProps(passThroughs, Tr)}
				className={cx(
					'&-Tr',
					{
						'&-is-disabled': isDisabled,
						'&-is-selected': isSelected,
						'&-is-actionable': isActionable,
						'&-is-active': isActive,
					},
					className
				)}
			>
				{children}
			</tr>
		);
	},
});

const Th = createClass({
	displayName: 'Table.Th',

	statics: {
		peek: {
			description: `
				\`Th\` renders <th>.
			`,
		},
	},

	propTypes: {
		align: string`
			Aligns the content of a cell. Can be \`left\`, \`center\`, or \`right\`.
		`,

		children: node`
			any valid React children
		`,

		className: any`
			Appended to the component-specific class names set on the root element.
			Value is run through the \`classnames\` library.
		`,

		hasBorderRight: bool`
			Should be \`true\` to render a right border.
		`,

		hasBorderLeft: bool`
			Should be \`true\` to render a left border.
		`,

		isResizable: bool`
			Styles the cell to indicate it should be resizable and sets up drag-
			related events to enable this resizing functionality.
		`,

		isSortable: bool`
			Styles the cell to allow column sorting.
		`,

		isSorted: bool`
			Renders a caret icon to show that the column is sorted.
		`,

		onResize: func`
			Called as the user drags the resize handle to resize the column atop
			which this table header cell sits.
		`,

		sortDirection: string`
			Sets the direction of the caret icon when \`isSorted\` is also set.
		`,

		style: object`
			Styles that are passed through to root element.
		`,

		width: number`
			Sets the width of the cell.
		`,

		isFirstRow: bool`
			Define the cell as being in the first row.
		`,

		isLastRow: bool`
			Define the cell as being in the last row.
		`,

		isFirstCol: bool`
			Define the cell as being in the first column.
		`,

		isLastCol: bool`
			Define the cell as being in the last column.
		`,

		isFirstSingle: bool`
			Define the cell as being the first 1-height cell in the row.
		`,
	},

	getDefaultProps() {
		return {
			align: 'left',
			isResizable: false,
			isSorted: false,
			sortDirection: 'up',
		};
	},

	getInitialState() {
		const { width } = this.props;

		return {
			// Represents the actively changing width as the cell is resized.
			activeWidth: width || null,
			// Indicates if a `width` prop was explicitly provided.
			hasSetWidth: !!width,
			// Indicates whether the cell is currently being resized.
			isResizing: false,
			// Indicates a mouse drag is in progress
			isDragging: false,
			// Represents the width when the cell is not actively being resized.
			passiveWidth: width || null,
		};
	},

	componentWillReceiveProps({ width }) {
		if (!_.isNil(width) && width !== this.props.width) {
			this.setState({
				hasSetWidth: true,
				passiveWidth: width,
			});
		}
	},

	render() {
		const {
			children,
			className,
			hasBorderRight,
			hasBorderLeft,
			isFirstRow,
			isLastRow,
			isFirstCol,
			isFirstSingle,
			isLastCol,
			align,
			isResizable,
			isSortable,
			isSorted,
			sortDirection,
			style,
			...passThroughs
		} = this.props;
		const { activeWidth, hasSetWidth, isResizing, passiveWidth } = this.state;

		return (
			<th
				{..._.omit(passThroughs, Th)}
				className={cx(
					'&-Th',
					{
						'&-is-first-row': isFirstRow,
						'&-is-last-row': isLastRow,
						'&-is-first-col': isFirstCol,
						'&-is-first-single': isFirstSingle,
						'&-is-last-col': isLastCol,
						'&-align-left': align === 'left',
						'&-align-center': align === 'center',
						'&-align-right': align === 'right',
						'&-is-resizable': isResizable,
						'&-is-resizing': isResizing,
						'&-is-sortable':
							isSortable === false ? isSortable : isSorted || isSortable,
						'&-is-sorted': isSorted,
						'&-has-border-right': hasBorderRight,
						'&-has-border-left': hasBorderLeft,
					},
					className
				)}
				ref="root"
				onClickCapture={this.handleClickCapture}
				onMouseEnter={this.handleMouseEnter}
				onMouseUp={this.handleMouseUp}
				style={
					hasSetWidth
						? _.assign({}, style, {
								width: isResizing ? activeWidth : passiveWidth,
							})
						: style
				}
			>
				<div className={cx('&-Th-inner')}>
					<div className={cx('&-Th-inner-content')}>{children}</div>
					{isSorted ? (
						<div className={cx('&-Th-inner-caret')}>
							<CaretIcon
								className={cx('&-sort-icon')}
								direction={sortDirection}
								size={6}
							/>
						</div>
					) : null}
					{isResizable ? (
						<DragCaptureZone
							className={cx('&-Th-inner-resize')}
							onDrag={this.handleDragged}
							onDragEnd={this.handleDragEnded}
							onDragStart={this.handleDragStarted}
						/>
					) : null}
				</div>
			</th>
		);
	},

	getWidth() {
		const styleWidth = _.get(this.refs.root, 'style.width');
		if (_.endsWith(styleWidth, 'px')) {
			return parseInt(styleWidth);
		}
		return this.refs.root.getBoundingClientRect().width;
	},

	handleClickCapture(event) {
		if (this.state.isDragging) {
			event.stopPropagation();
			this.setState({
				isDragging: false,
			});
		}
	},

	handleMouseEnter() {
		this.setState({
			isDragging: this.state.isResizing,
		});
	},

	handleMouseUp() {
		this.setState({
			isDragging: this.state.isResizing,
		});
	},

	handleDragEnded(coordinates, { event }) {
		this.setState({
			isResizing: false,
			passiveWidth: this.state.activeWidth,
		});

		window.document.body.style.cursor = '';

		if (this.props.onResize) {
			this.props.onResize(this.state.activeWidth, {
				event,
				props: this.props,
			});
		}
	},

	handleDragStarted(coordinates, { event }) {
		const startingWidth = this.getWidth();

		this.setState({
			activeWidth: startingWidth,
			hasSetWidth: true,
			isResizing: true,
			isDragging: true,
			passiveWidth: startingWidth,
		});

		window.document.body.style.cursor = 'ew-resize';

		if (this.props.onResize) {
			this.props.onResize(startingWidth, {
				event,
				props: this.props,
			});
		}
	},

	handleDragged(coordinates, { event }) {
		const activeWidth = this.state.passiveWidth + coordinates.dX;

		this.setState({ activeWidth });

		if (this.props.onResize) {
			this.props.onResize(activeWidth, {
				event,
				props: this.props,
			});
		}
	},
});

const Td = createClass({
	displayName: 'Table.Td',

	statics: {
		peek: {
			description: `
				\`Td\` renders <td>.
			`,
			categories: [],
			madeFrom: [],
		},
	},

	propTypes: {
		align: string`
			Aligns the content of a cell. Can be \`left\`, \`center\`, or \`right\`.
		`,

		className: any`
			Appended to the component-specific class names set on the root element.
			Value is run through the \`classnames\` library.
		`,

		hasBorderRight: bool`
			Should be \`true\` to render a right border.
		`,

		hasBorderLeft: bool`
			Should be \`true\` to render a left border.
		`,

		isFirstRow: bool`
			Define the cell as being in the first row.
		`,

		isLastRow: bool`
			Define the cell as being in the last row.
		`,

		isFirstCol: bool`
			Define the cell as being in the first column.
		`,

		isLastCol: bool`
			Define the cell as being in the last column.
		`,

		isFirstSingle: bool`
			Define the cell as being the first 1-height cell in the row.
		`,
	},

	getDefaultProps() {
		return {
			align: 'left',
			hasBorderRight: false,
			hasBorderLeft: false,
		};
	},

	render() {
		const {
			className,
			isFirstRow,
			isLastRow,
			isFirstCol,
			isLastCol,
			isFirstSingle,
			align,
			hasBorderRight,
			hasBorderLeft,
			...passThroughs
		} = this.props;

		return (
			<td
				{...omitProps(passThroughs, Td, ['sortDirection'])}
				className={cx(
					'&-Td',
					{
						'&-is-first-row': isFirstRow,
						'&-is-last-row': isLastRow,
						'&-is-first-col': isFirstCol,
						'&-is-last-col': isLastCol,
						'&-is-first-single': isFirstSingle,
						'&-align-left': align === 'left',
						'&-align-center': align === 'center',
						'&-align-right': align === 'right',
						'&-has-border-right': hasBorderRight,
						'&-has-border-left': hasBorderLeft,
					},
					className
				)}
			/>
		);
	},
});

const Table = createClass({
	displayName: 'Table',

	statics: {
		peek: {
			description: `
				\`Table\` provides the most basic components to create a lucid table.
				It is recommended to create a wrapper around this component rather than
				using it directly in an app.
			`,
			categories: ['table'],
			madeFrom: ['CaretIcon', 'DragCaptureZone'],
		},
	},

	components: {
		Thead,
		Tbody,
		Tr,
		Th,
		Td,
	},

	propTypes: {
		style: object`
			Styles that are passed through to the root container.
		`,

		className: string`
			Class names that are appended to the defaults.
		`,

		density: oneOf(['compressed', 'extended'])`
			Adjusts the row density of the table to have more or less spacing.
		`,

		hasLightHeader: bool`
			Allows light header.
		`,

		hasBorder: bool`
			Render the table with borders on the outer edge.
		`,

		hasWordWrap: bool`
			Enables word wrapping in tables cells.
		`,
	},

	getDefaultProps() {
		return {
			density: 'extended',
			hasBorder: false,
			hasWordWrap: true,
			hasLightHeader: false,
		};
	},

	render() {
		const {
			className,
			hasBorder,
			density,
			hasWordWrap,
			hasLightHeader,
			style,
			...passThroughs
		} = this.props;

		return (
			<table
				{...omitProps(passThroughs, Table)}
				style={style}
				className={cx(
					'&',
					{
						'&-density-extended': density === 'extended',
						'&-density-compressed': density === 'compressed',
						'&-has-border': hasBorder,
						'&-has-word-wrap': hasWordWrap,
						'&-has-light-header': hasLightHeader,
					},
					className
				)}
			/>
		);
	},
});

/**
 * mapToGrid
 *
 * Returns a 2 dimensional array of cell elements of the given component type. The map function can modify value of a cell.
 */
function mapToGrid(trList, cellType = 'td', mapFn = _.property('element')) {
	const cellRowList = _.map(trList, trElement =>
		_.map(filterTypes(trElement.props.children, cellType))
	);
	const grid = [];

	if (_.isEmpty(cellRowList)) {
		return [];
	}

	// iterate over each row
	for (let rowIndex = 0; rowIndex < cellRowList.length; rowIndex++) {
		const cellRow = cellRowList[rowIndex];

		if (_.isNil(grid[rowIndex])) {
			grid[rowIndex] = [];
		}

		const canonicalRow = rowIndex;

		// build out each horizonal duplicates of each cell
		for (
			let cellElementIndex = 0;
			cellElementIndex < cellRow.length;
			cellElementIndex++
		) {
			const cellElement = cellRow[cellElementIndex];

			let colSpan = 1;
			let isCellIncluded = false;

			if (_.isNumber(cellElement.props.colSpan)) {
				colSpan = cellElement.props.colSpan;
			}

			const nilCellIndex = _.findIndex(grid[canonicalRow], _.isNil);
			const originCol =
				nilCellIndex !== -1 ? nilCellIndex : grid[canonicalRow].length;

			for (let currentColSpan = 0; currentColSpan < colSpan; currentColSpan++) {
				grid[canonicalRow][originCol + currentColSpan] = {
					element: cellElement,
					canonicalPosition: {
						row: canonicalRow,
						col: originCol,
					},
					isOriginal: !isCellIncluded,
				};
				isCellIncluded = true;
			}
		}

		// build out each vertial duplicates of each cell using the new row in the full grid
		for (let colIndex = 0; colIndex < grid[canonicalRow].length; colIndex++) {
			const gridCell = grid[canonicalRow][colIndex];
			if (gridCell.isOriginal) {
				const cellElement = _.get(gridCell, 'element');
				let rowSpan = 1;

				if (_.isNumber(_.get(cellElement, 'props.rowSpan'))) {
					rowSpan = _.get(cellElement, 'props.rowSpan');
				}

				for (
					let currentRowSpan = 1;
					currentRowSpan < rowSpan;
					currentRowSpan++
				) {
					if (_.isNil(grid[canonicalRow + currentRowSpan])) {
						grid[canonicalRow + currentRowSpan] = [];
					}

					grid[canonicalRow + currentRowSpan][colIndex] = _.assign(
						{},
						grid[canonicalRow + currentRowSpan - 1][colIndex],
						{ isOriginal: false }
					);
				}
			}
		}
	}

	// map new values to each cell in the final grid
	const finalGrid = [];
	for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
		finalGrid[rowIndex] = [];
		for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
			finalGrid[rowIndex][colIndex] = mapFn(
				grid[rowIndex][colIndex],
				{ row: rowIndex, col: colIndex },
				finalGrid
			);
		}
	}

	return finalGrid;
}

/**
 * renderRowsWithIdentifiedEdges
 *
 * Returns an equivalent list of Tr's where each cell on the perimeter has props set for: `isFirstRow`, `isLastRow`, `isFirstCol`, `isLastCol`, and `isFirstSingle`
 */
function renderRowsWithIdentifiedEdges(trList, cellType) {
	const duplicateReferences = [];
	const fullCellGrid = mapToGrid(
		trList,
		cellType,
		(
			{ element: { props }, isOriginal, canonicalPosition },
			currentPos,
			grid
		) => {
			if (!isOriginal) {
				// if cell spans multiple positions
				// store current position and return original cell props reference
				duplicateReferences.push(currentPos);
				return grid[canonicalPosition.row][canonicalPosition.col];
			}
			return _.assign({}, props); // return a new props object based on old cell
		}
	);

	if (_.isEmpty(fullCellGrid)) {
		return [];
	}

	const firstRowIndex = 0;
	const lastRowIndex = fullCellGrid.length - 1;
	const firstColIndex = 0;
	const lastColIndex = _.first(fullCellGrid).length - 1;
	const firstSingleLookup = {};

	// decorate the props of each cell with props that indicate its role in the table
	_.forEach(fullCellGrid, (cellList, rowIndex) =>
		_.forEach(cellList, (cellProps, colIndex) => {
			if (!_.isNull(cellProps)) {
				if (rowIndex === firstRowIndex) {
					cellProps.isFirstRow = true;
				}
				if (rowIndex === lastRowIndex) {
					cellProps.isLastRow = true;
				}
				if (colIndex === firstColIndex) {
					cellProps.isFirstCol = true;
				}
				if (colIndex === lastColIndex) {
					cellProps.isLastCol = true;
				}
			}

			if (!_.has(firstSingleLookup, rowIndex)) {
				_.set(firstSingleLookup, rowIndex, false);
			}
			if (
				!_.get(firstSingleLookup, rowIndex) &&
				_.get(cellProps, 'rowSpan', 1) === 1
			) {
				_.set(firstSingleLookup, rowIndex, true);
				cellProps.isFirstSingle = true;
			}
		})
	);

	_.forEach(duplicateReferences, ({ row, col }) => {
		fullCellGrid[row][col] = null; // remove duplicate references from grid
	});

	// render the grid back to elements using the updated cell props
	return _.map(trList, (trElement, rowIndex) => (
		<Tr {...trElement.props} key={rowIndex}>
			{_.reduce(
				fullCellGrid[rowIndex],
				(rowChildren, cellProps, colIndex) =>
					rowChildren.concat(
						!_.isNull(cellProps)
							? [
									React.createElement(
										cellType,
										_.assign({}, cellProps, { key: colIndex })
									),
								]
							: []
					),
				[]
			)}
		</Tr>
	));
}

export default Table;
