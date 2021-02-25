import React from 'react';
import { shallow } from 'enzyme';
import HeaderLoadingSkeleton, { HeaderSkeleton } from './HeaderLoadingSkeleton';
import { ILoadingSkeletonProps, IStandardSkeleton } from './LoadingSkeleton';

describe('', () => {
	it('should render CardLoadingSkeleton', () => {
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
		let component = shallow(<HeaderLoadingSkeleton {...testProps} />);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-HeaderLoadingSkeleton"]')
				.exists()
		).toEqual(true);

		component = shallow(<HeaderSkeleton {...standardSkeletonProps} />);

		expect(
			component.find('[data-test-id="loadingSkeleton-HeaderSkeleton"]').exists()
		).toEqual(true);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-HeaderSkeleton-svg"]')
				.exists()
		).toEqual(true);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-HeaderSkeleton-svg"]')
				.prop('width')
		).toEqual(testProps.width);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-HeaderSkeleton-svg"]')
				.prop('height')
		).toEqual(testProps.height);
	});
});
