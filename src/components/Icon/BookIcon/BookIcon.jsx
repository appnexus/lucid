import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-BookIcon');

const BookIcon = createClass({
	displayName: 'BookIcon',

	statics: {
		peek: {
			description: `
				A book icon.
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
				{...omitProps(passThroughs, BookIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M2.5 2.5h-2v13h15v-13h-2' />
				<path d='M8 2.5c-1.5-3-5-2-5-2v12.484S6.5 12.5 7.519 15.5h.962C9.5 12.5 13 12.984 13 12.984V.5s-3.5-1-5 2zm0 0v12.962' />
			</Icon>
		);
	},
});

export default BookIcon;
