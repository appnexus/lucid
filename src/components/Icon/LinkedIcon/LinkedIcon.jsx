import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-LinkedIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Get linked in with this fresh new icon!
 */
const LinkedIcon = createClass({
	displayName: 'LinkedIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M14.591,1.41c-0.711-0.712-1.659-1.105-2.672-1.105c-1.012,0-1.961,0.392-2.67,1.105L7.024,3.556L7.015,5.523l3.226-3.158 c0.358-0.36,0.948-0.575,1.577-0.575c0.564,0,1.382,0.215,1.779,0.613c0.392,0.391,0.617,1.003,0.617,1.679 c0,0.675-0.225,1.288-0.615,1.681l-3.406,3.209l1.986,0.004l2.41-2.222C16.062,5.281,16.062,2.883,14.591,1.41z" />
				<path d="M5.364,13.598c-0.398,0.396-0.924,0.612-1.48,0.612c-0.558,0-1.083-0.217-1.479-0.61c-0.815-0.817-0.816-2.545-0.002-3.36 l3.101-3.233L3.543,7L1.412,9.247c-0.714,0.711-1.106,1.659-1.106,2.671s0.393,1.96,1.104,2.672 c0.711,0.713,1.66,1.105,2.673,1.105c1.011,0,1.959-0.394,2.671-1.105l2.243-2.146l-0.004-1.954L5.364,13.598z" />
				<path d="M5.118,10.882c0.25,0.251,0.654,0.251,0.904,0l4.859-4.86c0.25-0.25,0.25-0.654,0-0.904s-0.654-0.25-0.904,0l-4.858,4.86 C4.868,10.229,4.868,10.633,5.118,10.882z" />
			</Icon>
		);
	},
});

export default LinkedIcon;
