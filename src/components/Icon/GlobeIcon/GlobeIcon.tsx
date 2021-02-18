import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-GlobeIcon');

interface IGlobeIconProps extends IIconProps {}

export const GlobeIcon = ({ className, ...passThroughs }: IGlobeIconProps) => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(GlobeIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(GlobeIcon.propTypes))}
			className={cx('&', className)}
		>
			<circle
				cx='8'
				cy='8'
				r='7.8'
				fill='none'
				strokeWidth='1.3'
				strokeLinecap='square'
				strokeMiterlimit='10'
			/>
			<path d='M9.397.631c-.212.759-.468 2.019.325 2.541.874.576 2.396-.221 3.073-.818M14.702 4.754l-2.335-.018c-.575-.004-1.047.338-1.287.85-.346.738-.251 1.421.477 1.834.854.483 1.819.961 1.479 2.119-.191.651-.273.577-.242 1.264.018.395.724 1.62 1.083 1.854M1.775 3.861c-.079.296-.107.827.432 1.342.808.772 1.382 1.131 1.508 1.275.126.143.655 1.393.622 1.847-.03.408.078.785.376 1.077.236.231.529.394.785.603.537.437.836 1.058.811 1.752-.036 1.023-.027 1.601.034 1.712.032.057.071.09.055-.015-.027-.173.043-.565.386-.937.233-.253.609-.303.841-.556.273-.296.309-.762.442-1.126.202-.555.59-1.028.79-1.587.285-.797-.193-1.165-.802-1.558-.757-.489-1.498-.747-2.411-.752-.464-.002-1.114.319-1.525.008-.976-.739-.551-2.377.53-2.418.522-.02 1.071-.064 1.436-.49.432-.504.921-.096.935-.088.177.14.008-.007.001-.024-.047-.098-.293-.67-.289-.93.013-.785-.172-1.563-.372-2.317' />
		</Icon>
	);
};

GlobeIcon.displayName = 'GlobeIcon';
GlobeIcon.peek = {
	description: `
		A globe icon, a spherical model of the Earth.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
GlobeIcon.propTypes = iconPropTypes;
GlobeIcon.defaultProps = Icon.defaultProps;

export default GlobeIcon;