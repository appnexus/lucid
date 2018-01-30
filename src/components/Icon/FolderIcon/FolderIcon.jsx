import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-FolderIcon');

const FolderIcon = createClass({
	displayName: 'FolderIcon',

	statics: {
		peek: {
			description: `
				An edit icon.
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
				{...omitProps(passThroughs, FolderIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M14.8,3C12,3,7,3,7,3L6,2c0,0-1-1-1.5-1H1c0,0-1,0-1,1s0,1,0,1s0,0.6,0,1.2C0,8,0,10,0,13.8C0,14.4,0.6,15,1.2,15 c5.4,0,8.1,0,13.5,0c0.7,0,1.2-0.6,1.2-1.2c0-3.8,0-5.7,0-9.5C16,3.6,15.4,3,14.8,3z M15,13.8c0,0.1-0.1,0.2-0.2,0.2 c-5.4,0-8.1,0-13.5,0C1.1,14,1,13.9,1,13.8C1,10,1,8,1,4.2C1,4.1,1.1,4,1.2,4c5.4,0,8.1,0,13.5,0C14.9,4,15,4.1,15,4.2 C15,8,15,10,15,13.8z" />
			</Icon>
		);
	},
});

export default FolderIcon;
