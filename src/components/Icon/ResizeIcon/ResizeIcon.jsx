import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-definition';

const cx = lucidClassNames.bind('&-ResizeIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A resize icon.
 */
const ResizeIcon = createClass({
	displayName: 'ResizeIcon',
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
				className={cx('&', className)}
			>
				<path d='M4.5,15.5 L15.5,4.5' stroke-width='1'/>
				<path d='M8.5,15.5 L15.5,8.5' stroke-width='1'/>
				<path d='M12.5,15.5 L15.5,12.5' stroke-width='1'/>
			</Icon>
		);
	}
});

export default ResizeIcon;
