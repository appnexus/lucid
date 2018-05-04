import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'react-peek/prop-types';
import Portal from '../Portal/Portal';
import ReactTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Overlay');

const { string, bool, func, node } = PropTypes;

const Overlay = createClass({
	displayName: 'Overlay',

	statics: {
		peek: {
			description: `
				Overlay is used to block user interaction with the rest of the app
				until they have completed something.
			`,
			categories: ['utility'],
			madeFrom: ['Portal'],
		},
	},

	propTypes: {
		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		children: node`
			Generally you should only have a single child element so the centering
			works correctly.
		`,

		isShown: bool`
			Controls visibility.
		`,

		isAnimated: bool,

		isModal: bool`
			Determines if it shows with a gray background. If \`false\`, the
			background will be rendered but will be invisible, except for the
			contents, and it won't capture any of the user click events.
		`,

		portalId: string`
			Set your own id for the \`Portal\` is that is opened up to contain the
			contents. In practice you should never need to set this manually.
		`,

		onEscape: func`
			Fired when the user hits escape.  Signature: \`({ event, props }) => {}\`
		`,

		onBackgroundClick: func`
			Fired when the user clicks on the background, this may or may not be
			visible depending on \`isModal\`.  Signature: \`({ event, props }) => {}\`
		`,
	},

	getDefaultProps() {
		return {
			isShown: false,
			isModal: true,
			onEscape: _.noop,
			onBackgroundClick: _.noop,
			isAnimated: true,
		};
	},

	getInitialState() {
		return {
			// This must be in state because getDefaultProps only runs once per
			// component import which causes collisions
			portalId: this.props.portalId || _.uniqueId('Overlay-Portal-'),
		};
	},

	componentDidMount() {
		if (window && window.document) {
			window.document.addEventListener('keydown', this.handleDocumentKeyDown);
		}
	},

	componentWillUnmount() {
		if (window && window.document) {
			window.document.removeEventListener(
				'keydown',
				this.handleDocumentKeyDown
			);
		}
	},

	handleDocumentKeyDown(event) {
		// If the user hits the "escape" key, then fire an `onEscape`
		// TODO: use key helpers
		if (event.keyCode === 27) {
			this.props.onEscape({ event, props: this.props });
		}
	},

	handleDivRef(divDOMNode) {
		// Store the dom node so we can check if it's clicked on later
		this._divDOMNode = ReactDOM.findDOMNode(divDOMNode);
	},

	handleBackgroundClick(event) {
		// Use the reference we previously stored from the `ref` to check what
		// element was clicked on.
		if (this._divDOMNode && event.target === this._divDOMNode) {
			this.props.onBackgroundClick({ event, props: this.props });
		}
	},

	render() {
		const {
			className,
			isShown,
			isModal,
			isAnimated,
			children,
			...passThroughs
		} = this.props;

		const { portalId } = this.state;

		const overlayElement = isShown ? (
			<div
				{...omitProps(passThroughs, Overlay)}
				className={cx(className, '&', {
					'&-is-not-modal': !isModal,
					'&-is-animated': isAnimated,
				})}
				onClick={this.handleBackgroundClick}
				ref={this.handleDivRef}
			>
				{children}
			</div>
		) : null;

		return (
			<Portal portalId={portalId}>
				{isAnimated ? (
					<ReactTransitionGroup
						transitionName={cx('&')}
						transitionEnterTimeout={300}
						transitionLeaveTimeout={300}
					>
						{overlayElement}
					</ReactTransitionGroup>
				) : (
					overlayElement
				)}
			</Portal>
		);
	},
});

export default Overlay;
