import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-UploadIcon');

const UploadIcon = createClass({
	displayName: 'UploadIcon',

	statics: {
		peek: {
			description: `
				Upload files
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
				<path d='M8 12V.5m5 5l-5-5-5 5' />
				<path d='M.5 13.5v2h15v-2' />
			</Icon>
		);
	},
});

export default UploadIcon;
