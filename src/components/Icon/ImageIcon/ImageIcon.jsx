import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ImageIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An icon for a file.
 */
const ImageIcon = createClass({
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
				<path d="M14.698 0H1.302C.582 0 0 .583 0 1.302v13.396C0 15.418.583 16 1.302 16h13.396c.72 0 1.302-.582 1.302-1.303V1.302C16 .582 15.418 0 14.698 0zM15 14.74c0 .143-.117.26-.26.26H1.26c-.143 0-.26-.117-.26-.26v-3.82l3.5-3.498 5.518 5.516L12.5 10.42l2.5 2.5v1.82zm0-3.235L12.5 9 10 11.507 4.5 6 1 9.506V1.26c0-.143.117-.26.26-.26h13.48c.143 0 .26.117.26.26v10.245zM10.5 2C9.12 2 8 3.12 8 4.5S9.12 7 10.5 7 13 5.88 13 4.5 11.88 2 10.5 2zm0 4C9.672 6 9 5.33 9 4.5S9.672 3 10.5 3s1.5.67 1.5 1.5S11.328 6 10.5 6z" />
			</Icon>
		);
	},
});

export default ImageIcon;
