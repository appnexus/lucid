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
 * {"categories": ["layout"], "madeFrom": ["Portal"]}
 *
 * Modal is used to pop open a window so the user doesn't lose the context of
 * the page behind it.
 */
const Modal = React.createClass(createLucidComponentDefinition({
	displayName: 'Modal',

	childProps: {
		Header: null,
		Footer: null,
	},

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,

		/**
		 * Children will be placed in the body of the `Modal`.
		 */
		children: node,

		/**
		 * Controls visibility.
		 */
		isClosed: bool,

		/**
		 * Size variations.
		 */
		size: oneOf(['small', 'medium', 'large']),

		/**
		 * Fired when the user hits escape.
		 *
		 * Signature: `({ event, props }) => {}`
		 */
		onEscape: func,

		/**
		 * *Child Element* - Header contents. Only one `Header` is used.
		 */
		Header: node,

		/**
		 * *Child Element* - Footer contents. Only one `Footer` is used.
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
			this.props.onEscape({event, props: this.props });
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
							className={boundClassNames(className, '&')}
						>
							<div className={boundClassNames('&-window', {
								'&-window-is-small': size === 'small',
								'&-window-is-medium': size === 'medium',
								'&-window-is-large': size === 'large',
							})} >
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
					: null}
				</ReactCSSTransitionGroup>
			</Portal>
		);
	},
}));

export default Modal;

