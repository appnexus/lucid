import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { partitionText } from '../../util/text-manipulation';
import { lucidClassNames } from '../../util/style-helpers.js';

const cx = lucidClassNames.bind('&-Underline');

const { node, string, instanceOf, oneOfType } = PropTypes;

const matchAllRegexp = /^.*$/;

const Underline = ({ className, children, match, ...passThroughs }) => {
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
						match === matchAllRegexp ? { textDecoration: 'underline' } : null
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
				pre && <span key="pre">{pre}</span>,
				matchText && (
					<span key="match" style={{ textDecoration: 'underline' }}>
						{matchText}
					</span>
				),
				post && <span key="post">{post}</span>,
			]}
		</span>
	);
};

Underline.displayName = 'Underline';

Underline.peek = {
	description: `
		Underlines a portion of text that matches a given pattern
	`,
	categories: ['controls', 'selectors'],
};

Underline.propTypes = {
	className: string`
		Appended to the component-specific class names set on the root element.
	`,
	children: node`
		Text to be partially or fully underlined. If non-text is passed as
		children, it will not attempt to match the given pattern.
	`,
	match: oneOfType([string, instanceOf(RegExp)])`
		The first match of the given pattern has the underline style applied to it.
	`,
};

export default Underline;
