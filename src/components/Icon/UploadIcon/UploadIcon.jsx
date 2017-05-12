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
				<path d="M4.288,6L3,5c0,0,3.751-4.379,3.754-4.377C7.283,0,8,0,8,0s0.717,0,1.246,0.623C9.249,0.621,13,5,13,5l-1.288,1L9,2.729V10c0,0.553-0.447,1-1,1s-1-0.447-1-1V2.729L4.288,6z M15,12v1.75c0,0.138-0.112,0.25-0.25,0.25H1.25C1.112,14,1,13.888,1,13.75V12H0v2.75C0,15.44,0.56,16,1.25,16h13.5c0.69,0,1.25-0.56,1.25-1.25V12H15z" />
			</Icon>
		);
	},
});

export default UploadIcon;
