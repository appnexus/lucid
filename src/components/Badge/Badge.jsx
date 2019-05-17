import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Badge');

const { node, string, oneOf } = PropTypes;

const KIND_DEFAULT = 'default';
const KIND_PRIMARY = 'primary';
const KIND_SUCCESS = 'success';
const KIND_DANGER = 'danger';
const KIND_WARNING = 'warning';
const KIND_INFO = 'info';
const KIND_DARK = 'dark';
const KINDS = [
	KIND_DEFAULT,
	KIND_PRIMARY,
	KIND_SUCCESS,
	KIND_DANGER,
	KIND_WARNING,
	KIND_INFO,
	KIND_DARK,
];
const TYPE_FILLED = 'filled';
const TYPE_STROKE = 'stroke';
const TYPES = [TYPE_FILLED, TYPE_STROKE];

const Badge = createClass({
	displayName: 'Badge',

	statics: {
		peek: {
			description: `
				\`Badge\` is a quick utility component to create a badge around any
				element(s).
			`,
			categories: ['visual design', 'icons'],
		},
	},

	propTypes: {
		className: string`
			class names that are appended to the defaults
		`,

		children: node`
			any valid React children
		`,

		kind: oneOf(KINDS)`
			Style variations for the \`Badge\`
		`,

		type: oneOf(TYPES)`
			Fill style variations for the \`Badge\`
		`,
	},

	getDefaultProps() {
		return {
			kind: KIND_DEFAULT,
			type: TYPE_FILLED,
		};
	},

	render() {
		const { className, kind, type, children, ...passThroughs } = this.props;

		return (
			<span
				className={cx('&', `&-${kind}`, `&-${type}`, className)}
				{...omitProps(passThroughs, Badge)}
			>
				{children}
			</span>
		);
	},
});

export default Badge;
