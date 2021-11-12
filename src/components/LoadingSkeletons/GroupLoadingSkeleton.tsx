import _ from 'lodash';
import React from 'react';
import { cxBackgroundGray } from './LoadingSkeletonsSvgUtil';
import LoadingSkeleton, {
	ILoadingSkeletonProps,
	IStandardSkeleton,
} from './LoadingSkeleton';

export const GroupSkeleton = (props: IStandardSkeleton): React.ReactElement => {
	const { width = 300, height = 55, className } = props;

	const bottomRectWidth = _.toNumber(width) - _.toNumber(width) / 3;
	return (
		<div data-test-id='loadingSkeleton-GroupSkeleton'>
			<svg
				data-test-id='loadingSkeleton-GroupSkeleton-svg'
				width={width}
				height={height}
				version='1.1'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g
					id='GroupSkeleton-Details'
					stroke='none'
					strokeWidth='1'
					fill='none'
					fillRule='evenodd'
				>
					<g id='GroupSkeleton-Group'>
						<g
							id='GGroupSkeleton-Group-1'
							className={cxBackgroundGray('&', className)}
						>
							<rect id='Rectangle' x='0' y='0' />
						</g>
						<rect
							className={cxBackgroundGray('&', className)}
							id='GroupSkeleton-Rectangle-1'
							x='10'
							y='13'
							width={width}
							height='10'
						/>
						<rect
							className={cxBackgroundGray('&', className)}
							id='GroupSkeleton-Rectangle-2'
							x='10'
							y='32'
							width={bottomRectWidth}
							height='18'
						/>
					</g>
				</g>
			</svg>
		</div>
	);
};

const GroupLoadingSkeleton = (
	props: ILoadingSkeletonProps
): React.ReactElement => {
	return (
		<LoadingSkeleton
			data-test-id='loadingSkeleton-GroupLoadingSkeleton'
			Skeleton={GroupSkeleton}
			{...props}
		/>
	);
};

GroupLoadingSkeleton.displayName = 'GroupLoadingSkeleton';
GroupLoadingSkeleton.peek = {
	description: `A loading indicator wrapper with optional overlay.`,
	notes: {
		overview: `
			A visual indication that a section or component of the interface is loading. Designed to indicate loading data
		`,
		intendedUse: `
			- Use in places where data takes time to load. GroupLoadingSkeleton lets users know that the information they expect to see will appear shortly.		
		`,
		technicalRecommendations: `
			If a page is displaying a lot of data coming from multiple sources, try as best as possible to load the 
			individual parts of the UI, so as not to disrupt the user and block them from interacting with the entire page until all data is loaded.
		`,
	},
	categories: ['Loading Indicator'],
};

export default GroupLoadingSkeleton;
