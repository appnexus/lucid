import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass as createReactClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DataViewIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Typically used to guide users to more detailed data.
 */
const DataViewIcon = createReactClass({
	displayName: 'DataViewIcon',
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
				<path d="M14,2c-1.104,0-2,0.896-2,2c0,0.488,0.182,0.93,0.473,1.277l-2.757,3.86C9.492,9.052,9.253,9,9,9 C8.708,9,8.433,9.066,8.183,9.178L6.596,7.194C6.847,6.86,7,6.45,7,6c0-1.104-0.896-2-2-2S3,4.896,3,6 c0,0.37,0.107,0.713,0.283,1.01l-3.238,3.236l0.707,0.707L3.99,7.717C4.287,7.893,4.63,8,5,8c0.292,0,0.567-0.066,0.817-0.178 l1.587,1.985C7.153,10.141,7,10.551,7,11c0,1.104,0.896,2,2,2s2-0.896,2-2c0-0.488-0.182-0.93-0.473-1.277l2.757-3.86 C13.508,5.948,13.747,6,14,6c1.104,0,2-0.896,2-2S15.104,2,14,2z" />
			</Icon>
		);
	},
});

export default DataViewIcon;
