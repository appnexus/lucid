import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ArrowIcon');

const {
	oneOf,
} = React.PropTypes;

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An arrow icon.
 */
const ArrowIcon = createClass({
	displayName: 'ArrowIcon',
	propTypes: {
		...Icon.propTypes,
		/**
		 * direction variations of the icon
		 */
		direction: oneOf([
			'up',
			'down',
			'left',
			'right',
		]),
	},

	getDefaultProps() {
		return {
			direction: 'left',
			viewBox: '0 0 16 16',
		};
	},

	render() {
		const {
			className,
			direction,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, ArrowIcon)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', {
					'&-is-down': direction === 'down',
					'&-is-up': direction === 'up',
					'&-is-left': direction === 'left',
					'&-is-right': direction === 'right',
				}, className)}
			>
				<path d='M13.646,8.354c-1.319,1.317-1.975,1.976-3.293,3.293C10.159,11.841,10,11.775,10,11.5c0-1.015,0-1.618,0-2.5H3 C2.448,9,2,8.552,2,8s0.448-1,1-1h7c0-0.881,0-1.486,0-2.5c0-0.275,0.159-0.341,0.354-0.146c1.318,1.317,1.974,1.976,3.293,3.293 C13.841,7.841,13.841,8.159,13.646,8.354z'/>
			</Icon>
		);
	},
});

export default ArrowIcon;
