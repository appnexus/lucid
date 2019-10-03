import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { FC, StandardProps, FixDefaults } from '../../util/component-types';

const { node, string, oneOf, object } = PropTypes;

const cx = lucidClassNames.bind('&-NotchedTag');

export enum TagStyle {
	'style-one' = 'style-one',
	'style-two' = 'style-two',
	'style-three' = 'style-three',
}

export enum Type {
	filled = 'filled',
	stroke = 'stroke',
}

export enum Size {
	large = 'large',
	small = 'small',
}

const NOTCH_HEIGHT_LARGE = 5;
const NOTCH_HEIGHT_SMALL = 4;

const SIZE_DIMENSION_MAP = {
	[Size.large]: {
		height: '24px',
		width: '40px',
	},
	[Size.small]: {
		height: '18px',
		width: '30px',
	},
};

const SIZE_NOTCH_MAP: { [key in Size]: number } = {
	[Size.large]: NOTCH_HEIGHT_LARGE,
	[Size.small]: NOTCH_HEIGHT_SMALL,
};

const STROKE_SIZE = '2px';

interface INotchedTagProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/** Style variations. */
	type?: keyof typeof Type;

	/** Size variations. */
	size?: keyof typeof Size;

	/** Tag style variations. */
	tagStyle?: keyof typeof TagStyle;
}

const defaultProps = {
	size: Size.large,
	tagStyle: TagStyle['style-one'],
};

export const NotchedTag: FC<INotchedTagProps> = (props): React.ReactElement => {
	const {
		children,
		className,
		type,
		style,
		size,
		tagStyle,
		...passThroughs
	} = props as FixDefaults<INotchedTagProps, typeof defaultProps>;

	const notchHeight = SIZE_NOTCH_MAP[size];
	const notchWidth = notchHeight * Math.sqrt(3); //we want to maintain a 60 degree slice (30,60,90 triangle)

	//clips off a corner of the element to create the notched effect
	const slicePolygon = `
		polygon(
			${notchHeight}px 0,
			100% 0,
			100% 100%,
			0 100%,
			0 ${notchWidth}px
		)`;

	//used for creating an inset element to create a stroke effect (instead of fill)
	const sliceInnerPolygon = `
		polygon(
			${notchHeight - 1}px 0,
			100% 0,
			100% 100%,
			0 100%,
			0 ${notchWidth - 1}px
		)`;

	return (
		<div
			className={cx(
				'&',
				`&-${tagStyle}`,
				`&-${size}`,
				type === Type.filled ? '&-no-border' : '',
				className
			)}
			{...passThroughs}
			style={{
				...style,
				...SIZE_DIMENSION_MAP[size],
				clipPath: slicePolygon,
			}}
		>
			<div
				className={cx(
					'&-container',
					type === Type.filled ? '&-container-filled' : ''
				)}
				style={{
					top: STROKE_SIZE,
					right: STROKE_SIZE,
					left: STROKE_SIZE,
					bottom: STROKE_SIZE,
					clipPath: sliceInnerPolygon,
				}}
			>
				<div className={cx('&-container-centered')}>{children}</div>
			</div>
		</div>
	);
};
NotchedTag.defaultProps = defaultProps;
NotchedTag.displayName = 'NotchedTag';
NotchedTag.propTypes = {
	children: node`
		Any valid React children.
	`,
	className: string,
	type: oneOf(_.values(Type))`
		Style variations.
	`,
	size: oneOf(_.values(Size)),
	tagStyle: oneOf(_.values(TagStyle)),
	style: object,
};
NotchedTag.peek = {
	description: `
		A tag with a notched edge.
	`,
	categories: ['visual design'],
};

export default NotchedTag;
