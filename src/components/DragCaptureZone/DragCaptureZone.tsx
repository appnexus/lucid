import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { omitProps, StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-DragCaptureZone');
const { func, string } = PropTypes;

interface IDragCaptureZoneProps
	extends StandardProps,
		Omit<React.HTMLProps<HTMLDivElement>, keyof IDragCaptureZoneProps> {
	/** Called as the user drags the mouse. */
	onDrag: (
		{
			dX,
			dY,
			pageX,
			pageY,
		}: {
			dX: number;
			dY: number;
			pageX: number;
			pageY: number;
		},
		{
			event,
			props,
		}: {
			event: MouseEvent | TouchEvent;
			props: IDragCaptureZoneProps;
		}
	) => void;

	/** Called when the user releases the mouse button after having dragged. */
	onDragEnd: (
		{
			dX,
			dY,
			pageX,
			pageY,
		}: {
			dX: number;
			dY: number;
			pageX: number;
			pageY: number;
		},
		{
			event,
			props,
		}: {
			event: MouseEvent | TouchEvent;
			props: IDragCaptureZoneProps;
		}
	) => void;

	/** Called when the user presses the mouse button down while over the component. */
	onDragStart: (
		{
			dX,
			dY,
			pageX,
			pageY,
		}: {
			dX: number;
			dY: number;
			pageX: number;
			pageY: number;
		},
		{
			event,
			props,
		}: {
			event: React.MouseEvent | React.TouchEvent;
			props: IDragCaptureZoneProps;
		}
	) => void;

	/** Called when the drag event is canceled due to user interaction.
	 * For example: if a system alert pops up during a touch event. */
	onDragCancel: ({
		event,
		props,
	}: {
		event: MouseEvent | TouchEvent;
		props: IDragCaptureZoneProps;
	}) => void;
}

interface IDragCaptureZoneState {
	pageX: number;
	pageY: number;
}

class DragCaptureZone extends React.Component<
	IDragCaptureZoneProps,
	IDragCaptureZoneState,
	{}
> {
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

	handleDrag = (event: MouseEvent | TouchEvent): void => {
		let pageX;
		let pageY;

		/* istanbul ignore next */
		if ('touches' in event) {
			pageX = event.touches[0].pageX;
			pageY = event.touches[0].pageY;
		} else {
			pageX = event.pageX;
			pageY = event.pageY;
		}

		event.preventDefault();

		this.props.onDrag(
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
		if ('touches' in event) {
			pageX = event.touches[0].pageX;
			pageY = event.touches[0].pageY;
		} else {
			pageX = event.pageX;
			pageY = event.pageY;

			window.document.addEventListener('mousemove', this.handleDrag);
			window.document.addEventListener('mouseup', this.handleDragEnd);
		}

		event.preventDefault();

		this.props.onDragStart(
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

	handleDragEnd = (event: MouseEvent | TouchEvent): void => {
		let pageX;
		let pageY;

		/* istanbul ignore next */
		if ('changedTouches' in event) {
			pageX = event.changedTouches[0].pageX;
			pageY = event.changedTouches[0].pageY;
		} else {
			pageX = event.pageX;
			pageY = event.pageY;
		}

		window.document.removeEventListener('mousemove', this.handleDrag);
		window.document.removeEventListener('mouseup', this.handleDragEnd);

		event.preventDefault();

		this.props.onDragEnd(
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

	handleDragCancel = (event: MouseEvent | TouchEvent): void => {
		this.props.onDragCancel({
			event,
			props: this.props,
		});

		this.setState({
			pageX: 0,
			pageY: 0,
		});
	};

	componentDidMount(): void {
		//add event listeners directly on the DOM element to allow preventDefault
		//calls which are not honored due to react's event delegation
		//reference: https://github.com/facebook/react/issues/8968

		if (this.elementRef.current) {
			this.elementRef.current.addEventListener('touchmove', this.handleDrag);
			this.elementRef.current.addEventListener('touchend', this.handleDragEnd);
			this.elementRef.current.addEventListener(
				'touchcancel',
				this.handleDragCancel
			);
		}
	}

	componentWillUnmount(): void {
		if (this.elementRef.current) {
			this.elementRef.current.removeEventListener('touchmove', this.handleDrag);
			this.elementRef.current.removeEventListener(
				'touchend',
				this.handleDragEnd
			);
			this.elementRef.current.removeEventListener(
				'touchcancel',
				this.handleDragCancel
			);
		}
		window.document.removeEventListener('mousemove', this.handleDrag);
		window.document.removeEventListener('mouseup', this.handleDragEnd);
	}

	render(): React.ReactNode {
		return (
			<div
				{...omitProps(this.props, undefined, _.keys(DragCaptureZone.propTypes))}
				className={cx('&', this.props.className)}
				key='DragCaptureZone'
				onMouseDown={this.handleDragStart}
				onTouchStart={this.handleDragStart}
				ref={this.elementRef}
			/>
		);
	}
}

export default DragCaptureZone;
