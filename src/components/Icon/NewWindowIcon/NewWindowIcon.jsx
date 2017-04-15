import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-NewWindowIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A new window icon.
 */
const NewWindowIcon = createClass({
	displayName: 'NewWindowIcon',
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
				<path d="M14,8h-1.281l0.004-3.641L8.307,8.776c-0.3,0.298-0.783,0.298-1.082,0c-0.3-0.299-0.3-0.784,0-1.082l4.416-4.417L8,3.266V2 c0,0,4.646,0.002,4.646,0.004c0.623-0.051,1.012,0.337,1.012,0.337S14.051,2.729,14,3.353C14.003,3.353,14,8,14,8z M13,12.75 c0,0.138-0.112,0.25-0.25,0.25h-9.5C3.112,13,3,12.888,3,12.75v-9.5C3,3.112,3.112,3,3.25,3H7V2H3.25C2.56,2,2,2.56,2,3.25v9.5 C2,13.44,2.56,14,3.25,14h9.5c0.69,0,1.25-0.56,1.25-1.25V9h-1V12.75z" />
			</Icon>
		);
	},
});

export default NewWindowIcon;
