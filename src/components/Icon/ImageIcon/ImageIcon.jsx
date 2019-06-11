import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-ImageIcon');

const ImageIcon = createClass({
	displayName: 'ImageIcon',

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
				<path d='M.5.5h15v15H.5z' />
				<circle cx='10' cy='5' r='2' />
				<path d='M.5 11.5l4.5-4 4.5 4 3-2 3 2' />
			</Icon>
		);
	},
});

export default ImageIcon;
