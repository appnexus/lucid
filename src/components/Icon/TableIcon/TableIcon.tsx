import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-TableIcon');

interface ITableIconProps extends IIconProps {}

export const TableIcon = ({ className, ...passThroughs }: ITableIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(TableIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(TableIcon.propTypes))}
			className={cx('&', className)}
		>
			<path
				fill='none'
				strokeWidth='1.3'
				strokeLinecap='square'
				strokeMiterlimit='10'
				d='M.5.5h15v15H.5z'
			/>
			<path d='M15.5 4.5H.5M15.5 10H.5M5.5 4.5v11M10.5 4.5v11' />
		</Icon>
	);
};

TableIcon.displayName = 'TableIcon';
TableIcon.peek = {
	description: `
		An icon with columns, rows and a header row - a table icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
TableIcon.propTypes = iconPropTypes;
TableIcon.defaultProps = Icon.defaultProps;

export default TableIcon;
