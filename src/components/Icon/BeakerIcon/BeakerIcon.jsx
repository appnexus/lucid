import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-BeakerIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * A Beaker icon.
 */
const BeakerIcon = createClass({
	displayName: 'BeakerIcon',
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
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path opacity='0.4' d='M4.034,11.33C4.015,11.383,4,11.439,4,11.5C4,11.775,4.224,12,4.5,12h7c0.276,0,0.5-0.225,0.5-0.5 c0-0.061-0.015-0.117-0.034-0.17l-0.14-0.203L10.369,9H5.63l-1.457,2.127L4.034,11.33z'/>
				<path d='M12.748,10.67l-0.013-0.02L10,6.715V3h0.301c0.276,0,0.5-0.224,0.5-0.5S10.577,2,10.301,2H5.7C5.424,2,5.2,2.224,5.2,2.5 S5.424,3,5.7,3H6v3.715L3.265,10.65l-0.013,0.02C3.093,10.908,3,11.193,3,11.5c0,0.336,0.114,0.643,0.301,0.893 C3.575,12.76,4.008,13,4.5,13h7c0.492,0,0.925-0.24,1.199-0.607C12.886,12.143,13,11.836,13,11.5 C13,11.193,12.907,10.908,12.748,10.67z M7,7V3h2v4l1.369,2l1.457,2.127l0.14,0.203C11.985,11.383,12,11.439,12,11.5 c0,0.275-0.224,0.5-0.5,0.5h-7C4.224,12,4,11.775,4,11.5c0-0.061,0.015-0.117,0.034-0.17l0.14-0.203L5.63,9L7,7z'/>
			</Icon>
		);
	},
});

export default BeakerIcon;
