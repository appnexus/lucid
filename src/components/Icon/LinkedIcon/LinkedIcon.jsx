import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-LinkedIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Get linked in with this fresh new icon!
 */
const LinkedIcon = createClass({
	displayName: 'LinkedIcon',
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
				<path d="M14.59 1.41C13.88.698 12.933.305 11.92.305c-1.013 0-1.962.392-2.67 1.105L7.023 3.556l-.01 1.967 3.227-3.158c.36-.36.95-.575 1.578-.575.564 0 1.382.215 1.78.613.39.39.616 1.003.616 1.68 0 .674-.225 1.287-.615 1.68l-3.407 3.21 1.986.003 2.41-2.222c1.472-1.473 1.472-3.87 0-5.344zM5.364 13.598c-.398.396-.924.612-1.48.612-.558 0-1.083-.217-1.48-.61-.814-.817-.815-2.545 0-3.36l3.1-3.233L3.544 7 1.41 9.247c-.714.71-1.106 1.66-1.106 2.67S.7 13.878 1.41 14.59c.71.713 1.66 1.105 2.673 1.105 1.01 0 1.96-.394 2.67-1.105l2.244-2.146-.004-1.954-3.63 3.108z" />
				<path d="M5.118 10.882c.25.25.654.25.904 0l4.86-4.86c.25-.25.25-.654 0-.904s-.655-.25-.905 0L5.12 9.978c-.252.25-.252.655-.002.904z" />
			</Icon>
		);
	},
});

export default LinkedIcon;
