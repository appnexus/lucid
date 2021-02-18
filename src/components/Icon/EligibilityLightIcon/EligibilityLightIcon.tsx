import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-EligibilityLightIcon');

const { oneOf } = PropTypes;

export type EligibilityOptions = 'left' | 'right' | 'neither' | 'both';

interface IEligibilityLightIconProps extends IIconProps {
	eligibility?: EligibilityOptions;
}

export const EligibilityLightIcon = ({
	className,
	eligibility = 'neither',
	isDisabled = false,
	...passThroughs
}: IEligibilityLightIconProps) => {
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
							eligibility === 'left' ||
							eligibility === 'both',
						'&-half-circle-is-disabled': isDisabled,
					})}
					d='M6 14.71A7.003 7.003 0 0 1 6 1.29v13.42z'
				/>
				<path
					className={cx('&-half-circle', {
						'&-is-selected':
							eligibility === 'right' ||
							eligibility === 'both',
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
	...iconPropTypes,
};
EligibilityLightIcon.defaultProps = Icon.defaultProps;

export default EligibilityLightIcon;
