import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-WarningIcon');

const WarningIcon = createClass({
	displayName: 'WarningIcon',

	statics: {
		peek: {
			description: `
				A warning Icon.
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
				{...omitProps(passThroughs, WarningIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path className={cx('&-background')} d='M.5 15h15L8 .5z' />
				<path className={cx('&-mark')} d='M7.99 6v4' />
				<circle className={cx('&-mark')} cx='7.99' cy='12' r='.293' />
			</Icon>
		);
	},
});

export default WarningIcon;
