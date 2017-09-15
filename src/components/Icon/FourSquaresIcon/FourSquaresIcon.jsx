import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-FourSquaresIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Description.
 */
const FourSquaresIcon = createClass({
	displayName: 'FourSquaresIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon {...passThroughs} className={cx('&', className)}>
				<path d="M6.5 1h-4C1.67 1 1 1.67 1 2.5v4C1 7.33 1.67 8 2.5 8h4C7.33 8 8 7.33 8 6.5v-4C8 1.67 7.33 1 6.5 1zM14.5 1h-4C9.672 1 9 1.67 9 2.5v4c0 .83.672 1.5 1.5 1.5h4c.828 0 1.5-.67 1.5-1.5v-4c0-.83-.672-1.5-1.5-1.5zM6.5 9h-4C1.67 9 1 9.672 1 10.5v4c0 .828.67 1.5 1.5 1.5h4c.83 0 1.5-.672 1.5-1.5v-4C8 9.672 7.33 9 6.5 9zM14.5 9h-4C9.672 9 9 9.672 9 10.5v4c0 .828.672 1.5 1.5 1.5h4c.828 0 1.5-.672 1.5-1.5v-4c0-.828-.672-1.5-1.5-1.5z" />
			</Icon>
		);
	},
});

export default FourSquaresIcon;
