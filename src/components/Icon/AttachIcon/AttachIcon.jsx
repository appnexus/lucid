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
				viewBox={'102.8 0 54.4 60'}
				className={cx('&', className)}
			>
				<path d="M120.6 39c-.8 1-.8 2.4 0 3.2.8.8 2.3.8 3 0l28.2-28c2.3-2.5 2.3-6.4 0-8.8-2.4-2.4-6.4-2.4-8.7 0L109.5 39c-2 2-3 4.6-3 7.3s1 5.2 3 7c4 4 10.3 4 14.3 0l25.3-25c.7-1 1.8-1 2.5 0 .4.2.6.7.6 1 0 .6 0 1-.5 1.4L126.2 56c-2.6 2.6-6 4-9.7 4-3.6 0-7-1.4-9.7-4-5.3-5.4-5.3-14 0-19.4L140.6 3c1.8-2 4.2-3 6.8-3 2.6 0 5 1 7 3 3.7 3.7 3.7 9.8 0 13.6l-28.2 28c-1 1.2-2.5 1.8-4 1.8-1.6 0-3-.6-4-1.7-1.2-1-1.8-2.5-1.8-4s.6-3 1.7-4l19.7-19.8c.4-.4.8-.6 1.3-.6s1 .2 1.3.5c.3.2.5.7.5 1.2 0 .4-.2 1-.5 1.2L120.6 39z" />
			</Icon>
		);
	},
});

export default AttachIcon;
