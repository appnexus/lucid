import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { partitionText } from '../../util/text-manipulation';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Underline');

const { node, string, instanceOf, oneOfType } = PropTypes;

const matchAllRegexp = /^.*$/;

export interface IUnderlineProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLSpanElement>,
			HTMLSpanElement
		> {
	/** The first match of the given pattern has the underline style applied to it. */
	match?: string | RegExp;
}

export const Underline = ({
	className,
	children,
	match,
	...passThroughs
}: IUnderlineProps): React.ReactElement => {
	if (!_.isRegExp(match)) {
		if (_.isString(match)) {
			match = new RegExp(_.escapeRegExp(match), 'i');
		} else {
			match = matchAllRegexp;
		}
	}

	if (!_.isString(children)) {
		return (
			<span className={cx('&', className)} {...passThroughs}>
				<span
					style={
						match === matchAllRegexp
							? { textDecoration: 'underline' }
							: undefined
					}
				>
					{children}
				</span>
			</span>
		);
	}

	const [pre, matchText, post] = partitionText(children, match);

	return (
		<span className={cx('&', className)} {...passThroughs}>
			{[
				pre && <span key='pre'>{pre}</span>,
				matchText && (
					<span key='match' style={{ textDecoration: 'underline' }}>
						{matchText}
					</span>
				),
				post && <span key='post'>{post}</span>,
			]}
		</span>
	);
};

Underline.displayName = 'Underline';
Underline.peek = {
	description: `Underlines a portion of text that matches a given pattern.`,
	categories: ['controls', 'selectors'],
};
Underline.propTypes = {
	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,
	/**
		Text to be partially or fully underlined. If non-text is passed as
		children, it will not attempt to match the given pattern.
	*/
	children: node,
	/**
		The first match of the given pattern has the underline style applied to it.
	*/
	match: oneOfType([string, instanceOf(RegExp)]),
};

export default Underline;
