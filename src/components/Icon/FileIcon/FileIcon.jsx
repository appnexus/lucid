import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-FileIcon');

/**
 *
 * {"categories": ["visual design", "icons"], "extend": "Icon", "madeFrom": ["Icon"]}
 *
 * An icon for a file.
 */
const FileIcon = createClass({
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
				<path d="M9.5 0H3.302C2.582 0 2 .583 2 1.302v13.396C2 15.418 2.583 16 3.302 16h9.396c.72 0 1.302-.582 1.302-1.303V4.5L9.5 0zm3.24 15H3.26c-.143 0-.26-.117-.26-.26V1.26c0-.143.117-.26.26-.26H9v2.698C9 4.418 9.582 5 10.302 5H13v9.74c0 .143-.117.26-.26.26z" />
			</Icon>
		);
	},
});

export default FileIcon;
