import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import Overlay from '../Overlay/Overlay';
import GripperVerticalIcon from '../Icon/GripperVerticalIcon/GripperVerticalIcon';
import CrossIcon from '../Icon/CrossIcon/CrossIcon';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';
import { getFirst, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-SidePanel');

const { any, bool, func, oneOf, node, number, string } = PropTypes;

class SidePanel extends React.Component {
	constructor(...args) {
		super(...args);
		const [{ isExpanded, width }] = args;
		this.state = {
			isResizing: false,
			width,
			isExpanded,
		};

		this.handleResizeStart = this.handleResizeStart.bind(this);
		this.handleResize = this.handleResize.bind(this);
		this.handleResizeEnd = this.handleResizeEnd.bind(this);
	}

	handleResizeStart() {
		this.startWidth = this.state.width;
		this.setState({
			isResizing: true,
		});
	}

	handleResize({ dX }) {
		this.setState({
			width: this.startWidth + dX * (this.props.position === 'right' ? -1 : 1),
		});
	}

	handleResizeEnd({ dX }, { event }) {
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

	render() {
		const {
			children,
			className,
			isAnimated,
			isExpanded,
			isResizeDisabled,
			onCollapse,
			position,
			preventBodyScroll,
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
				{...omitProps(passThroughs, SidePanel)}
			>
				<div className={cx('&-pane')}>
					{!isResizeDisabled && (
						<DragCaptureZone
							className={cx('&-grabber')}
							onDragStart={this.handleResizeStart}
							onDrag={this.handleResize}
							onDragEnd={this.handleResizeEnd}
						>
							<GripperVerticalIcon />
						</DragCaptureZone>
					)}
					<div className={cx('&-panel')} style={{ width: this.state.width }}>
						{headerEl && (
							<div className={cx('&-header')}>
								<div className={cx('&-header-inner-wrapper')}>
									<div className={cx('&-header-content')}>{headerChildren}</div>
									<div className={cx('&-header-closer')}>
										<CrossIcon isClickable size={32} onClick={onCollapse} />
									</div>
								</div>
							</div>
						)}
						<div className={cx('&-content')}>{children}</div>
					</div>
				</div>
			</Overlay>
		);
	}
}

SidePanel.displayName = 'SidePanel';
SidePanel.peek = {
	description: `
		A fixed-positioned overlay positioned on the side of the screen at full
		screen height. Supports variable widths resized by the user or defined as a
		prop. Animated collapse and expand with optional Header and closer.
	`,
	categories: ['layout'],
};

SidePanel.propTypes = {
	children: node`
		Content of the SidePanel, but also accepts \`<SidePanel.Header>\` to define
		header content.
	`,
	className: string`
		Appended to the component-specific class names set on the root element.
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
	Header: any`
		Alternative to using \`<SidePanel.Header>\`.
	`,
};

SidePanel.defaultProps = {
	isAnimated: true,
	isExpanded: true,
	isResizeDisabled: false,
	onCollapse: _.noop,
	onResize: _.noop,
	position: 'right',
	preventBodyScroll: false,
	width: 240,
};

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
