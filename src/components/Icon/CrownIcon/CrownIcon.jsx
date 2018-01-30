import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CrownIcon');

const CrownIcon = createClass({
	displayName: 'CrownIcon',

	statics: {
		peek: {
			description: `
				A crown icon, used for indicating super or admin users.
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
				viewBox={'99.9 7.5 60.1 45'}
				className={cx('&', className)}
			>
				<path d="M158 14c-.3 0-.6 0-1 .3l-13.5 8.2h-.8c-.7 0-1-.4-1.4-.8l-9.8-13.4c-.4-.4-.8-.8-1.5-.8s-1 .4-1.5.8l-9.8 13.4c-.3.4-.7.8-1.5.8-.3 0-.7 0-.7-.4L103 14h-1c-1.3 0-2.4 1-2 2l6.8 27.5c.3.8 1 1.5 2.2 1.5h42.4c.7 0 1.5-.8 1.8-1.5L160 16c.4-1-.8-2-2-2zm-8 27.3h-40l-5-21.8 9.6 6c2.4 1.4 5.5.8 7.2-1.5l7.8-11.3 8 11.3c1.4 1.5 3.3 2.3 5.2 2.3 1 0 1.8-.4 3-.8l9.7-6-5.6 21.8zm1.8 7.5h-43.6c-.3 0-.7.3-.7.7v2c0 .6.4 1 .8 1h43c.4 0 .8-.4.8-.8V50c.5-1 0-1.3-.3-1.3z" />
			</Icon>
		);
	},
});

export default CrownIcon;
