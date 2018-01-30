import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-DeleteIcon');

const DeleteIcon = createClass({
	displayName: 'DeleteIcon',

	statics: {
		peek: {
			description: `
				A trash icon, used for indicating the deletion of a ui component.
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
				viewBox={'103.75 0 52.5 60'}
				className={cx('&', className)}
			>
				<path d="M152.5 7.5h-15V3.75c0-2.07-1.68-3.75-3.75-3.75h-7.5c-2.07 0-3.75 1.68-3.75 3.75V7.5h-15c-2.07 0-3.75 1.68-3.75 3.75V15c0 2.07 1.68 3.75 3.75 3.75h.34l3.4 37.5c0 2.06 1.7 3.75 3.76 3.75h30c2.06 0 3.75-1.7 3.75-3.75l3.4-37.5h.35c2.07 0 3.75-1.68 3.75-3.75v-3.75c0-2.07-1.68-3.75-3.75-3.75zm-26.25-3.75h7.5V7.5h-7.5V3.75zm18.77 52.16l-.02.18v.17h-30v-.34l-3.4-37.15h36.8l-3.38 37.16zM152.5 15h-45v-3.75h45V15zm-33.16 35.63l-2.4-26.26c-.08-1.03.7-1.87 1.72-1.87h.02c1.03 0 1.95.84 2.04 1.87l2.4 26.26c.08 1.03-.68 1.87-1.72 1.87s-1.96-.84-2.06-1.87zm17.55 0l2.38-26.26c.1-1.03 1.02-1.87 2.05-1.87 1.04 0 1.8.84 1.72 1.87l-2.4 26.26c-.1 1.03-1 1.87-2.04 1.87-1.03 0-1.8-.84-1.7-1.87zm-8.78 0V24.36c0-1.03.85-1.87 1.88-1.87s1.88.84 1.88 1.88v26.25c0 1.03-.85 1.87-1.88 1.87s-1.88-.84-1.88-1.88z" />
			</Icon>
		);
	},
});

export default DeleteIcon;
