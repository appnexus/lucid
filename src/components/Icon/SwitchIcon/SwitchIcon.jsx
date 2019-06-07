import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-SwitchIcon');

const SwitchIcon = createClass({
	displayName: 'SwitchIcon',

	statics: {
		peek: {
			description: `
				A swap icon.
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
				<path d='M7 5.5h8m-1.5 2l2-2-2-2m-4.5 7H1m1.5 2l-2-2 2-2' />
			</Icon>
		);
	},
});

export default SwitchIcon;
