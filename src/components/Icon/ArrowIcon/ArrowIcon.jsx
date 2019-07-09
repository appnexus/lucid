import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ArrowIcon');

const { oneOf } = PropTypes;

const ArrowIcon = createClass({
	displayName: 'ArrowIcon',

	statics: {
		peek: {
			description: `
				An arrow icon.
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

	propTypes: {
		...Icon.propTypes,
		direction: oneOf(['up', 'down', 'left', 'right'])`
			direction variations of the icon
		`,
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
				<path d='M0 8h15.5m-6-6l6 6-6 6' />
			</Icon>
		);
	},
});

export default ArrowIcon;
