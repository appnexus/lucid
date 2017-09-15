import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ViewIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Would you just look at it?!
 */
const ViewIcon = createClass({
	displayName: 'ViewIcon',
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
				<path d="M8 6.154c-1.02 0-1.846.827-1.846 1.846 0 1.02.826 1.846 1.846 1.846S9.846 9.02 9.846 8 9.02 6.154 8 6.154zM7.985 3C5.615 3.073 2.81 4.234 0 8c2.81 3.766 5.615 4.927 7.985 5 2.37-.073 5.207-1.234 8.015-5-2.81-3.766-5.645-4.927-8.015-5zM8 11.293c-1.82 0-3.293-1.475-3.293-3.293S6.18 4.707 8 4.707 11.293 6.182 11.293 8 9.82 11.293 8 11.293z" />
			</Icon>
		);
	},
});

export default ViewIcon;
