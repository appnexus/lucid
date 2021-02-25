import React from 'react';
import { shallow } from 'enzyme';
import CardLoadingSkeleton, { CardSkeleton } from './CardLoadingSkeleton';
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
		let component = shallow(<CardLoadingSkeleton {...testProps} />);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-CardLoadingSkeleton"]')
				.exists()
		).toEqual(true);

		component = shallow(<CardSkeleton {...standardSkeletonProps} />);

		expect(
			component.find('[data-test-id="loadingSkeleton-CardSkeleton"]').exists()
		).toEqual(true);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-CardSkeleton-svg"]')
				.exists()
		).toEqual(true);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-CardSkeleton-svg"]')
				.prop('width')
		).toEqual(testProps.width);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-CardSkeleton-svg"]')
				.prop('height')
		).toEqual(testProps.height);
	});
});
