import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-GripperVerticalIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A vertical gripper icon.
 */
const GripperVerticalIcon = createClass({
	displayName: 'GripperVerticalIcon',

	_isPrivate: true,

	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				width={2}
				height={16}
				viewBox="0 0 2 16"
				{...omitProps(passThroughs, GripperVerticalIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M0 0h2v1H0V0zM0 2h2v1H0V2zM0 4h2v1H0V4zM0 6h2v1H0V6zM0 8h2v1H0V8zM0 10h2v1H0v-1zM0 12h2v1H0v-1zM0 14h2v1H0v-1z" />
			</Icon>
		);
	},
});

export default GripperVerticalIcon;
