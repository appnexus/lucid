import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-CheckIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A check icon.
 */
const CheckIcon = React.createClass({
	propTypes: {
		...Icon.propTypes,
	},

	getDefaultProps() {
		return {
			viewBox: '-26.5 0.5 16 16',
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
				<path d='M-14.58,5.689L-14.8,5.46c-0.285-0.285-0.749-0.285-1.033,0l-4.13,4.127l-1.747-1.614 c-0.286-0.286-0.748-0.286-1.033,0l-0.287,0.343c-0.286,0.285-0.286,0.747,0,1.033l2.485,2.354c0.285,0.285,0.748,0.285,1.033,0 l4.932-4.981C-14.295,6.438-14.295,5.974-14.58,5.689z'/>
			</Icon>
		);
	}
});

export default CheckIcon;
