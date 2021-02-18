import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-EligibilityIcon');

const { oneOf } = PropTypes;

export type EligibilityOptions = 'left'| 'right'| 'neither'| 'both'

interface IEligibilityIconProps extends IIconProps {
	eligibility?: EligibilityOptions;
}

export const EligibilityIcon = ({
	className,
	eligibility = 'neither',
	...passThroughs
}: IEligibilityIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(EligibilityIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<g>
				<path
					className={cx('&-half-circle', {
						'&-is-selected':
							eligibility === 'left' ||
							eligibility === 'both',
					})}
					d='M6 14.71A7.003 7.003 0 0 1 6 1.29v13.42z'
				/>
				<path
					className={cx('&-half-circle', {
						'&-is-selected':
							eligibility === 'right' ||
							eligibility === 'both',
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
	...iconPropTypes,
};
EligibilityIcon.defaultProps = Icon.defaultProps;

export default EligibilityIcon;
