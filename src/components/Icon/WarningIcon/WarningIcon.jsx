import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('WarnigIcon');

/**
 *
 * {'categories': ['visual design', 'icons']}
 *
 * A warning Icon.
 */
const WarningIcon = React.createClass({
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
					<path className='triangle' d='M8,1.134l7.927,13.731H0.072L8,1.134z'/>
					<path className='exclamation' d='M7.168,5.295h1.664v4.994H7.168V5.295z'/>
					<path className='exclamation' d='M7.168,11.121h1.664v1.664H7.168V11.121z'/>
			</Icon>
		);
	}
});

export default WarningIcon;
