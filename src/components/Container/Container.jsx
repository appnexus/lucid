import React, { PropTypes } from 'react';
import { lucidClassNames } from '../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-Container');

const {
	node,
	string,
	object
} = PropTypes;

const Header = React.createClass({
	propTypes: {
		className: string,
		style: object,
		children: node,
		title: string
	},
	render: function() {
		const {className, style, title, children} = this.props;
		const titleEl = (title)?<span className={boundClassNames('&-title')}>{title}</span>:null;
		return (
			<div className={boundClassNames('&-header', className)} style={style}>{titleEl || children}</div>
		)
	}
})

const Body = React.createClass({
	propTypes: {
		className: string,
		children: node,
		style: object
	},
	render: function() {
		const {className, style, children} = this.props;
		return (
			<div className={boundClassNames('&-body', className)} style={style}>{children}</div>
		)
	}
})

const Footer = React.createClass({
	propTypes: {
		className: string,
		children: node,
		style: object
	},
	render: function() {
		const {className, style, children} = this.props;
		return (
			<div className={boundClassNames('&-footer', className)} style={style}>{children}</div>
		)
	}
})

/**
 *
 * {"categories": ["controls", "containers"]}
 *
 * A basic Container. It can have Body and Footer,
 * as a Header that will be rendered if you fill `title` prop.
 */
const Container = React.createClass({
	propTypes: {
		/**
		 * class names that are appended to the defaults
		 */
		className: string,
		/**
		 * text that will be appended in header of container
		 */
		title: string,
		/**
		 * any valid React children
		 */
		children: node,
		/**
		 * style that are appended to the defaults
		 */
		style: object
	},
	render: function() {
		const {title, className, style, children} = this.props;

		const headerEl = (title)?(<Header title={title} />):null;

		return (
			<div className={boundClassNames('&', className)} style={style}>
				{headerEl}
				{children}
			</div>
		)
	}
})

Container.Header = Header;
Container.Body = Body;
Container.Footer = Footer;

export default Container;
