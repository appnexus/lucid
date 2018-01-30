import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-EligibilityIcon');

const { oneOf } = PropTypes;

const LEFT = 'left';
const RIGHT = 'right';
const NEITHER = 'neither';
const BOTH = 'both';

const EligibilityIcon = createClass({
	displayName: 'EligibilityIcon',

	statics: {
		peek: {
			description: `
				An eligibility icon.
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

	propTypes: {
		...Icon.propTypes,
		eligibility: oneOf(['both', 'neither', 'left', 'right'])`
			Eligibility variations of the icon.
		`,
	},

	getDefaultProps() {
		return {
			eligibility: NEITHER,
			isDisabled: false,
		};
	},

	render() {
		const { className, eligibility, isDisabled, ...passThroughs } = this.props;

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
						d="M6.98.928C3.51 1.424.844 4.398.844 8c0 3.604 2.666 6.576 6.133 7.072V.928z"
					/>
					<path
						className={cx('&-half-circle', {
							'&-is-selected': eligibility === RIGHT || eligibility === BOTH,
							'&-half-circle-is-disabled': isDisabled,
						})}
						d="M9.022.928c3.465.496 6.133 3.47 6.133 7.072 0 3.604-2.668 6.576-6.133 7.072V.928z"
					/>
				</g>
			</Icon>
		);
	},
});

export default EligibilityIcon;
