import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import {
	StandardProps,
	filterTypes,
	findTypes,
} from '../../util/component-types';
import { buildModernHybridComponent } from '../../util/state-management';
import * as reducers from './Sidebar.reducers';
import SplitVertical from '../SplitVertical/SplitVertical';
import Button from '../Button/Button';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import GripperVerticalIcon from '../Icon/GripperVerticalIcon/GripperVerticalIcon';

const cx = lucidClassNames.bind('&-Sidebar');

const { any, bool, func, node, number, string, object, oneOf, oneOfType } =
	PropTypes;

const defaultProps = {
	isExpanded: true,
	isAnimated: true,
	width: 250,
	position: 'left' as const,
	isResizeDisabled: false,
	onResizing: _.noop,
	onResize: _.noop,
	onToggle: _.noop,
};

export interface ISidebarPrimaryProps extends StandardProps {}

export interface ISidebarTitleProps extends StandardProps {}

export interface ISidebarBarProps extends StandardProps {
	Title?: ISidebarTitleProps | string;
	title?: ISidebarTitleProps | string;
	hasGutters?: boolean;
}

const Primary = (_props: ISidebarPrimaryProps): null => null;
Primary.peek = {
	description: `Main pane content that will have a paired \`Bar\`.`,
};
Primary.displayName = 'SplitHorizontal.Primary';
Primary.propName = 'Primary';

const Title = (_props: ISidebarTitleProps): null => null;
Title.peek = {
	description: `Sidebar title.`,
};
Title.propTypes = {
	/**
		Content that will be displayed as the title of the Bar. It's only
		shown when the user has the Bar expanded.
	*/
	children: node,
};
Title.propTypes = {
	/**
		Sidebar title.
	*/
	children: node,
};
Title.displayName = 'Sidebar.Title';
Title.propName = ['Title', 'title'];

const Bar = (_props: ISidebarBarProps): null => null;
Bar.peek = {
	description: `Content to be placed alongside the \`Primary\` pane.`,
};
Bar.displayName = 'Sidebar.Bar';
Bar.propName = 'Bar';
Bar.propTypes = {
	/**
		Set the title of the Sidebar. (alias for \`title\` and \`Sidebar.Title\`)
	*/
	Title: any,

	/**
		Adds default padding to the sidebar content.
	*/
	hasGutters: bool,
};
Bar.defaultProps = {
	hasGutters: true,
};

export interface ISidebarState {
	isExpanded: boolean;
	width: number;
}

export interface ISidebarProps extends StandardProps {
	/** Sets the starting width of the Bar. */
	width?: number;

	/** Force the Sidebar to be expanded or collapsed. */
	isExpanded?: boolean;

	/** Allows animated expand and collapse behavior. */
	isAnimated?: boolean;

	/** Render the Sidebar to the left or right of primary content. */
	position?: 'left' | 'right';

	/** Disable user resizing of the Sidebar. */
	isResizeDisabled?: boolean;

	/** Set the title of the Sidebar. (alias for \`Title\` and \`Sidebar.Title\`) */
	title?: React.ReactNode;

	/** Set the title of the Sidebar. (alias for \`title\` and \`Sidebar.Title\`) */
	Title?: React.ReactNode;

	/** Called when the user is currently resizing the Sidebar. */
	onResizing?: (
		width: number,
		{ event, props }: { event: MouseEvent | TouchEvent; props: ISidebarProps }
	) => void;

	/** Called when the user resizes the Sidebar. */
	onResize?: (
		width: number,
		{ event, props }: { event: MouseEvent | TouchEvent; props: ISidebarProps }
	) => void;

	/** 	Called when the user expands or collapses the Sidebar. */
	onToggle?: ({
		event,
		props,
	}: {
		event: React.MouseEvent<HTMLButtonElement>;
		props: ISidebarProps;
	}) => void;
}

class Sidebar extends React.Component<ISidebarProps, ISidebarState> {
	static displayName = 'Sidebar';

	static Bar = Bar;
	static Primary = Primary;
	static Title = Title;
	static peek = {
		description: `\`Sidebar\` renders a collapsible, resizeable side bar panel next to primary content.`,
		categories: ['layout'],
	};

	static reducers = reducers;

