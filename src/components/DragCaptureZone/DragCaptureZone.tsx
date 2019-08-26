import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-DragCaptureZone');
const { func, string } = PropTypes;

interface IDragCaptureZoneProps {
	/** Appended to the component-specific class names set on the root element.
	 */
	className?: string;

	/** Called as the user drags the mouse.
	 */
	onDrag?: (
		{ dX, dY, pageX, pageY }: {
			dX: number;
			dY: number;
			pageX: number;
			pageY: number;
		},
		{ event, props }: {
			event: React.MouseEvent | React.TouchEvent;
			props: IDragCaptureZoneProps;
		}
	) => void;


	/** Called when the user releases the mouse button after having dragged.
	 */
	onDragEnd?: (
		{ dX, dY, pageX, pageY }: {
			dX: number;
			dY: number;
			pageX: number;
			pageY: number;
		},
		{ event, props }: {
			event: React.MouseEvent | React.TouchEvent;
			props: IDragCaptureZoneProps;
		}
	) => void;


	/** Called when the user presses the mouse button down while over the component.
	 */
	onDragStart?: (
		{ dX, dY, pageX, pageY }: {
			dX: number;
			dY: number;
			pageX: number;
			pageY: number;
		},
		{ event, props }: {
			event: React.MouseEvent | React.TouchEvent;
			props: IDragCaptureZoneProps;
		}
	) => void;

	/** Called when the drag event is canceled due to user interaction.
	 * For example: if a system alert pops up during a touch event.
	 */
	onDragCancel?: (
		{ event, props }: {
			event: React.MouseEvent | React.TouchEvent;
			props: IDragCaptureZoneProps;
		}
	) => void;
}

interface IDragCaptureZoneState {
	pageX: number;
	pageY: number;
}

class DragCaptureZone extends React.Component<IDragCaptureZoneProps, IDragCaptureZoneState, {}> {
	static displayName = 'DragCaptureZone';
	static peek = {
		description: `
			This is a helper component used to capture mouse events to determine
			when the user starts, is and stops dragging.
		`,
		categories: ['utility'],
	};
	static propTypes = {
		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		onDrag: func`
			Called as the user drags the mouse.  Signature:
			\`({ dx, dy, pageX, pageY }, { event, props }) => {}\`
		`,

		onDragEnd: func`
			Called when the user releases the mouse button after having dragged.
			Signature: \`({ dx, dy, pageX, pageY }, { event, props }) => {}\`
		`,

		onDragStart: func`
			Called when the user presses the mouse button down while over the
			component.  Signature:
			\`({ dx, dy, pageX, pageY }, { event, props }) => {}\`
		`,
		onDragCancel: func`
			Called when the drag event is canceled due to user interaction.  For
			example: if a system alert pops up during a touch event.  Signature:
			\`({ event, props }) => {}\`
		`,
	};

	private elementRef = React.createRef<HTMLDivElement>();

	state = {
		pageX: 0,
		pageY: 0,
	};

	static defaultProps = {
		onDrag: _.noop,
		onDragEnd: _.noop,
		onDragStart: _.noop,
		onDragCancel: _.noop,
	};

	handleDrag = (event: React.MouseEvent | React.TouchEvent): void => {
		let pageX;
		let pageY;

		/* istanbul ignore next */
		if (event instanceof TouchEvent && event.touches) {
			pageX = event.touches[0].pageX;
			pageY = event.touches[0].pageY;
		} else {
			pageX = (event as React.MouseEvent).pageX;
			pageY = (event as React.MouseEvent).pageY;
		}

		event.preventDefault();

		this.props.onDrag && this.props.onDrag(
			{
				dX: pageX - this.state.pageX,
				dY: pageY - this.state.pageY,
				pageX,
				pageY,
			},
			{
				event,
				props: this.props,
			}
		);
	};

	handleDragStart = (event: React.MouseEvent | React.TouchEvent): void => {
		let pageX;
		let pageY;

		/* istanbul ignore next */
		if (event instanceof TouchEvent && event.touches) {
			pageX = event.touches[0].pageX;
			pageY = event.touches[0].pageY;
		} else {
			pageX = (event as React.MouseEvent).pageX;
			pageY = (event as React.MouseEvent).pageY;
		}

		event.preventDefault();

		this.props.onDragStart && this.props.onDragStart(
			{
				dX: 0,
				dY: 0,
				pageX,
				pageY,
			},
			{
				event,
				props: this.props,
			}
		);

		this.setState({
			pageX,
			pageY,
		});
	};

	handleDragEnd = (event: React.MouseEvent | React.TouchEvent): void => {
		let pageX;
		let pageY;

		/* istanbul ignore next */
		if (event instanceof TouchEvent && event.touches) {
			pageX = event.changedTouches[0].pageX;
			pageY = event.changedTouches[0].pageY;
		} else {
			pageX = (event as React.MouseEvent).pageX;
			pageY = (event as React.MouseEvent).pageY;
		}

		event.preventDefault();

		this.props.onDragEnd &&this.props.onDragEnd(
			{
				dX: pageX - this.state.pageX,
				dY: pageY - this.state.pageY,
				pageX,
				pageY,
			},
			{
				event,
				props: this.props,
			}
		);

		this.setState({
			pageX: 0,
			pageY: 0,
		});
	};

	handleDragCancel = (event: React.MouseEvent | React.TouchEvent): void => {
		this.props.onDragCancel && this.props.onDragCancel({
			event,
			props: this.props,
		});

		this.setState({
			pageX: 0,
			pageY: 0,
		});
	};


	render(): React.ReactNode {
		return (
			<div
				{...omitProps(
					this.props,
					undefined,
					_.keys(DragCaptureZone.propTypes),
				)}
				className={cx('&', this.props.className)}
				key='DragCaptureZone'
				onMouseDown={this.handleDragStart}
				onMouseMove={this.handleDrag}
				onMouseUp={this.handleDragEnd}
				onTouchStart={this.handleDragStart}
				onTouchMove={this.handleDrag}
				onTouchEnd={this.handleDragEnd}
				onTouchCancel={this.handleDragCancel}
				ref={this.elementRef}
			/>
		);
	};
};


export default DragCaptureZone;
