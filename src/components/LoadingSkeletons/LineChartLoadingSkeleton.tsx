import React from 'react';

import {
	cxBackgroundGray,
	cxBackgroundGrayStrokeNeutralFill,
} from './LoadingSkeletonsSvgUtil';
import LoadingSkeleton, {
	ILoadingSkeletonProps,
	IStandardSkeleton,
} from './LoadingSkeleton';

export const LineChartSkeleton = (
	props: IStandardSkeleton
): React.ReactElement<IStandardSkeleton> => {
	const { width = 900, height = 310, className } = props;

	return (
		<div data-test-id='loadingSkeleton-LineChartSkeleton'>
			<svg
				data-test-id='loadingSkeleton-LineChartSkeleton-svg'
				width={width}
				height={height}
				version='1.1'
				xmlns='http://www.w3.org/2000/svg'
			>
				<g
					id='LineChartSkeleton-Details'
					stroke='none'
					strokeWidth='1'
					fill='none'
					fillRule='evenodd'
				>
					<g
						id='LineChartSkeleton-Group-1'
						transform='translate(-93.000000, -1173.000000)'
					>
						<g
							id='LineChartSkeleton-Chart'
							transform='translate(93.000000, 1173.000000)'
						>
							<path
								className={cxBackgroundGray('&', className)}
								d='M0,310 L0,0 L1,0 L1,309 L1130,309 L1130,310 L0,310 Z'
								id='LineChartSkeleton-Combined-Shape-1'
							/>
							<polyline
								className={cxBackgroundGrayStrokeNeutralFill('&', className)}
								id='Line-8'
								strokeWidth='3'
								strokeLinecap='square'
								points='2 260 218 212 435 185 653 103 870 45 1087 22'
							/>
							<path
								className={cxBackgroundGray('&', className)}
								d='M218,206 C221.313708,206 224,208.686292 224,212 C224,215.313708 221.313708,
                218 218,218 C214.686292,218 212,215.313708 212,212 C212,208.686292 214.686292,
                206 218,206 Z M435,179 C438.313708,179 441,181.686292 441,185 C441,188.313708 438.313708,
                191 435,191 C431.686292,191 429,188.313708 429,185 C429,181.686292 431.686292,179 435,
                179 Z M653,97 C656.313708,97 659,99.6862915 659,103 C659,106.313708 656.313708,109 653,109 C649.686292,109 647,
                106.313708 647,103 C647,99.6862915 649.686292,97 653,97 Z M870,39 C873.313708,39 876,41.6862915 876,45 C876,
                48.3137085 873.313708,51 870,51 C866.686292,51 864,48.3137085 864,45 C864,41.6862915 866.686292,
                39 870,39 Z M1087,16 C1090.31371,16 1093,18.6862915 1093,22 C1093,25.3137085 1090.31371,28 1087,28 C1083.68629,
                28 1081,25.3137085 1081,22 C1081,18.6862915 1083.68629,16 1087,16 Z'
								id='LineChartSkeleton-Combined-Shape-2'
							/>
						</g>
					</g>
				</g>
			</svg>
		</div>
	);
};

const LineChartLoadingSkeleton = (
	props: ILoadingSkeletonProps
): React.ReactElement => {
	return (
		<LoadingSkeleton
			data-test-id='loadingSkeleton-LineChartLoadingSkeleton'
			Skeleton={LineChartSkeleton}
			{...props}
		/>
	);
};

LineChartLoadingSkeleton.displayName = 'LineChartLoadingSkeleton';
LineChartLoadingSkeleton.peek = {
	description: `A loading indicator wrapper with optional overlay.`,
	notes: {
		overview: `
			A visual indication that a section or component of the interface is loading. Designed to indicate loading data
		`,
		intendedUse: `
			- Use in places where data takes time to load. LineChartLoadingSkeleton lets users know that the information they expect to see will appear shortly.		
		`,
		technicalRecommendations: `
			If a page is displaying a lot of data coming from multiple sources, try as best as possible to load the 
			individual parts of the UI, so as not to disrupt the user and block them from interacting with the entire page until all data is loaded.
		`,
	},
	categories: ['Loading Indicator'],
};

export default LineChartLoadingSkeleton;
