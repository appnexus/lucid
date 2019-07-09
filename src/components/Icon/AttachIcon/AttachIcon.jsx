import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-AttachIcon');

const AttachIcon = createClass({
	displayName: 'AttachIcon',

	statics: {
		peek: {
			description: `
				A link/attach icon, used for indicating an attachment.
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

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
				<path d='M12.606 10.189l-4.171 4.152a3.988 3.988 0 0 1-5.621 0 4.454 4.454 0 0 1 0-6.319l6.678-6.649a3.002 3.002 0 0 1 4.231 0 2.63 2.63 0 0 1 0 3.731l-7.162 7.131a1.33 1.33 0 0 1-1.874 0 1.485 1.485 0 0 1 0-2.106l4.926-4.904' />
			</Icon>
		);
	},
});

export default AttachIcon;
