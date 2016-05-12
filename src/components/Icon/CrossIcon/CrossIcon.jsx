import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-CrossIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A cross icon.
 */
const CrossIcon = React.createClass({
	propTypes: {
		...Icon.propTypes,
	},

	getDefaultProps() {
		return {
			viewBox: '-26.5 0.5 16 16',
		}
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
				<path d='M-19.664,8.5l-2.449-2.463l1.17-1.171l2.449,2.465l2.465-2.465l1.17,1.171L-17.337,8.5l2.479,2.465 l-1.168,1.17l-2.467-2.479l-2.48,2.48l-1.17-1.171L-19.664,8.5z'/>
			</Icon>
		);
	}
});

export default CrossIcon;
