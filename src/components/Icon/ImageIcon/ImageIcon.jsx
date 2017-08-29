import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass as createReactClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ImageIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An icon for a file.
 */
const ImageIcon = createReactClass({
	displayName: 'ImageIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M14.698,0H1.302C0.583,0,0,0.583,0,1.302v13.396C0,15.418,0.583,16,1.302,16h13.396C15.418,16,16,15.418,16,14.697V1.302 C16,0.583,15.418,0,14.698,0z M15,14.739C15,14.883,14.883,15,14.74,15H1.26C1.117,15,1,14.883,1,14.739v-3.818l3.5-3.499 l5.518,5.516l2.482-2.517l2.5,2.5V14.739z M15,11.505L12.5,9L10,11.507L4.5,6L1,9.506V1.26C1,1.117,1.117,1,1.26,1h13.48 C14.883,1,15,1.117,15,1.26V11.505z M10.5,2C9.119,2,8,3.119,8,4.5S9.119,7,10.5,7S13,5.881,13,4.5S11.881,2,10.5,2z M10.5,6 C9.672,6,9,5.329,9,4.5S9.672,3,10.5,3S12,3.671,12,4.5S11.328,6,10.5,6z" />
			</Icon>
		);
	},
});

export default ImageIcon;
