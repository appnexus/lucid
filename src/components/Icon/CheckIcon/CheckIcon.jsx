import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const boundClassNames = lucidClassNames.bind('&-CheckIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A check icon.
 */
const CheckIcon = createClass({
	displayName: 'CheckIcon',
	propTypes: {
		...Icon.propTypes,
	},

	getDefaultProps() {
		return {
			viewBox: '0 0 18 18',
		};
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
				<path d='M13.41,5.84l-0.25-.26a0.82,0.82,0,0,0-1.16,0h0L7.36,10.22,5.73,8.75a0.82,0.82,0,0,0-1.16,0h0l-0.32.38a0.82,0.82,0,0,0,0,1.16h0L6.7,12.61a0.82,0.82,0,0,0,1.16,0h0L13.41,7a0.82,0.82,0,0,0,0-1.16h0Z' />
			</Icon>
		);
	}
});

export default CheckIcon;
