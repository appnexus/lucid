import _ from 'lodash';
import React, { ReactElement } from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	filterTypes,
	omitProps,
	StandardProps,
	Overwrite,
} from '../../util/component-types';
import ArrowIcon from '../Icon/ArrowIcon/ArrowIcon';
import DragCaptureZone, {
	IDragCaptureZoneProps,
} from '../DragCaptureZone/DragCaptureZone';

const cx = lucidClassNames.bind('&-Table');

const {
	any,
	bool,
	func,
	node,
	number,
	object,
	string,
	oneOf,
	oneOfType,
} = PropTypes;

/** Thead <Thead>: The Table Head component */
export interface ITheadPropsRaw extends StandardProps {}

type ITheadProps = Overwrite<
	React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLTableHeaderCellElement>,
		HTMLTableHeaderCellElement
	>,
	ITheadPropsRaw
>;

const Thead = (props: ITheadProps) => {
	const { children, className, ...passThroughs } = props;

	return (
		<thead
			{...omitProps(passThroughs, undefined, _.keys(Thead.propTypes))}
			className={cx('&-Thead', className)}
		>
			{renderRowsWithIdentifiedEdges(filterTypes(children, Tr), Th)}
		</thead>
	);
};

Thead.displayName = 'Table.Thead';

Thead.peek = {
	description: `
		\`Thead\` renders <thead>.
	`,
};

Thead.propTypes = {
	className: any`
		Appended to the component-specific class names set on the root element.
		Value is run through the \`classnames\` library.
	`,

	children: node`
		any valid React children
	`,
};

/** Tbody <Tbody>: The Table Body component */
export interface ITBodyPropsRaw extends StandardProps {}

type ITBodyProps = Overwrite<
	React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLTableSectionElement>,
		HTMLTableSectionElement
	>,
	ITBodyPropsRaw
>;

const Tbody = (props: ITBodyProps) => {
	const { children, className, ...passThroughs } = props;

	return (
		<tbody
			{...omitProps(passThroughs, undefined, _.keys(Tbody.propTypes))}
			className={cx('&-Tbody', className)}
		>
			{renderRowsWithIdentifiedEdges(filterTypes(children, Tr), Td)}
		</tbody>
	);
};

Tbody.displayName = 'Table.Tbody';

Tbody.peek = {
	description: `
		\`Tbody\` renders <tbody>.
	`,
};

Tbody.propTypes = {
	className: any`
		Appended to the component-specific class names set on the root element.
		Value is run through the \`classnames\` library.
	`,

	children: node`
		any valid React children
	`,
};

/** Tr <Tr>: The Table Row component */
export interface ITrPropsRaw extends StandardProps {
	/** Applies disabled styles to the row. */
	isDisabled: boolean;

	/** Applies styles to the row for when the row is selected, usually by a
		checkbox. */
	isSelected: boolean;

	/** Applies active styles to the row, usually when the row has been clicked. */
	isActive: boolean;

	/**  */
	isActionable?: boolean;
}

type ITrProps = Overwrite<
	React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLTableRowElement>,
		HTMLTableRowElement
	>,
	ITrPropsRaw
>;

const Tr = (props: ITrProps) => {
	const {
		className,
		children,
		isDisabled,
		isSelected,
		isActive,
		...passThroughs
	} = props;

	return (
		<tr
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(Tr.propTypes).concat(['isActionable'])
			)}
			className={cx(
				'&-Tr',
				{
					'&-is-disabled': isDisabled,
					'&-is-selected': isSelected,
					'&-is-active': isActive,
				},
				className
			)}
		>
			{children}
		</tr>
	);
};

Tr.defaultProps = {
	isDisabled: false,
	isSelected: false,
	isActive: false,
};

Tr.displayName = 'Table.Tr';

Tr.peek = {
	description: `
		\`Tr\` renders <tr>.
	`,
};

Tr.propTypes = {
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
};

