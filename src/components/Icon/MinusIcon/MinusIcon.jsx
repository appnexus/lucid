import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-definition';

const boundClassNames = lucidClassNames.bind('&-MinusIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A minus icon.
 */
const MinusIcon = createClass({
	displayName: 'MinusIcon',
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
				<path d='M3,7h10v2H3V7z' />
			</Icon>
		);
	}
});

export default MinusIcon;
