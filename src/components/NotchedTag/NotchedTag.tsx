import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { FC } from '../../util/component-types';

const { node, string, oneOf, object } = PropTypes;

const cx = lucidClassNames.bind('&-NotchedTag');

enum TagStyle {
	One = 'style-one',
	Two = 'style-two',
	Three = 'style-three',
}

enum Type {
	Filled = 'filled',
	Stroke = 'stroke',
}

enum Size {
	Large = 'large',
	Small = 'small',
}

const NOTCH_HEIGHT_LARGE = 5;
const NOTCH_HEIGHT_SMALL = 4;

const SIZE_DIMENSION_MAP = {
	[Size.Large]: {
		height: '24px',
		width: '40px',
	},
	[Size.Small]: {
		height: '18px',
		width: '30px',
	},
};

const SIZE_NOTCH_MAP: { [key in Size]: number } = {
	[Size.Large]: NOTCH_HEIGHT_LARGE,
	[Size.Small]: NOTCH_HEIGHT_SMALL,
};

const STROKE_SIZE = '2px';

interface INotchedTagProps {
	/** Any valid React children. */
	children?: React.ReactNode;

	/** Appended to the component-specific class names set on the root element. */
	className?: string;

	/** Style variations. */
	type?: Type;

	/** Size variations. */
	size?: Size;

	/** Tag style variations. */
	tagStyle?: TagStyle;

	/** Passed through to the root element. */
	style?: React.CSSProperties;
}

const NotchedTag: FC<INotchedTagProps> = (props): React.ReactElement => {
	const {
		children,
		className,
		type,
		style,
		size = Size.Large,
		tagStyle = TagStyle.One,
		...passThroughs
	} = props;

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
				type === Type.Filled ? '&-no-border' : '',
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
					type === Type.Filled ? '&-container-filled' : ''
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