	static propTypes = {
		/**
			Style object that gets applied to the outer element.
		*/
		style: object,

		/**
			Appended to the component-specific class names set on the root element.
			Value is run through the \`classnames\` library.
		*/
		className: string,

		/**
			Direct children must be types {Sidebar.Primary, Sidebar.Bar,
			Sidebar.Title}.  All content is composed as children of these respective
			elements.
		*/
		children: node,

		/**
			Sets the starting width of the Bar.
		*/
		width: oneOfType([number, string]),

		/**
			Force the Sidebar to be expanded or collapsed.
		*/
		isExpanded: bool,

		/**
			Allows animated expand and collapse behavior.
		*/
		isAnimated: bool,

		/**
			Render the Sidebar to the left or right of primary content.
		*/
		position: oneOf(['left', 'right']),

		/**
			Disable user resizing of the Sidebar.
		*/
		isResizeDisabled: bool,

		/**
			Set the title of the Sidebar. (alias for \`Title\` and \`Sidebar.Title\`)
		*/
		title: any,

		/**
			Set the title of the Sidebar. (alias for \`title\` and \`Sidebar.Title\`)
		*/
		Title: any,

		/**
			Content to be placed alongside the Primary pane.
		*/
		Bar: any,

		/**
			Main pane content that will have a paired \`Bar\`.
		*/
		Primary: any,

		/**
			Called when the user is currently resizing the Sidebar.  Signature:
			\`(width, { event, props }) => {}\`
		*/
		onResizing: func,

		/**
			Called when the user resizes the Sidebar.  Signature: \`(width, { event,
			props }) => {}\`
		*/
		onResize: func,

		/**
			Called when the user expands or collapses the Sidebar.  Signature: \`({
			event, props }) => {}\`
		*/
		onToggle: func,
	};

	static defaultProps = defaultProps;

	handleExpanderClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		const { onToggle } = this.props;

		onToggle && onToggle({ props: this.props, event });
	};

	handleResizing = (
		width: number,
		{ event }: { event: MouseEvent | TouchEvent }
	) => {
		const { onResizing } = this.props;

		onResizing && onResizing(width, { props: this.props, event });
	};

	handleResize = (
		width: number,
		{ event }: { event: MouseEvent | TouchEvent }
	) => {
		const { onResize } = this.props;

		onResize && onResize(width, { props: this.props, event });
	};

	render() {
		const {
			children,
			style,
			className,
			isExpanded,
			isAnimated,
			position,
			isResizeDisabled,
			width,
			...passThroughs
		} = this.props;

		const primaryProps = _.get(
			_.first(filterTypes(children, Sidebar.Primary)),
			'props',
			{}
		); // props from first Primary
		const barProps = _.get(
			_.first(filterTypes(children, Sidebar.Bar)),
			'props',
			{}
		); // props from first Bar
		const titleProps = _.get(
			findTypes(barProps, Sidebar.Title).concat(
				findTypes(this.props, Sidebar.Title)
			), // get titles from Bar and parent Sidebar
			'[0].props', // select props from the first title element
			{ children: 'Title' } // default props
		);

		let PrimaryPane, BarPane; // using Left/Right Pane as primary depends on position
		if (position !== 'right') {
			PrimaryPane = SplitVertical.RightPane;
			BarPane = SplitVertical.LeftPane;
		} else {
			PrimaryPane = SplitVertical.LeftPane;
			BarPane = SplitVertical.RightPane;
		}

		return (
			<SplitVertical
				{...(omit(
					passThroughs,
					[
						'width',
						'isExpanded',
						'isAnimated',
						'position',
						'isResizeDisabled',
						'title',
						'Title',
						'onResizing',
						'onResize',
						'onToggle',
					].concat('initialState')
				) as any)}
				style={{
					minWidth: isExpanded
						? _.isNumber(width)
							? width + 6
							: `calc(${width} + 6px)`
						: undefined,
					...style,
				}}
				className={cx(
					'&',
					{
						'&-is-resize-disabled': isResizeDisabled,
						'&-is-position-right': position === 'right',
						'&-is-position-left': position !== 'right',
					},
					className
				)}
				isAnimated={isAnimated}
				isExpanded={isExpanded}
				collapseShift={33} // leave 33px of sidebar to stick out when collapsed
				onResizing={this.handleResizing}
				onResize={this.handleResize}
			>
				<BarPane
					{...omit(barProps, ['hasGutters', 'Title'].concat('initialState'))}
					className={cx('&-Bar', barProps.className)}
					width={width}
					style={{
						overflow: isExpanded ? 'auto' : 'hidden',
					}}
				>
					<div className={cx('&-Bar-overlay')} />
					<div className={cx('&-Bar-header')}>
						<div
							{...titleProps}
							className={cx('&-Bar-Title', titleProps.className)}
						/>
						<Button
							className={cx('&-expander')}
							kind='invisible'
							onMouseDown={this.handleExpanderClick}
							hasOnlyIcon={true}
						>
							<ChevronIcon
								direction={
									(isExpanded && position === 'right') ||
									(!isExpanded && position !== 'right')
										? 'right'
										: 'left'
								}
							/>
						</Button>
					</div>
					<div
						className={cx('&-Bar-content', {
							'&-Bar-content-has-gutters': barProps.hasGutters,
						})}
					>
						{barProps.children}
					</div>
				</BarPane>
				<SplitVertical.Divider className={cx('&-Divider')}>
					<GripperVerticalIcon className={cx('&-Divider-gripper')} />
				</SplitVertical.Divider>
				<PrimaryPane
					{...primaryProps}
					className={cx('&-Primary', primaryProps.className)}
					isPrimary
				/>
			</SplitVertical>
		);
	}
}

export default buildModernHybridComponent<
	ISidebarProps,
	ISidebarState,
	typeof Sidebar
>(Sidebar as any, { reducers });
export { Sidebar as SidebarDumb };
