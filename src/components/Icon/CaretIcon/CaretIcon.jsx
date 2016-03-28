import React from 'react';
import { lucidClassNames } from '../../../util/style-helpers';
import Icon from '../Icon';

const boundClassNames = lucidClassNames.bind('&-CaretIcon');

const {
	oneOf,
	bool,
} = React.PropTypes;

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A caret icon.
 */
const CaretIcon = React.createClass({
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

		/**
		 * Removes the fill of the icon and replaces it with an open stroke.
		 */
		isOpen: bool,
	},

	getDefaultProps() {
		return {
			direction: 'down',
			viewBox: '0 3 16 8',
			size: 16,
			isOpen: false
		};
	},

	render() {
		const {
			className,
			direction,
			size,
			isOpen,
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
					'&-is-open': isOpen,
				}, className)}
				size={size}
			>
				<path d='M0.408,3.939l7.59,8.121l0,0l7.594-8.121'/>
			</Icon>
		);
	}
});

export default CaretIcon;
