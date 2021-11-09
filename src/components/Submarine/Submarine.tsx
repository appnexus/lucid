import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	filterTypes,
	findTypes,
	omitProps,
	StandardProps,
} from '../../util/component-types';
import { buildModernHybridComponent } from '../../util/state-management';
import * as reducers from './Submarine.reducers';
import SplitHorizontal from '../SplitHorizontal/SplitHorizontal';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import GripperHorizontalIcon from '../Icon/GripperHorizontalIcon/GripperHorizontalIcon';
import Button from '../Button/Button';

export interface ISubmarineState {
	isExpanded: boolean;
	height: number;
}

const cx = lucidClassNames.bind('&-Submarine');

const { any, bool, func, node, number, string, oneOf, oneOfType } = PropTypes;

export interface ISubmarinePrimaryProps extends StandardProps {}

export interface ISumbarineTitleProps extends StandardProps {}

export interface ISubmarineBarProps extends StandardProps {
	Title?: ISumbarineTitleProps | string;
}

const Primary = (_props: ISubmarinePrimaryProps): null => null;
Primary.peek = {
	description: `
		Primary content rendered beside the Submarine.
	`,
};
Primary.displayName = 'SplitHorizontal.Primary';
Primary.propName = 'Primary';

const Title = (_props: ISumbarineTitleProps): null => null;
Title.peek = {
	description: `
		Submarine title;
	`,
};
Title.displayName = 'Submarine.Title';
Title.propName = 'Title';

const Bar = (_props: ISubmarineBarProps): null => null;
Bar.peek = {
	description: `
		Submarine bar;
	`,
};
Bar.displayName = 'Submarine.Bar';
Bar.propName = 'Bar';
Bar.propTypes = {
	Title: any`
		Set the title of the Submarine. (alias for \`Submarine.Title\`)
	`,
};

const defaultProps = {
	isExpanded: true,
	isAnimated: true,
	height: 250,
	position: 'bottom' as const,
	isResizeDisabled: false,
	isHidden: false,
	isTitleShownCollapsed: false,
	onResizing: _.noop,
	onResize: _.noop,
	onToggle: _.noop,
};

export interface ISubmarineProps extends StandardProps {
	/** Sets the starting height of the Bar. */
	height: number;

	/** Force the Submarine to be expanded or collapsed. */
	isExpanded: boolean;

	/** Indicates if the Submarine should be shown or not.  This will override
			the value of isExpanded. */
	isHidden: boolean;

	/** Indicates if the Title should be shown when the Submarine is collapsed */
	isTitleShownCollapsed: boolean;

	/** Allows animated expand and collapse behavior. */
	isAnimated: boolean;

	/** Render the Submarine to the top or bottom of primary content. */
	position: 'top' | 'bottom';

	/** Disable user resizing of the Submarine. */
	isResizeDisabled: boolean;

	/** Set the title of the Submarine. */
	Title?: React.ReactNode;

	/** Set the title of the Submarine. */
	Primary?: React.ReactNode;

	/** Set the title of the Submarine. */
	Bar?: React.ReactNode;

	/** Called when the user is currently resizing the Submarine. */
	onResizing: (
		height: number,
		{ event, props }: { event: MouseEvent | TouchEvent; props: ISubmarineProps }
	) => void;

	/** Called when the user resizes the Submarine. */
	onResize: (
		height: number,
		{ event, props }: { event: MouseEvent | TouchEvent; props: ISubmarineProps }
	) => void;

	/** Called when the user expands or collapses the Submarine. */
	onToggle: ({
		event,
		props,
	}: {
		event: React.MouseEvent<HTMLButtonElement>;
		props: ISubmarineProps;
	}) => void;

	initialState?: Object;
}

class Submarine extends React.Component<ISubmarineProps, ISubmarineState> {
	static displayName = 'Submarine';

	static Bar = Bar;
	static Title = Title;
	static Primary = Primary;

	static peek = {
		description: `
				\`Submarine\` renders a collapsible, resizeable side bar panel next to
				primary content.
			`,
		categories: ['layout'],
		madeFrom: ['SplitHorizontal', 'ChevronIcon', 'GripperHorizontalIcon'],
	};

	static reducers = reducers;

