import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-EligibilityLightIcon');

const { oneOf } = PropTypes;

export enum EligibilityOptions {
	left = 'left',
	right = 'right',
	neither = 'neither',
	both = 'both',
}

interface IEligibilityLightIconProps extends IIconProps {
	eligibility?: EligibilityOptions;
}

const EligibilityLightIcon: FC<IEligibilityLightIconProps> = ({
	className,
	eligibility = EligibilityOptions.neither,
	isDisabled = false,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(EligibilityLightIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			isDisabled={isDisabled}
			className={cx('&', className)}
		>
			<g>
				<path
					className={cx('&-half-circle', {
						'&-is-selected':
							eligibility === EligibilityOptions.left ||
							eligibility === EligibilityOptions.both,
						'&-half-circle-is-disabled': isDisabled,
					})}
					d='M6 14.71A7.003 7.003 0 0 1 6 1.29v13.42z'
				/>
				<path
					className={cx('&-half-circle', {
						'&-is-selected':
							eligibility === EligibilityOptions.right ||
							eligibility === EligibilityOptions.both,
						'&-half-circle-is-disabled': isDisabled,
					})}
					d='M10 1.29a7.003 7.003 0 0 1 0 13.42V1.29z'
				/>
			</g>
		</Icon>
	);
};

EligibilityLightIcon.displayName = 'EligibilityLightIcon';
EligibilityLightIcon.peek = {
	description: `
		An eligibility icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
EligibilityLightIcon.propTypes = {
	...Icon.propTypes,
	eligibility: oneOf(_.values(EligibilityOptions))`
		Eligibility variations of the icon.
	`,
};

export default EligibilityLightIcon;
