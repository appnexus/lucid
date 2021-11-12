import React from 'react';
import { cxBackgroundGray } from './LoadingSkeletonsSvgUtil';
import LoadingSkeleton, {
	ILoadingSkeletonProps,
	IStandardSkeleton,
} from './LoadingSkeleton';

export const BarChartSkeleton = (
	props: IStandardSkeleton
): React.ReactElement => {
	const { width = 880, height = 350, className } = props;

	return (
		<div
			data-test-id='loadingSkeleton-BarChartSkeleton'
			className={cxBackgroundGray('&', className)}
		>
			<svg
				data-test-id='loadingSkeleton-BarChartSkeleton-svg'
				width={width}
				height={height}
				version='1.1'
			>
				<g
					id='BarChartSkeleton-Details'
					stroke='none'
					strokeWidth='1'
					fill='none'
					fillRule='evenodd'
				>
					<g
						id='BarChartSkeleton-DM'
						transform='translate(-93.000000, -723.000000)'
					>
						<g
							id='BarChartSkeleton-Chart'
							transform='translate(93.000000, 723.000000)'
						>
							<path
								className={cxBackgroundGray('&', className)}
								d='M54,59 L54,339 L21,339 L21,59 L54,59 Z M517,19 L517,339 L485,339 L485,19 L517,19 Z M105,19
                L105,339 L72,339 L72,19 L105,19 Z M620,19 L620,339 L587,339 L587,19 L620,19 Z M157,113 L157,339 L124,339 L124,
                113 L157,113 Z M569,113 L569,339 L536,339 L536,113 L569,113 Z M467,59 L467,339 L435,339 L435,59 L467,
                59 Z M260,59 L260,339 L226,339 L226,59 L260,59 Z M314,19 L314,339 L278,339 L278,19 L314,19 Z M366,
                113 L366,339 L333,339 L333,113 L366,113 Z M417,19 L417,339 L384,339 L384,19 L417,19 Z M208,19 L208,
                339 L175,339 L175,19 L208,19 Z M672,59 L672,339 L638,339 L638,59 L672,59 Z M723,19 L723,339 L690,339 L690,
                19 L723,19 Z M775,113 L775,339 L742,339 L742,113 L775,113 Z M1082,59 L1082,339 L1048,339 L1048,59 L1082,
                59 Z M876,59 L876,339 L844,339 L844,59 L876,59 Z M926,19 L926,339 L894,339 L894,19 L926,
                19 Z M978,113 L978,339 L945,339 L945,113 L978,113 Z M1030,19 L1030,339 L996,339 L996,19 L1030,
                19 Z M826,19 L826,339 L793,339 L793,19 L826,19 Z'
								id='Combined-Shape'
							/>
							<path
								className={cxBackgroundGray('&', className)}
								d='M0,340 L0,0 L1,0 L1,339 L1130,339 L1130,340 L0,340 Z'
								id='BarChartSkeleton-Combined-Shape'
							/>
						</g>
					</g>
				</g>
			</svg>
		</div>
	);
};

export const BarChartLoadingSkeleton = (
	props: ILoadingSkeletonProps
): React.ReactElement => {
	return (
		<LoadingSkeleton
			data-test-id='loadingSkeleton-BarChartLoadingSkeleton'
			Skeleton={BarChartSkeleton}
			{...props}
		/>
	);
};

BarChartLoadingSkeleton.displayName = 'BarChartLoadingSkeleton';
BarChartLoadingSkeleton.peek = {
	description: `A loading indicator wrapper with optional overlay.`,
	notes: {
		overview: `
			A visual indication that a section or component of the interface is loading. Designed to indicate loading Bar Chart of data
		`,
		intendedUse: `
			- Use in places where data takes time to load. BarChartLoadingSkeleton lets users know that the information they expect to see will appear shortly.		
		`,
		technicalRecommendations: `
			If a page is displaying a lot of data coming from multiple sources, try as best as possible to load the individual parts of the UI, so as not to disrupt the user and block them from interacting with the entire page until all data is loaded.
		`,
	},
	categories: ['Loading Indicator'],
};

export default BarChartLoadingSkeleton;
