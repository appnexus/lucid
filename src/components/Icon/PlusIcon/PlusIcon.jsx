import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-PlusIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon"}
 *
 * A plus icon.
 */
const PlusIcon = React.createClass({
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
				viewBox='0 0 16 16'
			>
				<path d='M1,6.6h14v2.8H1V6.6z'/>
				<path d='M6.6,1v14h2.8V1H6.6z'/>
			</Icon>
		);
	}
});

export default PlusIcon;
