import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('WarningIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon"}
 *
 * A warning Icon.
 */
const WarningIcon = React.createClass({
	propTypes: {
		...Icon.propTypes,
	},

	getDefaultProps() {
		return {
			viewBox: '-1 0 18 18'
		};
	},

	render() {
		const {
			className,
			...passThroughs
		} = this.props;

		const scopedClasses = boundClassNames('~');

		return (
			<Icon
				className={classNames(className, scopedClasses)}
				{...passThroughs}
			>
					<path d='M8,1.134l7.927,13.731H0.072L8,1.134z'/>
					<path d='M7.168,5.295h1.664v4.994H7.168V5.295z'/>
					<path d='M7.168,11.121h1.664v1.664H7.168V11.121z'/>
			</Icon>
		);
	}
});

export default WarningIcon;
