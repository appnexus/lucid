import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { FC, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CodeIcon');

interface ICodeIconProps extends IIconProps {}

const CodeIcon: FC<ICodeIconProps> = ({
	className,
	...passThroughs
}): React.ReactElement => {

	return (
		<Icon
			{...omitProps(passThroughs, undefined, _.keys(CodeIcon.propTypes), false)}
			{..._.pick(passThroughs, _.keys(Icon.propTypes))}
			className={cx('&', className)}
		>
				<path d='M12.5 4l3 4-3 4m-9-8l-3 4 3 4' />
				<path d='M6.5 13.5l3-11' />
		</Icon>
	);
};

CodeIcon.displayName = 'CodeIcon',
CodeIcon.peek = {
	description: `
		That which relates to code.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
CodeIcon.propTypes = {
	...Icon.propTypes,
};

export default CodeIcon;
