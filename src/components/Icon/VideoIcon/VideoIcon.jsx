import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-VideoIcon');

const VideoIcon = createClass({
	displayName: 'VideoIcon',

	statics: {
		peek: {
			description: `
				A video icon.
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
				<circle cx='8' cy='8' r='7.5' />
				<path d='M6.25 5v6l4.5-3z' />
			</Icon>
		);
	},
});

export default VideoIcon;
