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
				<path d="M6.5,1h-4C1.671,1,1,1.671,1,2.5v4C1,7.329,1.671,8,2.5,8h4C7.329,8,8,7.329,8,6.5v-4C8,1.671,7.329,1,6.5,1z" />
				<path d="M14.5,1h-4C9.672,1,9,1.671,9,2.5v4C9,7.329,9.672,8,10.5,8h4C15.328,8,16,7.329,16,6.5v-4C16,1.671,15.328,1,14.5,1z" />
				<path d="M6.5,9h-4C1.671,9,1,9.672,1,10.5v4C1,15.328,1.671,16,2.5,16h4C7.329,16,8,15.328,8,14.5v-4C8,9.672,7.329,9,6.5,9z" />
				<path d="M14.5,9h-4C9.672,9,9,9.672,9,10.5v4c0,0.828,0.672,1.5,1.5,1.5h4c0.828,0,1.5-0.672,1.5-1.5v-4C16,9.672,15.328,9,14.5,9z" />
			</Icon>
		);
	},
});

export default FourSquaresIcon;
