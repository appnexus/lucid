import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-InfoIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An info icon.
 */
const InfoIcon = React.createClass({
	propTypes: {
		...Icon.propTypes,
	},

	getDefaultProps() {
		return {
			viewBox: '0 0 16 16',
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
				isBadge
			>
				<rect x='7' y='3' width='2' height='2'/>
				<rect x='7' y='6' width='2' height='7'/>
			</Icon>
		);
	}
});

export default InfoIcon;
