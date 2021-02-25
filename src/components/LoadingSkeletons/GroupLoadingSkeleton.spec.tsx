import React from 'react';
import { shallow } from 'enzyme';
import GroupLoadingSkeleton, { GroupSkeleton } from './GroupLoadingSkeleton';
import { ILoadingSkeletonProps, IStandardSkeleton } from './LoadingSkeleton';

describe('GroupLoadingSkeleton', () => {
	it('should render GroupLoadingSkeleton', () => {
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
		let component = shallow(<GroupLoadingSkeleton {...testProps} />);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-GroupLoadingSkeleton"]')
				.exists()
		).toEqual(true);

		component = shallow(<GroupSkeleton {...standardSkeletonProps} />);

		expect(
			component.find('[data-test-id="loadingSkeleton-GroupSkeleton"]').exists()
		).toEqual(true);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-GroupSkeleton-svg"]')
				.exists()
		).toEqual(true);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-GroupSkeleton-svg"]')
				.prop('width')
		).toEqual(testProps.width);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-GroupSkeleton-svg"]')
				.prop('height')
		).toEqual(testProps.height);
	});
});
