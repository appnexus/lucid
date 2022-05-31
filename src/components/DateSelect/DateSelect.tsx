/* eslint-disable react/prop-types */
import _, { omit } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import DayPicker from 'react-day-picker';

import { buildModernHybridComponent } from '../../util/state-management';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps, getFirst } from '../../util/component-types';
import * as reducers from './DateSelect.reducers';
import InfiniteSlidePanel from '../InfiniteSlidePanel/InfiniteSlidePanel';
import { ISlidePanelProps } from '../SlidePanel/SlidePanel';
import CalendarMonth, { ICalendarProps } from '../CalendarMonth/CalendarMonth';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';

const cx = lucidClassNames.bind('&-DateSelect');
const DateUtils = DayPicker.DateUtils;
const NAV_BUTTON_SIZE = 32;
const clampMonthsShown = (monthsShown: number) => _.clamp(monthsShown, 1, 6);

const { any, bool, node, func, instanceOf, number, oneOf, string } = PropTypes;

/** Date Select Calendar Month */
export interface IDateSelectCalendarMonthProps extends StandardProps {
	modifiers: any;
	description?: string;
}

const DateSelectCalendarMonth = (_props: IDateSelectCalendarMonthProps): null =>
	null;
DateSelectCalendarMonth.displayName = 'DateSelect.CalendarMonth';
DateSelectCalendarMonth.peek = {
	description: `Child component to pass thru props to underlying CalendarMonth.`,
};
DateSelectCalendarMonth.propName = 'CalendarMonth';

/** Date Select */
export interface IDateSelectProps extends StandardProps {
	/** Number of calendar months to show. Min 1, suggested max 3. Actual max is 6. */
	monthsShown: number;

	/** Number of calendar months rendered at any given time (including those out
			of view).  In practice it should be at least (2 * monthsShown) + 2. It's
			got some issues that still need to be ironed out but it works. */
	calendarsRendered: number;

	/** The offset of the leftmost month in view, where 0 is the
			\`initialMonth\`.  Negative values will show previous months. */
	offset: number;

	/** Sets the start date in a date range. */
	from: Date | null;

	/** Sets the end date in a date range. */
	to: Date | null;

	/** The next selection that is expected. Primarily used to preview expected
			ranges when the cursor is on a target date. */
	selectMode?: 'day' | 'from' | 'to';

	/** Sets first month in view on render. The 0 value for the \`offset\` prop
			refers to this month. */
	initialMonth: Date;

	/** Sets selected days. Passed through to \`CalendarMonth\` ->
			\`react-day-picker\`. */
	selectedDays: (date: Date) => boolean | Date | Date[];

	/** Sets disabled days. Passed through to \`CalendarMonth\` ->
			\`react-day-picker\`.*/
	disabledDays: (date: Date) => boolean | Date | Date[];

	/** Display a divider between each month. */
	showDivider: boolean;

	/** Called when user's swipe would change the month \`offset\`. Callback
			passes number of months swiped by the user (positive for forward swipes,
			negative for backwards swipes). */
	onSwipe: (
		monthsSwipes: number,
		{ event, props }: { event: React.TouchEvent; props: ISlidePanelProps }
	) => void;

	/** Called when user clicks the previous button.   */
	onPrev: ({
		event,
		props,
	}: {
		event: React.MouseEvent;
		props: IDateSelectProps;
	}) => void;

	/** Called when user clicks the next button */
	onNext: ({
		event,
		props,
	}: {
		event: React.MouseEvent;
		props: IDateSelectProps;
	}) => void;

	/** Called when user selects a date. Callback passes a Date object as the
			first argument. */
	onSelectDate: (
		selectedDate: any,
		{ event, props }: { event: React.MouseEvent; props: IDateSelectProps }
	) => void;

	/** Render initial font size relative to size of the component so it scales
			with the calendar size. */
	isFontSizeRelative: boolean;

