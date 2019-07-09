import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';
import Icon from '../Icon';

const cx = lucidClassNames.bind('&-ChevronIcon');

const { oneOf } = PropTypes;

const ChevronIcon = createClass({
	displayName: 'ChevronIcon',

	statics: {
		peek: {
			description: `
				A chevron icon.
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
			direction: 'down',
		};
	},

	render() {
		const { className, direction, ...passThroughs } = this.props;

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
			>
				<path d='M.5 4.5l7.5 7 7.5-7' />
			</Icon>
		);
	},
});

export default ChevronIcon;
