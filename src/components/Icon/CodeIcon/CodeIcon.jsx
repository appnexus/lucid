import _ from 'lodash';
import React from 'react';
import Icon from '../Icon';
import { lucidClassNames } from '../../../util/style-helpers';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CodeIcon');

const CodeIcon = createClass({
	displayName: 'CodeIcon',

	statics: {
		peek: {
			description: `
				That which relates to code.
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
				{...omitProps(passThroughs, CodeIcon, [], false)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
			>
				<path d='M12.5 4l3 4-3 4m-9-8l-3 4 3 4' />
				<path d='M6.5 13.5l3-11' />
			</Icon>
		);
	},
});

export default CodeIcon;
