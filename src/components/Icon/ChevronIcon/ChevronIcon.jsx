import React from 'react';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-definition';
import Icon from '../Icon';

const boundClassNames = lucidClassNames.bind('&-ChevronIcon');

const {
	oneOf,
} = React.PropTypes;

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A chevron icon.
 */
const ChevronIcon = createClass({
	displayName: 'ChevronIcon',
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
			direction: 'down',
			viewBox: '0 0 16 16',
			size: 16
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
				{...passThroughs}
				className={boundClassNames('&', {
					'&-is-down': direction === 'down',
					'&-is-up': direction === 'up',
					'&-is-left': direction === 'left',
					'&-is-right': direction === 'right',
				}, className)}
				size={size}
			>
				<path d='M3,6 L8,11 L13,6' strokeWidth='2' strokeLinejoin='round' />
			</Icon>
		);
	}
});

export default ChevronIcon;
