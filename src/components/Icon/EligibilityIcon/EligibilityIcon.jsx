import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';

const boundClassNames = lucidClassNames.bind('&-EligibilityIcon');

const {
	oneOf,
} = React.PropTypes;

const LEFT = 'left';
const RIGHT = 'right';
const NEITHER = 'neither';
const BOTH = 'both';

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An eligibility icon.
 */

const EligibilityIcon = React.createClass({
	propTypes: {
		...Icon.propTypes,
		/**
		 * Eligibility variations of the icon.
		 */
		eligibility: oneOf([
			'both',
			'neither',
			'left',
			'right',
		]),
	},

	getDefaultProps() {
		return {
			eligibility: NEITHER,
		};
	},

	render() {
		const {
			className,
			eligibility,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				className={boundClassNames('&', className)}
			>
				<g>
					<path
						className={boundClassNames('&-half-circle', {
							'&-is-selected': eligibility === LEFT || eligibility === BOTH
						})}
						d='M6.979,0.928C3.511,1.424,0.845,4.398,0.845,8c0,3.604,2.666,6.576,6.133,7.072V0.928H6.979z'
					/>
					<path
						className={boundClassNames('&-half-circle', {
							'&-is-selected': eligibility === RIGHT || eligibility === BOTH
						})}
						d='M9.022,0.928C12.487,1.424,15.155,4.398,15.155,8c0,3.604-2.668,6.576-6.133,7.072V0.928z'
					/>
				</g>
			</Icon>
		);
	}
});

export default EligibilityIcon;
