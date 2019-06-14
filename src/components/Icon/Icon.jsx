import React from 'react';
import PropTypes from 'react-peek/prop-types';
import ReactDOM from 'react-dom';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Icon');

const { any, string, number, object, bool, func } = PropTypes;

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
		style: object`
			Styles that are passed through to the \`svg\`.
		`,

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

		nativeSize: number`
			Defines the native size the icon was designed for. We currently use a
			standard 1.3px pixel stroke-width but ocassionally our icons are designed
			at larger sizes and we need control to define what their native size is.
			For non square icons this would be the smaller of either width or height.
			Most people won't need to worry about this prop unless their creating odd
			sized icons.
		`,
	},

	getDefaultProps() {
		return {
			size: 16,
			aspectRatio: 'xMidYMid meet',
			viewBox: '0 0 16 16',
			isDisabled: false,
			isClickable: false,
			nativeSize: 16,
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
			size,
			viewBox,
			aspectRatio,
			isClickable,
			isDisabled,
			style,
			nativeSize,
			...passThroughs
		} = this.props;

		// Since our icons were designed at 16px with a 1.3px stroke, we use this
		// formula to keep the stroke the same size regardless of `size`
		const combinedStyles = {
			strokeWidth: (nativeSize / size) * 1.3,
			...style,
		};

		return (
			<svg
				width={size}
				height={size}
				viewBox={viewBox}
				preserveAspectRatio={aspectRatio}
				{...omitProps(passThroughs, Icon)}
				style={combinedStyles}
				className={cx(
					'&',
					{
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
