import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-EligibilityIcon');

const { oneOf } = PropTypes;

export enum EligibilityOptions {
	left = 'left',
	right = 'right',
	neither = 'neither',
	both = 'both',
}

interface IEligibilityIconProps extends IIconProps {
	eligibility: EligibilityOptions;
}

const EligibilityIcon: FC<IEligibilityIconProps> = ({
	className,
	eligibility = EligibilityOptions.neither,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(EligibilityIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			className={cx('&', className)}
		>
			<g>
				<path
					className={cx('&-half-circle', {
						'&-is-selected':
							eligibility === EligibilityOptions.left ||
							eligibility === EligibilityOptions.both,
					})}
					d='M6 14.71A7.003 7.003 0 0 1 6 1.29v13.42z'
				/>
				<path
					className={cx('&-half-circle', {
						'&-is-selected':
							eligibility === EligibilityOptions.right ||
							eligibility === EligibilityOptions.both,
					})}
					d='M10 1.29a7.003 7.003 0 0 1 0 13.42V1.29z'
				/>
			</g>
		</Icon>
	);
};

EligibilityIcon.displayName = 'EligibilityIcon';
EligibilityIcon.peek = {
	description: `
		An eligibility icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
EligibilityIcon.propTypes = {
	...Icon.propTypes,
	eligibility: oneOf(_.values(EligibilityOptions))`
		Eligibility variations of the icon.
	`,
};

export default EligibilityIcon;
