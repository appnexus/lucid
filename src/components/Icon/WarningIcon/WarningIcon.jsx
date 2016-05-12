import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-WarningIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A warning Icon.
 */
const WarningIcon = React.createClass({
	propTypes: {
		...Icon.propTypes,
	},

	getDefaultProps() {
		return {
			viewBox: '-22.5 0.5 16 16',
		};
	},

	render() {
		const {
			className,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				className={boundClassNames('&', className)}
			>
				<path className={boundClassNames('&-triangle')} d='M-14.489,0.5c-0.632,0-1.264,0.457-1.743,1.369c-1.026,1.952-5.404,10.463-5.849,11.312  c-0.959,1.822-0.191,3.318,1.705,3.318c1.062,0,8.613,0,11.753,0c1.896,0,2.664-1.493,1.707-3.318  c-2.375-4.525-3.457-6.789-5.829-11.312C-13.227,0.958-13.859,0.5-14.489,0.5L-14.489,0.5z'/>
				<rect x='-15.5' y='4.5' fill='#ffffff' width='2' height='7'/>
				<rect x='-15.5' y='12.5' fill='#ffffff' width='2' height='2'/>
			</Icon>
		);
	}
});

export default WarningIcon;
