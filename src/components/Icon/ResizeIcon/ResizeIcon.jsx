import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ResizeIcon');

const ResizeIcon = createClass({
	displayName: 'ResizeIcon',

	statics: {
		peek: {
			description: `
				A resize icon.
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, ResizeIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M13.5 15.5l2-2m-6 2l6-6' strokeLinecap='square' />
			</Icon>
		);
	},
});

export default ResizeIcon;
