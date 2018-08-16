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
				A basic button with an \`Icon\`.
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
			isActive: false,
			onClick: _.noop,
			icon: null,
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
			isActive,
			iconIsOnLeft,
			size,
			className,
			children,
			type,
			icon,
			...passThroughs
		} = this.props;

		return (
			<div>
				<Button
					className={cx(
						'&',
						{
							'&-short': size === 'short',
							'&-small': size === 'small',
							'&-large': size === 'large',
						},
						className
					)}
					isDisabled={isDisabled}
					onClick={this.handleClick}
					ref="button"
					type={type}
				>
					<span className={cx('&', '&-content')}>
						{icon}
						{children}
					</span>
				</Button>
			</div>
		);
	},
});

export default ButtonWithIcon;
