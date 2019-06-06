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
				<path strokeLinecap='square' d='M.5 2.5h15v11H.5z' />
				<path d='M.5 3.5l7.5 6 7.5-6m-15 10l6-5m3 0l6 5' />
			</Icon>
		);
	},
});

export default EnvelopeIcon;
