import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SuccessIcon');

const SuccessIcon = createClass({
	displayName: 'SuccessIcon',

	statics: {
		peek: {
			description: `
				A success icon.
			`,
			categories: ['visual design', 'icons'],
			extend: 'CheckIcon',
			madeFrom: ['CheckIcon'],
		},
	},

	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, SuccessIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<circle className={cx('&-background')} cx='8' cy='8' r='7.5' />
				<path className={cx('&-check')} d='M4.5 8L7 10.5 11.5 6' />
			</Icon>
		);
	},
});

export default SuccessIcon;
