import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';

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

const defaultProps = {
	variant: ElementTypes.p,
};

export const Typography = (props: ITypographyProps) => {
	const { children, className, variant, ...passThroughs } = props;
	const Element = ElementTypes[variant ? variant : 'p'];

	return React.createElement(
		Element,
		{
			...passThroughs,
			className: cx('&', `&-${variant}`, className),
		},
		children
	);
};

Typography.defaultProps = defaultProps;
Typography.displayName = 'Typography';
Typography.peek = {
	description: `A general component for several types of textual \`HTML\` elements.`,
	categories: ['text'],
};
Typography.propTypes = {
	/**
		Can contain elements or nested \`Typography\` components.
	*/
	children: node,

	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,

	/**
		This prop defines the type of text that will be displayed.
		It may be an actual HTML element or something with extra semantic meaning.
	*/
	variant: oneOf(_.keys(ElementTypes)).isRequired,
};

export default Typography;
