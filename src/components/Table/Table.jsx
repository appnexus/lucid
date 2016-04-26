import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-definition';
import { findElementsByType } from '../../util/child-component';
import CaretIcon from '../Icon/CaretIcon/CaretIcon';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';

const boundClassNames = lucidClassNames.bind('&-Table');

const {
	any,
	bool,
	func,
	node,
	number,
	object,
	string,
} = React.PropTypes;

/**
 * `Thead` renders <thead>.
 *
 * Any child `<Tr>` will have `isHeader` set to `true` unless otherwise specified.
 */
const Thead = createClass({
	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element. Value is run through the `classnames` library.
		 */
		className: any,
		/**
		 * any valid React children
		 */
		children: node,
	},
	render() {
		const {
			children
		} = this.props;

		return (
			<thead {...this.props} className={boundClassNames('&-thead', this.props.className)}>
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
			</thead>
		);
	}
});

/**
 * `Tbody` renders <tbody>.
 */
const Tbody = createClass({
	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element. Value is run through the `classnames` library.
		 */
		className: any,
	},
	render() {
		return (
			<tbody {...this.props} className={boundClassNames('&-tbody', this.props.className)} />
		);
	}
});

/**
 * `Tr` renders <tr>.
 *
 * For children `<Td>`, `isAfterRowSpan` will be set to `true` on the second `<Td>` if the first `<Td>` has a `rowSpan` value greater than `1`, unless otherwise specified.
 */
const Tr = createClass({
	propTypes: {
		/**
		 * any valid React children
		 */
		children: node,
		/**
		 * Appended to the component-specific class names set on the root
		 * element. Value is run through the `classnames` library.
		 */
		className: any,
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
			<tr {...this.props} className={boundClassNames({
				'&-row': !isHeader,
				'&-thead-row': isHeader,
				'&-is-disabled': isDisabled,
				'&-is-selected': isSelected,
				'&-has-details': hasDetails,
				'&-is-active': isActive,
			}, className)}>
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
			</tr>
		);
	}
});

/**
 * `Th` renders <th>.
 *
 * Will Render a CaretIcon next to the children if `isSorted`.
 */
