import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const boundClassNames = lucidClassNames.bind('&-PlusIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A plus icon.
 */
const PlusIcon = createClass({
	displayName: 'PlusIcon',
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
				<path d='M1,6.6h14v2.8H1V6.6z'/>
				<path d='M6.6,1v14h2.8V1H6.6z'/>
			</Icon>
		);
	}
});

export default PlusIcon;
