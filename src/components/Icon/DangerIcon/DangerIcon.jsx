import React from 'react';
import classNames from 'classnames';
import CrossIcon  from '../CrossIcon/CrossIcon';

import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('DangerIcon');

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
				className={classNames(className, boundClassNames('~'))}
				isBadge
			/>
		);
	}
});

export default DangerIcon;
