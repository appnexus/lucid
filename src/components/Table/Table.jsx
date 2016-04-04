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
}));

/**
 * `Tbody` renders <tbody>.
 */
const Tbody = React.createClass(createLucidComponentDefinition({
	render() {
		return (
			<tbody {...this.props} className={boundClassNames('&-tbody', this.props.className)} />
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
			<th {...this.props} className={boundClassNames(
				'&-cell', {
				'&-align-left': align === 'left',
				'&-align-center': align === 'center',
				'&-align-right': align === 'right',
				'&-has-checkbox': hasCheckbox,
				'&-has-icon': hasIcon,
				'&-has-button': hasButton,
				'&-is-sortable': (isSortable === false ? isSortable : (isSorted || isSortable)),
				'&-is-sorted': isSorted,
			}, className)}>
				{isSorted ? (
					<ul className={boundClassNames('&-is-sorted-container')}>
						<li className={boundClassNames('&-is-sorted-title')}>{children}</li>
						<li className={boundClassNames('&-is-sorted-caret')}>
							<CaretIcon className={boundClassNames('&-sort-icon')} direction={sortDirection} size={6}/>
						</li>
					</ul>
				) : children}
			</th>
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
	},

	getDefaultProps() {
		return {
			hasExtraWhitespace: false,
		};
	},

	render() {

		const {
			className,
			hasExtraWhitespace,
		} = this.props;

		return (
			<table {...this.props} className={boundClassNames('&', {
				'&-has-extra-whitespace': hasExtraWhitespace,
			}, className)} />
		);
	}
}));

export default Table;
