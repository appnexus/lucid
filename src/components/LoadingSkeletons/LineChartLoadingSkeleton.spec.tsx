import React from 'react';
import { shallow } from 'enzyme';
import LineChartLoadingSkeleton, {
	LineChartSkeleton,
} from './LineChartLoadingSkeleton';
import { ILoadingSkeletonProps, IStandardSkeleton } from './LoadingSkeleton';

describe('', () => {
	it('should render LineChartLoadingSkeleton', () => {
		const standardSkeletonProps: IStandardSkeleton = {
			width: 100,
			height: 100,
			className: 'className',
		};

		const props: ILoadingSkeletonProps = {
			...standardSkeletonProps,
			isLoading: false,
			children: {},
			style: {},
			isPanel: false,
			hasOverlay: false,
			numRows: 1,
			numColumns: 1,
			Skeleton: undefined,
		};

		const testProps = { ...props };
		let component = shallow(<LineChartLoadingSkeleton {...testProps} />);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-LineChartLoadingSkeleton"]')
				.exists()
		).toEqual(true);

		component = shallow(<LineChartSkeleton {...standardSkeletonProps} />);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-LineChartSkeleton"]')
				.exists()
		).toEqual(true);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-LineChartSkeleton-svg"]')
				.exists()
		).toEqual(true);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-LineChartSkeleton-svg"]')
				.prop('width')
		).toEqual(testProps.width);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-LineChartSkeleton-svg"]')
				.prop('height')
		).toEqual(testProps.height);
	});
});
