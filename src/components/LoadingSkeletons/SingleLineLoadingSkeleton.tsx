import React from 'react';
import LoadingSkeleton, {
	ILoadingSkeletonProps,
	IStandardSkeleton,
} from './LoadingSkeleton';
import { cxBackgroundGray } from './LoadingSkeletonsSvgUtil';

export const SingleLineSkeleton = (
	props: IStandardSkeleton
): React.ReactElement => {
	const { width = 800, height = 20, className } = props;

	return (
		<div data-test-id='loadingSkeleton-SingleLineSkeleton'>
			<svg
				data-test-id='loadingSkeleton-SingleLineSkeleton-svg'
				width={width}
				height={height}
				xmlns='http://www.w3.org/2000/svg'
			>
				<g
					id='SingleLineSkeleton-Details'
					stroke='none'
					strokeWidth='1'
					fill='none'
					fillRule='evenodd'
				>
					<g id='SingleLineSkeleton-Group'>
						<g
							className={cxBackgroundGray('&', className)}
							id='SingleLineSkeleton-Group-1'
						>
							<rect
								id='SingleLineSkeleton-Rectangle'
								x='0'
								y='0'
								width={width}
								height={height}
							/>
						</g>
					</g>
				</g>
			</svg>
		</div>
	);
};

const SingleLineLoadingSkeleton = (
	props: ILoadingSkeletonProps
): React.ReactElement => {
	return (
		<LoadingSkeleton
			data-test-id='loadingSkeleton-SingleLineLoadingSkeleton'
			Skeleton={SingleLineSkeleton}
			{...props}
		/>
	);
};

SingleLineLoadingSkeleton.displayName = 'SingleLineLoadingSkeleton';
SingleLineLoadingSkeleton.peek = {
	description: `A loading indicator wrapper with optional overlay.`,
	notes: {
		overview: `
			A visual indication that a section or component of the interface is loading. Designed to indicate loading data
		`,
		intendedUse: `
			- Use in places where data takes time to load. SingleLineLoadingSkeleton lets users know that the information they expect to see will appear shortly.		
		`,
		technicalRecommendations: `
			If a page is displaying a lot of data coming from multiple sources, try as best as possible to load the 
			individual parts of the UI, so as not to disrupt the user and block them from interacting with the entire page until all data is loaded.
		`,
	},
	categories: ['Loading Indicator'],
};

export default SingleLineLoadingSkeleton;
