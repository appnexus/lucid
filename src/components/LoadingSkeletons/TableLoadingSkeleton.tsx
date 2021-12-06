import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import LoadingSkeleton, {
	ILoadingSkeletonProps,
	IStandardSkeleton,
} from './LoadingSkeleton';

export interface ITableRow {
	id?: string;
	transform?: string;
	width?: number | string;
}

const backgroundGray = lucidClassNames.bind('&-LoadingSkeleton-backgroundGray');

const backgroundNeutral = lucidClassNames.bind(
	'&-LoadingSkeleton-backgroundNeutral'
);

export const TableRowGroup = (props: ITableRow): React.ReactElement => {
	const { id, transform, width = '100%' } = props;

	return (
		<g id={id} transform={transform}>
			<rect
				id='BG'
				className={backgroundNeutral('&')}
				x='0'
				y='0'
				width={width}
				height='31'
			/>
			<rect
				id='Bottom-Line'
				className={backgroundGray('&')}
				x='0'
				y='30'
				width={width}
				height='1'
			/>
		</g>
	);
};

export const TableSkeleton = (props: IStandardSkeleton): React.ReactElement => {
	const { width = 800, height = 320, className } = props;

	return (
		<div
			data-test-id='loadingSkeleton-TableSkeleton'
			style={{ display: 'inline-block', width: width, height: height }}
		>
			<svg
				data-test-id='loadingSkeleton-TableSkeleton-svg'
				width={width}
				height={height}
				xmlns='http://www.w3.org/2000/svg'
			>
				<g
					id='TableSkeleton-Details'
					stroke='none'
					strokeWidth='1'
					fill='none'
					fillRule='evenodd'
				>
					<g
						id='TableSkeleton-Tab_Skeleton'
						transform='translate(-31.000000, -3554.000000)'
					>
						<g
							id='TableSkeleton-Group-1'
							transform='translate(30.000000, 3491.000000)'
						>
							<g
								id='TableSkeleton-Group-2'
								transform='translate(1.000000, 63.000000)'
							>
								<TableRowGroup
									transform='translate(0.000000, 31.000000)'
									width={width}
								/>

								<TableRowGroup
									transform='translate(0.000000, 62.000000)'
									width={width}
								/>

								<TableRowGroup
									transform='translate(0.000000, 93.000000)'
									width={width}
								/>

								<TableRowGroup
									transform='translate(0.000000, 124.000000)'
									width={width}
								/>

								<TableRowGroup
									transform='translate(0.000000, 155.000000)'
									width={width}
								/>

								<TableRowGroup
									transform='translate(0.000000, 186.000000)'
									width={width}
								/>

								<TableRowGroup
									transform='translate(0.000000, 217.000000)'
									width={width}
								/>

								<TableRowGroup
									transform='translate(0.000000, 248.000000)'
									width={width}
								/>

								<TableRowGroup
									transform='translate(0.000000, 279.000000)'
									width={width}
								/>

								<TableRowGroup id='Table-Row-/-Header-White' width={width} />

								<path
									className={backgroundGray('&', className)}
									d='M120,289 L120,299 L20,299 L20,289 L120,289 Z M330,289 L330,299 L230,299 L230,289 L330,
                  289 Z M540,289 L540,299 L440,299 L440,289 L540,289 Z M750,289 L750,299 L650,299 L650,289 L750,
                  289 Z M960,289 L960,299 L860,299 L860,289 L960,289 Z M1170,289 L1170,299 L1070,299 L1070,
                  289 L1170,289 Z M350,259 L350,269 L230,269 L230,259 L350,259 Z M980,259 L980,269 L860,269 L860,
                  259 L980,259 Z M560,259 L560,269 L440,269 L440,259 L560,259 Z M1190,259 L1190,269 L1070,269 L1070,
                  259 L1190,259 Z M770,259 L770,269 L650,269 L650,259 L770,259 Z M140,258 L140,268 L20,268 L20,
                  258 L140,258 Z M330,228 L330,238 L230,238 L230,228 L330,228 Z M540,228 L540,238 L440,238 L440,
                  228 L540,228 Z M750,228 L750,238 L650,238 L650,228 L750,228 Z M960,228 L960,238 L860,238 L860,
                  228 L960,228 Z M1170,228 L1170,238 L1070,238 L1070,228 L1170,228 Z M120,227 L120,237 L20,237 L20,
                  227 L120,227 Z M140,195 L140,205 L20,205 L20,195 L140,195 Z M350,195 L350,205 L230,205 L230,195 L350,
                  195 Z M560,195 L560,205 L440,205 L440,195 L560,195 Z M770,195 L770,205 L650,205 L650,195 L770,195 Z M980,
                  195 L980,205 L860,205 L860,195 L980,195 Z M1190,195 L1190,205 L1070,205 L1070,195 L1190,195 Z M120,
                  165 L120,175 L20,175 L20,165 L120,165 Z M330,165 L330,175 L230,175 L230,165 L330,165 Z M540,165 L540,
                  175 L440,175 L440,165 L540,165 Z M750,165 L750,175 L650,175 L650,165 L750,165 Z M960,165 L960,175 L860,
                  175 L860,165 L960,165 Z M1170,165 L1170,175 L1070,175 L1070,165 L1170,165 Z M140,134 L140,144 L20,144 L20,134 L140,
                  134 Z M770,134 L770,144 L650,144 L650,134 L770,134 Z M350,134 L350,144 L230,144 L230,134 L350,134 Z M560,
                  134 L560,144 L440,144 L440,134 L560,134 Z M980,134 L980,144 L860,144 L860,134 L980,134 Z M1190,134 L1190,
                  144 L1070,144 L1070,134 L1190,134 Z M120,103 L120,113 L20,113 L20,103 L120,103 Z M330,103 L330,113 L230,
                  113 L230,103 L330,103 Z M960,103 L960,113 L860,113 L860,103 L960,103 Z M1170,103 L1170,113 L1070,113 L1070,
                  103 L1170,103 Z M540,103 L540,113 L440,113 L440,103 L540,103 Z M750,103 L750,113 L650,113 L650,103 L750,
                  103 Z M139,71 L139,81 L20,81 L20,71 L139,71 Z M559,71 L559,81 L440,81 L440,71 L559,71 Z M769,71 L769,
                  81 L650,81 L650,71 L769,71 Z M979,71 L979,81 L860,81 L860,71 L979,71 Z M1189,71 L1189,81 L1070,81 L1070,
                  71 L1189,71 Z M349,71 L349,81 L230,81 L230,71 L349,71 Z M120,41 L120,51 L20,51 L20,41 L120,41 Z M330,
                  41 L330,51 L230,51 L230,41 L330,41 Z M540,41 L540,51 L440,51 L440,41 L540,41 Z M750,41 L750,51 L650,51 L650,
                  41 L750,41 Z M960,41 L960,51 L860,51 L860,41 L960,41 Z M1170,41 L1170,51 L1070,51 L1070,41 L1170,41 Z M140,
                  10 L140,20 L20,20 L20,10 L140,10 Z M350,10 L350,20 L230,20 L230,10 L350,10 Z M560,10 L560,20 L440,20 L440,
                  10 L560,10 Z M770,10 L770,20 L650,20 L650,10 L770,10 Z M980,10 L980,20 L860,20 L860,10 L980,10 Z M1190,10 L1190,
                  20 L1070,20 L1070,10 L1190,10 Z'
									id='TableSkeleton-Combined-Shape'
								/>
							</g>
						</g>
					</g>
				</g>
			</svg>
		</div>
	);
};

export const TableLoadingSkeleton = (
	props: ILoadingSkeletonProps
): React.ReactElement => {
	return (
		<LoadingSkeleton
			data-test-id='loadingSkeleton-TableLoadingSkeleton'
			Skeleton={TableSkeleton}
			{...props}
		/>
	);
};

TableLoadingSkeleton.displayName = 'TableLoadingSkeleton';
TableLoadingSkeleton.peek = {
	description: `A loading indicator wrapper with optional overlay.`,
	notes: {
		overview: `
			A visual indication that a section or component of the interface is loading. Designed to indicate loading table of data
		`,
		intendedUse: `
			- Use in places where data takes time to load. TableLoadingSkeleton lets users know that the information they expect to see will appear shortly.		
		`,
		technicalRecommendations: `
			If a page is displaying a lot of data coming from multiple sources, try as best as possible to load the individual parts of the UI, so as not to disrupt the user and block them from interacting with the entire page until all data is loaded.
		`,
	},
	categories: ['Loading Indicator'],
};

export default TableLoadingSkeleton;
