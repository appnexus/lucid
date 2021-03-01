import React from 'react';
import { shallow } from 'enzyme';
import SimpleTableLoadingSkeleton, {
	SimpleTableSkeleton,
} from './SimpleTableLoadingSkeleton';
import { ILoadingSkeletonProps, IStandardSkeleton } from './LoadingSkeleton';

describe('SimpleTableLoadingSkeleton', () => {
	it('should render SimpleTableLoadingSkeleton', () => {
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
		let component = shallow(<SimpleTableLoadingSkeleton {...testProps} />);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-SimpleTableLoadingSkeleton"]')
				.exists()
		).toEqual(true);

		component = shallow(<SimpleTableSkeleton {...standardSkeletonProps} />);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-SimpleTableSkeleton"]')
				.exists()
		).toEqual(true);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-SimpleTableSkeleton-svg"]')
				.exists()
		).toEqual(true);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-SimpleTableSkeleton-svg"]')
				.prop('width')
		).toEqual(testProps.width);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-SimpleTableSkeleton-svg"]')
				.prop('height')
		).toEqual(testProps.height);
	});
});
