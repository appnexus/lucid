import React from 'react';
import CrossIcon  from '../CrossIcon/CrossIcon';
import { lucidClassNames } from '../../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-DangerIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "CrossIcon"}
 *
 * A danger icon.
 */
const DangerIcon = React.createClass({
	propTypes: {
		...CrossIcon.propTypes,
	},

	render() {
		const {
			className,
			...passThroughs
		} = this.props;

		return (
			<CrossIcon
				{...passThroughs}
				className={boundClassNames('&', className)}
				isBadge
			/>
		);
	}
});

export default DangerIcon;
