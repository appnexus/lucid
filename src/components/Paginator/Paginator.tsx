import _ from 'lodash';
import React, { FC } from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';
import * as reducers from './Paginator.reducers';
import selectors from './Paginator.selectors';
import {
	ISingleSelectOptionProps,
	ISingleSelectProps,
	SingleSelectDumb as SingleSelect,
	ISingleSelectState,
} from '../SingleSelect/SingleSelect';
import TextField, { ITextFieldProps } from '../TextField/TextField';
import { IButtonProps, Button } from '../Button/Button';
import ArrowIcon from '../Icon/ArrowIcon/ArrowIcon';
import { buildModernHybridComponent } from '../../util/state-management';

const cx = lucidClassNames.bind('&-Paginator');

const { arrayOf, bool, func, number, object, oneOfType, shape, string } =
	PropTypes;

const { Option } = SingleSelect;

type IPaginatorSingleSelectProps = Partial<ISingleSelectProps>;

type ShowTotalObjects = (count: number) => string;

export interface IPaginatorProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/**
	 * Appended to the component-specific class names set on the root elements.
	 */
	className?: string;

	/**
	 * Whether or not to show the page size selector.
	 */
	hasPageSizeSelector?: boolean;

	/**
	 * Disables the Paginator from being clicked or focused.
	 */
	isDisabled?: boolean;

	/**
	 * Label when showTotalObjects is true with 1 or fewer objects.
	 */
	objectLabel?: string;

	/**
	 * Label when showTotalObjects is true with more than 1 objects.
	 */
	objectLabelPlural?: string;

	/**
	 * Called when a page is selected.
	 */
	onPageSelect?: (
		pageIndex: number,
		totalPages: number,
		{
			props,
			event,
		}: {
			props: IButtonProps | ITextFieldProps;
			event: React.MouseEvent | React.FormEvent | React.FocusEvent;
		}
	) => void;

	/**
	 * Called when a page size is selected.
	 */
	onPageSizeSelect?: (
		pageSizeIndex: number | null,
		{
			props,
			event,
		}: {
			props: ISingleSelectOptionProps | undefined;
			event: React.MouseEvent | React.KeyboardEvent;
		}
	) => void;

	/**
	 * 0-indexed currently selected page number.
	 */
	selectedPageIndex?: number;

	/**
	 * Currently selected page size option index.
	 */
	selectedPageSizeIndex?: number;

	/**
	 * Show total count of objects.
	 */
	showTotalObjects?: boolean | ShowTotalObjects;

	/**
	 * Number to display in \`of \${totalPages}\`, calculated from
	 * \`totalPages\` and selected page size by default.
	 */
	totalPages?: number;

	/**
	 * Total number of items across all pages.
	 */
	totalCount?: number | null;

	/**
	 * Array of numbers representing page size options.
	 */
	pageSizeOptions?: number[];

	/**
	 * Object of SingleSelect props which are passed thru to the underlying SingleSelect component for the page size selector.
	 */
	SingleSelect?: IPaginatorSingleSelectProps;

	/**
	 * Object of TextField props which are passed thru to the underlying TextField component.
	 */
	TextField?: ITextFieldProps;
}

const defaultProps = {
	hasPageSizeSelector: false,
	isDisabled: false,
	objectLabel: 'Object',
	onPageSelect: _.noop,
	selectedPageIndex: 0,
	selectedPageSizeIndex: 0,
	showTotalObjects: false,
	totalCount: null,
	totalPages: undefined,
	pageSizeOptions: [10, 50, 100],
	SingleSelect: {
		...SingleSelect.defaultProps,
		selectedIndex: 0,
	},
	TextField: TextField.defaultProps,
};
export interface IPaginatorState {
	pageIndex: number;
	totalPages: number;
	totalCount: number;
	selectedPageIndex: number;
	selectedPageSizeIndex: number;
	pageSizeOptions: number[];
	SingleSelect: ISingleSelectState;
}

