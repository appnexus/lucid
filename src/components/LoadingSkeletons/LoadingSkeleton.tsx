import React, { FunctionComponent } from 'react';
import ReactPlaceholder from 'react-placeholder';
import CSS from 'csstype';
import _ from 'lodash';
import { StandardProps } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import Panel from '../Panel/Panel';

export interface IStandardSkeleton extends StandardProps {
	/** Displays LoadingSkeleton custom header. */
	header?: React.ReactNode;
	/** LoadingSkeleton height. */
	height?: number | string;
	/** LoadingSkeleton width. */
	width?: number | string;
	className?: string;
}

export interface ILoadingSkeletonProps extends IStandardSkeleton {
	/** Allows custom skeleton to be injected. */
	Skeleton?: FunctionComponent<IStandardSkeleton>;
	/** Controls the visibility of the `LoadingSkeleton`. */
	isLoading: boolean;
	children?: React.ReactNode;
	style?: CSS.Properties;
	/** Controls if LoadingSkeleton is wrapped in Panel. */
	isPanel?: boolean;
	/** Controls if built-in LoadingIndicator has overlay. Does not apply to other skeletons */
	hasOverlay?: boolean;
	/** Style variations for the overlay behind the loading indicator for built-in LoadingIndicator. Does not apply to other skeletons */

	overlayKind?: 'light' | 'dark';

	/** Controls if LoadingSkeleton replicated in number of rows. Default = 1. */
	numRows?: number;
	/** Controls if LoadingSkeleton replicated in number of columns. Default = 1. */
	numColumns?: number;

	addBorder?: boolean;
}

const animationStyle = lucidClassNames.bind(
	'&-LoadingSkeleton-animatedSkeleton'
);

export const LoadingSkeleton = (
	props: ILoadingSkeletonProps
): React.ReactElement => {
	const {
		Skeleton,
		addBorder = false,
		isLoading,
		children,
		className,
		style,
		width = '100%',
		height = '100%',
		header,
		isPanel = false,
		hasOverlay = false,
		overlayKind,
		numRows = 1,
		numColumns = 1,
	} = { ...props };

	if (!isLoading) {
		return (
			<div className={className} data-test-id='loadingSkeleton-Children'>
				{children}
			</div>
		);
	}

	if (!Skeleton) {
		return (
			<LoadingIndicator
				data-test-id='loadingSkeleton-LoadingIndicator'
				isLoading
				isVisible
				hasOverlay={hasOverlay}
				overlayKind={overlayKind}
			/>
		);
	}

	const skeletonProps = { ...style, width, height, display: 'flex' };
	const skeletonPlaceholder = (
		<Skeleton data-test-id='loadingSkeleton_Skeleton' {...skeletonProps} />
	);

	const border = addBorder ? '2px solid #f4f2f2' : '';

	const matrix = _.times(numColumns, column => (
		<div
			key={`column${column}`}
			style={{ display: 'inline-block' }}
			data-test-id='loadingSkeleton-SkeletonColumn'
		>
			{_.times(numRows, row => (
				<div
					className={animationStyle('&', className)}
					data-test-id='loadingSkeleton-ReactPlaceholder'
					key={`row${row}`}
					style={{ margin: 2, padding: 2, border: border }}
				>
					<ReactPlaceholder
						showLoadingAnimation={true}
						ready={!isLoading}
						customPlaceholder={skeletonPlaceholder}
					>
						{}
					</ReactPlaceholder>
				</div>
			))}
		</div>
	));

	const skeleton = (
		<div style={{ marginBottom: 5, marginTop: 5 }}>
			<div
				data-test-id='loadingSkeleton-SkeletonHeader'
				style={{ marginBottom: 5, visibility: 'visible' }}
			>
				{header}
			</div>
			<div>{matrix}</div>
		</div>
	);

	return isPanel ? (
		<Panel data-test-id='loadingSkeleton-Panel'>{skeleton}</Panel>
	) : (
		skeleton
	);
};

export default React.memo(LoadingSkeleton);
