import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const boundClassNames = lucidClassNames.bind('&-InfoIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An info icon.
 */
const InfoIcon = createClass({
	displayName: 'InfoIcon',
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
				<path d='M6.739,6.11h2.521v7.562H6.739V6.11z' />
				<path d='M6.739,2.328h2.521v2.521H6.739V2.328z' />
			</Icon>
		);
	}
});

export default InfoIcon;
