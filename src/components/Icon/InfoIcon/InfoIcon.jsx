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
			viewBox: '-23.5 0.5 16 16',
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
				<rect x='-16.5' y='3.5' width='2' height='2'/>
				<rect x='-16.5' y='6.5' width='2' height='7'/>
			</Icon>
		);
	}
});

export default InfoIcon;
