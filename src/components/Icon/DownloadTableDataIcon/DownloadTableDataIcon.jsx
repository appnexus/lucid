import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DownloadTableDataIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Typically used to denote that the table has data that's available for
 * download. Usually clicking should kick off the download.
 */
const DownloadTableDataIcon = createClass({
	displayName: 'DownloadTableDataIcon',
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
				<path opacity=".25" d="M3 4h1v8H3V4zm3 8h1V4H6v8zm3-8v5h1V4H9z" />
				<path d="M1.25 12H7v1H1.25C.56 13 0 12.44 0 11.75v-8.5C0 2.56.56 2 1.25 2h12.5c.69 0 1.25.56 1.25 1.25V9h-1V4.25c0-.138-.11-.25-.25-.25H1.25c-.138 0-.25.112-.25.25v7.5c0 .14.112.25.25.25zm13.462-2L13 12V7c0-.552-.447-1-1-1s-1 .448-1 1v5l-1.712-2L8 11s2.75 3.107 2.754 3.105c.53.624 1.246.624 1.246.624s.717 0 1.246-.624C13.25 14.106 16 11 16 11l-1.288-1z" />
			</Icon>
		);
	},
});

export default DownloadTableDataIcon;
