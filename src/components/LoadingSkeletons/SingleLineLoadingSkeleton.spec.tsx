import React from 'react';
import { shallow } from 'enzyme';
import SingleLineLoadingSkeleton, {
	SingleLineSkeleton,
} from './SingleLineLoadingSkeleton';
import { ILoadingSkeletonProps, IStandardSkeleton } from './LoadingSkeleton';

describe('', () => {
	it('should render SingleLineLoadingSkeleton', () => {
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
		let component = shallow(<SingleLineLoadingSkeleton {...testProps} />);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-SingleLineLoadingSkeleton"]')
				.exists()
		).toEqual(true);

		component = shallow(<SingleLineSkeleton {...standardSkeletonProps} />);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-SingleLineSkeleton"]')
				.exists()
		).toEqual(true);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-SingleLineSkeleton-svg"]')
				.exists()
		).toEqual(true);

		expect(
			component
				.find('[data-test-id="loadingSkeleton-SingleLineSkeleton-svg"]')
				.prop('width')
		).toEqual(testProps.width);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-SingleLineSkeleton-svg"]')
				.prop('height')
		).toEqual(testProps.height);
	});
});
