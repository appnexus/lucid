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
				<path d="M6.532 1.995L3 1.997V2h3.573c-.015-.001-.026-.005-.041-.005z" />
				<path d="M14.698 2H14V.998L9.468.996c-.724-.001-1.178.3-1.468.668-.29-.368-.744-.671-1.468-.669C5 1 2 .998 2 .998V2h-.698C.583 2 0 2.583 0 3.302v10.396C0 14.417.583 15 1.302 15h13.396c.72 0 1.302-.583 1.302-1.302V3.302C16 2.583 15.418 2 14.698 2zM1.26 14a.261.261 0 0 1-.26-.261V3.26A.26.26 0 0 1 1.26 3H2l.001 10h3.625c.935 0 1.435.5 1.701 1H1.26zm4.366-2H3.001L3 2v-.003L6.573 2c.734.026.893.677.924 1l.001.009v9.642C7.037 12.262 6.421 12 5.626 12zm2.875-8.999V3c.02-.237.147-.974.928-1H13l-.001 10h-2.625c-.795 0-1.412.262-1.873.651v-9.65zM15 13.739a.261.261 0 0 1-.26.261H8.673c.266-.5.766-1 1.701-1h3.625L14 3h.74a.26.26 0 0 1 .26.26v10.479z" />
			</Icon>
		);
	},
});

export default BookIcon;
