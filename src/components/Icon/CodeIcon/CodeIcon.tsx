import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CodeIcon');

interface ICodeIconProps extends IIconProps {}

export const CodeIcon = ({
	className,
	...passThroughs
}: ICodeIconProps): React.ReactElement => {
	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(CodeIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M12.5 4l3 4-3 4m-9-8l-3 4 3 4' />
			<path d='M6.5 13.5l3-11' />
		</Icon>
	);
};

CodeIcon.displayName = 'CodeIcon';
CodeIcon.peek = {
	description: `
		That which relates to code.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
CodeIcon.propTypes = iconPropTypes;
CodeIcon.defaultProps = Icon.defaultProps;

export default CodeIcon;
