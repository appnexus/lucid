import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DownloadIcon');

const DownloadIcon = createClass({
	displayName: 'DownloadIcon',

	statics: {
		peek: {
			description: `
				Typically used to denote that something is available for download.
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
				<path d='M8 0v12m5-5l-5 5-5-5' />
				<path d='M.5 13.5v2h15v-2' />
			</Icon>
		);
	},
});

export default DownloadIcon;
