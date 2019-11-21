import _ from 'lodash';
import React from 'react';
import Icon, { IIconProps, propTypes as iconPropTypes } from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-QuestionMarkIcon');

interface IQuestionMarkIconProps extends IIconProps {}

export const QuestionMarkIcon = ({
	className,
	...passThroughs
}: IQuestionMarkIconProps): React.ReactElement => {
	return (
		<Icon
			{...omitProps(
				passThroughs,
				undefined,
				_.keys(QuestionMarkIcon.propTypes),
				false
			)}
			{..._.pick(passThroughs, _.keys(iconPropTypes))}
			className={cx('&', className)}
		>
			<path d='M3.752 5C3.752 2.515 5.514.5 8 .5s4.28 1.936 4.28 4.421c0 1.187-.679 2.257-2.148 3.214C8.759 9.032 8 9.604 8 10.755v1.652' />
			<circle cx='8' cy='15' r='.5' />
		</Icon>
	);
};

QuestionMarkIcon.displayName = 'QuestionMarkIcon';
QuestionMarkIcon.peek = {
	description: `
		Question mark circle icon.
	`,
	categories: ['visual design', 'icons'],
	extend: 'Icon',
	madeFrom: ['Icon'],
};
QuestionMarkIcon.propTypes = iconPropTypes;
QuestionMarkIcon.defaultProps = Icon.defaultProps;

export default QuestionMarkIcon;
