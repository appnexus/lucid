import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Badge');

const { node, string } = PropTypes;

const Badge = createClass({
	displayName: 'Badge',

	statics: {
		peek: {
			description: `
				\`Badge\` is a quick utility component to create a badge around any
				element(s). Do not wrap existing \`Icon\`s in a badge, rather add the
				\`isBadge\` prop to any Icon component to turn it into a badge.
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
	},

	render() {
		const { className, children, ...passThroughs } = this.props;

		return (
			<span className={cx('&', className)} {...omitProps(passThroughs, Badge)}>
				{children}
			</span>
		);
	},
});

export default Badge;
