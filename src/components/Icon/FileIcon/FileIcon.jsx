import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-FileIcon');

const FileIcon = createClass({
	displayName: 'FileIcon',

	statics: {
		peek: {
			description: `
				An icon for a file.
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

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
				<path d='M2.5.5v15h11v-11l-4-4z' />
				<path d='M13.25 5H9V.75' />
			</Icon>
		);
	},
});

export default FileIcon;
