import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-AddURLIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Add URL
 */
const AddURLIcon = createClass({
	displayName: 'AddURLIcon',
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
				<path d="M15.893,11.447c0.102,0.109,0.133,0.271,0.087,0.418c-0.06,0.141-0.189,0.252-0.347,0.268l-2.08,0.224l1.018,2.524c0.04,0.1,0.042,0.217,0,0.314s-0.127,0.179-0.227,0.219l-1.383,0.559c-0.199,0.081-0.452-0.027-0.533-0.227l-1.02-2.524l-1.736,1.354c-0.124,0.096-0.28,0.113-0.42,0.054c0,0-0.016-0.007-0.023-0.026C9.088,14.542,8.998,14.404,9,14.24l0.005-8.994C9.01,5.082,9.108,4.925,9.268,4.861c0.16-0.064,0.342-0.021,0.458,0.094L15.893,11.447z M1.678,1C0.751,1,0,1.751,0,2.679v8.644C0,12.249,0.751,13,1.678,13H8v-1.983H2.319c-0.185,0-0.335-0.15-0.335-0.335V3.336C1.983,3.15,2.134,3,2.319,3H16V1H1.678z" />
			</Icon>
		);
	},
});

export default AddURLIcon;
