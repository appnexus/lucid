import _ from 'lodash';
import React from 'react';
import Portal from '../Portal/Portal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';
import * as reducers from './Modal.reducers';

const boundClassNames = lucidClassNames.bind('&-Modal');

const {
	number,
	string,
	object,
	bool,
	func,
	node,
} = React.PropTypes;

/**
 * {"categories": ["layout"]}
 *
 * Modal is used to pop open a window where the user will complete a series of
 * actions before closing it.
 */
const Modal = React.createClass(createLucidComponentDefinition({
	displayName: 'Modal',

	childProps: {
		Header: null,
		Footer: null,
	},

	reducers,

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * TODO
		 */
		children: node,

		/**
		 * TODO
		 */
		isCloseable: bool,

		/**
		 * TODO
		 */
		isClosed: bool,

		/**
		 * TODO
		 */
		width: string,

		/**
		 * TODO
		 */
		height: string,

		/**
		 * TODO
		 */
		minWidth: string,

		/**
		 * TODO
		 */
		minHeight: string,

		/**
		 * TODO
		 *
		 * Signature: ({ height, width, minHeight, minWidth } => {})
		 */
		onResize: func,

		/**
		 * TODO
		 *
		 * Signature: `() => {}`
		 */
		onClose: func,
	},

	getDefaultProps() {
		return {
			width: 'auto',
			height: 'auto',
			isCloseable: true,
			isClosed: true,
			onClose: _.noop,
		};
	},

	componentDidMount() {
		window.document.addEventListener('keyup', this.handleDocumentKeyUp);

		this.centerDialog();
	},

	componentWillUnmount() {
		window.document.removeEventListener('keyup', this.handleDocumentKeyUp);
	},

	handleDocumentKeyUp(event) {
		// If the user hits the "escape" key, then close the modal
		// TODO: use key helpers
		if (event.keyCode === 27) {
			this.props.onClose();
		}
	},

	getWindowBounds() {
		return this.refs.window.getBoundingClientRect();
	},

	// Position the dialog in the center of the screen when first rendered
	centerDialog() {
		const { width, height } = this.props;
		const { minWidth, minHeight } = this.props;

		const left = (window.innerWidth - _.parseInt(width)) / 2;
		const top = (window.innerHeight - _.parseInt(height)) / 2;

		this.props.onResize({
			left,
			top,
			minWidth: minWidth || width,
			minHeight: minHeight || height,
		});
	},

	render() {
		const {
			className,
			isCloseable,
			isClosed,
			width,
			height,
			top,
			left,
			minWidth,
			minHeight,
			resizeWidth,
			resizeHeight,
			...passThroughs
		} = this.props;

		console.log({width, height, top, left, minWidth, minHeight});

		const headerChildProp = _.first(Modal.Header.findInAllAsProps(this.props));
		const footerChildProp = _.first(Modal.Footer.findInAllAsProps(this.props));

		// If resizing always set the size in pixels
		const finalWidth = resizeWidth ? `${resizeWidth}px` : width;
		const finalHeight = resizeHeight ? `${resizeHeight}px` : height;

		return (
			<Portal portalId='asdfasdf'>
				<ReactCSSTransitionGroup
					transitionName={boundClassNames('&', className)}
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}
				>
					{!isClosed ?
						<div
							{...passThroughs}
							className={boundClassNames('&', className)}
						>
							<div
								className={boundClassNames('&-window')}
								ref='window'
								style={{
									width: finalWidth,
									height: finalHeight,
									top: top,
									left: left,
									minWidth: minWidth,
									minHeight: minHeight,
								}}
							>
								<header
									className={boundClassNames('&-header')}
									{...headerChildProp}
								/>
								<section className={boundClassNames('&-content')}>
									{this.props.children}
								</section>
								<footer
									className={boundClassNames('&-footer')}
									{...footerChildProp}
								/>
							</div>
						</div>
					: null}
				</ReactCSSTransitionGroup>
			</Portal>
		);
	},
}));

export default Modal;

