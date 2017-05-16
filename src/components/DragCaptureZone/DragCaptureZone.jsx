import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-DragCaptureZone');
const { func, string } = PropTypes;

/**
 * {"categories": ["utility"]}
 *
 * This is a helper component used to capture mouse events to determine when the
 * user starts, is and stops dragging.
 */
const DragCaptureZone = createClass({
	displayName: 'DragCaptureZone',
	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * Called as the user drags the mouse.
		 *
		 * Signature: `({ dx, dy, pageX, pageY }, { event, props }) => {}`
		 */
		onDrag: func,

		/**
		 * Called when the user releases the mouse button after having dragged.
		 *
		 * Signature: `({ dx, dy, pageX, pageY }, { event, props }) => {}`
		 */
		onDragEnd: func,

		/**
		 * Called when the user presses the mouse button down while over the
		 * component.
		 *
		 * Signature: `({ dx, dy, pageX, pageY }, { event, props }) => {}`
		 */
		onDragStart: func,
		/**
		 * Called when the drag event is canceled due to user interaction.
		 * For example: if a system alert pops up during a touch event.
		 *
		 * Signature: `({ event, props }) => {}`
		 */
		onDragCancel: func,
	},

	getDefaultProps() {
		return {
			onDrag: _.noop,
			onDragEnd: _.noop,
			onDragStart: _.noop,
			onDragCancel: _.noop,
		};
	},

	getInitialState() {
		return {
			pageX: 0,
			pageY: 0,
		};
	},

	render() {
		return (
			<div
				{...omitProps(this.props, DragCaptureZone)}
				className={cx('&', this.props.className)}
				key="DragCaptureZone"
				onMouseDown={this.handleDragStart}
				ref={ref => {
					this.elementRef = ref;
				}}
			/>
		);
	},

	componentDidMount() {
		//add event listeners directly on the DOM element to allow preventDefault
		//calls which are not honored due to react's event delegation
		//reference: https://github.com/facebook/react/issues/8968
		this.elementRef.addEventListener('touchstart', this.handleDragStart);
		this.elementRef.addEventListener('touchmove', this.handleDrag);
		this.elementRef.addEventListener('touchend', this.handleDragEnd);
		this.elementRef.addEventListener('touchcancel', this.handleDragCancel);
	},

	componentWillUnmount() {
		this.elementRef.removeEventListener('touchstart', this.handleDragStart);
		this.elementRef.removeEventListener('touchmove', this.handleDrag);
		this.elementRef.removeEventListener('touchend', this.handleDragEnd);
		this.elementRef.removeEventListener('touchcancel', this.handleDragCancel);
		window.document.removeEventListener('mousemove', this.handleDrag);
		window.document.removeEventListener('mouseup', this.handleDragEnd);
	},

	handleDrag(event) {
		let pageX;
		let pageY;

		/* istanbul ignore next */
		if (event.touches) {
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
	},

	handleDragEnd(event) {
		let pageX;
		let pageY;

		/* istanbul ignore next */
		if (event.changedTouches) {
			pageX = event.changedTouches[0].pageX;
			pageY = event.changedTouches[0].pageY;
		} else {
			pageX = event.pageX;
			pageY = event.pageY;

			window.document.removeEventListener('mousemove', this.handleDrag);
			window.document.removeEventListener('mouseup', this.handleDragEnd);
		}

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
	},

	handleDragStart(event) {
		let pageX;
		let pageY;

		/* istanbul ignore next */
		if (event.touches) {
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
	},

	handleDragCancel(event) {
		this.props.onDragCancel({
			event,
			props: this.props,
		});

		this.setState({
			pageX: 0,
			pageY: 0,
		});
	},
});

export default DragCaptureZone;
