import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('ResizeIcon');

/**
 *
 * {'categories': ['visual design', 'icons']}
 *
 * A resize icon.
 */
const ResizeIcon = React.createClass({
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
				<rect x='-1.871' y='7.346' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -3.3135 8.0001)' width='19.743' height='1.308'/>
				<rect x='4.378' y='9.934' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -4.404 10.5408)' width='12.289' height='1.306'/>
				<rect x='10.72' y='12.614' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -5.534 13.1759)' width='4.835' height='1.307'/>
			</Icon>
		);
	}
});

export default ResizeIcon;
