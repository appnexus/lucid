import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Icon from '../Icon';

import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('CrossIcon');

const {
	PropTypes: {}
} = React;

/**
 *
 * {"categories": ["icons", "cross"]}
 *
 * A Cross Icon.
 */
const CrossIcon = React.createClass({
	render() {
		let {
			className,
			size,
			viewBox,
			aspectRatio,
			badge,
			...passThroughs
		} = this.props;

		let scopedClasses = boundClassNames('~', {
			'has-badge': badge,
		});

		return (
			<Icon className={classNames(className, scopedClasses)}>
				<path d="M6.45,8l-2.9-2.9L5.15,3.5L8.05,6.4l2.9-2.9l1.6,1.6l-3,2.9l3,2.9l-1.6,1.6l-2.9-3l-3,3l-1.6-1.6L6.45,8z"/>
			</Icon>
		);
	}
});

export default CrossIcon;
