import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DotsIcon');

const DotsIcon = createClass({
	displayName: 'DotsIcon',

	statics: {
		peek: {
			description: `
				Three dots in a row.
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

	propTypes: {
		...Icon.propTypes,
	},

	getDefaultProps() {
		return {
			color: 'primary',
		};
	},

	render() {
		const { className, color, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, DotsIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				color={color}
				className={cx('&', className)}
			>
				<circle className={cx(`&-color-${color}`)} cx='8' cy='8' r='1' />
				<circle className={cx(`&-color-${color}`)} cx='14.5' cy='8' r='1' />
				<circle className={cx(`&-color-${color}`)} cx='1.5' cy='8' r='1' />
			</Icon>
		);
	},
});

export default DotsIcon;
