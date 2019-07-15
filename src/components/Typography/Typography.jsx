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
				A general component for several types of semantic textual HTML elements.
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
			This prop defines the type of HTML element that will be displayed.
		`,
	},

	getDefaultProps() {
		return {
			variant: 'p',
		};
	},

	render() {
		const {
			children,
			className,
			variant: Element,
			...passThroughs
		} = this.props;

		return (
			<Element
				{...omitProps(passThroughs, Typography)}
				className={cx('&', `&-${Element}`, className)}
			>
				{children}
			</Element>
		);
	},
});

export default Typography;
