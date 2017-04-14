import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';
import Icon from '../Icon';

const cx = lucidClassNames.bind('&-ChevronIcon');

const { oneOf } = PropTypes;

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
		direction: oneOf(['up', 'down', 'left', 'right']),
	},

	getDefaultProps() {
		return {
			direction: 'down',
		};
	},

	render() {
		const { className, direction, size, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, ChevronIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx(
					'&',
					{
						'&-is-down': direction === 'down',
						'&-is-up': direction === 'up',
						'&-is-left': direction === 'left',
						'&-is-right': direction === 'right',
					},
					className
				)}
				size={size}
			>
				<path d="M12.293,5.293 L13.707,6.707 L8.707,11.707 C8.317,12.098 7.683,12.098 7.293,11.707 L2.293,6.707 L3.707,5.293 L8,9.586 L12.293,5.293 z" />
			</Icon>
		);
	},
});

export default ChevronIcon;
