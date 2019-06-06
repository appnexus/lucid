import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DuplicateIcon');

const DuplicateIcon = createClass({
	displayName: 'DuplicateIcon',

	statics: {
		peek: {
			description: `
				Typically used when something can be duplicated.
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
				<path d='M1.5 4.5h9v11h-9z' />
				<path d='M10.5 11.5h4V.5h-9v4' />
			</Icon>
		);
	},
});

export default DuplicateIcon;
