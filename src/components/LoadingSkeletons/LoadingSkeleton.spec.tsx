import React from 'react';
import { shallow } from 'enzyme';
import LoadingSkeleton from './LoadingSkeleton';

describe('LoadingSkeleton.tsx', () => {
	const props: any = {
		isLoading: false,
		children: {},
		className: 'classNameTest',
		style: {},
		width: 100,
		height: 100,
		header: undefined,
		isPanel: false,
		hasOverlay: false,
		numRows: 1,
		numColumns: 1,
		Skeleton: {},
	};

	const fakeSkeleton = {};

	describe('isLoading === false', () => {
		const testProps = { ...props, isLoading: false };
		it('renders children only', () => {
			const component = shallow(<LoadingSkeleton {...testProps} />);
			expect(
				component.find('[data-test-id="loadingSkeleton-Children"]').exists()
			).toEqual(true);
		});

		it('passes className to children', () => {
			let testProps = { ...props, isLoading: false };
			const component = shallow(<LoadingSkeleton {...testProps} />);
			expect(
				component
					.find('[data-test-id="loadingSkeleton-Children"]')
					.prop('className')
			).toEqual('classNameTest');

			testProps = { ...props, className: 'component1ClassName' };
			const component1 = shallow(<LoadingSkeleton {...testProps} />);
			expect(
				component1
					.find('[data-test-id="loadingSkeleton-Children"]')
					.prop('className')
			).toEqual('component1ClassName');
		});
	});

	describe('isLoading === true, Skeleton is falsy', () => {
		describe('renders LoadingIndicator with overlay', () => {
			it('renders LoadingIndicator with overlay if hasOverlay is true', () => {
				const testProps = { ...props, hasOverlay: true };
				const component = shallow(
					<LoadingSkeleton
						{...testProps}
						isLoading={true}
						Skeleton={undefined}
					/>
				);
				expect(
					component.find('[data-test-id="loadingSkeleton-Children"]').exists()
				).toEqual(false);
				expect(
					component.find('[data-test-id="loadingSkeleton-Skeleton"]').exists()
				).toEqual(false);
				expect(
					component
						.find('[data-test-id="loadingSkeleton-LoadingIndicator"]')
						.exists()
				).toEqual(true);
				expect(
					component
						.find('[data-test-id="loadingSkeleton-LoadingIndicator"]')
						.prop('hasOverlay')
				).toEqual(true);
			});

			it('renders LoadingIndicator without overlay if hasOverlay is false', () => {
				const component = shallow(
					<LoadingSkeleton isLoading={true} hasOverlay={false} />
				);
				expect(
					component.find('[data-test-id="loadingSkeleton-Children"]').exists()
				).toEqual(false);
				expect(
					component.find('[data-test-id="loadingSkeleton-Skeleton"]').exists()
				).toEqual(false);
				expect(
					component
						.find('[data-test-id="loadingSkeleton-LoadingIndicator"]')
						.exists()
				).toEqual(true);
				expect(
					component
						.find('[data-test-id="loadingSkeleton-LoadingIndicator"]')
						.prop('hasOverlay')
				).toEqual(false);
			});
		});
	});

	describe('isLoading === true, Skeleton is truthy', () => {
		const testProps = { ...props, isLoading: true, Skeleton: fakeSkeleton };

		describe('Skeleton based on numRows and numColumns', () => {
			it('renders single Skeleton if  numRows: null, numColumns: null,', () => {
				const component = shallow(<LoadingSkeleton {...testProps} />);
				expect(
					component.find('[data-test-id="loadingSkeleton-Children"]').exists()
				).toEqual(false);
				expect(
					component
						.find('[data-test-id="loadingSkeleton-LoadingIndicator"]')
						.exists()
				).toEqual(false);
				expect(
					component.find('[data-test-id="loadingSkeleton-ReactPlaceholder"]')
						.length
				).toEqual(1);

				expect(
					component
						.find('[data-test-id="loadingSkeleton-ReactPlaceholder"]')
						.prop('className')
				).toEqual('lucid-LoadingSkeleton-animatedSkeleton ' + props.className);
			});

			it('renders single Skeleton if  numRows: 1, numColumns: 1,', () => {
				const testPropsRowsAndNumbers = {
					...testProps,
					numRows: 1,
					numColumns: 1,
				};
				const component = shallow(
					<LoadingSkeleton {...testPropsRowsAndNumbers} />
				);
				expect(
					component.find('[data-test-id="loadingSkeleton-Children"]').exists()
				).toEqual(false);
				expect(
					component
						.find('[data-test-id="loadingSkeleton-LoadingIndicator"]')
						.exists()
				).toEqual(false);
				expect(
					component.find('[data-test-id="loadingSkeleton-ReactPlaceholder"]')
						.length
				).toEqual(1);

				expect(
					component
						.find('[data-test-id="loadingSkeleton-ReactPlaceholder"]')
						.prop('className')
				).toEqual('lucid-LoadingSkeleton-animatedSkeleton ' + props.className);
			});

			it('renders Skeletons matrix', () => {
				const rows = Math.floor(Math.random() * 100 + 1);
				const columns = Math.floor(Math.random() * 100 + 1);

				const testPropsMatrix = {
					...testProps,
					numRows: rows,
					numColumns: columns,
				};

				const component = shallow(<LoadingSkeleton {...testPropsMatrix} />);
				expect(
					component.find('[data-test-id="loadingSkeleton-SkeletonColumn"]')
						.length
				).toEqual(columns);
				expect(
					component.find('[data-test-id="loadingSkeleton-ReactPlaceholder"]')
						.length
				).toEqual(columns * rows);
			});
		});

		describe('Skeleton use of Panel', () => {
			it('renders Panel if  isPanel is true', () => {
				const testPropsPanel = {
					...testProps,
					numRows: 1,
					numColumns: 1,
					isPanel: true,
				};

				const component = shallow(<LoadingSkeleton {...testPropsPanel} />);
				expect(
					component.find('[data-test-id="loadingSkeleton-ReactPlaceholder"]')
						.length
				).toEqual(1);
				expect(
					component.find('[data-test-id="loadingSkeleton-Panel"]').length
				).toEqual(1);
			});

			it('does not render Panel if  isPanel is false', () => {
				const testPropsPanel = {
					...testProps,
					numRows: 1,
					numColumns: 1,
					isPanel: false,
				};

				const component = shallow(<LoadingSkeleton {...testPropsPanel} />);
				expect(
					component.find('[data-test-id="loadingSkeleton-ReactPlaceholder"]')
						.length
				).toEqual(1);
				expect(
					component.find('[data-test-id="loadingSkeleton-Panel"]').length
				).toEqual(0);
			});
		});
	});
});
