import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-EnvelopeIcon');

const EnvelopeIcon = createClass({
	displayName: 'EnvelopeIcon',

	statics: {
		peek: {
			description: `
				An Envelope icon.
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
				{...omitProps(passThroughs, EnvelopeIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d="M14.75 2H1S0 2 0 3v9.75C0 13.44.56 14 1.25 14h13.5c.69 0 1.25-.56 1.25-1.25v-9.5C16 2.56 15.44 2 14.75 2zM1 12.293V4.579l4.175 3.538L1 12.293zm.707.707L5.94 8.766l.742.629c.269.221.771.478 1.351.478.411 0 .86-.129 1.293-.491l.731-.618L14.293 13H1.707zM15 12.293l-4.177-4.178L15 4.579v7.714zm0-9.025L8.682 8.617c-.646.544-1.294.06-1.358.011L1 3.268V3.25A.25.25 0 0 1 1.25 3h13.5a.25.25 0 0 1 .25.25v.018z" />
			</Icon>
		);
	},
});

export default EnvelopeIcon;
