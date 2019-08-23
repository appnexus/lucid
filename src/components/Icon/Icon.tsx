import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { omitProps, FC } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Icon');

const { any, string, number, bool, func, oneOf } = PropTypes;

export enum Color {
	ColorNeutralDark = 'neutral-dark',
	ColorNeutralLight = 'neutral-light',
	ColorPrimary = 'primary',
	ColorWhite = 'white',
	ColorSuccess = 'success',
	ColorWarning = 'warning',
	ColorSecondaryOne = 'secondary-one',
	ColorSecondaryTwo = 'secondary-two',
	ColorSecondaryThree = 'secondary-three',
}

export interface IIconProps {
	/**
	 * Classes that are appended to the component defaults. This prop is run through the \`classnames\` library.
	 */
	className?: string;

	/** Size variations of the icons. \`size\` directly effects height and width but the developer should also be conscious of the relationship with \`viewBox\`. */
	size?: number;

	/** Size handles width and height, whereas `width` can manually override the width that would be set by size. */
	width?: number;

	/** Size handles width and height, whereas `height` can manually override the height that would be set by size. */
	height?: number;

	/** \`viewBox\` is very important for SVGs. You can think of \`viewBox\` as the "artboard" for our SVG while \`size\` is the presented height and width. */
	viewBox?: string;

	/** Any valid SVG aspect ratio. */
	aspectRatio?: string;

	/** Adds styling that makes the icon appear clickable. */
	isClickable?: boolean;

	/** Adds styling that makes the icon appear disabled.  Also forces isClickable to be false. */
	isDisabled?: boolean;

	/** Called when the user clicks the \`Icon\`. */
	onClick?: ({
		event,
		props,
	}: {
		event: React.MouseEvent;
		props: IIconProps;
	}) => void;

	/** Called when the user clicks an active, clickable \`Icon\`. Signature: \`({event, props}) => {}\` */
	onSelect?: ({
		event,
		props,
	}: {
		event: React.MouseEvent;
		props: IIconProps;
	}) => void;

	/** Any valid React children */
	children?: React.ReactNode;

	/** Sets the color of the Icon.  May not be applicable for icons that are tied to specific colors (e.g. DangerIcon). */
	color?: Color;

	// TODO: move this to a generic interface that all components extend their props from
	style?: React.CSSProperties;
}

const Icon: FC<IIconProps> = (props): React.ReactElement => {
	const {
		className,
		children,
		color = Color.ColorPrimary,
		size = 16,
		width = null,
		height = null,
		viewBox = '0 0 16 16',
		aspectRatio = 'xMidYMid meet',
		isClickable = false,
		isDisabled = false,
		onClick = _.noop,
		onSelect = _.noop,
		...passThroughs
	} = props;

	const svgRef = React.createRef<SVGSVGElement>();

	function handleClick(event: React.MouseEvent): void {
		onClick({ event, props: props });

		if (isClickable && !isDisabled) {
			onSelect({ event, props: props });
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
			{...omitProps<IIconProps>(
				passThroughs,
				undefined,
				_.keys(Icon.propTypes)
			)}
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

Icon.peek = {
	description: `
		A basic svg icon. Any props that are not explicitly called out below
		will be passed through to the native \`svg\` component.
	`,
	categories: ['visual design', 'icons'],
};

Icon.propTypes = {
	className: any`
		Classes that are appended to the component defaults. This prop is run
		through the \`classnames\` library.
	`,

	size: number`
		Size variations of the icons. \`size\` directly effects height and width
		but the developer should also be conscious of the relationship with
		\`viewBox\`.
	`,

	width: number`
		Size handles width and height, whereas \`width\` can manually override the width that would be set by size.
	`,

	height: number`
		Size handles width and height, whereas \`height\` can manually override the height that would be set by size.
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

	color: oneOf(_.values(Color))`
		Sets the color of the Icon.  May not be applicable for icons that are tied
		to specific colors (e.g. DangerIcon).
	`,
};

export default Icon;
