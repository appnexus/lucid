import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-EligibilityIcon');

const {
	oneOf,
} = PropTypes;

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

const EligibilityIcon = createClass({
	displayName: 'EligibilityIcon',
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
			isDisabled: false,
		};
	},

	render() {
		const {
			className,
			eligibility,
			isDisabled,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, EligibilityIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				isDisabled={isDisabled}
				className={cx('&', className)}
			>
				<g>
					<path
						className={cx('&-half-circle', {
							'&-is-selected': eligibility === LEFT || eligibility === BOTH,
							'&-half-circle-is-disabled': isDisabled,
						})}
						d='M6.979,0.928C3.511,1.424,0.845,4.398,0.845,8c0,3.604,2.666,6.576,6.133,7.072V0.928H6.979z'
					/>
					<path
						className={cx('&-half-circle', {
							'&-is-selected': eligibility === RIGHT || eligibility === BOTH,
							'&-half-circle-is-disabled': isDisabled,
						})}
						d='M9.022,0.928C12.487,1.424,15.155,4.398,15.155,8c0,3.604-2.668,6.576-6.133,7.072V0.928z'
					/>
				</g>
			</Icon>
		);
	},
});

export default EligibilityIcon;
