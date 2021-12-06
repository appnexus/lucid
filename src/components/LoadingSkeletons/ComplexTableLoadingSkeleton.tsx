import React from 'react';
import LoadingSkeleton, {
	ILoadingSkeletonProps,
	IStandardSkeleton,
} from './LoadingSkeleton';
import {
	cxBackgroundGray,
	cxBackgroundNeutral,
	ComplexTableSvgPath,
} from './LoadingSkeletonsSvgUtil';

export const ComplexTableSkeleton = (
	props: IStandardSkeleton
): React.ReactElement<IStandardSkeleton> => {
	const { width = 860, height = 92, className } = props;

	return (
		<div data-test-id='loadingSkeleton-ComplexTableSkeleton'>
			<svg
				data-test-id='loadingSkeleton-ComplexTableSkeleton-svg'
				width={width}
				height={height}
				xmlns='http://www.w3.org/2000/svg'
			>
				<g fill='none' fillRule='evenodd'>
					<path
						className={cxBackgroundNeutral('&', className)}
						d='M0 0h2642v91H0z'
					/>
					<path
						className={cxBackgroundGray('&', className)}
						d='M0 90h2642v1H0z'
					/>
					<path
						className={cxBackgroundGray('&', className)}
						d={ComplexTableSvgPath}
					/>
				</g>
			</svg>
		</div>
	);
};

const ComplexTableLoadingSkeleton = (
	props: ILoadingSkeletonProps
): React.ReactElement => {
	return (
		<LoadingSkeleton
			data-test-id='loadingSkeleton-ComplexTableLoadingSkeleton'
			Skeleton={ComplexTableSkeleton}
			{...props}
		/>
	);
};

ComplexTableLoadingSkeleton.displayName = 'ComplexTableLoadingSkeleton';
ComplexTableLoadingSkeleton.peek = {
	description: `A loading indicator wrapper with optional overlay.`,
	notes: {
		overview: `
			A visual indication that a section or component of the interface is loading. Designed to indicate loading data
		`,
		intendedUse: `
			- Use in places where data takes time to load. ComplexTableLoadingSkeleton lets users know that the information they expect to see will appear shortly.		
		`,
		technicalRecommendations: `
			If a page is displaying a lot of data coming from multiple sources, try as best as possible to load the 
			individual parts of the UI, so as not to disrupt the user and block them from interacting with the entire page until all data is loaded.
		`,
	},
	categories: ['Loading Indicator'],
};

export default ComplexTableLoadingSkeleton;
