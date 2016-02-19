import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('CrossIcon');

/**
 *
 * {"categories": ["visual design", "icons"]}
 *
 * A cross icon.
 */
const CrossIcon = React.createClass({
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		let {
			className,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				className={classNames(className, boundClassNames('~'))}
			>
				<path d="M6.45,8l-2.9-2.9L5.15,3.5L8.05,6.4l2.9-2.9l1.6,1.6l-3,2.9l3,2.9l-1.6,1.6l-2.9-3l-3,3l-1.6-1.6L6.45,8z"/>
			</Icon>
		);
	}
});

export default CrossIcon;