	static propTypes = {
		className: string`
			Appended to the component-specific class names set on the root element.
			Value is run through the \`classnames\` library.
		`,

		children: node`
			Direct children must be types {Submarine.Primary, Submarine.Bar,
			Submarine.Title}.  All content is composed as children of these
			respective elements.
		`,

		height: oneOfType([number, string])`
			Sets the starting height of the Bar.
		`,

		isExpanded: bool`
			Force the Submarine to be expanded or collapsed.
		`,

		isHidden: bool`
			Indicates if the Submarine should be shown or not.  This will override
			the value of isExpanded.
		`,

		isTitleShownCollapsed: bool`
			Indicates if the Title should be shown when the Submarine is collapsed
		`,

		isAnimated: bool`
			Allows animated expand and collapse behavior.
		`,

		position: oneOf(['top', 'bottom'])`
			Render the Submarine to the top or bottom of primary content.
		`,

		isResizeDisabled: bool`
			Disable user resizing of the Submarine.
		`,

		Title: any`
			Set the title of the Submarine.
		`,

		Bar: any`
			Set the submarine bar content.
		`,

		Primary: any`
			Set the primary content of the Submarine.
		`,

		onResizing: func`
			Called when the user is currently resizing the Submarine.  Signature:
			\`(height, { event, props }) => {}\`
		`,

		onResize: func`
			Called when the user resizes the Submarine.  Signature:
			\`(height, { event, props }) => {}\`
		`,

		onToggle: func`
			Called when the user expands or collapses the Submarine.  Signature:
			\`({ event, props }) => {}\`
		`,
	};

	static defaultProps = defaultProps;

	handleExpanderClick = ({
		event,
	}: {
		event: React.MouseEvent<HTMLButtonElement>;
	}) => {
		const { onToggle } = this.props;

		onToggle({ props: this.props, event });
	};

	handleResizing = (
		height: number,
		{ event }: { event: MouseEvent | TouchEvent }
	) => {
		const { onResizing } = this.props;

		onResizing(height, { props: this.props, event });
	};

	handleResize = (
		height: number,
		{ event }: { event: MouseEvent | TouchEvent }
	) => {
		const { onResize } = this.props;

		onResize(height, { props: this.props, event });
	};

	render() {
		const {
			children,
			className,
			isExpanded,
			isAnimated,
			position,
			isResizeDisabled,
			height,
			isHidden,
			isTitleShownCollapsed,
			...passThroughs
		} = this.props;

		const primaryProps = _.get(
			_.first(filterTypes(children, Submarine.Primary)),
			'props',
			{}
		); // props from first Primary
		const barProps = _.get(
			_.first(filterTypes(children, Submarine.Bar)),
			'props',
			{}
		); // props from first Bar
		const titleProps = _.get(
			findTypes(barProps, Submarine.Title).concat(
				findTypes(this.props, Submarine.Title)
			), // get titles from Bar and parent Submarine
			'[0].props', // select props from the first title element
			React.createElement(Submarine.Title).props // default props
		);

		let PrimaryPane, BarPane; // using Left/Right Pane as primary depends on position
		if (position !== 'bottom') {
			PrimaryPane = SplitHorizontal.BottomPane;
			BarPane = SplitHorizontal.TopPane;
		} else {
			PrimaryPane = SplitHorizontal.TopPane;
			BarPane = SplitHorizontal.BottomPane;
		}

		// leave 33px of sidebar to stick out when collapsed, or 0px if hidden
		const collapseShift = isHidden ? 0 : 33;

		return (
			<SplitHorizontal
				{...omitProps(
					passThroughs,
					undefined,
					_.keys(Submarine.propTypes),
					false
				)}
				className={cx(
					'&',
					{
						'&-is-resize-disabled': isResizeDisabled,
						'&-is-position-bottom': position === 'bottom',
						'&-is-position-top': position !== 'bottom',
					},
					className
				)}
				isAnimated={isAnimated}
				isExpanded={isExpanded && !isHidden}
				collapseShift={collapseShift}
				onResizing={this.handleResizing}
				onResize={this.handleResize}
			>
				<BarPane
					{...omitProps(
						barProps,
						undefined,
						_.keys(Submarine.Bar.propTypes),
						false
					)}
					className={cx('&-Bar', barProps.className)}
					height={height}
				>
					<div className={cx('&-Bar-overlay')} />
					<div className={cx('&-Bar-header')}>
						<div
							{...titleProps}
							className={cx(
								'&-Bar-Title',
								{ '&-Bar-Title-is-shown-collapsed': isTitleShownCollapsed },
								titleProps.className
							)}
						/>
						<Button
							className={cx('&-expander')}
							kind='invisible'
							onClick={this.handleExpanderClick}
							hasOnlyIcon={true}
						>
							<ChevronIcon
								direction={
									(isExpanded && position === 'bottom') ||
									(!isExpanded && position !== 'bottom')
										? 'down'
										: 'up'
								}
							/>
						</Button>
					</div>
					<div className={cx('&-Bar-content')}>{barProps.children}</div>
				</BarPane>
				<SplitHorizontal.Divider className={cx('&-Divider')}>
					<GripperHorizontalIcon className={cx('&-Divider-gripper')} />
				</SplitHorizontal.Divider>
				<PrimaryPane
					{...primaryProps}
					className={cx('&-Primary', primaryProps.className)}
					isPrimary
				/>
			</SplitHorizontal>
		);
	}
}

export default buildModernHybridComponent<
	ISubmarineProps,
	ISubmarineState,
	typeof Submarine
>(Submarine, { reducers });
export { Submarine as SubmarineDumb };
