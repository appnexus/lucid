import React from 'react';
import LoadingSkeleton, {
	ILoadingSkeletonProps,
	IStandardSkeleton,
} from './LoadingSkeleton';

import {
	cxBackgroundGray,
	cxBackgroundNeutral,
} from './LoadingSkeletonsSvgUtil';

export const SmallDataTableSkeleton = (
	props: IStandardSkeleton
): React.ReactElement => {
	const { width = 565, height = 130, className } = props;

	return (
		<div data-test-id='loadingSkeleton-SmallDataTableSkeleton'>
			<svg
				data-test-id='loadingSkeleton-SmallDataTableSkeleton-svg'
				width={width}
				height={height}
				version='1.1'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g
					id='SmallDataTableSkeleton-Details'
					stroke='none'
					strokeWidth='1'
					fill='none'
					fillRule='evenodd'
				>
					<g
						id='SmallDataTableSkeleton-Group-1'
						transform='translate(-598.000000, -2418.000000)'
					>
						<g
							id='SmallDataTableSkeleton-Group-2'
							transform='translate(30.000000, 2241.000000)'
						>
							<g
								id='SmallDataTableSkeleton-Group-3'
								transform='translate(568.000000, 177.000000)'
							>
								<g
									id='Table-Row-/-Default'
									transform='translate(0.000000, 30.000000)'
								>
									<rect
										className={cxBackgroundNeutral('&', className)}
										id='SmallDataTableSkeleton-BG'
										x='0'
										y='0'
										width='565'
										height='32'
									/>
									<rect
										className={cxBackgroundGray('&', className)}
										id='SmallDataTableSkeleton-Bottom-Line'
										x='0'
										y='31'
										width='565'
										height='1'
									/>
								</g>
								<g
									id='SmallDataTableSkeleton-Table-Row-/-Default'
									transform='translate(0.000000, 62.000000)'
								>
									<rect
										className={cxBackgroundNeutral('&', className)}
										id='SmallDataTableSkeleton-BG'
										x='0'
										y='0'
										width='565'
										height='32'
									/>
									<rect
										className={cxBackgroundGray('&', className)}
										id='SmallDataTableSkeleton-Bottom-Line'
										x='0'
										y='31'
										width='565'
										height='1'
									/>
								</g>
								<g
									id='SmallDataTableSkeleton-Table-Row-/-Default'
									transform='translate(0.000000, 94.000000)'
								>
									<rect
										className={cxBackgroundNeutral('&', className)}
										id='SmallDataTableSkeleton-BG'
										x='0'
										y='0'
										width='565'
										height='32'
									/>
									<rect
										className={cxBackgroundGray('&', className)}
										id='SmallDataTableSkeleton-Bottom-Line'
										x='0'
										y='31'
										width='565'
										height='1'
									/>
								</g>
								<g id='Table-Row-/-Header-White'>
									<rect
										className={cxBackgroundNeutral('&', className)}
										id='SmallDataTableSkeleton-BG'
										x='0'
										y='0'
										width='565'
										height='30'
									/>
									<rect
										className={cxBackgroundGray('&', className)}
										id='SmallDataTableSkeleton-Bottom-Line'
										x='0'
										y='29'
										width='565'
										height='1'
									/>
								</g>
								<path
									className={cxBackgroundGray('&', className)}
									d='M111,104 L111,114 L11,114 L11,104 L111,104 Z M289,104 L289,114 L189,114 L189,104 L289,104 Z M477,
                  104 L477,114 L377,114 L377,104 L477,104 Z M131,72 L131,82 L11,82 L11,72 L131,72 Z M309,72 L309,82 L189,
                  82 L189,72 L309,72 Z M497,72 L497,82 L377,82 L377,72 L497,72 Z M111,40 L111,50 L11,50 L11,40 L111,40 Z M289,
                  40 L289,50 L189,50 L189,40 L289,40 Z M477,40 L477,50 L377,50 L377,40 L477,40 Z M131,10 L131,20 L11,
                  20 L11,10 L131,10 Z M309,10 L309,20 L189,20 L189,10 L309,10 Z M497,10 L497,20 L377,20 L377,10 L497,10 Z'
									id='SmallDataTableSkeleton-Combined-Shape'
								/>
							</g>
						</g>
					</g>
				</g>
			</svg>
		</div>
	);
};

const SmallDataTableLoadingSkeleton = (
	props: ILoadingSkeletonProps
): React.ReactElement => {
	return (
		<LoadingSkeleton
			data-test-id='loadingSkeleton-SmallDataTableLoadingSkeleton'
			Skeleton={SmallDataTableSkeleton}
			{...props}
		/>
	);
};

SmallDataTableLoadingSkeleton.displayName = 'SmallDataTableLoadingSkeleton';
SmallDataTableLoadingSkeleton.peek = {
	description: `A loading indicator wrapper with optional overlay.`,
	notes: {
		overview: `
			A visual indication that a section or component of the interface is loading. Designed to indicate loading data
		`,
		intendedUse: `
			- Use in places where data takes time to load. SmallDataTableLoadingSkeleton lets users know that the information they expect to see will appear shortly.		
		`,
		technicalRecommendations: `
			If a page is displaying a lot of data coming from multiple sources, try as best as possible to load the 
			individual parts of the UI, so as not to disrupt the user and block them from interacting with the entire page until all data is loaded.
		`,
	},
	categories: ['Loading Indicator'],
};

export default SmallDataTableLoadingSkeleton;
