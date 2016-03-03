import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';

import { bindClassNames } from '../../../util/style-helpers';

const boundClassNames = bindClassNames('EligibilityIcon');

const {
	oneOf,
} = React.PropTypes;

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon"}
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
			eligibility: 'neither'
		};
	},

	render() {
		const {
			className,
			eligibility,
			...passThroughs
		} = this.props;

		const scopedClasses = boundClassNames('~', {
			'is-selected-both': eligibility === 'both',
			'is-selected-neither': eligibility === 'neither',
			'is-selected-left': eligibility === 'left',
			'is-selected-right': eligibility === 'right'
		});

		return (
			<Icon
				{...passThroughs}
				className={classNames(className, scopedClasses)}
				viewBox='0 0 16 16'
			>
				<g>
					<path className='Icon-left'
						d='M9.022,0.928C12.487,1.424,15.155,4.398,15.155,8c0,3.604-2.668,6.576-6.133,7.072V0.928z'/>
					<path className='Icon-right'
						d='M6.979,0.928C3.511,1.424,0.845,4.398,0.845,8c0,3.604,2.666,6.576,6.133,7.072V0.928H6.979z'/>
				</g>
			</Icon>
		);
	}
});

export default EligibilityIcon;
