import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-FourSquaresIcon');

const FourSquaresIcon = createClass({
	displayName: 'FourSquaresIcon',

	statics: {
		peek: {
			description: `
				A four squares icon.
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
				{...omitProps(passThroughs, FourSquaresIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M.5.5h6v6h-6v-6zm0 15h6v-6h-6v6zm9 0h6v-6h-6v6zm0-15v6h6v-6h-6z' />
			</Icon>
		);
	},
});

export default FourSquaresIcon;
