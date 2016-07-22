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
				<path d='M16,12v2.75c0,0.69-0.56,1.25-1.25,1.25H1.25C0.56,16,0,15.44,0,14.75V12h1v1.75C1,13.888,1.112,14,1.25,14h13.5 c0.138,0,0.25-0.112,0.25-0.25V12H16z M8,11c0,0,0.717,0,1.246-0.623C9.249,10.379,13,6,13,6l-1.288-1L9,8.271V1 c0-0.552-0.447-1-1-1S7,0.448,7,1v7.271L4.288,5L3,6c0,0,3.751,4.379,3.754,4.377C7.283,11,8,11,8,11z'/>
			</Icon>
		);
	},
});

export default DownloadIcon;
