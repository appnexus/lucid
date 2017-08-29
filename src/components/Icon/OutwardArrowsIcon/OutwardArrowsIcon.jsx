import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass as createReactClass } from '../../../util/component-types';

const { oneOf } = PropTypes;

const cx = lucidClassNames.bind('&-OutwardArrowsIcon');

const paths = {
	horizontal: 'M13.8,7.6 C14,7.8 14,8.1 13.8,8.3 C12.5,9.5 10.4,11.1 10.4,11.1 C10.4,11.1 10,11.3 10,11 C10,10 10,9.9 10,9 L6,9 C6,9.9 6,10 6,11 C6,11.3 5.6,11.1 5.6,11.1 C5.6,11.1 3.6,9.5 2.2,8.3 C2,8.1 2,7.8 2.2,7.6 C3.5,6.4 5.6,4.8 5.6,4.8 C5.6,4.8 6,4.7 6,5 C6,6 6,6.1 6,7 L10,7 C10,6.1 10,6 10,5 C10,4.594 10.4,4.9 10.4,4.9 C10.4,4.9 12.4,6.4 13.8,7.6 z M0.5,4 C0.2,4 0,4.2 0,4.5 L0,11.5 C0,11.8 0.2,12 0.5,12 C0.8,12 1,11.8 1,11.5 L1,4.5 C1,4.2 0.8,4 0.5,4 z M15.5,4 C15.2,4 15,4.2 15,4.5 L15,11.5 C15,11.8 15.2,12 15.5,12 C15.8,12 16,11.8 16,11.5 L16,4.5 C16,4.2 15.8,4 15.5,4 z',
	vertical: 'M8.4,13.8 C8.2,14 7.9,14 7.7,13.8 C6.5,12.5 4.9,10.4 4.9,10.4 C4.9,10.4 4.7,10 5,10 C6,10 6.1,10 7,10 L7,6 C6.1,6 6,6 5,6 C4.7,6 4.9,5.6 4.9,5.6 C4.9,5.6 6.5,3.6 7.7,2.2 C7.9,2 8.2,2 8.4,2.2 C9.6,3.5 11.2,5.6 11.2,5.6 C11.2,5.6 11.3,6 11,6 C10,6 9.9,6 9,6 L9,10 C9.9,10 10,10 11,10 C11.3,10 11.1,10.4 11.1,10.4 C11.1,10.4 9.6,12.4 8.4,13.8 z M12,0.5 C12,0.2 11.8,0 11.5,0 L4.5,0 C4.2,0 4,0.2 4,0.5 C4,0.8 4.2,1 4.5,1 L11.5,1 C11.8,1 12,0.8 12,0.5 z M12,15.5 C12,15.2 11.8,15 11.5,15 L4.5,15 C4.2,15 4,15.2 4,15.5 C4,15.8 4.2,16 4.5,16 L11.5,16 C11.8,16 12,15.8 12,15.5 z',
	diagonal: 'M12.4,12.9 C10.6,12.8 8.1,12.5 8.1,12.5 C8.1,12.5 7.7,12.3 7.9,12.1 C8.6,11.4 8.7,11.3 9.3,10.7 L5.3,6.7 C4.6,7.3 4.6,7.4 3.8,8.1 C3.6,8.3 3.5,7.9 3.5,7.9 C3.5,7.9 3.2,5.4 3.1,3.6 C3.1,3.3 3.3,3.1 3.6,3.1 C5.4,3.2 8,3.5 8,3.5 C8,3.5 8.3,3.7 8.1,3.9 C7.4,4.6 7.3,4.6 6.7,5.3 L10.7,9.3 C11.3,8.7 11.4,8.6 12.1,7.9 C12.3,7.7 12.5,8 12.5,8 C12.5,8 12.8,10.6 12.9,12.4 C12.9,12.7 12.7,12.9 12.4,12.9 z M8,0.5 C8,0.2 7.8,0 7.5,0 L0.5,0 C0.2,0 0,0.2 0,0.5 L0,7.5 C0,7.8 0.2,8 0.5,8 C0.8,8 1,7.8 1,7.5 L1,1 L7.5,1 C7.8,1 8,0.8 8,0.5 z M15.5,8 C15.2,8 15,8.2 15,8.5 L15,15 L8.5,15 C8.2,15 8,15.2 8,15.5 C8,15.8 8.2,16 8.5,16 L15.5,16 C15.8,16 16,15.8 16,15.5 L16,8.5 C16,8.2 15.8,8 15.5,8 z',
};

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Typically used to denote width, height, or aspect ratio.
 */
const OutwardArrowsIcon = createReactClass({
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
