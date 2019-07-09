import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-FilterIcon');

const FilterIcon = createClass({
	displayName: 'FilterIcon',

	statics: {
		peek: {
			description: `
				Typically used to denote that something is filterable.
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
				<path d='M.5.5v2l6 6v7l3-2v-5l6-6v-2z' />
			</Icon>
		);
	},
});

export default FilterIcon;
