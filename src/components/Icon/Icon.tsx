import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps, Overwrite } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Icon');

const { any, string, number, bool, func, oneOf, oneOfType } = PropTypes;

export enum Color {
	'neutral-dark' = 'neutral-dark',
	'neutral-light' = 'neutral-light',
	primary = 'primary',
	white = 'white',
	success = 'success',
	warning = 'warning',
	'secondary-one' = 'secondary-one',
	'secondary-two' = 'secondary-two',
	'secondary-three' = 'secondary-three',
}

export interface IIconPropsRaw extends StandardProps {
	/** Size variations of the icons. `size` directly effects height and width but the developer should also be conscious of the relationship with `viewBox`. */
	size?: number;

	/** Size handles width and height, whereas `width` can manually override the width that would be set by size. */
	width?: number | string;

	/** Size handles width and height, whereas `height` can manually override the height that would be set by size. */
	height?: number | string;

	/** `viewBox` is very important for SVGs. You can think of `viewBox` as the "artboard" for our SVG while `size` is the presented height and width. */
	viewBox?: string;

	/** Any valid SVG aspect ratio. */
	aspectRatio?: string;

	/** Adds styling that makes the icon appear clickable. */
	isClickable?: boolean;

	/** Adds styling that makes the icon appear disabled. Also forces isClickable to be false. */
	isDisabled?: boolean;

	/** Called when the user clicks the `Icon`. */
	onClick?: ({
		event,
		props,
	}: {
		event: React.MouseEvent;
		props: IIconProps;
	}) => void;

	/** Called when the user clicks an active, clickable `Icon`. */
	onSelect?: ({
		event,
		props,
	}: {
		event: React.MouseEvent;
		props: IIconProps;
	}) => void;

	/** Sets the color of the Icon. May not be applicable for icons that are tied to specific colors (e.g. DangerIcon). */
	color?: keyof typeof Color;
}

export type IIconProps = Overwrite<
	React.HTMLProps<SVGSVGElement>,
	IIconPropsRaw
>;

const defaultProps = {
	size: 16,
	aspectRatio: 'xMidYMid meet',
	viewBox: '0 0 16 16',
	isDisabled: false,
	isClickable: false,
	color: Color.primary,
	onClick: _.noop,
	onSelect: _.noop,
};

export const Icon = (props: IIconProps): React.ReactElement => {
	const {
		className,
		children,
		color,
		size,
		width,
		height,
		viewBox,
		aspectRatio,
		isClickable,
		isDisabled,
		onClick,
		onSelect,
		...passThroughs
	} = props;

	const svgRef = React.createRef<SVGSVGElement>();

	function handleClick(event: React.MouseEvent): void {
		onClick && onClick({ event, props: props });

		if (isClickable && !isDisabled) {
			onSelect && onSelect({ event, props: props });
			if (svgRef.current) {
				svgRef.current.focus();
			}
		}
	}

	return (
		<svg
			width={width ? width : size}
			height={height ? height : size}
			viewBox={viewBox}
			preserveAspectRatio={aspectRatio}
			{...(passThroughs as any)}
			className={cx(
				'&',
				{
					[`&-color-${color}`]: true,
					'&-is-clickable': !isDisabled && isClickable,
					'&-is-disabled': isDisabled,
				},
				className
			)}
			ref={svgRef}
			onClick={handleClick}
		>
			{children}
		</svg>
	);
};

Icon.displayName = 'Icon';
Icon.defaultProps = defaultProps;
Icon.peek = {
	description: `A basic \`svg\` icon. Any props that are not explicitly called out below will be passed through to the native \`svg\` component.`,
	categories: ['visual design', 'icons'],
};

export const propTypes = {
	/**
		Classes that are appended to the component defaults. This prop is run
		through the \`classnames\` library.
	*/
	className: any,

	/**
		Size variations of the icons. \`size\` directly effects height and width
		but the developer should also be conscious of the relationship with
		\`viewBox\`.
	*/
	size: number,

	/**
		Size handles width and height, whereas \`width\` can manually override the width that would be set by size.
	*/
	width: oneOfType([number, string]),

	/**
		Size handles width and height, whereas \`height\` can manually override the height that would be set by size.
	*/
	height: oneOfType([number, string]),

	/**
		\`viewBox\` is very important for SVGs. You can think of \`viewBox\` as
		the "artboard" for our SVG while \`size\` is the presented height and
		width.
	*/
	viewBox: string,

	/**
		Any valid SVG aspect ratio.
	*/
	aspectRatio: string,

	/**
		Adds styling that makes the icon appear clickable.
	*/
	isClickable: bool,

	/**
		Adds styling that makes the icon appear disabled.  Also forces
		isClickable to be false.
	*/
	isDisabled: bool,

	/**
		Called when the user clicks the \`Icon\`. Signature:
		\`({event, props}) => {}\`
	*/
	onClick: func,

	/**
		Called when the user clicks an active, clickable \`Icon\`. Signature:
		\`({event, props}) => {}\`
	*/
	onSelect: func,

	/**
		Any valid React children.
	*/
	children: any,

	/**
		Sets the color of the Icon.  May not be applicable for icons that are tied
		to specific colors (e.g. DangerIcon).
	*/
	color: oneOf(_.values(Color)),
};

export interface IIconWithDirectionProps extends IIconProps {
	direction?: 'up' | 'down' | 'left' | 'right';
}

Icon.propTypes = propTypes;

export default Icon;
