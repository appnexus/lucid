import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';
import Icon from '../Icon';

const cx = lucidClassNames.bind('&-ChevronThinIcon');

const {
	oneOf,
} = React.PropTypes;

/**
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A flat, thin chevron icon for directional navigation.
 */
const ChevronThinIcon = createClass({
	displayName: 'ChevronThinIcon',
	_isPrivate: true,

	propTypes: {
		...Icon.propTypes,
		/**
		 * direction variations of the icon
		 */
		direction: oneOf([
			'left',
			'right',
		]),
	},

	getDefaultProps() {
		return {
			direction: 'right',
		};
	},

	render() {
		const {
			className,
			direction,
			size,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, ChevronThinIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
				size={size}
			>
				{direction === 'right' ? (
					<path d='M 5,0 L 13,8 L 5,16 L 4.25,15.25 L 11.50,8 L 4.25,0.75 Z' />
				) : (
					<path d='M 12,0 L 4,8 L 12,16 L 12.75,15.25 L 5.50,8 L 12.75,0.75 Z' />
				)}
			</Icon>
		);
	},
});

export default ChevronThinIcon;
