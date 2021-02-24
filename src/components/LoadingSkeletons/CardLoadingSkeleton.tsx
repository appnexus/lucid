import React from 'react';
import LoadingMessage from '../LoadingMessage/LoadingMessage';
import { backgroundGray } from './LoadingSkeletonsSvgUtil';
import LoadingSkeleton, {
	ILoadingSkeletonProps,
	IStandardSkeleton,
} from './LoadingSkeleton';

export const CardSkeleton = (
	props: IStandardSkeleton
): React.ReactElement<IStandardSkeleton> => {
	const { width = 200, height, className } = { ...props };

	return (
		<div
			data-test-id='loadingSkeleton-CardSkeleton'
			className={backgroundGray('&', className)}
		>
			<svg
				data-test-id='loadingSkeleton-CardSkeleton-svg'
				width={width}
				height={height}
				xmlns='http://www.w3.org/2000/svg'
			>
				<g
					id='Details'
					stroke='none'
					strokeWidth='1'
					fill='none'
					fillRule='evenodd'
				>
					<g
						className={backgroundGray('&', className)}
						transform='translate(-20.000000, -78.000000)'
					>
						<path
							d='M120,95 L120,105 L20,105 L20,95 L120,95 Z M140,78 L140,88 L20,88 L20,78 L140,78 Z'
							id='Combined-Shape'
						/>
					</g>
				</g>
			</svg>
		</div>
	);
};

const CardLoadingSkeleton = (
	props: ILoadingSkeletonProps
): React.ReactElement => {
	return (
		<LoadingSkeleton
			data-test-id='loadingSkeleton-CardLoadingSkeleton'
			Skeleton={CardSkeleton}
			{...props}
		/>
	);
};

CardLoadingSkeleton.LoadingMessage = LoadingMessage;

CardLoadingSkeleton.displayName = 'CardLoadingSkeleton';
CardLoadingSkeleton.peek = {
	description: `
		A loading indicator wrapper with optional overlay.
	`,
	notes: {
		overview: `
			A visual indication that a section or component of the interface is loading. Designed to indicate loading data
		`,
		intendedUse: `
			- Use in places where data takes time to load. CardLoadingSkeleton lets users know that the information they expect to see will appear shortly.		
		`,
		technicalRecommendations: `
			If a page is displaying a lot of data coming from multiple sources, try as best as possible to load the 
			individual parts of the UI, so as not to disrupt the user and block them from interacting with the entire page until all data is loaded.
		`,
	},
	categories: ['Loading Indicator'],
	madeFrom: ['OverlayWrapper', 'LoadingMessage'],
};

export default CardLoadingSkeleton;
