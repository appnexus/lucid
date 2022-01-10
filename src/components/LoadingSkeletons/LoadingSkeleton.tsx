import React, { CSSProperties, FunctionComponent } from 'react';
import ReactPlaceholder from 'react-placeholder';
import CSS from 'csstype';
import _ from 'lodash';
import { StandardProps } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import Panel from '../Panel/Panel';

export interface IStandardSkeleton extends StandardProps {
	className?: string;
	/** LoadingSkeleton height. */
	height?: number | string;
	/** LoadingSkeleton width. */
	width?: number | string;
}

export interface ILoadingSkeletonProps extends IStandardSkeleton {
	/** Allows custom skeleton to be injected. */
	Skeleton?: FunctionComponent<IStandardSkeleton>;
	/** Controls the visibility of the `LoadingSkeleton`. */
	isLoading: boolean;
	/** Children controls wrapped by skeleton. */
	children?: React.ReactNode;
	/** Displays LoadingSkeleton custom header. */
	header?: React.ReactNode;

	style?: CSSProperties;
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

	marginBottom?: string | number | undefined;
	marginTop?: string | number | undefined;
	marginLeft?: string | number | undefined;
	marginRight?: string | number | undefined;
}

const animationStyle = lucidClassNames.bind(
	'&-LoadingSkeleton-animatedSkeleton'
);

export const LoadingSkeleton: FunctionComponent<ILoadingSkeletonProps> = (
	props
) => {
	const {
		Skeleton,
		isLoading,
		children,
		className,
		header,
		style,
		width = undefined,
		height = undefined,
		isPanel = false,
		hasOverlay = false,
		overlayKind = 'light',
		numRows = 1,
		numColumns = 1,
		marginTop = 2,
		marginBottom = 2,
		marginRight = 2,
		marginLeft = 2,
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

	const matrix = _.times(numColumns, (column) => (
		<div
			key={`column${column}`}
			style={{
				display: 'inline-block',
				marginRight: marginRight,
				marginLeft: marginLeft,
			}}
			data-test-id='loadingSkeleton-SkeletonColumn'
		>
			<div
				style={{
					display: 'inline-block',
				}}
			>
				{_.times(numRows, (row) => (
					<div
						className={animationStyle('&', className)}
						data-test-id='loadingSkeleton-ReactPlaceholder'
						key={`row${row}`}
						style={{
							marginTop: marginTop,
							marginBottom: marginBottom,
						}}
					>
						<div>
							{header ? (
								<div
									data-test-id='loadingSkeleton-SkeletonHeader'
									style={{
										marginBottom: 2,
									}}
								>
									{header}
								</div>
							) : null}
							<ReactPlaceholder
								showLoadingAnimation={true}
								ready={!isLoading}
								customPlaceholder={skeletonPlaceholder}
							>
								{}
							</ReactPlaceholder>
						</div>
					</div>
				))}
			</div>
		</div>
	));

	const skeletonMatrix = <div>{matrix}</div>;

	return isPanel ? (
		<Panel data-test-id='loadingSkeleton-Panel'>{skeletonMatrix}</Panel>
	) : (
		skeletonMatrix
	);
};

export default LoadingSkeleton;