	/** Highlight dates and ranges based on cursor position. */
	showCursorHighlight: boolean;

	/** Render the calendar months in a touch-friendly slider with some being
			rendered out-of-view. Set to \`false\` to disable this feature and gain a
			performance boost. */
	useSlidePanel: boolean;
}

const nonPassThroughs = [
	'className',
	'monthsShown',
	'calendarsRendered',
	'offset',
	'from',
	'to',
	'selectMode',
	'initialMonth',
	'selectedDays',
	'disabledDays',
	'showDivider',
	'onSwipe',
	'onPrev',
	'onNext',
	'onSelectDate',
	'isFontSizeRelative',
	'showCursorHighlight',
	'useSlidePanel',
	'CalendarMonth',
	'callbackId',
	'initialState',
];

export interface IDateSelectState {
	offset: number;
	cursor: Date | null;
}

class DateSelect extends React.Component<IDateSelectProps, IDateSelectState> {
	static displayName = 'DateSelect';

	static CalendarMonth = DateSelectCalendarMonth;

	private initialMonth: Date;
	private rootRef: HTMLElement | null = null;

	constructor(props: IDateSelectProps) {
		super(props);
		this.initialMonth = new Date(this.props.initialMonth);
		this.state = {
			offset: 0,
			cursor: null,
		};
	}

	static peek = {
		description: `A date selection component capabaple of supporting single date and date range selections.`,
		categories: ['controls', 'selectors'],
		madeFrom: ['InfiniteSlidePanel', 'CalendarMonth'],
	};

	static propTypes = {
		/**
			Appended to the component-specific class names set on the root element.
		*/
		className: string,

		/**
			Number of calendar months to show. Min 1, suggested max 3. Actual max is 6.
		*/
		monthsShown: number,

		calendarsRendered: number /**
			Number of calendar months rendered at any given time (including those out
			of view).  In practice it should be at least (2 * monthsShown) + 2. It's
			got some issues that still need to be ironed out but it works.
		*/,

		/**
			The offset of the leftmost month in view, where 0 is the
			\`initialMonth\`.  Negative values will show previous months.
		*/
		offset: number,

		/**
			Sets the start date in a date range.
		*/
		from: instanceOf(Date),

		/**
			Sets the end date in a date range.
		*/
		to: instanceOf(Date),

		/**
			The next selection that is expected. Primarily used to preview expected
			ranges when the cursor is on a target date.
		*/
		selectMode: oneOf(['day', 'from', 'to']),

		/**
			Sets first month in view on render. The 0 value for the \`offset\` prop
			refers to this month.
		*/
		initialMonth: instanceOf(Date),

		/**
			Sets selected days. Passed through to \`CalendarMonth\` ->
			\`react-day-picker\`. Can be a \`Date\`, array of \`Date\`s or a function
			with the signature \`(date) => Boolean\`.
		*/
		selectedDays: any,

		/**
			Sets disabled days. Passed through to \`CalendarMonth\` ->
			\`react-day-picker\`. Can be a \`Date\`, array of \`Date\`s or a function
			with the signature \`(date) => Boolean\`.
		*/
		disabledDays: any,

		/**
			Display a divider between each month.
		*/
		showDivider: bool,

		/**
			Called when user's swipe would change the month \`offset\`. Callback
			passes number of months swiped by the user (positive for forward swipes,
			negative for backwards swipes).  Signature:
			\`(monthsSwiped, { event, props }) => {}\`
		*/
		onSwipe: func,

		/**
			Called when user clicks the previous button.  Signature:
			\`({ event, props }) => {}\`
		*/
		onPrev: func,

		/**
			Called when user clicks the next button.  Signature:
			\`({ event, props }) => {}\`
		*/
		onNext: func,

		/**
			Called when user selects a date. Callback passes a Date object as the
			first argument.  Signature: \`(selectedDate, { event, props }) => {}\`
		*/
		onSelectDate: func,

		/**
			Render initial font size relative to size of the component so it scales
			with the calendar size.
		*/
		isFontSizeRelative: bool,

		/**
			Highlight dates and ranges based on cursor position.
		*/
		showCursorHighlight: bool,

		/**
			Render the calendar months in a touch-friendly slider with some being
			rendered out-of-view. Set to \`false\` to disable this feature and gain a
			performance boost.
		*/
		useSlidePanel: bool,

		/**
			Child component to pass thru props to underlying CalendarMonth.
		*/
		CalendarMonth: node,
	};