const Paginator: FC<IPaginatorProps> & ILucidComponent = (
	props: IPaginatorProps
) => {
	const {
		className,
		hasPageSizeSelector,
		isDisabled,
		objectLabel,
		objectLabelPlural,
		onPageSelect = defaultProps.onPageSelect,
		onPageSizeSelect,
		pageSizeOptions,
		selectedPageIndex = defaultProps.selectedPageIndex,
		selectedPageSizeIndex,
		showTotalObjects,
		totalPages = defaultProps.totalPages,
		totalCount,
		style,
		SingleSelect: singleSelectProps,
		TextField: textFieldProps,
	} = props;

	const handleTextFieldChange = (
		pageNum: string,
		{
			props,
			event,
		}: {
			props: ITextFieldProps;
			event: React.FocusEvent | React.FormEvent;
		}
	): void => {
		const parsedPageNum = _.parseInt(pageNum);
		if (_.isNaN(parsedPageNum)) {
			return (
				onPageSelect &&
				onPageSelect(selectedPageIndex, totalPages, { props, event })
			);
		}
		return (
			onPageSelect &&
			onPageSelect(parsedPageNum - 1, totalPages, { props, event })
		);
	};

	const isTextFieldDisabled = isDisabled || totalPages === 1;

	return (
		<div style={style} className={cx('&', className)}>
			{showTotalObjects && _.isNumber(totalCount) && (
				<div className={cx('&-total-count')}>
					{_.isFunction(showTotalObjects)
						? showTotalObjects(totalCount)
						: totalCount.toLocaleString()}{' '}
					{totalCount === 1
						? objectLabel
						: objectLabelPlural || `${objectLabel}s`}
				</div>
			)}
			{hasPageSizeSelector ? (
				<div className={cx('&-page-size-container')}>
					<span className={cx('&-rows-per-page-label')}>Rows per page:</span>
					<SingleSelect
						{...singleSelectProps}
						hasReset={false}
						isInvisible={true}
						isSelectionHighlighted={false}
						isDisabled={isDisabled}
						selectedIndex={selectedPageSizeIndex}
						onSelect={onPageSizeSelect}
					>
						{_.map(pageSizeOptions, (option) => (
							<Option key={option}>{option}</Option>
						))}
					</SingleSelect>
				</div>
			) : null}

			<Button
				onClick={_.partial(onPageSelect, selectedPageIndex - 1, totalPages)}
				isDisabled={isDisabled || selectedPageIndex === 0}
				kind='invisible'
				hasOnlyIcon
			>
				<ArrowIcon direction='left' />
			</Button>
			<TextField
				lazyLevel={100}
				{...textFieldProps}
				onBlur={handleTextFieldChange}
				onSubmit={handleTextFieldChange}
				isDisabled={isTextFieldDisabled}
				value={selectedPageIndex + 1}
			/>
			{!_.isNil(totalPages) && <span>of {totalPages.toLocaleString()}</span>}
			<Button
				kind='invisible'
				onClick={_.partial(onPageSelect, selectedPageIndex + 1, totalPages)}
				isDisabled={isDisabled || selectedPageIndex === (totalPages || 0) - 1}
				hasOnlyIcon
			>
				<ArrowIcon direction='right' />
			</Button>
		</div>
	);
};

Paginator.displayName = 'Paginator';
Paginator.description = `A paginator that has an optional page size selector.`;
Paginator.categories = ['navigation'];
Paginator.madeFrom = ['ArrowIcon', 'TextField', 'Button', 'SingleSelect'];
Paginator.reducers = reducers;
Paginator.selectors = selectors;

Paginator.defaultProps = defaultProps;

export default buildModernHybridComponent<
	IPaginatorProps,
	IPaginatorState,
	typeof Paginator
>(Paginator, { reducers, selectors });

export { Paginator as PaginatorDumb };
