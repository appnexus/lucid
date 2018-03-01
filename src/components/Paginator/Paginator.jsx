import React from 'react';
import PropTypes from 'react-peek/prop-types';
import _ from 'lodash';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass } from '../../util/component-types';
import * as reducers from './Paginator.reducers';
import selectors from './Paginator.selectors';
import { SingleSelectDumb as SingleSelect } from '../SingleSelect/SingleSelect';
import TextField from '../TextField/TextField';
import Button from '../Button/Button';
import ArrowIcon from '../Icon/ArrowIcon/ArrowIcon';
import { buildHybridComponent } from '../../util/state-management';

const cx = lucidClassNames.bind('&-Paginator');

const { arrayOf, bool, func, number, object, shape, string } = PropTypes;

const { Option } = SingleSelect;

const Paginator = createClass({
	displayName: 'Paginator',

	statics: {
		peek: {
			description: `
				A paginator with page size selector.
			`,
			categories: ['navigation'],
			madeFrom: ['ArrowIcon', 'TextField', 'Button', 'SingleSelect'],
		},
	},

	reducers,

	selectors,

	propTypes: {
		className: string`
			Appended to the component-specific class names set on the root elements.
		`,

		style: object`
			Styles that are passed through to root element.
		`,

		isDisabled: bool`
			Disables the Paginator from being clicked or focused.
		`,

		hasPageSizeSelector: bool`
			Whether to show the page size selector.
		`,

		selectedPageIndex: number`
			0-indexed currently selected page number
		`,

		selectedPageSizeIndex: number`
			currently selected page size option index
		`,

		SingleSelect: shape(SingleSelect.propTypes)`
			Object of SingleSelect props which are passed thru to the underlying
			SingleSelect component for the page size selector.
		`,

		totalPages: number`
			number to display in \`of \${totalPages}\`, calculated from
			\`totalPages\` and selected page size by default.
		`,

		totalCount: number`
			total number of items across all pages
		`,

		pageSizeOptions: arrayOf(number)`
			array of numbers representing page size options
		`,

		TextField: shape(TextField.propTypes)`
			Object of TextField props which are passed thru to the underlying
			TextField component.
		`,

		onPageSelect: func`
			Called when a page is selected.  Has the signature \`(pageIndex,
			totalPages, {props, event}) => {}\` where pageIndex is a number.
		`,

		onPageSizeSelect: func`
			Called when a page size is selected.  Has the signature \`(pageSizeIndex,
			{props, event}) => {}\` where pageSizeIndex is a number.
		`,
	},

	getDefaultProps() {
		return {
			hasPageSizeSelector: false,
			isDisabled: false,
			onPageSelect: _.noop,
			selectedPageIndex: 0,
			selectedPageSizeIndex: 0,
			totalCount: null,
			pageSizeOptions: [10, 50, 100],
			SingleSelect: {
				...SingleSelect.getDefaultProps(),
				selectedIndex: 0,
			},
			TextField: TextField.getDefaultProps(),
		};
	},

	handleTextFieldChange(pageNum, { props, event }) {
		const { onPageSelect, selectedPageIndex, totalPages } = this.props;
		const parsedPageNum = _.parseInt(pageNum);
		if (_.isNaN(parsedPageNum)) {
			return onPageSelect(selectedPageIndex, totalPages, { props, event });
		}
		return onPageSelect(parsedPageNum - 1, totalPages, { props, event });
	},

	render() {
		const {
			className,
			hasPageSizeSelector,
			isDisabled,
			onPageSelect,
			onPageSizeSelect,
			pageSizeOptions,
			selectedPageIndex,
			selectedPageSizeIndex,
			totalPages,
			style,
			SingleSelect: singleSelectProps,
			TextField: textFieldProps,
		} = this.props;

		return (
			<div style={style} className={cx('&', className)}>
				{hasPageSizeSelector ? (
					<div className={cx('&-page-size-container')}>
						<span className={cx('&-rows-per-page-label')}>Rows per page:</span>
						<SingleSelect
							{...singleSelectProps}
							hasReset={false}
							isSelectionHighlighted={false}
							isDisabled={isDisabled}
							selectedIndex={selectedPageSizeIndex}
							onSelect={onPageSizeSelect}
						>
							{_.map(pageSizeOptions, option => (
								<Option key={option}>{option}</Option>
							))}
						</SingleSelect>
					</div>
				) : null}

				<Button
					onClick={_.partial(onPageSelect, selectedPageIndex - 1, totalPages)}
					isDisabled={isDisabled || selectedPageIndex === 0}
					hasOnlyIcon
				>
					<ArrowIcon direction="left" />
				</Button>
				<TextField
					lazyLevel={100}
					{...textFieldProps}
					onBlur={this.handleTextFieldChange}
					onSubmit={this.handleTextFieldChange}
					isDisabled={isDisabled}
					value={selectedPageIndex + 1}
				/>
				<span>of {totalPages}</span>
				<Button
					onClick={_.partial(onPageSelect, selectedPageIndex + 1, totalPages)}
					isDisabled={isDisabled || selectedPageIndex === totalPages - 1}
					hasOnlyIcon
				>
					<ArrowIcon direction="right" />
				</Button>
			</div>
		);
	},
});

export default buildHybridComponent(Paginator);
export { Paginator as PaginatorDumb };
