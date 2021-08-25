import _ from 'lodash';
import React from 'react';
import Icon, { propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import {
	IIconWithDirectionProps,
	omitProps,
} from '../../../util/component-types';

const cx = lucidClassNames.bind('&-PinIcon');

export const PinIcon = ({
	className,
	direction = 'right',
	...passThroughs
}: IIconWithDirectionProps) => {
	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(PinIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx(
				'&',
				{
					'&-is-left': direction === 'left',
					'&-is-right': direction === 'right',
				},
				className
			)}
		>
			<path d='M4.811.5l1.66 1.659-.731.731 3.169 2.03 1.709-.57 2.85 1.709-7.409 7.409-1.709-2.85.57-1.709L2.89 5.74l-.731.731L.5 4.811zM10 10l5.5 5.5' />
		</Icon>
	);
};

PinIcon.displayName = 'PinIcon';

PinIcon.propTypes = {
	...iconPropTypes,
};

PinIcon.defaultProps = Icon.defaultProps;

export default PinIcon;
