import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';
import Icon from '../Icon';

const cx = lucidClassNames.bind('&-CaretIcon');

const { oneOf } = PropTypes;

const CaretIcon = createClass({
	displayName: 'CaretIcon',

	statics: {
		peek: {
			description: `
				A caret icon.
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
			viewBox: '0 3 16 8',
		};
	},

	render() {
		const { className, direction, size, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, CaretIcon, [], false)}
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
				<path d="M1.234 4.408l6.718 7.184 6.813-7.184H1.235z" />
			</Icon>
		);
	},
});

export default CaretIcon;