/** Th <Th>: The Table Header Cell components */
interface IThProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLTableHeaderCellElement>,
			HTMLTableHeaderCellElement
		> {
	/** Aligns the content of a cell. Can be \`left\`, \`center\`, or \`right\`. */
	align: 'left' | 'center' | 'right';

	/*Should be \`true\` to render a right border. */
	hasBorderRight?: boolean;

	/** Should be \`true\` to render a left border. */
	hasBorderLeft?: boolean;

	/** Styles the cell to indicate it should be resizable and sets up drag-
		related events to enable this resizing functionality. */
	isResizable: boolean;

	/** Styles the cell to allow column sorting. */
	isSortable?: boolean;

	/** Renders a caret icon to show that the column is sorted. */
	isSorted: boolean;

	/** Callback triggered as the user drags the resize handle to resize the column atop
		which this table header cell sits. */
	onResize?: (
		width: number | string | null,
		{
			event,
			props,
		}: {
			event: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent;
			props: IThProps;
		}
	) => void;

	/** Sets the direction of the caret icon when \`isSorted\` is also set. */
	sortDirection: 'left' | 'up' | 'right' | 'down' | undefined;

	/** Sets the width of the cell. */
	width?: number | string;

	/** Sets the min width of the cell. */
	minWidth?: number | string;
	
	/** Indicates for how many columns the cell extends */
	colSpan?: number;

	/** Define the cell as being in the first row. */
	isFirstRow?: boolean;

	/** Define the cell as being in the last row. */
	isLastRow?: boolean;

	/** Define the cell as being in the first column. */
	isFirstCol?: boolean;

	/** Define the cell as being in the last column. */
	isLastCol?: boolean;

	/** Define the cell as being the first 1-height cell in the row. */
	isFirstSingle?: boolean;

	/** Sets the field value for the cell. */
	field?: string;

	rowSpan: number | null;
}

interface IThState {
	// The actively changing width as the cell is resized.
	activeWidth: number | string | null;

	// Indicates if a `width` prop was explicitly provided.
	hasSetWidth: boolean;

	// Indicates whether the cell is currently being resized.
	isResizing: boolean;

	// Indicates a mouse drag is in progress
	isDragging: boolean;

	// The width when the cell is not actively being resized.
	passiveWidth: number | string | null;
}

interface ICoordinates {
	dX: number;
	dY: number;
	pageX: number;
	pageY: number;
}

export class Th extends React.Component<IThProps, IThState> {
	static displayName = 'Table.Th';

	static defaultProps = {
		align: 'left',
		isResizable: false,
		isSorted: false,
		sortDirection: 'up',
		rowSpan: 1,
	};

	static peek = {
		description: `
			\`Th\` renders <th>.
		`,
	};

