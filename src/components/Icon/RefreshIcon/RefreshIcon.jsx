import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

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
			...passThroughs,
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				className={cx('&', className)}
			>
				<path d='M14.666,9.824c-0.052,0.108-0.16,0.175-0.276,0.175l-1.713-0.101c-0.723,2.25-2.738,3.955-5.059,3.955
					c-2.962,0-5.472-2.609-5.472-5.843c0-3.233,2.51-5.864,5.472-5.864c1.363,0,2.912,0.558,3.908,1.571
					c0.205,0.208,0.217,0.559,0.026,0.782c-0.19,0.225-0.512,0.235-0.716,0.028c-0.81-0.822-2.113-1.274-3.219-1.274
					c-2.402,0-4.457,2.134-4.457,4.757c0,2.623,2.055,4.737,4.457,4.737c1.748,0,3.343-1.227,4.007-2.847L9.701,10
					c-0.117,0-0.224-0.067-0.277-0.174c-0.053-0.105-0.043-0.232,0.025-0.33l2.346-2.913c0.059-0.082,0.153-0.131,0.252-0.131
					c0.102,0,0.194,0.049,0.252,0.131l2.343,2.913C14.711,9.594,14.721,9.721,14.666,9.824z'/>
			</Icon>
		);
	},
});

export default RefreshIcon;
