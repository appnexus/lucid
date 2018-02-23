import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ChatIcon');

const ChatIcon = createClass({
	displayName: 'ChatIcon',

	statics: {
		peek: {
			description: `
				A chat icon.
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
				{...omitProps(passThroughs, ChatIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M10 1H6C2.7 1 0 3.7 0 7c0 1.766.778 3.355 2.003 4.456L2 11.992V14c0 1 1 1 1 1h.5C4 15 6 13 6 13h4c3.3 0 6-2.7 6-6s-2.7-6-6-6zm0 11H6c-.139 0-.27-.03-.407-.041-.361.353-.704.688-.914.889-.039.037-.085.082-.114.108-.538.504-1.076.998-1.164 1.044H3V11.445c-.009-.005-.01-.203-.008-.476a5.05 5.05 0 0 1-.982-.988A4.95 4.95 0 0 1 1 7c0-2.757 2.243-5 5-5h4c2.757 0 5 2.243 5 5s-2.243 5-5 5zM5.5 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3.5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
			</Icon>
		);
	},
});

export default ChatIcon;
