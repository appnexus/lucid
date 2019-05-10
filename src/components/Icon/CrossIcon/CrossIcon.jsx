import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CrossIcon');

const { oneOf } = PropTypes;

const CrossIcon = createClass({
	displayName: 'CrossIcon',

	statics: {
		peek: {
			description: `
				A cross icon.
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

	propTypes: {
		...Icon.propTypes,
		presetSize: oneOf(['small', 'large'])`
			This differs from the \`size\` attribute that you can set on any icon.
			This is size variation of the CrossIcon.
			Defaults to small, so it is an optional prop.
			Small is 7.28px across.
			Large is 15.56px across.
		`,
	},

	getDefaultProps() {
		return {
			presetSize: 'small',
		};
	},

	render() {
		const { className, presetSize, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, CrossIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				{presetSize === 'large' && (
					<path d='M9.414 8l6.364 6.364-1.414 1.414L8 9.414l-6.364 6.364-1.414-1.414L6.586 8 .222 1.636 1.636.222 8 6.586 14.364.222l1.414 1.414L9.414 8z' />
				)}
				{presetSize === 'small' && (
					<path d='M6.837 8l-2.45-2.464 1.17-1.17 2.45 2.464 2.465-2.465 1.17 1.17L9.162 8l2.48 2.464-1.167 1.17-2.467-2.48-2.48 2.48-1.17-1.17L6.838 8z' />
				)}
			</Icon>
		);
	},
});

export default CrossIcon;
