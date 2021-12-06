import React from 'react';
import { cxBackgroundGray } from './LoadingSkeletonsSvgUtil';
import LoadingSkeleton, {
	ILoadingSkeletonProps,
	IStandardSkeleton,
} from './LoadingSkeleton';

export const HeaderSkeleton = (
	props: IStandardSkeleton
): React.ReactElement => {
	const { width = 580, height = 70, className } = props;
	return (
		<div data-test-id='loadingSkeleton-HeaderSkeleton'>
			<svg
				data-test-id='loadingSkeleton-HeaderSkeleton-svg'
				width={width}
				height={height}
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					className={cxBackgroundGray('&', className)}
					d='M266 58v10H0V58h266zm293-36v24H0V22h559zM166 0v10H0V0h166zm221 0v10H181V0h206z'
					fillRule='evenodd'
				/>
			</svg>
		</div>
	);
};

export const HeaderLoadingSkeleton = (
	props: ILoadingSkeletonProps
): React.ReactElement => {
	return (
		<LoadingSkeleton
			data-test-id='loadingSkeleton-HeaderLoadingSkeleton'
			Skeleton={HeaderSkeleton}
			{...props}
		/>
	);
};

HeaderLoadingSkeleton.displayName = 'HeaderLoadingSkeleton';
HeaderLoadingSkeleton.peek = {
	description: `A loading indicator wrapper with optional overlay.`,
	notes: {
		overview: `
			A visual indication that a section or component of the interface is loading. Designed to indicate loading data
		`,
		intendedUse: `
			- Use in places where data takes time to load. HeaderLoadingSkeleton lets users know that the information they expect to see will appear shortly.		
		`,
		technicalRecommendations: `
			If a page is displaying a lot of data coming from multiple sources, try as best as possible to load the 
			individual parts of the UI, so as not to disrupt the user and block them from interacting with the entire page until all data is loaded.
		`,
	},
	categories: ['Loading Indicator'],
};

export default HeaderLoadingSkeleton;
