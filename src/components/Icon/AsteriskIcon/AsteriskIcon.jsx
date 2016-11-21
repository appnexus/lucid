import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-AsteriskIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An asterisk icon.
 */
const AsteriskIcon = createClass({
	displayName: 'AsteriskIcon',
	propTypes: {
		...Icon.propTypes,
	},

	getDefaultProps() {
		return {
			viewBox: '0 0 18 18',
			size: 18,
		};
	},

	render() {
		const {
			className,
			...passThroughs
		} = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, AsteriskIcon)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M10,7.26794919 L11.9641016,6.1339746 C12.4423942,5.85783222 13.0539846,6.02170738 13.330127,6.5 C13.6062694,6.97829262 13.4423942,7.58988303 12.9641016,7.8660254 L11,9 L12.9641016,10.1339746 C13.4423942,10.410117 13.6062694,11.0217074 13.330127,11.5 C13.0539846,11.9782926 12.4423942,12.1421678 11.9641016,11.8660254 L10,10.7320508 L10,13 C10,13.5522847 9.55228475,14 9,14 C8.44771525,14 8,13.5522847 8,13 L8,10.7320508 L6.03589838,11.8660254 C5.55760576,12.1421678 4.94601536,11.9782926 4.66987298,11.5 C4.39373061,11.0217074 4.55760576,10.410117 5.03589838,10.1339746 L7,9 L5.03589838,7.8660254 C4.55760576,7.58988303 4.39373061,6.97829262 4.66987298,6.5 C4.94601536,6.02170738 5.55760576,5.85783222 6.03589838,6.1339746 L8,7.26794919 L8,5 C8,4.44771525 8.44771525,4 9,4 C9.55228475,4 10,4.44771525 10,5 L10,7.26794919 Z'></path>
			</Icon>
		);
	},
});

export default AsteriskIcon;
