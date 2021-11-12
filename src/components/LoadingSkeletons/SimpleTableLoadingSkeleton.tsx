import React from 'react';
import {
	cxBackgroundGray,
	cxBackgroundNeutral,
	SimpleTableSvgPath,
} from './LoadingSkeletonsSvgUtil';
import LoadingSkeleton, {
	ILoadingSkeletonProps,
	IStandardSkeleton,
} from './LoadingSkeleton';

export const SimpleTableSkeleton = (
	props: IStandardSkeleton
): React.ReactElement => {
	const { width = 880, height = 50, className } = props;

	return (
		<div data-test-id='loadingSkeleton-SimpleTableSkeleton'>
			<svg
				data-test-id='loadingSkeleton-SimpleTableSkeleton-svg'
				width={width}
				height={height}
				xmlns='http://www.w3.org/2000/svg'
			>
				<g fill='none' fillRule='evenodd'>
					<path
						className={cxBackgroundNeutral('&', className)}
						d='M0 0h2642v50H0z'
					/>
					<path
						className={cxBackgroundGray('&', className)}
						d='M0 49h2642v1H0z'
					/>
					<path
						className={cxBackgroundGray('&', className)}
						d={SimpleTableSvgPath}
					/>
				</g>
			</svg>
		</div>
	);
};

const SimpleTableLoadingSkeleton = (
	props: ILoadingSkeletonProps
): React.ReactElement => {
	return (
		<LoadingSkeleton
			data-test-id='loadingSkeleton-SimpleTableLoadingSkeleton'
			Skeleton={SimpleTableSkeleton}
			{...props}
		/>
	);
};

SimpleTableLoadingSkeleton.displayName = 'SimpleTableLoadingSkeleton';
SimpleTableLoadingSkeleton.peek = {
	description: `A loading indicator wrapper with optional overlay.`,
	notes: {
		overview: `
			A visual indication that a section or component of the interface is loading. Designed to indicate loading data
		`,
		intendedUse: `
			- Use in places where data takes time to load. SimpleTableLoadingSkeleton lets users know that the information they expect to see will appear shortly.		
		`,
		technicalRecommendations: `
			If a page is displaying a lot of data coming from multiple sources, try as best as possible to load the 
			individual parts of the UI, so as not to disrupt the user and block them from interacting with the entire page until all data is loaded.
		`,
	},
	categories: ['Loading Indicator'],
};

export default SimpleTableLoadingSkeleton;
