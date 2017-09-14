import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const { oneOf } = PropTypes;

const cx = lucidClassNames.bind('&-OutwardArrowsIcon');

const paths = {
	horizontal: 'M13.8 7.6c.2.2.2.5 0 .7-1.3 1.2-3.4 2.8-3.4 2.8s-.4.2-.4-.1V9H6v2c0 .3-.4.1-.4.1s-2-1.6-3.4-2.8c-.2-.2-.2-.5 0-.7 1.3-1.2 3.4-2.8 3.4-2.8s.4-.1.4.2v2h4V5c0-.406.4-.1.4-.1s2 1.5 3.4 2.7zM.5 4c-.3 0-.5.2-.5.5v7c0 .3.2.5.5.5s.5-.2.5-.5v-7C1 4.2.8 4 .5 4zm15 0c-.3 0-.5.2-.5.5v7c0 .3.2.5.5.5s.5-.2.5-.5v-7c0-.3-.2-.5-.5-.5z',
	vertical: 'M8.4 13.8c-.2.2-.5.2-.7 0-1.2-1.3-2.8-3.4-2.8-3.4s-.2-.4.1-.4h2V6H5c-.3 0-.1-.4-.1-.4s1.6-2 2.8-3.4c.2-.2.5-.2.7 0 1.2 1.3 2.8 3.4 2.8 3.4s.1.4-.2.4H9v4h2c.3 0 .1.4.1.4s-1.5 2-2.7 3.4zM12 .5c0-.3-.2-.5-.5-.5h-7c-.3 0-.5.2-.5.5s.2.5.5.5h7c.3 0 .5-.2.5-.5zm0 15c0-.3-.2-.5-.5-.5h-7c-.3 0-.5.2-.5.5s.2.5.5.5h7c.3 0 .5-.2.5-.5z',
	diagonal: 'M12.4 12.9c-1.8-.1-4.3-.4-4.3-.4s-.4-.2-.2-.4l1.4-1.4-4-4c-.7.6-.7.7-1.5 1.4-.2.2-.3-.2-.3-.2s-.3-2.5-.4-4.3c0-.3.2-.5.5-.5 1.8.1 4.4.4 4.4.4s.3.2.1.4c-.7.7-.8.7-1.4 1.4l4 4 1.4-1.4c.2-.2.4.1.4.1s.3 2.6.4 4.4c0 .3-.2.5-.5.5zM8 .5c0-.3-.2-.5-.5-.5h-7C.2 0 0 .2 0 .5v7c0 .3.2.5.5.5s.5-.2.5-.5V1h6.5c.3 0 .5-.2.5-.5zM15.5 8c-.3 0-.5.2-.5.5V15H8.5c-.3 0-.5.2-.5.5s.2.5.5.5h7c.3 0 .5-.2.5-.5v-7c0-.3-.2-.5-.5-.5z',
};

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Typically used to denote width, height, or aspect ratio.
 */
const OutwardArrowsIcon = createClass({
	displayName: 'OutwardArrowsIcon',

	propTypes: {
		/**
		 * Determines the kind of arrows you want to display. `horizontal` is
		 * usually used for width. `vertical` is usually used for height.
		 * `diagonal` is usually used for aspect ratio.
		 */
		kind: oneOf(['horizontal', 'vertical', 'diagonal']),
		...Icon.propTypes,
	},

	getDefaultProps() {
		return {
			kind: 'horizontal',
		};
	},

	render() {
		const { className, kind, ...passThroughs } = this.props;

		return (
			<Icon {...passThroughs} className={cx('&', className)}>
				<path d={paths[kind]} />
			</Icon>
		);
	},
});

export default OutwardArrowsIcon;
