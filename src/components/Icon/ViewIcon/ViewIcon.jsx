import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass as createReactClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ViewIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Would you just look at it?!
 */
const ViewIcon = createReactClass({
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
				<path d="M8,6.154C6.98,6.154,6.154,6.981,6.154,8C6.154,9.02,6.98,9.846,8,9.846C9.02,9.846,9.846,9.02,9.846,8 C9.846,6.981,9.02,6.154,8,6.154z M7.985,3C5.615,3.073,2.809,4.234,0,8c2.809,3.766,5.615,4.927,7.985,5 c2.371-0.073,5.207-1.234,8.015-5C13.191,4.234,10.355,3.073,7.985,3z M8,11.293c-1.82,0-3.293-1.475-3.293-3.293 C4.707,6.182,6.18,4.707,8,4.707c1.82,0,3.293,1.475,3.293,3.293C11.293,9.818,9.82,11.293,8,11.293z" />
			</Icon>
		);
	},
});

export default ViewIcon;
