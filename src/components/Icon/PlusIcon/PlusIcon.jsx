import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Icon from '../Icon';

import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('PlusIcon');

const {
	PropTypes: {}
} = React;

/**
 *
 * {"categories": ["icons", "plus"]}
 *
 * A Plus Icon.
 */
const PlusIcon = React.createClass({

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
				<path className="ArPlusIcon-lineone" d="M1,6.6h14v2.8H1V6.6z"/>
				<path className="ArPlusIcon-linetwo" d="M6.6,1v14h2.8V1H6.6z"/>
			</Icon>
		);
	}
});

export default PlusIcon;
