import React from 'react';
import CheckIcon from '../CheckIcon/CheckIcon';
import { lucidClassNames } from '../../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-SuccessIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "CheckIcon", "madeFrom": ["CheckIcon"]}
 *
 * A success icon.
 */
const SuccessIcon = React.createClass({
	propTypes: {
		...CheckIcon.propTypes,
	},

	render() {
		const {
			className,
			...passThroughs
		} = this.props;

		return (
			<CheckIcon
				{...passThroughs}
				className={boundClassNames('&', className)}
				isBadge
			/>
		);
	}
});

export default SuccessIcon;
