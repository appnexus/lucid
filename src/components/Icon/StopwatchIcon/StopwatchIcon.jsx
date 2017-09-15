import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-StopwatchIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A Stopwatch Icon.
 */
const StopwatchIcon = createClass({
	displayName: 'StopwatchIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, StopwatchIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M0 6.5c0-.3.2-.5.5-.5h6c.3 0 .5.2.5.5s-.2.5-.5.5h-6C.2 7 0 6.8 0 6.5zm6 4c0-.3-.2-.5-.5-.5h-5c-.3 0-.5.2-.5.5s.2.5.5.5h5c.3 0 .5-.2.5-.5zM.5 9h4c.3 0 .5-.2.5-.5S4.8 8 4.5 8h-4c-.3 0-.5.2-.5.5s.2.5.5.5zm9.2 0l2.8-2.8c.2-.2.2-.5 0-.7-.2-.2-.5-.2-.7 0L9 8.3c-.2.2-.2.5 0 .7.2.2.5.2.7 0zm.3-7V1h1c.3 0 .5-.2.5-.5S11.3 0 11 0H8c-.3 0-.5.2-.5.5s.2.5.5.5h1v1c-1.7.2-3.2.9-4.3 2.2-.2.2-.2.5 0 .7.2.1.5.1.7-.1C6.5 3.7 7.9 3 9.5 3c3 0 5.5 2.5 5.5 5.5S12.5 14 9.5 14c-1.6 0-3.1-.7-4.1-1.9-.2-.2-.5-.2-.7 0-.2.2-.2.5 0 .7 1.2 1.4 3 2.2 4.9 2.2 3.6 0 6.5-2.9 6.5-6.5C16 5.1 13.4 2.3 10 2z" />
			</Icon>
		);
	},
});

export default StopwatchIcon;
