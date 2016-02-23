import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('PlusIcon');

/**
 *
 * {"categories": ["visual design", "icons"]}
 *
 * A plus icon.
 */
const PlusIcon = React.createClass({
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const {
			className,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				className={classNames(className, boundClassNames('~'))}
			>
				<path d='M1,6.6h14v2.8H1V6.6z'/>
				<path d='M6.6,1v14h2.8V1H6.6z'/>
			</Icon>
		);
	}
});

export default PlusIcon;
