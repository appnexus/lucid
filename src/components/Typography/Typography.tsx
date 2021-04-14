import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { omitProps, StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Typography');

const { node, string, oneOf } = PropTypes;

export enum ElementTypes {
	p = 'p',
	tabular = 'p',
	h1 = 'h1',
	h2 = 'h2',
	h3 = 'h3',
	a = 'a',
	pre = 'pre',
	code = 'code',
	kbd = 'kbd',
	samp = 'samp',
	span = 'span',
}

export interface ITypographyProps
	extends StandardProps,
		React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
	/** This prop defines the type of text that will be displayed. It may be an actual HTML element or something with extra semantic meaning. */
	variant: keyof typeof ElementTypes;
}

export const Typography = (props: ITypographyProps) => {
	const { children, className, variant, ...passThroughs } = props;
	const Element = ElementTypes[variant ? variant : 'p'];

	return React.createElement(
		Element,
		{
			...omitProps<ITypographyProps>(
				passThroughs,
				undefined,
				_.keys(Typography.propTypes)
			),
			className: cx('&', `&-${variant}`, className),
		},
		children
	);
};

Typography.displayName = 'Typography';
Typography.peek = {
	description: `
		A general component for several types of textual HTML elements.
	`,
	categories: ['text'],
};
Typography.propTypes = {
	children: node`
		Can contain elements or nested \`Typography\` components.
	`,

	className: string`
		Appended to the component-specific class names set on the root element.
	`,

	variant: oneOf(_.keys(ElementTypes)).isRequired`
		This prop defines the type of text that will be displayed.
		It may be an actual HTML element or something with extra semantic meaning.
	`,
};

export default Typography;
