import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import Overlay, { IOverlayProps } from '../Overlay/Overlay';
import GripperVerticalIcon from '../Icon/GripperVerticalIcon/GripperVerticalIcon';
import CloseIcon from '../Icon/CloseIcon/CloseIcon';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';
import Button from '../Button/Button';
import { getFirst, StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-SidePanel');

const { any, bool, func, oneOf, node, number, string, oneOfType } = PropTypes;

/* SidePanel Header **/
const SidePanelHeader = (_props: StandardProps): null => null;
SidePanelHeader.displayName = 'SidePanel.Header';
SidePanelHeader.propName = 'Header';
SidePanelHeader.peek = {
	description: `
		Defines the Header content of SidePanel. If no content is defined, it will
		still show the close button.
	`,
};
SidePanelHeader.propTypes = {
	/**
		Children that will be rendered.
	*/
	children: node,
};

/** Side Panel */
export interface ISidePanelProps extends Partial<IOverlayProps> {
	/** Alternative to using `<SidePanel.Header>`. */
	Header?: string | (React.ReactNode & { props: StandardProps });

	/** Controls the expanded/collapsed state as a boolean prop. */
	isExpanded: boolean;

	/** When true, hides the resizer at the edge of the SidePanel. */
	isResizeDisabled: boolean;

	/** Callback triggered when user clicks the background, hits the Esc key, or
	 * clicks the close button in the Header. */
	onCollapse: ({
		event,
		props,
	}: {
		event: React.MouseEvent | KeyboardEvent;
		props: ISidePanelProps;
	}) => void;

	/** Callback triggered after a user resizes to a new width. */
	onResize: (
		width: number,
		{
			event,
			props,
		}: {
			event: MouseEvent | TouchEvent;
			props: ISidePanelProps;
		}
	) => void;

	/** Controls the position on the screen. */
	position: 'left' | 'right';

	/** When true, it will prevent scrolling in the background when \`isExpanded\;
	 * is true. This is accomplished by setting \`document.body.style.overflow =
	 * 'hidden'\`. */
	preventBodyScroll: boolean;

	/** Sets the initial width in pixels. The actual width may change if the user
	 * resizes it. */
	width: number;

	/** Sets the minimum width in pixels. */
	minWidth: number;

	/** Sets the maximim width in pixels. */
	maxWidth: number;

	/** Sets the top margin for the panel. Defaults to \`0\`. */
	topOffset: number | string;
}

/** TODO: Remove the 'nonPassThroughs' when the component is converted to a functional component */
const nonPassThroughs = [
	'children',
	'className',
	'Header',
	'isAnimated',
	'isExpanded',
	'isResizeDisabled',
	'onCollapse',
	'onResize',
	'position',
	'preventBodyScroll',
	'width',
	'minWidth',
	'maxWidth',
	'topOffset',
	'initialState',
];

interface ISidePanelState {
	isResizing: boolean;
	width: number;
	startWidth: number;
	isExpanded: boolean;
}

class SidePanel extends React.Component<ISidePanelProps, ISidePanelState, {}> {
	static displayName = 'SidePanel';
	static peek = {
		description: `A fixed-positioned overlay positioned on the side of the screen at full screen height. Supports variable widths resized by the user or defined as a prop. Animated collapse and expand with optional Header and closer.`,
		categories: ['layout'],
	};
	static propTypes = {
		/**
			Content of the SidePanel, but also accepts \`<SidePanel.Header>\` to define
			header content.
		*/
		children: node,

		/**
			Appended to the component-specific class names set on the root element.
		*/
		className: string,

		/**
			Alternative to using \`<SidePanel.Header>\`.
		*/
		Header: any,

		/**
			Enables animated transitions during expansion and collapse.
		*/
		isAnimated: bool,

		/**
			Controls the expanded/collapsed state as a boolean prop.
		*/
		isExpanded: bool,

		/**
			When true, hides the resizer at the edge of the SidePanel.
		*/
		isResizeDisabled: bool,

		/**
			Callback triggered when user clicks the background, hits the Esc key, or
			clicks the close button in the Header.
			Signature: \`({ event, props }) => {}\`
		*/
		onCollapse: func,

		/**
			Callback triggered after a user resizes to a new width.
			Signature: \`(width, { event, props }) => {}\`
		*/
		onResize: func,

		/**
			Controls the position on the screen.
		*/
		position: oneOf(['left', 'right']),

		/**
			When true, it will prevent scrolling in the background when \`isExpanded\`
			is true. This is accomplished by setting \`document.body.style.overflow =
			'hidden'\`.
		*/
		preventBodyScroll: bool,

		/**
			Sets the initial width in pixels. The actual width may change if the user
			resizes it.
		*/
		width: number,

		/**
			Sets the minimum width of the Side Panel.
		*/
		minWidth: number,

		/**
			Sets the maximum width of the Side Panel.
		*/
		maxWidth: number,

		/**
			Sets the top margin for the panel. Defaults to \`0\`.
		*/
		topOffset: oneOfType([number, string]),
	};

	state = {
		isResizing: false,
		width: this.props.width as number,
		startWidth: this.props.width as number,
		isExpanded: this.props.isExpanded as boolean,
	};

	static defaultProps = {
		isAnimated: true,
		isExpanded: true,
		isResizeDisabled: false,
		onCollapse: _.noop,
		onResize: _.noop,
		position: 'right',
		preventBodyScroll: false,
		topOffset: 0,
		width: 500,
		minWidth: 500,
		maxWidth: 1200,
	};

	static Header = SidePanelHeader;

	timerId = setTimeout((): void => {
		return;
	}, 1);

	handleResizeStart = (): void => {
		this.setState({
			isResizing: true,
		});
	};

	handleResize = ({ dX }: { dX: number }): void => {
		const { startWidth } = this.state;
		const position =
			startWidth + dX * (this.props.position === 'right' ? -1 : 1);
		this.setState({
			width: _.clamp(
				position,
				this.props.minWidth,
				this.props.maxWidth === Infinity
					? window.innerWidth
					: this.props.maxWidth
			),
		});
	};

	handleResizeEnd = (
		{ dX }: { dX: number },
		{ event }: { event: MouseEvent | TouchEvent }
	): void => {
		const { startWidth, width } = this.state;
		this.setState({
			width: startWidth + dX * (this.props.position === 'right' ? -1 : 1),
			isResizing: false,
			startWidth: width,
		});
		this.props.onResize(startWidth - dX, { props: this.props, event });
	};

	handleCollapse = ({
		event,
	}: {
		event: React.MouseEvent | KeyboardEvent;
	}): void => {
		this.props.onCollapse({ event, props: this.props });
	};

	componentDidUpdate(prevProps: ISidePanelProps): void {
		if (prevProps.isExpanded !== this.props.isExpanded) {
			this.timerId = setTimeout((): void => {
				this.setState({
					isExpanded: this.props.isExpanded as boolean,
				});
			}, 1);
		}
	}

	componentWillUnmount(): void {
		const { preventBodyScroll } = this.props;
		if (this.timerId) {
			clearTimeout(this.timerId);
		}
		if (preventBodyScroll) {
			window.document.body.style.overflow = '';
		}
	}

	render(): React.ReactNode {
		const {
			children,
			className,
			isAnimated,
			isExpanded,
			isResizeDisabled,
			position,
			preventBodyScroll,
			topOffset,
			...passThroughs
		} = this.props;

		const headerEl = getFirst(this.props, SidePanel.Header);
		const headerChildren = _.get(headerEl, 'props.children');

		if (preventBodyScroll) {
			window.document.body.style.overflow = isExpanded ? 'hidden' : '';
		}

		return (
			<Overlay
				className={cx(
					'&',
					{
						'&-is-expanded': isExpanded && this.state.isExpanded,
						'&-position-left': position === 'left',
						'&-position-right': position === 'right',
						'&-is-animated': isAnimated,
					},
					className
				)}
				isShown={isExpanded || this.state.isExpanded}
				onBackgroundClick={this.handleCollapse}
				onEscape={this.handleCollapse}
				isAnimated={isAnimated}
				style={{
					marginTop: topOffset,
				}}
				{...omit(passThroughs, nonPassThroughs)}
			>
				<div
					className={cx('&-pane')}
					style={{
						width: this.state.width,
						marginTop: topOffset,
					}}
				>
					{headerEl && (
						<div className={cx('&-header')}>
							<div className={cx('&-header-inner-wrapper')}>
								<div className={cx('&-header-content')}>{headerChildren}</div>

								<Button
									className={cx('&-header-closer-button')}
									kind='invisible'
									onClick={this.handleCollapse}
									hasOnlyIcon={true}
								>
									<CloseIcon
										className={cx('&-header-closer')}
										isClickable
										size={14}
									/>
								</Button>
							</div>
						</div>
					)}

					<div className={cx('&-body')}>
						{!isResizeDisabled && (
							<DragCaptureZone
								className={cx('&-grabber')}
								onDragStart={this.handleResizeStart}
								onDrag={this.handleResize}
								onDragEnd={this.handleResizeEnd}
							>
								<GripperVerticalIcon width='20' />
							</DragCaptureZone>
						)}
						<div className={cx('&-content')}>{children}</div>
					</div>
				</div>
			</Overlay>
		);
	}
}

export default SidePanel;
