import React from 'react';
import { shallow } from 'enzyme';
import ComplexTableLoadingSkeleton, {
	ComplexTableSkeleton,
} from './ComplexTableLoadingSkeleton';
import { ILoadingSkeletonProps, IStandardSkeleton } from './LoadingSkeleton';

describe('ComplexTableLoadingSkeleton', () => {
	it('should render ComplexTableLoadingSkeleton', () => {
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
		let component = shallow(<ComplexTableLoadingSkeleton {...testProps} />);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-ComplexTableLoadingSkeleton"]')
				.exists()
		).toEqual(true);

		component = shallow(<ComplexTableSkeleton {...standardSkeletonProps} />);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-ComplexTableSkeleton"]')
				.exists()
		).toEqual(true);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-ComplexTableSkeleton-svg"]')
				.exists()
		).toEqual(true);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-ComplexTableSkeleton-svg"]')
				.prop('width')
		).toEqual(testProps.width);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-ComplexTableSkeleton-svg"]')
				.prop('height')
		).toEqual(testProps.height);
	});
});
