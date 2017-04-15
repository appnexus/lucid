import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-UnlockedIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Unlock it.
 */
const UnlockedIcon = createClass({
	displayName: 'UnlockedIcon',
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
				<path d="M11,7H5.702V5.5c0-0.991,0.807-1.798,1.798-1.798C8.316,3.702,9,4.253,9.219,5h1.73C10.705,3.306,9.263,2,7.5,2 C5.566,2,4,3.566,4,5.5v1.551C3.434,7.17,3,7.648,3,8.25v4.5C3,13.44,3.56,14,4.25,14h6.5c0.69,0,1.25-0.56,1.25-1.25V8.199 C12,7.598,11.566,7.119,11,7z" />
			</Icon>
		);
	},
});

export default UnlockedIcon;
