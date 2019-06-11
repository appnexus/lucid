import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DangerIcon');

const DangerIcon = createClass({
	displayName: 'DangerIcon',

	statics: {
		peek: {
			description: `
				DANGER WILL ROBINSON DANGER
			`,
			categories: ['visual design', 'icons'],
		},
	},

	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, isClickable, isDisabled, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, DangerIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				isClickable={isClickable}
				isDisabled={isDisabled}
				className={cx(
					'&',
					isDisabled && '&-is-disabled',
					isClickable && '&-is-clickable',
					className
				)}
			>
				<circle className={cx('&-background')} cx='8' cy='8' r='7.5' />
				<path className={cx('&-x')} d='M5.5 5.5l5 5m0-5l-5 5' stroke='#fff' />
			</Icon>
		);
	},
});

export default DangerIcon;