	static defaultProps = {
		monthsShown: 1,
		calendarsRendered: 6,
		offset: 0,
		from: null,
		to: null,
		initialMonth: new Date(),
		selectedDays: () => false,
		disabledDays: () => false,
		showDivider: false,
		onSwipe: _.noop,
		onPrev: _.noop,
		onNext: _.noop,
		onSelectDate: _.noop,
		isFontSizeRelative: false,
		showCursorHighlight: true,
		useSlidePanel: true,
	};

	static reducers = reducers;

	handleDayClick = (
		day: Date,
		{ disabled }: { disabled: boolean },
		event: React.MouseEvent
	): void => {
		const { onSelectDate } = this.props;

		if (!disabled) {
			onSelectDate(day, { event, props: this.props });
		}
	};

	handleDayMouseEnter = (day: Date, { disabled }: { disabled: boolean }) => {
		if (disabled) {
			this.setState({
				cursor: null,
			});
		} else {
			this.setState({
				cursor: day,
			});
		}
	};

	handleDayMouseLeave = () => {
		this.setState({
			cursor: null,
		});
	};

	handlePrev = ({ event }: { event: React.MouseEvent }) => {
		this.props.onPrev({ event, props: this.props });
	};

	handleNext = ({ event }: { event: React.MouseEvent }) => {
		this.props.onNext({ event, props: this.props });
	};

	componentDidMount = () => {
		const { isFontSizeRelative, monthsShown: monthsShownRaw } = this.props;

		const monthsShown = clampMonthsShown(monthsShownRaw);

		if (isFontSizeRelative && this.rootRef) {
			const rootElement = this.rootRef;
			const { width, height } = rootElement.getBoundingClientRect();
			const navButtonsWidth = NAV_BUTTON_SIZE * 2;
			const oneMonthShownWidth =
				(width - navButtonsWidth) / monthsShown + navButtonsWidth;
			const size = Math.sqrt(oneMonthShownWidth * height);
			const relativeFontSize = Math.round(size / 24);
			const relativeMinWidth =
				((((width - navButtonsWidth) / monthsShown) * 10.1075) /
					relativeFontSize) *
					monthsShown +
				navButtonsWidth;

			rootElement.style.fontSize = `${relativeFontSize}px`;
			rootElement.style.minWidth = `${relativeMinWidth}px`;
		}
	};

	renderCalendarMonth = (
		monthOffset: number,
		isRangeSameDay: boolean,
		selectedDays: (date: Date) => boolean | Date[] | Date,
		{
			key,
			initialMonth,
			cursor,
			from,
			to,
			disabledDays,
			selectMode,
			onDayClick,
			showCursorHighlight,
			onDayMouseEnter,
			onDayMouseLeave,
			...rest
		}: ICalendarProps
	) => {
		return (
			<CalendarMonth
				key={key}
				className={cx('&-CalendarMonth')}
				monthOffset={monthOffset}
				initialMonth={initialMonth}
				cursor={cursor}
				from={isRangeSameDay ? null : from}
				to={isRangeSameDay ? null : to}
				selectedDays={isRangeSameDay ? from : selectedDays}
				disabledDays={disabledDays}
				selectMode={selectMode}
				onDayClick={onDayClick}
				onDayMouseEnter={showCursorHighlight ? onDayMouseEnter : _.noop}
				onDayMouseLeave={showCursorHighlight ? onDayMouseLeave : _.noop}
				{...(rest as Partial<ICalendarProps>)}
			/>
		);
	};