	static propTypes = {
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

		sortDirection: oneOf(['left', 'up', 'right', 'down', undefined])`
			Sets the direction of the caret icon when \`isSorted\` is also set.
		`,

		style: object`
			Styles that are passed through to root element.
		`,

		width: oneOfType([number, string])`
			Sets the width of the cell.
		`,

		minWidth: oneOfType([number, string])`
			Sets the min width of the cell.
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

		field: string`
			Sets the field value for the cell.
		`,
	};

	private rootRef = React.createRef<HTMLTableHeaderCellElement>();

	state = {
		// Represents the actively changing width as the cell is resized.
		activeWidth: this.props.width || null,

		// Indicates if a `width` prop was explicitly provided.
		hasSetWidth: !!this.props.width,

		// Indicates whether the cell is currently being resized.
		isResizing: false,

		// Indicates a mouse drag is in progress
		isDragging: false,

		// Represents the width when the cell is not actively being resized.
		passiveWidth: this.props.width || null,
	};

	componentWillReceiveProps({ width }: { width?: number | string | null }) {
		if (!_.isNil(width) && width !== this.props.width) {
			this.setState({
				hasSetWidth: true,
				passiveWidth: width,
			});
		}
	}

	getWidth = (): number | null => {
		const styleWidth = _.get(this.rootRef, 'style.width');
		if (_.endsWith(styleWidth, 'px')) {
			return parseInt(styleWidth);
		}
		if (this.rootRef.current) {
			return this.rootRef.current.getBoundingClientRect().width;
		}
		return null;
	};

	handleClickCapture = (event: React.MouseEvent | KeyboardEvent): void => {
		if (this.state.isDragging) {
			event.stopPropagation();
			this.setState({
				isDragging: false,
			});
		}
	};

	handleMouseEnter = (): void => {
		this.setState({
			isDragging: this.state.isResizing,
		});
	};

	handleMouseUp = (): void => {
		this.setState({
			isDragging: this.state.isResizing,
		});
	};

	handleDragEnded = (
		coordinates: ICoordinates,
		{ event }: { event: MouseEvent | TouchEvent }
	): void => {
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
	};

	handleDragged = (
		coordinates: ICoordinates,
		{
			event,
			props,
		}: {
			event: MouseEvent | TouchEvent;
			props: IDragCaptureZoneProps;
		}
	): void => {
		let passiveWidth = this.state.passiveWidth;

		if (passiveWidth === null) {
			return;
		} else if (_.isString(passiveWidth)) {
			passiveWidth = parseInt(passiveWidth);
		}
		
		const activeWidth = ((this.props.minWidth && passiveWidth + coordinates.dX > this.props.minWidth) || !this.props.minWidth) ? passiveWidth + coordinates.dX : this.props.minWidth;

		this.setState({ activeWidth });

		if (this.props.onResize) {
			this.props.onResize(activeWidth, {
				event,
				props: this.props,
			});
		}
	};

	handleDragStarted = (
		coordinates: ICoordinates,
		{
			event,
			props,
		}: {
			event:
				| React.MouseEvent<HTMLDivElement, MouseEvent>
				| React.TouchEvent<HTMLDivElement>;
			props: IDragCaptureZoneProps;
		}
	): void => {
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
	};

	render(): React.ReactNode {
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
				{...omitProps(passThroughs, undefined, _.keys(Th.propTypes))}
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
				ref={this.rootRef}
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
					{isSorted || isSortable ? (
						<div className={cx('&-Th-inner-caret')}>
							<ArrowIcon
								className={cx('&-sort-icon')}
								direction={sortDirection}
								size={10}
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
	}
}

/** Td <td>: The Table Data Cell element */
export interface ITdProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLTableHeaderCellElement>,
			HTMLTableHeaderCellElement
		> {
	/** Aligns the content of a cell. Can be \`left\`, \`center\`, or \`right\`. */
	align: 'left' | 'center' | 'right';

	/** Should be \`true\` to render a right border. */
	hasBorderRight: boolean;

	/** Should be \`true\` to render a left border. */
	hasBorderLeft: boolean;

	/** Define the cell as being in the first row. */
	isFirstRow?: boolean;

	/** Define the cell as being in the last row. */
	isLastRow?: boolean;

	/** Define the cell as being in the first column. */
	isFirstCol?: boolean;

	/** Define the cell as being in the last column. */
	isLastCol?: boolean;

	/** Define the cell as being the first 1-height cell in the row. */
	isFirstSingle?: boolean;

	/** Indicates if the cell has any data or not */
	isEmpty?: boolean;

	rowSpan: number | null;
}

const Td = (props: ITdProps): React.ReactElement => {
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
	} = props;

	return (
		<td
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(Td.propTypes).concat(['sortDirection'])
			)}
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
};

Td.displayName = 'Table.Td';

Td.defaultProps = {
	align: 'left',
	hasBorderRight: false,
	hasBorderLeft: false,
	rowSpan: 1,
};

Td.peek = {
	description: `
		\`Td\` renders <td>.
	`,
	categories: [],
	madeFrom: [],
};

Td.propTypes = {
	align: oneOf(['left', 'center', 'right'])`
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

	isEmpty: bool`
		Indicates if the cell has any data or not.
	`,
};

/** Table <Table> The Table Component */
interface ITableProps extends StandardProps {
	/** Adjusts the row density of the table to have more or less spacing. */
	density: 'compressed' | 'extended';

	/** Allows light header. */
	hasLightHeader: boolean;

	/** Render the table with borders on the outer edge. */
	hasBorder: boolean;

	/** Enables word wrapping in tables cells. */
	hasWordWrap: boolean;

	/** Applies a row hover to rows. Defaults to true. */
	hasHover: boolean;
}

const Table = (props: ITableProps) => {
	const {
		className,
		hasBorder,
		density,
		hasWordWrap,
		hasLightHeader,
		hasHover,
		style,
		...passThroughs
	} = props;

	return (
		<table
			{...omitProps(passThroughs, undefined, _.keys(Table.propTypes))}
			style={style}
			className={cx(
				'&',
				{
					'&-density-extended': density === 'extended',
					'&-density-compressed': density === 'compressed',
					'&-has-border': hasBorder,
					'&-has-word-wrap': hasWordWrap,
					'&-has-light-header': hasLightHeader,
					'&-no-hover': !hasHover,
				},
				className
			)}
		/>
	);
};

Table.displayName = 'Table';

Table.defaultProps = {
	density: 'extended',
	hasBorder: false,
	hasWordWrap: true,
	hasLightHeader: true,
	hasHover: true,
};

Table.peek = {
	description: `
		\`Table\` provides the most basic components to create a lucid table.
		It is recommended to create a wrapper around this component rather than
		using it directly in an app.
	`,
	categories: ['table'],
	madeFrom: ['ArrowIcon', 'DragCaptureZone'],
};

Table.propTypes = {
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

	hasHover: bool`
		Applies a row hover to rows. Defaults to true.
	`,
};

/** ChildComponents */
Table.Thead = Thead;
Table.Th = Th;
Table.Tbody = Tbody;
Table.Tr = Tr;
Table.Td = Td;

/**
 * mapToGrid
 *
 * Returns a 2 dimensional array of cell elements of the given component type. The map function can modify value of a cell.
 */

interface IGridCell extends StandardProps {
	element: React.ReactElement;

