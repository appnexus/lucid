import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-TextIcon');

const TextIcon = createClass({
	displayName: 'TextIcon',

	statics: {
		peek: {
			description: `
				A text icon.
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
				<path
					d={`M14.698 0H1.302C.583 0 0 .583 0 1.302v13.396C0 15.417.583 16
					1.302 16h13.396c.72 0 1.302-.583 1.302-1.302V1.302C16 .583 15.418 0
					14.698 0zM15 14.739a.261.261 0 0 1-.26.261H1.26a.261.261 0 0
					1-.26-.261V1.26A.26.26 0 0 1 1.26 1h13.48a.26.26 0 0 1
					.26.26v13.479zM4 4h8v2h-1V5H8.5v6H10v1H6v-1h1.5V5H5v1H4V4z`}
				/>
			</Icon>
		);
	},
});

export default TextIcon;
