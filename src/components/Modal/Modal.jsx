import _ from 'lodash';
import React from 'react';
import Portal from '../Portal/Portal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition }  from '../../util/component-definition';

const boundClassNames = lucidClassNames.bind('&-Modal');

const {
	string,
	bool,
	func,
	node,
	oneOf,
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
		 * Controls visibility
		 */
		isClosed: bool,

		/**
		 * Size variations
		 */
		size: oneOf(['small', 'medium', 'large']),

		/**
		 * TODO
		 *
		 * Fired when the user hit's escape.
		 *
		 * Signature: `() => {}`
		 */
		onEscape: func,

		/**
		 * TODO
		 *
		 */
		Header: node,

		/**
		 * TODO
		 *
		 */
		Footer: node
	},

	getDefaultProps() {
		return {
			isClosed: true,
			onEscape: _.noop,
			size: 'medium',
		};
	},

	componentDidMount() {
		window.document.addEventListener('keyup', this.handleDocumentKeyUp);
	},

	componentWillUnmount() {
		window.document.removeEventListener('keyup', this.handleDocumentKeyUp);
	},

	handleDocumentKeyUp(event) {
		// If the user hits the "escape" key, then fire an `onEscape`
		// TODO: use key helpers
		if (event.keyCode === 27) {
			this.props.onEscape();
		}
	},

	render() {
		const {
			className,
			isClosed,
			size,
			...passThroughs
		} = this.props;

		const headerChildProp = _.first(Modal.Header.findInAllAsProps(this.props));
		const footerChildProp = _.first(Modal.Footer.findInAllAsProps(this.props));

		return (
			<Portal portalId={'Modal-Portal-' + Math.random().toString(16).substr(2)}>
				<ReactCSSTransitionGroup
					transitionName={boundClassNames('&')}
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}
					>
					{!isClosed ?
						<div
							{...passThroughs}
							className={boundClassNames(className, '&', )}
							>
							<div className={boundClassNames('&-window', {
								'&-window-is-small': size === 'small',
								'&-window-is-medium': size === 'medium',
								'&-window-is-large': size === 'large',
							})} >
								<div className={boundClassNames('&-content')}>
									<header
										className={boundClassNames('&-header')}
										{...headerChildProp}
									/>
									<section className={boundClassNames('&-body')}>
										{this.props.children}
									</section>
									<footer
										className={boundClassNames('&-footer')}
										{...footerChildProp}
									/>
								</div>
							</div>
						</div>
						: null}
					</ReactCSSTransitionGroup>
				</Portal>
		);
	},
}));

export default Modal;

