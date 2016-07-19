import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DuplicateIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Description.
 */
const DuplicateIcon = createClass({
	displayName: 'DuplicateIcon',
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
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M12.75,1h-7.5C4.56,1,4,1.56,4,2.25V3H2.25C1.56,3,1,3.56,1,4.25v9.5C1,14.44,1.56,15,2.25,15h7.5 c0.69,0,1.25-0.56,1.25-1.25V13h1.75c0.69,0,1.25-0.56,1.25-1.25v-9.5C14,1.56,13.44,1,12.75,1z M10,13.75 C10,13.888,9.888,14,9.75,14h-7.5C2.112,14,2,13.888,2,13.75v-9.5C2,4.112,2.112,4,2.25,4h7.5C9.888,4,10,4.112,10,4.25V13.75z M13,11.75c0,0.138-0.112,0.25-0.25,0.25H11V4.25C11,3.56,10.44,3,9.75,3H5V2.25C5,2.112,5.112,2,5.25,2h7.5 C12.888,2,13,2.112,13,2.25V11.75z'/>
				<path className={cx('&-background')} d='M10,4.25v9.5C10,13.888,9.888,14,9.75,14h-7.5C2.112,14,2,13.888,2,13.75v-9.5C2,4.112,2.112,4,2.25,4h7.5 C9.888,4,10,4.112,10,4.25z M12.75,2h-7.5C5.112,2,5,2.112,5,2.25V3h4.75C10.44,3,11,3.56,11,4.25V12h1.75 c0.138,0,0.25-0.112,0.25-0.25v-9.5C13,2.112,12.888,2,12.75,2z'/>
			</Icon>
		);
	},
});

export default DuplicateIcon;
