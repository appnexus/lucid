import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../../util/style-helpers';
import Icon from '../Icon';
import { createClass, omitProps } from '../../../util/component-types';

const cx = lucidClassNames.bind('&-CloseIcon');

const CloseIcon = createClass({
	statics: {
		peek: {
			description: `
				A larger close X icon
			`,
			categories: ['visual design', 'icons'],
			extend: 'Icon',
			madeFrom: ['Icon'],
		},
	},

	displayName: 'CloseIcon',

	propTypes: {
		...Icon.propTypes,
	},

	getDefaultProps() {
		return {
			size: null,
			viewBox: '0 0 16 16',
		};
	},

	render() {
		const { className, ...passThroughs } = this.props;

		return (
			<Icon
				{...omitProps(passThroughs, CloseIcon)}
				{..._.pick(passThroughs, _.keys(Icon.propTypes))}
				className={cx('&', className)}
				width="16"
				height="16"
			>
				<path d="M9.414 8l6.364 6.364-1.414 1.414L8 9.414l-6.364 6.364-1.414-1.414L6.586 8 .222 1.636 1.636.222 8 6.586 14.364.222l1.414 1.414L9.414 8z" />
			</Icon>
		);
	},
});

export default CloseIcon;