	canonicalPosition: {
		row: number;
		col: number;
	};

	isOriginal: boolean;
}

interface IFinalGridCell extends StandardProps {
	grid: IGridCell;
	isFirstRow?: boolean;
	isLastRow?: boolean;
	isFirstCol?: boolean;
	isLastCol?: boolean;
	isFirstSingle?: boolean;
}

function mapToGrid(
	trList: Array<{ props: StandardProps }>,
	cellType: Th | Td = Td,
	mapFn: (gridcell: IGridCell, ...args: any[]) => any = _.property('element')
) {
	const cellRowList = _.map(trList, trElement =>
		_.map(filterTypes(trElement.props.children, cellType))
	);
	const grid: IGridCell[][] = [];

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
	const finalGrid: IFinalGridCell[][] = [];
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

function renderRowsWithIdentifiedEdges(
	trList: Array<{ props: StandardProps }>,
	cellType: Th | Td = Td
): React.ReactElement[] {
	const duplicateReferences: Array<{ row: number; col: number }> = [];
	const fullCellGrid: Array<Array<IFinalGridCell | null>> = mapToGrid(
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

	const firstRow = _.first(fullCellGrid);

	if (_.isUndefined(firstRow)) {
		return [];
	}

	const firstRowIndex = 0;
	const lastRowIndex = fullCellGrid.length - 1;
	const firstColIndex = 0;
	const lastColIndex = firstRow.length - 1;
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
				[] as React.ReactElement[]
			)}
		</Tr>
	));
}

export default Table;
