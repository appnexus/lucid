import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Icon from '../Icon';

import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('MinusIcon');

const {
	PropTypes: {}
} = React;

/**
 *
 * {"categories": ["icons", "minus"]}
 *
 * A Minus Icon.
 */
const MinusIcon = React.createClass({

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
				<path className="ArMinusIcon-path" d="M3,7h10v2H3V7z" />
			</Icon>
		);
	}
});

export default MinusIcon;
