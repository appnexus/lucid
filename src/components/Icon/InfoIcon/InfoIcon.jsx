import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('InfoIcon');

/**
 *
 * {"categories": ["visual design", "icons"]}
 *
 * An info icon.
 */
const InfoIcon = React.createClass({
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
				<path d='M6.739,6.11h2.521v7.562H6.739V6.11z' />
				<path d='M6.739,2.328h2.521v2.521H6.739V2.328z' />
			</Icon>
		);
	}
});

export default InfoIcon;
