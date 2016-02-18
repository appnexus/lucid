import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('InfoIcon');

const {
	PropTypes: {}
} = React;


/**
 *
 * {"categories": ["icons", "info"]}
 *
 * A Info Icon.
 */
const InfoIcon = React.createClass({
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		let {
			className,
			badge,
			...passThroughs
		} = this.props;

		let scopedClasses = boundClassNames('~', {
			'has-badge': badge,
		});

		return (
			<Icon className={classNames(className, scopedClasses)}
				{...passThroughs}>
				<path className="ArInfoIcon-dot" d="M6.739,6.11h2.521v7.562H6.739V6.11z" />
				<path className="ArInfoIcon-line" d="M6.739,2.328h2.521v2.521H6.739V2.328z" />
			</Icon>
		);
	}
});

export default InfoIcon;
