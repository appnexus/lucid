import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-RefreshIcon');

const RefreshIcon = createClass({
	displayName: 'RefreshIcon',

	statics: {
		peek: {
			description: `
				A refresh icon.
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, RefreshIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M15.5 8a7.5 7.5 0 1 1-1.122-3.949' />
				<path strokeLinecap='square' d='M14.5.244v4h-4' />
			</Icon>
		);
	},
});

export default RefreshIcon;
