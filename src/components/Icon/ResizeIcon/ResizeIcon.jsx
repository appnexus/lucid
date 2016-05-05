import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-ResizeIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
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
				className={boundClassNames('&', className)}
			>
				<path d='M4.5,15.5 L15.5,4.5' strokeWidth='1'/>
				<path d='M8.5,15.5 L15.5,8.5' strokeWidth='1'/>
				<path d='M12.5,15.5 L15.5,12.5' strokeWidth='1'/>
			</Icon>
		);
	}
});

export default ResizeIcon;