const Th = createClass({
	propTypes: {
		/**
		 * Aligns the content of a cell. Can be `left`, `center`, or `right`.
		 */
		align: string,
		/**
		 * any valid React children
		 */
		children: node,
		/**
		 * Appended to the component-specific class names set on the root
		 * element. Value is run through the `classnames` library.
		 */
		className: any,
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
		 * Styles the cell to indicate it should be resizable and sets up drag-
		 * related events to enable this resizing functionality.
		 */
		isResizable: bool,
		/**
		 * Styles the cell to allow column sorting.
		 */
		isSortable: bool,
		/**
		 * Styles the cell when a column is sorted.
		 */
		isSorted: bool,
		/**
		 * Called as the user drags the resize handle to resize the column atop
		 * which this table header cell sits.
		 */
		onResize: func,
		/**
		 * The direction of the caret in the sorted column.
		 */
		sortDirection: string,
		/**
		 * Styles that are passed through to root element.
		 */
		style: object,
		/**
		 * Width of the column atop which this table header cell sits.
		 */
		width: number
	},
	getDefaultProps() {
		return {
			align: 'left',
			hasCheckbox: false,
			hasIcon: false,
			hasButton: false,
			isResizable: false,
			isSorted: false,
			sortDirection: 'up'
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
			// Represents the width when the cell is not actively being resized.
			passiveWidth: width || null
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
			isResizable,
			isSortable,
			isSorted,
			sortDirection,
			style
		} = this.props;
		const {
			activeWidth,
			hasSetWidth,
			isResizing,
			passiveWidth
		} = this.state;

		const cellContent = (isSorted ? (
			<ul className={boundClassNames('&-is-sorted-container')}>
				<li className={boundClassNames('&-is-sorted-title')}>{children}</li>
				<li className={boundClassNames('&-is-sorted-caret')}>
					<CaretIcon className={boundClassNames('&-sort-icon')} direction={sortDirection} size={6}/>
				</li>
			</ul>
		) : children);

		return (
			<th
				{...this.props}
				className={boundClassNames(
					'&-cell', {
					'&-align-left': align === 'left',
					'&-align-center': align === 'center',
					'&-align-right': align === 'right',
					'&-has-checkbox': hasCheckbox,
					'&-has-icon': hasIcon,
					'&-has-button': hasButton,
					'&-is-resizable': isResizable,
					'&-is-resizing': isResizing,
					'&-is-sortable': (isSortable === false ? isSortable : (isSorted || isSortable)),
					'&-is-sorted': isSorted,
				}, className)}
				ref='root'
				style={hasSetWidth ? _.assign({}, style, {
					width: isResizing ? activeWidth : passiveWidth
				}) : style}
			>
				{isResizable ? (
					<div className={boundClassNames('&-is-resizable-container')}>
						<div className={boundClassNames('&-is-resizable-content')}>
							{cellContent}
						</div>
						<DragCaptureZone
							onDrag={this.handleDragged}
							onDragEnd={this.handleDragEnded}
							onDragStart={this.handleDragStarted}
						/>
					</div>
				) : cellContent}
			</th>
		);
	},
	getWidth() {
		const styleWidth = _.get(this.refs.root, 'style.width');
		if (_.endsWith(styleWidth, 'px')){
			return parseInt(styleWidth);
		}
		return this.refs.root.getBoundingClientRect().width;
	},
	handleDragEnded(coordinates, { event }) {
		this.setState({
			isResizing: false,
			passiveWidth: this.state.activeWidth
		});

		window.document.body.style.cursor = 'auto';

		if (this.props.onResize) {
			this.props.onResize(this.state.activeWidth, {
				event,
				props: this.props
			});
		}
	},
	handleDragStarted(coordinates, { event }) {
		const startingWidth = this.getWidth();

		this.setState({
			activeWidth: startingWidth,
			hasSetWidth: true,
			isResizing: true,
			passiveWidth: startingWidth
		});

		window.document.body.style.cursor = 'ew-resize';

		if (this.props.onResize) {
			this.props.onResize(startingWidth, {
				event,
				props: this.props
			});
		}
	},
	handleDragged(coordinates, { event }) {
		const activeWidth = this.state.passiveWidth + coordinates.dX;

		this.setState({ activeWidth });

		if (this.props.onResize) {
			this.props.onResize(activeWidth, {
				event,
				props: this.props
			});
		}
	}
});

/**
 * `Td` renders <td>.
 */
const Td = createClass({
	propTypes: {
		/**
		 * Aligns the content of a cell. Can be `left`, `center`, or `right`.
		 */
		align: string,
		/**
		 * Appended to the component-specific class names set on the root
		 * element. Value is run through the `classnames` library.
		 */
		className: any,
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
		isAfterRowSpan: bool,
		/**
		 * Passed to the underlying `td`.
		 */
		rowSpan: number,
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
			<td {...this.props} className={boundClassNames(
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
			}, className)} />
		);
	}
});

/**
 *
 * {"categories": ["table"], "madeFrom": ["CaretIcon", "DragCaptureZone"]}
 *
 * `Table` provides the most basic components to create a lucid table.
 * It is recommended to create a wrapper around this component rather than using it directly in an app.
 */
const Table = createClass({
	displayName: 'Table',

	statics: {
		Thead,
		Tbody,
		Tr,
		Th,
		Td,
	},

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

		/**
		 * render the table without borders on the outer edge
		 */
		hasNoBorder: bool,
	},

	getDefaultProps() {
		return {
			hasNoBorder: false,
			hasExtraWhitespace: false,
		};
	},

	render() {

		const {
			className,
			hasNoBorder,
			hasExtraWhitespace,
		} = this.props;

		return (
			<table
				{...this.props}
				className={boundClassNames('&', {
					'&-has-extra-whitespace': hasExtraWhitespace,
					'&-has-no-border': hasNoBorder,
				}, className)}
			/>
		);
	}
});

export default Table;
