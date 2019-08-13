import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Icon');

const { any, string, number, bool, func, oneOf } = PropTypes;

enum Colors {
	COLOR_NEUTRAL_DARK = 'neutral-dark',
	COLOR_NEUTRAL_LIGHT = 'neutral-light',
	COLOR_PRIMARY = 'primary',
	COLOR_WHITE = 'white',
	COLOR_SUCCESS = 'success',
	COLOR_WARNING = 'warning',
	COLOR_SECONDARY_ONE = 'secondary-one',
	COLOR_SECONDARY_TWO = 'secondary-two',
	COLOR_SECONDARY_THREE = 'secondary-three',
}

export interface IIconProps {
	/**
	 * Classes that are appended to the component defaults. This prop is run through the \`classnames\` library.
	 */
	className?: string;

	/** Size variations of the icons. \`size\` directly effects height and width but the developer should also be conscious of the relationship with \`viewBox\`. */
	size?: number;

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
	color?: Colors;
}

class Icon extends React.Component<IIconProps, {}, {}> {
	constructor(props: IIconProps) {
		super(props)
	}
	private svgRef = React.createRef<SVGSVGElement>();

	static displayName = 'Icon';

	static statics = {
		peek: {
			description: `
				A basic svg icon. Any props that are not explicitly called out below
				will be passed through to the native \`svg\` component.
			`,
			categories: ['visual design', 'icons'],
		},
	};

	static propTypes = {
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

		// TODO: make sure react peek is a-okay with this craziness!
		color: oneOf(Colors)`
			Sets the color of the Icon.  May not be applicable for icons that are tied
			to specific colors (e.g. DangerIcon).
		`,
	};

	static defaultProps = {
		size: 16,
		aspectRatio: 'xMidYMid meet',
		viewBox: '0 0 16 16',
		isDisabled: false,
		isClickable: false,
		color: Colors.COLOR_PRIMARY,
	}

	handleClick(event: React.MouseEvent): void {
		const { onClick, isDisabled, isClickable, onSelect } = this.props;

		const domNode = this.svgRef.current;

		if (onClick) {
			onClick({event, props: this.props});
		}

		if (onSelect && isClickable && !isDisabled) {
			if(domNode) {
				domNode.focus()
			}
			onSelect({ event, props: this.props });
		}
	}

	render(): JSX.Element {
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
				{...omitProps<IIconProps>(passThroughs, undefined, Object.keys(Icon))}
				className={cx(
					'&',
					{
						[`&-color-${color}`]: true,
						'&-is-clickable': !isDisabled && isClickable,
						'&-is-disabled': isDisabled,
					},
					className
				)}
				ref={this.svgRef}
				onClick={this.handleClick}
			>
				{children}
			</svg>
		);
	}
};

export default Icon;
