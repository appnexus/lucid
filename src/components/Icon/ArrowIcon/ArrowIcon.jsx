import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ArrowIcon');

const { oneOf } = PropTypes;

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
		direction: oneOf(['up', 'down', 'left', 'right']),
	},

	getDefaultProps() {
		return {
			direction: 'left',
			viewBox: '0 0 16 16',
		};
	},

	render() {
		const { className, direction, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, ArrowIcon, [], false)}
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
			>
				<path d="M13.646 8.354c-1.32 1.317-1.975 1.976-3.293 3.293-.194.194-.353.128-.353-.147V9H3c-.552 0-1-.448-1-1s.448-1 1-1h7V4.5c0-.275.16-.34.354-.146 1.318 1.317 1.974 1.976 3.293 3.293.194.194.194.512 0 .707z" />
			</Icon>
		);
	},
});

export default ArrowIcon;
