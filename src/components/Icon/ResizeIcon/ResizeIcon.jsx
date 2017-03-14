import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

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
				{...omitProps(passThroughs, ResizeIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M15.146,4.178 L15.853,4.885 L4.853,15.885 L4.146,15.178 L15.146,4.178 z' />
				<path d='M15.146,8.178 L15.853,8.885 L8.853,15.885 L8.146,15.178 L15.146,8.178 z' />
				<path d='M15.146,12.178 L15.853,12.885 L12.853,15.885 L12.146,15.178 L15.146,12.178 z' />
			</Icon>
		);
	},
});

export default ResizeIcon;
