import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass as createReactClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-FileIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An icon for a file.
 */
const FileIcon = createReactClass({
	displayName: 'FileIcon',
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
				<path d="M9.5,0H3.302C2.583,0,2,0.583,2,1.302v13.396C2,15.418,2.583,16,3.302,16h9.396C13.418,16,14,15.418,14,14.697V4.5L9.5,0z M12.74,15H3.26C3.117,15,3,14.883,3,14.739V1.26C3,1.117,3.117,1,3.26,1H9v2.698C9,4.417,9.582,5,10.302,5H13v9.739 C13,14.883,12.883,15,12.74,15z" />
			</Icon>
		);
	},
});

export default FileIcon;
