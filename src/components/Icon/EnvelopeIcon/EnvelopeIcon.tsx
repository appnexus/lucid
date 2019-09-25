import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-EnvelopeIcon');

interface IEnvelopeIconProps extends IIconProps {}

const EnvelopeIcon: FC<IEnvelopeIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(EnvelopeIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			className={cx('&', className)}
		>
			<path d='M.5 2.5h15v11H.5z' />
			<path d='M.5 3.5l7.5 6 7.5-6m-15 10l6-5m3 0l6 5' />
		</Icon>
	);
};

EnvelopeIcon.displayName = 'EnvelopeIcon';
EnvelopeIcon.peek = {
	description: `
		An Envelope icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
EnvelopeIcon.propTypes = iconPropTypes;

export default EnvelopeIcon;
