import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-UploadIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Upload files
 */
const UploadIcon = createClass({
	displayName: 'UploadIcon',
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
				<path d="M4.288 6L3 5S6.75.62 6.754.623C7.284 0 8 0 8 0s.717 0 1.246.623C9.25.62 13 5 13 5l-1.288 1L9 2.73V10c0 .553-.447 1-1 1s-1-.447-1-1V2.73L4.288 6zM15 12v1.75c0 .138-.112.25-.25.25H1.25c-.138 0-.25-.112-.25-.25V12H0v2.75C0 15.44.56 16 1.25 16h13.5c.69 0 1.25-.56 1.25-1.25V12h-1z" />
			</Icon>
		);
	},
});

export default UploadIcon;
