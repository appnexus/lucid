import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
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
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
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
					d='M6.98.928C3.51 1.424.844 4.398.844 8c0 3.604 2.666 6.576 6.133 7.072V.928z'
				/>
				<path
					className={cx('&-half-circle', {
						'&-is-selected':
							eligibility === EligibilityOptions.right ||
							eligibility === EligibilityOptions.both,
						'&-half-circle-is-disabled': isDisabled,
					})}
					d='M9.022.928c3.465.496 6.133 3.47 6.133 7.072 0 3.604-2.668 6.576-6.133 7.072V.928z'
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
	...iconPropTypes,
	eligibility: oneOf(_.values(EligibilityOptions))`
		Eligibility variations of the icon.
	`,
};

export default EligibilityLightIcon;
