import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-AudioIcon');

const AudioIcon = createClass({
	displayName: 'AudioIcon',

	statics: {
		peek: {
			description: `
				An audio icon. Can you hear me now?
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
					c0,0.1-0.1,0.3-0.3,0.3H1.3C1.1,15,1,14.9,1,14.7V1.3C1,1.1,1.1,1,1.3,1h13.5C14.9,1,15,1.1,15,1.3V14.7z M5,6.5l3-3v9l-3-3H3v-3H5z
					 M11,8c0,1.3-0.9,2.1-0.9,2.1c-0.1,0.1-0.2,0.1-0.3,0.1c-0.1,0-0.3-0.1-0.4-0.2C9.2,9.8,9.2,9.5,9.4,9.3c0,0,0.5-0.5,0.5-1.3
					c0-0.8-0.5-1.3-0.5-1.3C9.2,6.5,9.2,6.2,9.4,6s0.5-0.2,0.7-0.1C10.1,5.9,11,6.7,11,8z M13.1,8c0,2.6-1.8,4-1.9,4
					c-0.1,0.1-0.2,0.1-0.3,0.1c-0.2,0-0.3-0.1-0.4-0.2c-0.2-0.2-0.1-0.5,0.1-0.7c0.1,0,1.5-1.1,1.5-3.2c0-2.1-1.5-3.2-1.5-3.2
					c-0.2-0.2-0.3-0.5-0.1-0.7C10.7,3.9,11,3.8,11.2,4C11.3,4,13.1,5.4,13.1,8z`}
				/>
			</Icon>
		);
	},
});

export default AudioIcon;
