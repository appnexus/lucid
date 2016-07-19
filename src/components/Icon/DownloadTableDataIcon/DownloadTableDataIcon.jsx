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
 * Description.
 */
const DownloadTableDataIcon = createClass({
	displayName: 'DownloadTableDataIcon',
	propTypes: {
		...Icon.propTypes,
	},

	render() {
		const {
			className,
			...passThroughs,
		} = this.props;

		return (
			<Icon
				{...passThroughs}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<rect className={cx('&-background')} x='1' y='4' width='13' height='8'/>
				<path opacity='0.25' d='M3,4h1v8H3V4z M6,12h1V4H6V12z M9,4v5h1V4H9z'/>
				<path d='M1.25,12H7v1H1.25C0.56,13,0,12.44,0,11.75v-8.5C0,2.56,0.56,2,1.25,2h12.5C14.44,2,15,2.56,15,3.25V9h-1V4.25 C14,4.112,13.888,4,13.75,4H1.25C1.112,4,1,4.112,1,4.25v7.5C1,11.888,1.112,12,1.25,12z M14.712,10L13,12V7c0-0.552-0.447-1-1-1 s-1,0.448-1,1v5l-1.712-2L8,11c0,0,2.751,3.107,2.754,3.105C11.283,14.729,12,14.729,12,14.729s0.717,0,1.246-0.623 C13.249,14.107,16,11,16,11L14.712,10z'/>
			</Icon>
		);
	},
});

export default DownloadTableDataIcon;
