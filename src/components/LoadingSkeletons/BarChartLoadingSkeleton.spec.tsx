import React from 'react';
import { shallow } from 'enzyme';
import BarChartLoadingSkeleton, {
	BarChartSkeleton,
} from './BarChartLoadingSkeleton';
import { ILoadingSkeletonProps, IStandardSkeleton } from './LoadingSkeleton';

describe('BarChartLoadingSkeleton', () => {
	it('should render BarChartLoadingSkeleton', () => {
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

		let component;
		const testProps = { ...props };
		component = shallow(<BarChartLoadingSkeleton {...testProps} />);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-BarChartLoadingSkeleton"]')
				.exists()
		).toEqual(true);

		component = shallow(<BarChartSkeleton {...standardSkeletonProps} />);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-BarChartSkeleton"]')
				.exists()
		).toEqual(true);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-BarChartSkeleton-svg"]')
				.exists()
		).toEqual(true);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-BarChartSkeleton-svg"]')
				.prop('width')
		).toEqual(testProps.width);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-BarChartSkeleton-svg"]')
				.prop('height')
		).toEqual(testProps.height);
	});
});
