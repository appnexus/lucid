import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createLucidComponentDefinition } from '../../util/component-definition';

const boundClassNames = lucidClassNames.bind('&-Container');

const {
	node,
	string
} = React.PropTypes;

function getHeader(headerChildProp, title){
	if(headerChildProp) return <header {...headerChildProp} className={boundClassNames('&-header')}/>
	else if(title) return <header {...headerChildProp} className={boundClassNames('&-header')}><span className={boundClassNames('&-title')}>{title}</span></header>
	else return null;
}

function getContent(contentChildProp, children){
	if(contentChildProp) return <section {...contentChildProp} className={boundClassNames('&-content')} />
	else children;
}

function getFooter(footerChildProp){
	if(footerChildProp) return <footer {...footerChildProp} className={boundClassNames('&-footer')} />
	else return null;
}

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
		 * *Child Element* - Header contents. Only one `Header` is used.
		 */
		Content: node,
		/**
		 * *Child Element* - Header contents. Only one `Header` is used.
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

		const headerEl = getHeader(_.first(Container.Header.findInAllAsProps(this.props)), title);
		const contentEl = getContent(_.first(Container.Content.findInAllAsProps(this.props)), children);
		const footerEl = getFooter(_.first(Container.Footer.findInAllAsProps(this.props)));

		return (
			<div className={boundClassNames('&', className)} style={style}>
				{headerEl}
				{contentEl}
				{footerEl}
			</div>
		)
	}
}))

export default Container;
