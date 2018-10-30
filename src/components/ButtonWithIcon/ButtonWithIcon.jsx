import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
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
			isDisabled: false,
			onClick: _.noop,
			type: 'button',
		};
	},

	handleClick(event) {
		const { isDisabled, onClick } = this.props;
		const domNode = ReactDOM.findDOMNode(this);

		if (!isDisabled) {
			// required to correctly apply the focus state in Safari and Firefox
			domNode.focus();
			onClick({ event, props: this.props });
		}
	},

	render() {
		const {
			isDisabled,
			size,
			kind,
			className,
			children,
			type,
			icon,
			...passThroughs
		} = this.props;

		return (
			<Button
				className={cx(
					'&',
					{
						'&-large': size === 'large',
						'&-invisible': kind === 'invisible',
					},
					className
				)}
				isDisabled={isDisabled}
				onClick={this.handleClick}
				ref="button"
				type={type}
				{...passThroughs}
			>
				<span className={cx('&', '&-content')}>
					{icon}
					{children}
				</span>
			</Button>
		);
	},
});

export default ButtonWithIcon;
