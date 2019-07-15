import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Typography');

const { node, string, oneOf } = PropTypes;

const Typography = createClass({
	displayName: 'Typography',

	statics: {
		peek: {
			description: `
				A general component for several types of textual HTML elements.
			`,
			categories: ['text'],
		},
	},

	propTypes: {
		children: node`
			Can contain elements or nested \`Typography\` components.
		`,

		className: string`
			Appended to the component-specific class names set on the root element.
		`,

		variant: oneOf(['h1', 'h2', 'h3', 'p', 'a', 'pre', 'code'])`
			This prop defines the type of text that will be displayed.
			It may be an actual HTML element or something with extra semantic meaning.
		`,
	},

	getDefaultProps() {
		return {
			variant: 'p',
		};
	},

	elFinder: variant => {
		switch (variant) {
			case 'h1':
				return 'h1';
			case 'h2':
				return 'h2';
			case 'h3':
				return 'h3';
			case 'p':
				return 'p';
			case 'a':
				return 'a';
			case 'pre':
				return 'pre';
			case 'code':
				return 'code';
			case 'tabular':
				return 'p';
			default:
				return 'p';
		}
	},

	render() {
		const { children, className, variant, ...passThroughs } = this.props;
		const { elFinder } = this;

		const Element = elFinder(variant);

		return (
			<Element
				{...omitProps(passThroughs, Typography)}
				className={cx('&', `&-${variant}`, className)}
			>
				{children}
			</Element>
		);
	},
});

export default Typography;
