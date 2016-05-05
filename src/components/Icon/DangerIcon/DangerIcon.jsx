import React from 'react';
import CrossIcon  from '../CrossIcon/CrossIcon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-definition';

const cx = lucidClassNames.bind('&-DangerIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "CrossIcon", "madeFrom": ["CrossIcon"]}
 *
 * A danger icon.
 */
const DangerIcon = createClass({
	displayName: 'DangerIcon',
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
				className={cx('&', className)}
				isBadge
			/>
		);
	}
});

export default DangerIcon;
