import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-RefreshIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A refresh icon.
 */
const RefreshIcon = createClass({
	displayName: 'RefreshIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const {
			className,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, RefreshIcon)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M6.504,1.358l2.913,2.343c0.082,0.058,0.132,0.15,0.132,0.252c0,0.099-0.05,0.193-0.132,0.252L6.504,6.551 c-0.098,0.068-0.225,0.078-0.33,0.025C6.067,6.522,6,6.416,6,6.299l0.1-1.924c-1.62,0.664-2.847,2.259-2.847,4.007 c0,2.402,2.114,4.457,4.737,4.457s4.757-2.055,4.757-4.457c0-1.105-0.452-2.409-1.274-3.219c-0.207-0.204-0.197-0.525,0.027-0.716 s0.574-0.179,0.783,0.026c1.013,0.996,1.57,2.545,1.57,3.908c0,2.962-2.631,5.472-5.863,5.472c-3.234,0-5.844-2.51-5.844-5.472 c0-2.32,1.705-4.336,3.955-5.059L6.001,1.61c0-0.116,0.066-0.225,0.175-0.276C6.279,1.279,6.406,1.289,6.504,1.358z'/>
			</Icon>
		);
	},
});

export default RefreshIcon;
