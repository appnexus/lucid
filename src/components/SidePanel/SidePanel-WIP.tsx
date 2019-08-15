import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import Overlay from '../Overlay/Overlay';
import GripperVerticalIcon from '../Icon/GripperVerticalIcon/GripperVerticalIcon';
import CloseIcon from '../Icon/CloseIcon/CloseIcon';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';
import Button from '../Button/Button';
import { getFirst, omitProps } from '../../util/component-types';

// Unable to finish this WIP because of above dependencies, which are not TSX yet


const cx = lucidClassNames.bind('&-SidePanel');

const { any, bool, func, oneOf, node, number, string, oneOfType } = PropTypes;

interface ISidePanelHeaderProps {
	description?: string;
	children?: React.ReactNode;
}
class SidePanelHeader extends React.Component<ISidePanelHeaderProps, {}, {}> {
	constructor(props: ISidePanelHeaderProps) {
		super(props);
	}
	static displayName = 'SidePanel.Header';
	static peek = {
		description: `
			Content displayed at the top of the side panel.
		`,
	};
	static propName = 'Header';

	render(): React.ReactNode {
		return <div>{this.props.children}</div>;
	}
}

interface ISidePanelFooterProps {
	description?: string;
	children?: React.ReactNode;
}
class SidePanelFooter extends React.Component<ISidePanelFooterProps, {}, {}> {
	constructor(props: ISidePanelFooterProps) {
		super(props);
	}
	static displayName = 'SidePanel.Footer';
	static peek = {
		description: `
			Content displayed at the bottom of the side panel.
		`,
	};
	static propName = 'Footer';

	render(): React.ReactNode {
		return <div>{this.props.children}</div>;
	}
}

export interface ISidePanelProps {
	/** Appended to the component-specific class names set on the root element.
	 */
	className?: string;

	/** Generally you should only have a single child element so the centering works
	 * correctly.
	 */
	children?: React.ReactNode;

	/** Alternative to using `<SidePanel.Header>`.
	 */
	Header?: React.ReactNode & { props: ISidePanelHeaderProps };

	/** Enables animated transitions during expansion and collapse.
	 */
	isAnimated: boolean;

	/** Controls the expanded/collapsed state as a boolean prop. */
	isExpanded: boolean;

	/** When true, hides the resizer at the edge of the SidePanel. */
	isResizeDisabled: boolean;

	/** Callback triggered when user clicks the background, hits the Esc key, or
	 * clicks the close button in the Header.
	 */
	onCollapse: ({ event, props }) => {};

	/** Callback triggered after a user resizes to a new width.
	 */
	onResize: (width, { event, props }) => {};

	/** Controls the position on the screen.
	 */
	position: 'left' | 'right';

	/** When true, it will prevent scrolling in the background when \`isExpanded\;
	 * is true. This is accomplished by setting \`document.body.style.overflow =
	 * 'hidden'\`.
	 */
	preventBodyScroll: boolean;


	/** Sets the initial width in pixels. The actual width may change if the user
	 * resizes it.
	 */
	width: number;

	/** Sets the top margin for the panel. Defaults to \`0\`.
	 */
	topOffset: number | string;
}


class SidePanel extends React.Component<ISidePanelProps, {}, {}> {
	constructor(props: ISidePanelProps) {
		super(props);
		const { isExpanded, width } = props;
		this.state = {
			isResizing: false,
			width,
			isExpanded,
		};
	}

	static displayName = 'SidePanel';
	static peek = {
		description: `
			A fixed-positioned overlay positioned on the side of the screen at full
			screen height. Supports variable widths resized by the user or defined as a
			prop. Animated collapse and expand with optional Header and closer.
		`,
		categories: ['layout'],
	};

	static propTypes = {
		children: node`
			Content of the SidePanel, but also accepts \`<SidePanel.Header>\` to define
			header content.
		`,
		className: string`
			Appended to the component-specific class names set on the root element.
		`,
		Header: any`
			Alternative to using \`<SidePanel.Header>\`.
		`,
		isAnimated: bool`
			Enables animated transitions during expansion and collapse.
		`,
		isExpanded: bool`
			Controls the expanded/collapsed state as a boolean prop.
		`,
		isResizeDisabled: bool`
			When true, hides the resizer at the edge of the SidePanel.
		`,
		onCollapse: func`
			Callback triggered when user clicks the background, hits the Esc key, or
			clicks the close button in the Header.
			Signature: \`({ event, props }) => {}\`
		`,
		onResize: func`
			Callback triggered after a user resizes to a new width.
			Signature: \`(width, { event, props }) => {}\`
		`,
		position: oneOf(['left', 'right'])`
			Controls the position on the screen.
		`,
		preventBodyScroll: bool`
			When true, it will prevent scrolling in the background when \`isExpanded\`
			is true. This is accomplished by setting \`document.body.style.overflow =
			'hidden'\`.
		`,
		width: number`
			Sets the initial width in pixels. The actual width may change if the user
			resizes it.
		`,
		topOffset: oneOfType([number, string])`
			Sets the top margin for the panel. Defaults to \`0\`.
		`,
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
		width: 240,
	};

	static Header = SidePanelHeader;
	static Footer = SidePanelFooter;

	handleResizeStart = () => {
		this.startWidth = this.state.width;
		this.setState({
			isResizing: true,
		});
	}

	handleResize = ({ dX }) => {
		this.setState({
			width: this.startWidth + dX * (this.props.position === 'right' ? -1 : 1),
		});
	}

	handleResizeEnd = ({ dX }, { event }) => {
		this.setState({
			width: this.startWidth + dX * (this.props.position === 'right' ? -1 : 1),
			isResizing: false,
		});
		this.props.onResize(this.startWidth - dX, { props: this.props, event });
	}

	componentDidUpdate(prevProps) {
		if (prevProps.isExpanded !== this.props.isExpanded) {
			this.timerId = setTimeout(() => {
				this.setState({
					isExpanded: this.props.isExpanded,
				});
			}, 1);
		}
	}

	componentWillUnmount() {
		if (this.timerId) {
			clearTimeout(this.timerId);
		}
	}

	render(): React.ReactNode {
		const {
			children,
			className,
			isAnimated,
			isExpanded,
			isResizeDisabled,
			onCollapse,
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
				onBackgroundClick={onCollapse}
				onEscape={onCollapse}
				isAnimated={isAnimated}
				style={{
					marginTop: topOffset,
				}}
				{...omitProps(passThroughs, SidePanel)}
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
									onClick={onCollapse}
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


SidePanel.Header = () => null;
SidePanel.Header.displayName = 'SidePanel.Header';
SidePanel.Header.propName = 'Header';
SidePanel.Header.peek = {
	description: `
		Defines the Header content of SidePanel. If no content is defined, it will
		still show the close button.
	`,
};

export default SidePanel;
