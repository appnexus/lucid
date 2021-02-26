import React from 'react';
import { shallow } from 'enzyme';

import SmallBarChartLoadingSkeleton, {
	SmallBarChartSkeleton,
} from './SmallBarChartLoadingSkeleton';
import { ILoadingSkeletonProps, IStandardSkeleton } from './LoadingSkeleton';

describe('', () => {
	it('should render SmallBarChartLoadingSkeleton', () => {
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
		let component = shallow(<SmallBarChartLoadingSkeleton {...testProps} />);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-SmallBarChartLoadingSkeleton"]')
				.exists()
		).toEqual(true);

		component = shallow(<SmallBarChartSkeleton {...standardSkeletonProps} />);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-SmallBarChartSkeleton"]')
				.exists()
		).toEqual(true);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-SmallBarChartSkeleton-svg"]')
				.exists()
		).toEqual(true);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-SmallBarChartSkeleton-svg"]')
				.prop('width')
		).toEqual(testProps.width);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-SmallBarChartSkeleton-svg"]')
				.prop('height')
		).toEqual(testProps.height);
	});
});
