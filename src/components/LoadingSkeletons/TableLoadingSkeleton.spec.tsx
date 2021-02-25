import React from 'react';
import { shallow } from 'enzyme';
import TableLoadingSkeleton, { TableSkeleton } from './TableLoadingSkeleton';

describe('TableLoadingSkeleton', () => {
	it('should render TableLoadingSkeleton', () => {
		const standardSkeletonProps = {
			width: 100,
			height: 100,
			header: 'header',
			className: 'className',
		};

		const props = {
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

		component = shallow(<TableLoadingSkeleton {...testProps} />);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-TableLoadingSkeleton"]')
				.exists()
		).toEqual(true);

		component = shallow(<TableSkeleton {...standardSkeletonProps} />);

		expect(
			component.find('[data-test-id="loadingSkeleton-TableSkeleton"]').exists()
		).toEqual(true);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-TableSkeleton-svg"]')
				.exists()
		).toEqual(true);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-TableSkeleton-svg"]')
				.prop('width')
		).toEqual(testProps.width);
		expect(
			component
				.find('[data-test-id="loadingSkeleton-TableSkeleton-svg"]')
				.prop('height')
		).toEqual(testProps.height);
	});
});
