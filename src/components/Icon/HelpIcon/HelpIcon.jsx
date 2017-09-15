import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-HelpIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * Help me Rhonda.
 */
const HelpIcon = createClass({
	displayName: 'HelpIcon',
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
				<path d="M8 2.06C4.69 2.06 2.06 4.69 2.06 8c0 3.31 2.632 5.94 5.94 5.94 3.31 0 5.94-2.632 5.94-5.94 0-3.31-2.63-5.94-5.94-5.94zm.028 11.134c-2.892 0-5.156-2.265-5.156-5.157S5.137 2.88 8.028 2.88s5.156 2.265 5.156 5.157c0 2.893-2.264 5.157-5.156 5.157zm1.8-7.187c.064.175.096.338.096.49 0 .25-.03.456-.097.617s-.145.3-.243.415c-.096.113-.203.21-.32.292-.293.202-.645.426-.74.794-.047.186-.023.392-.023.582H7.28v-.52c.036-.534.43-.92.837-1.228.105-.078.2-.156.29-.234.09-.08.16-.164.216-.258.055-.094.078-.21.074-.352 0-.24-.06-.417-.177-.532-.117-.116-.28-.172-.49-.172-.14 0-.26.027-.362.082-.102.055-.186.128-.25.22-.065.09-.113.197-.145.32-.03.122-.046.254-.046.394h-1.15c.006-.28.054-.54.145-.774.092-.235.22-.438.384-.61s.362-.307.594-.403c.23-.095.49-.134.777-.134.37 0 .68.04.928.143.247.1.447.227.598.378.15.15.26.315.324.49zM7.277 9.8h1.204v1.204H7.28V9.8z" />
			</Icon>
		);
	},
});

export default HelpIcon;
