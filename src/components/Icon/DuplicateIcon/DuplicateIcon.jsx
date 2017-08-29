import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass as createReactClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DuplicateIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Typically used when something can be duplicated.
 */
const DuplicateIcon = createReactClass({
	displayName: 'DuplicateIcon',
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
				<path d="M12.75,1h-7.5C4.56,1,4,1.56,4,2.25V3H2.25C1.56,3,1,3.56,1,4.25v9.5C1,14.439,1.56,15,2.25,15h7.5 c0.689,0,1.25-0.561,1.25-1.25V13h1.75c0.689,0,1.25-0.561,1.25-1.25v-9.5C14,1.56,13.439,1,12.75,1z M10,13.75 C10,13.889,9.889,14,9.75,14h-7.5C2.112,14,2,13.889,2,13.75v-9.5C2,4.112,2.112,4,2.25,4h7.5C9.889,4,10,4.112,10,4.25V13.75z M13,11.75c0,0.139-0.111,0.25-0.25,0.25H11V4.25C11,3.56,10.439,3,9.75,3H5V2.25C5,2.112,5.112,2,5.25,2h7.5 C12.889,2,13,2.112,13,2.25V11.75z" />
			</Icon>
		);
	},
});

export default DuplicateIcon;
