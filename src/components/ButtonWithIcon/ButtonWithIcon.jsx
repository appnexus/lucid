import React from 'react';
import PropTypes from 'react-peek/prop-types';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import { lucidClassNames } from '../../util/style-helpers.js';
import { createClass } from '../../util/component-types';

const cx = lucidClassNames.bind('&-ButtonWithIcon');

const { element, string, oneOfType, node, arrayOf } = PropTypes;

const ButtonWithIcon = createClass({
	displayName: 'ButtonWithIcon',

	statics: {
		peek: {
			description: `
				Use this component for buttons with text and an icon, for text only or icon only buttons use \`Button\`. Button with \`Icon\` is styled to work with \`Basic button\` and \`Link button\`, and in some cases \`Large button\`.
			`,
			categories: ['controls', 'buttons'],
			madeFrom: ['Button', 'Icon'],
		},
	},

	propName: 'ButtonWithIcon',

	propTypes: {
		...Button.propTypes,
		...Icon.propTypes,

		className: string`
			Class names that are appended to the defaults
		`,

		children: oneOfType([node, arrayOf(node)])`
			Any valid React children
		`,

		type: string`
			Form element type variations of Button. Passed through to DOM Button.
		`,

		icon: element`
			The \`Icon\` displayed inside the Button.
		`,
	},

	getDefaultProps() {
		return {
			type: 'button',
		};
	},

	render() {
		const { className, children, type, icon, ...passThroughs } = this.props;

		return (
			<Button className={cx('&', className)} type={type} {...passThroughs}>
				{icon}
				{children}
			</Button>
		);
	},
});

export default ButtonWithIcon;
