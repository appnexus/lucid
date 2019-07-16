import React from 'react';
import PropTypes from 'react-peek/prop-types';
import ReactDOM from 'react-dom';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Icon');

const { any, string, number, bool, func, oneOf } = PropTypes;

const COLOR_NEUTRAL_DARK = 'neutral-dark';
const COLOR_NEUTRAL_LIGHT = 'neutral-light';
const COLOR_PRIMARY = 'primary';
const COLOR_WHITE = 'white';
const COLOR_SUCCESS = 'success';
const COLOR_WARNING = 'warning';
const COLOR_SECONDARY_ONE = 'secondary-one';
const COLOR_SECONDARY_TWO = 'secondary-two';
const COLOR_SECONDARY_THREE = 'secondary-three';

const COLOR_PROPS = [
	COLOR_NEUTRAL_DARK,
	COLOR_NEUTRAL_LIGHT,
	COLOR_PRIMARY,
	COLOR_WHITE,
	COLOR_SUCCESS,
	COLOR_WARNING,
	COLOR_SECONDARY_ONE,
	COLOR_SECONDARY_TWO,
	COLOR_SECONDARY_THREE,
];

const Icon = createClass({
	displayName: 'Icon',

	statics: {
		peek: {
			description: `
				A basic svg icon. Any props that are not explicitly called out below
				will be passed through to the native \`svg\` component.
			`,
			categories: ['visual design', 'icons'],
		},
	},

	propTypes: {
		className: any`
			Classes that are appended to the component defaults. This prop is run
			through the \`classnames\` library.
		`,

		size: number`
			Size variations of the icons. \`size\` directly effects height and width
			but the developer should also be conscious of the relationship with
			\`viewBox\`.
		`,

		viewBox: string`
			\`viewBox\` is very important for SVGs. You can think of \`viewBox\` as
			the "artboard" for our SVG while \`size\` is the presented height and
			width.
		`,

		aspectRatio: string`
			Any valid SVG aspect ratio.
		`,

		isClickable: bool`
			Adds styling that makes the icon appear clickable.
		`,

		isDisabled: bool`
			Adds styling that makes the icon appear disabled.  Also forces
			isClickable to be false.
		`,

		onClick: func`
			Called when the user clicks the \`Icon\`. Signature:
			\`({event, props}) => {}\`
		`,

		onSelect: func`
			Called when the user clicks an active, clickable \`Icon\`. Signature:
			\`({event, props}) => {}\`
		`,

		children: any`
			Any valid React children.
		`,

		color: oneOf(COLOR_PROPS)`
			Sets the color of the Icon.  May not be applicable for icons that are tied
			to specific colors (e.g. DangerIcon).
		`,
	},

	getDefaultProps() {
		return {
			size: 16,
			aspectRatio: 'xMidYMid meet',
			viewBox: '0 0 16 16',
			isDisabled: false,
			isClickable: false,
			color: COLOR_PRIMARY,
		};
	},

	handleClick(event) {
		const { onClick, isDisabled, isClickable, onSelect } = this.props;
		const domNode = ReactDOM.findDOMNode(this);

		if (onClick) {
			onClick(event);
		}

		if (onSelect && isClickable && !isDisabled) {
			domNode.focus();
			onSelect({ event, props: this.props });
		}
	},

	render() {
		const {
			className,
			children,
			color,
			size,
			viewBox,
			aspectRatio,
			isClickable,
			isDisabled,
			...passThroughs
		} = this.props;

		return (
			<svg
				width={size}
				height={size}
				viewBox={viewBox}
				preserveAspectRatio={aspectRatio}
				{...omitProps(passThroughs, Icon)}
				className={cx(
					'&',
					{
						[`&-color-${color}`]: true,
						'&-is-clickable': !isDisabled && isClickable,
						'&-is-disabled': isDisabled,
					},
					className
				)}
				onClick={this.handleClick}
			>
				{children}
			</svg>
		);
	},
});

export default Icon;