	render() {
		const {
			className,
			monthsShown: monthsShownRaw,
			calendarsRendered,
			offset,
			from,
			to,
			selectMode,
			selectedDays,
			disabledDays,
			showDivider,
			onSwipe,
			showCursorHighlight,
			useSlidePanel,
			...passThroughs
		} = this.props;

		const { cursor } = this.state;

		//@ts-ignore
		// For some reason react-day-pickers type doesn't allow `null` values but
		// we seem to be passing them in and it seems to "work" at least in that
		// the code doesn't blow up.
		const isRangeSameDay = DateUtils.isSameDay(from, to);

		const calendarMonthProps = _.get(
			getFirst(this.props, DateSelect.CalendarMonth),
			'props'
		);

		const monthsShown = clampMonthsShown(monthsShownRaw);

		/* istanbul ignore next */
		return (
			<section
				ref={(ref) => (this.rootRef = ref)}
				className={cx('&', className, {
					'&-show-divider': showDivider,
				})}
				style={{
					minWidth: NAV_BUTTON_SIZE * 2 + 185 * monthsShown,
					...passThroughs.style,
				}}
				{...omit(passThroughs, nonPassThroughs)}
			>
				<div>
					<ChevronIcon
						className={cx('&-chevron')}
						size={NAV_BUTTON_SIZE}
						isClickable
						direction='left'
						onClick={this.handlePrev}
					/>
				</div>
				{useSlidePanel ? (
					<InfiniteSlidePanel
						className={cx('&-InfiniteSlidePanel', '&-slidePanel')}
						totalSlides={calendarsRendered}
						slidesToShow={monthsShown}
						offset={offset}
						onSwipe={onSwipe}
					>
						<InfiniteSlidePanel.Slide className={cx('&-slide')}>
							{(slideOffset: number) => (
								<div className={cx('&-slide-content')}>
									{this.renderCalendarMonth(
										offset + slideOffset - offset,
										isRangeSameDay,
										selectedDays,
										{
											key: slideOffset,
											initialMonth: this.initialMonth,
											cursor,
											from,
											to,
											disabledDays,
											selectMode,
											onDayClick: this.handleDayClick,
											showCursorHighlight,
											onDayMouseEnter: this.handleDayMouseEnter,
											onDayMouseLeave: this.handleDayMouseLeave,
											...calendarMonthProps,
										}
									)}
								</div>
							)}
						</InfiniteSlidePanel.Slide>
					</InfiniteSlidePanel>
				) : (
					<div className={cx('&-slidePanel', '&-slidePanel-simple')}>
						{_.times(monthsShown, (calendarIndex) => (
							<div
								className={cx('&-slide', '&-slide-simple')}
								key={calendarIndex}
							>
								<div className={cx('&-slide-content')}>
									{this.renderCalendarMonth(
										offset + calendarIndex,
										isRangeSameDay,
										selectedDays,
										{
											initialMonth: this.initialMonth,
											cursor,
											from,
											to,
											disabledDays,
											selectMode,
											onDayClick: this.handleDayClick,
											showCursorHighlight,
											onDayMouseEnter: this.handleDayMouseEnter,
											onDayMouseLeave: this.handleDayMouseLeave,
											...calendarMonthProps,
										}
									)}
								</div>
							</div>
						))}
					</div>
				)}
				<div>
					<ChevronIcon
						className={cx('&-chevron')}
						size={NAV_BUTTON_SIZE}
						isClickable
						direction='right'
						onClick={this.handleNext}
					/>
				</div>
			</section>
		);
	}
}

export default buildModernHybridComponent<
	IDateSelectProps,
	IDateSelectState,
	typeof DateSelect
>(DateSelect as any, { reducers });
export { DateSelect as DateSelectDumb };
