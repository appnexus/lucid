import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DownloadIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Typically used to denote that something is available for download.
 */
const DownloadIcon = createClass({
	displayName: 'DownloadIcon',
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
				<path d="M16 12v2.75c0 .69-.56 1.25-1.25 1.25H1.25C.56 16 0 15.44 0 14.75V12h1v1.75c0 .138.112.25.25.25h13.5c.138 0 .25-.112.25-.25V12h1zm-8-1s.717 0 1.246-.623C9.25 10.38 13 6 13 6l-1.288-1L9 8.27V1c0-.552-.447-1-1-1S7 .448 7 1v7.27L4.288 5 3 6s3.75 4.38 3.754 4.377C7.284 11 8 11 8 11z" />
			</Icon>
		);
	},
});

export default DownloadIcon;
