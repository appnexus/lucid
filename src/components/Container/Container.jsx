import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';

const boundClassNames = lucidClassNames.bind('&-Container');

const {
	node,
	string
} = React.PropTypes;

/**
 * {"categories": ["layout"]}
 *
 * Container is used to wrap content to better organize elements in window.
 */
const Container = React.createClass(createLucidComponentDefinition({
	displayName: 'Container',

	childProps: {
		Header: null,
		Content: null,
		Footer: null
	},

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/**
		 * Text to be inserted in container's header.
		 */
		title: string,
		/**
		 * *Child Element* - Header contents. Only one `Header` is used.
		 */
		Header: node,
		/**
		 * *Child Element* - Content contents. Only one `Content` is used.
		 */
		Content: node,
		/**
		 * *Child Element* - Footer contents. Only one `Footer` is used.
		 */
		Footer: node,
		/**
		 * Generally you should only have a single child element so the centering
		 * works correctly.
		 */
		children: node
	},

	render: function() {
		const {className, style, title, children} = this.props;

		const headerChildProp = _.first(Container.Header.findInAllAsProps(this.props));
		const contentChildProp = _.first(Container.Content.findInAllAsProps(this.props));
		const footerChildProp = _.first(Container.Footer.findInAllAsProps(this.props));

		const titleEl = (title)?<header className={boundClassNames('&-header')}><span className={boundClassNames('&-title')}>{title}</span></header>:null;
		const headerEl = (headerChildProp)?<header {...headerChildProp} className={boundClassNames('&-header')} />:null;
		const contentEl = (contentChildProp)?<section {...contentChildProp} className={boundClassNames('&-content')} />:children;
		const footerEl = (footerChildProp)?<footer {...footerChildProp} className={boundClassNames('&-footer')} />:null;

		return (
			<div className={boundClassNames('&', className)} style={style}>
				{titleEl}
				{headerEl}
				{contentEl}
				{footerEl}
			</div>
		)
	}
}))

export default Container;
