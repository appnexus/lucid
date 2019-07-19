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

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, DotsIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<circle className={cx('&-circle')} cx='8' cy='8' r='1' />
				<circle className={cx('&-circle')} cx='14.5' cy='8' r='1' />
				<circle className={cx('&-circle')} cx='1.5' cy='8' r='1' />
			</Icon>
		);
	},
});

export default DotsIcon;
