import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DeleteIcon');

const DeleteIcon = createClass({
	displayName: 'DeleteIcon',

	statics: {
		peek: {
			description: `
				A trash icon, used for indicating the deletion of a ui component.
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
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path strokeLinecap='square' d='M1.5 3h13' />
				<path d='M2.5 3L3 15.5h10L13.5 3' />
				<path strokeLinecap='square' d='M6 6.503V12.5m4-5.997V12.5' />
				<path d='M5.5 3l1-2.5h3l1 2.5' />
			</Icon>
		);
	},
});

export default DeleteIcon;
