import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-NewWindowIcon');

const NewWindowIcon = createClass({
	displayName: 'NewWindowIcon',

	statics: {
		peek: {
			description: `
				A new window icon.
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
				<path d='M9.5.5h6v6m-10-6h-5v15h15v-5' strokeLinecap='square' />
				<path d='M15.5.5L7 9' />
			</Icon>
		);
	},
});

export default NewWindowIcon;
