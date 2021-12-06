import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';

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

export interface INotchedTagProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/** Style variations. */
	type?: keyof typeof Type;

	/** Size variations. */
	size: keyof typeof Size;

	/** Tag style variations. */
	tagStyle: keyof typeof TagStyle;
}

const defaultProps = {
	size: Size.large,
	tagStyle: TagStyle['style-one'],
};

export const NotchedTag = (props: INotchedTagProps): React.ReactElement => {
	const { children, className, type, style, size, tagStyle, ...passThroughs } =
		props;

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
	/**
		Any valid React children.
	*/
	children: node,
	className: string,
	/**
		Style variations.
	*/
	type: oneOf(_.values(Type)),
	size: oneOf(_.values(Size)),
	tagStyle: oneOf(_.values(TagStyle)),
	style: object,
};
NotchedTag.peek = {
	description: `A banner that displays a prominent message.`,
	notes: {
		overview: `
			Notched tag helps users visually identify a high-priority object and its location in the object hierarchy.
		`,
		intendedUse: `
			Use \`NotchedTag\` in tables, page headers, and in the global search to help users way-find while monitoring their objects. View \`DetailsPageHeader\` in ANX-React to see an example of Notched tag in context.
								
			**Styling notes**
			
			- Use filled in Notched tags, \`type:"filled"\`, for the currently-viewed or highest-priority object. 
			- Use empty Notched tags, \`type:"stroke"\`, for the other objects associated with the viewed/priority object.
			- Use \`size:"small"\` in tables.
			- In page headers, use \`size:"large"\` \`type:"filled"\` for the highest-priority object, and \`size:"small"\` \`type:"stroke"\` for secondary objects.
		`,
		technicalRecommendations: `
			- \`tagStyle:style-one"\` is for Advertiser objects.
			- \`tagStyle:style-two"\` is for Insertion Order objects.
			- \`tagStyle:style-three"\` is for Line Item objects.
		`,
	},
	categories: ['visual design'],
};

export default NotchedTag;
