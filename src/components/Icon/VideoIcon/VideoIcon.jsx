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
				<path
					d={`M14.7,0H1.3C0.6,0,0,0.6,0,1.3v13.4C0,15.4,0.6,16,1.3,16h13.4c0.7,0,1.3-0.6,1.3-1.3V1.3C16,0.6,15.4,0,14.7,0z M15,14.7
					c0,0.1-0.1,0.3-0.3,0.3H1.3C1.1,15,1,14.9,1,14.7V1.3C1,1.1,1.1,1,1.3,1h13.5C14.9,1,15,1.1,15,1.3V14.7z M10.8,7.6
					c0.2,0.2,0.2,0.5,0,0.7c-1.7,1.2-4.4,2.8-4.4,2.8S6,11.5,6,11c0-1,0-5,0-6c0-0.4,0.5-0.1,0.5-0.1S9.1,6.4,10.8,7.6z`}
				/>
			</Icon>
		);
	},
});

export default VideoIcon;
