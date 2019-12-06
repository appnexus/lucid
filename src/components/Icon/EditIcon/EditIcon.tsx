import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-EditIcon');

interface IEditIconProps extends IIconProps {}

export const EditIcon = ({ className, ...passThroughs }: IEditIconProps) => {
	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(EditIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M4.541 14.522L.548 15.547l.974-4.006L12.452.472l3.019 2.981zm5.924-12.038l3.019 2.981M2.5 10.5l3 3' />
		</Icon>
	);
};

EditIcon.displayName = 'EditIcon';
EditIcon.peek = {
	description: `
		An edit icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
EditIcon.propTypes = iconPropTypes;
EditIcon.defaultProps = Icon.defaultProps;

export default EditIcon;
