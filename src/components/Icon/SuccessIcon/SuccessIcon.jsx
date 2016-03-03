import React from 'react';
import classNames from 'classnames';
import CheckIcon from '../CheckIcon/CheckIcon';

import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('SuccessIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "CheckIcon"}
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
				className={classNames(className, boundClassNames('~'))}
				isBadge
			/>
		);
	}
});

export default SuccessIcon;
