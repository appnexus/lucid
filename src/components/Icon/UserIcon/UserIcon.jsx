import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-UserIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * You, sir.
 */
const UserIcon = createClass({
	displayName: 'UserIcon',
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
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M13.99,11.008c-0.969-0.425-2.362-1.518-4.49-1.894c0.544-0.575,0.914-1.473,1.338-2.536 c0.246-0.617,0.203-1.142,0.203-1.891c0-0.553,0.107-1.111-0.033-1.599C10.539,1.441,9.395,1,8.004,1 C6.612,1,5.466,1.443,4.997,3.094C4.858,3.58,4.966,4.136,4.966,4.688c0,0.75-0.041,1.277,0.204,1.895 C5.597,7.651,5.962,8.548,6.505,9.12c-2.111,0.382-3.539,1.468-4.502,1.891C0.01,11.887,0,12.845,0,12.845V14.5 C0,14.776,0.224,15,0.5,15h15c0.276,0,0.5-0.224,0.5-0.5v-1.655C16,12.845,15.991,11.883,13.99,11.008z'/>
			</Icon>
		);
	},
});

export default UserIcon;
