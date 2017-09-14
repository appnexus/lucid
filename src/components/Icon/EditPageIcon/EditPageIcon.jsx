import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-EditPageIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A page edit icon.
 */
const EditPageIcon = createClass({
	displayName: 'EditPageIcon',
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
				<path d="M6.036 10.162l.145-.145.147.145 1.657 1.656-.144.146-3.09 1.462c-.11.016-.192-.064-.177-.176l1.463-3.088zM7.098 9.1L8.9 10.9 13.803 6 12 4.2 7.098 9.1zm8.338-5.86l-.67-.67c-.312-.313-.822-.313-1.135 0l-.73.73 1.804 1.8.734-.73c.307-.313.307-.82-.002-1.13zM11 14.75c0 .14-.11.25-.25.25h-9.5c-.138 0-.25-.11-.25-.25V1.25c0-.138.112-.25.25-.25h9.5c.14 0 .25.112.25.25V2h1v-.75C12 .56 11.44 0 10.75 0h-9.5C.56 0 0 .56 0 1.25v13.5C0 15.44.56 16 1.25 16h9.5c.69 0 1.25-.56 1.25-1.25V11h-1v3.75z" />
			</Icon>
		);
	},
});

export default EditPageIcon;
