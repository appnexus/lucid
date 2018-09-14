import _ from 'lodash';
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

		isBadge: bool`
			Add badge styling.
		`,

		isClickable: bool`
			Adds styling that makes the icon appear clickable.
		`,

		isDisabled: bool`
			Adds styling that makes the icon appear disabled.  Also forces
			isClickable to be false.
		`,

		onSelect: func`
			Called when the user clicks the \`Icon\`. Signature:
			\`({event, props}) => {}\`
		`,

		children: any`
			Any valid React children.
		`,
	},

	getDefaultProps() {
		return {
			size: 16,
			aspectRatio: 'xMidYMid meet',
			viewBox: '0 0 16 16',
			isBadge: false,
			isDisabled: false,
			isClickable: false,
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
			style,
			viewBox,
			aspectRatio,
			isBadge,
			isClickable,
			isDisabled,
			...passThroughs
		} = this.props;

		// Because we control the icon size inline, we must also control the border
		// radius in the case where they user wants `isBadge`. Later one, we filter
		// out any `undefined` properties using lodash methods.
		const actualStyle = {
			...style,
			borderRadius: _.get(
				style,
				'borderRadius',
				isBadge ? `${size}px` : undefined
			),
		};

		return (
			<svg
				width={size}
				height={size}
				viewBox={viewBox}
				preserveAspectRatio={aspectRatio}
				{...omitProps(passThroughs, Icon)}
				style={_.pickBy(actualStyle, _.negate(_.isUndefined))}
				className={cx(
					'&',
					{
						'&-is-badge': isBadge,
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
