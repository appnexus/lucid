import _, { keys, forEach, includes } from 'lodash';
import React from 'react';
import { common } from '../../util/generic-tests';
import { mount, shallow } from 'enzyme';
import Resizer from './Resizer';

jest.mock('element-resize-detector', () => {
	return function () {
		return {
			listenTo: jest.fn((_element, handleResize) => {
				handleResize({
					offsetWidth: 50,
					offsetHeight: 100,
				});
			}),
			removeListener: jest.fn(),
		};
	};
});

describe('Resizer', () => {
	common(Resizer, {
		exemptFunctionProps: ['children'] as any,
		getDefaultProps: () => {
			return {
				children: () => <div />,
			};
		},
	});

	describe('render', () => {
		it('should call the correct function when unmounted', () => {
			const wrapper = mount(<Resizer>{_.noop as any}</Resizer>);

			const instance: any = wrapper.instance();
			expect(instance.resizeDetector.removeListener).not.toHaveBeenCalled();

			wrapper.unmount();
			expect(instance.resizeDetector.removeListener).toHaveBeenCalled();
		});
	});

	describe('props', () => {
		it('children should callback with width and height', () => {
			const children = jest.fn();
			mount(<Resizer>{children}</Resizer>);

			expect(children).toHaveBeenCalledWith(50, 100);
		});
	});

	describe('passThroughs', () => {
		let wrapper: any;

		beforeEach(() => {
			const props = {
				width: 100,
				height: 20,
				className: 'wut',
				children: (width, height) => (
					<div>
						<div>Width: {width}</div>
						<div>Height: {height}</div>
					</div>
				),
				style: { marginRight: 10 },
				initialState: { testData: true },
				callbackId: 1,
				'data-testid': 10,
			};
			wrapper = shallow(<Resizer {...props} />);
		});

		afterEach(() => {
			wrapper.unmount();
		});

		it('should pass through some props', () => {
			const rootProps = keys(wrapper.first().props());

			// className is omitted but appears because it is directly added to the element
			forEach(
				['data-testid', 'className', 'children', 'width', 'height', 'style'],
				(prop) => {
					expect(includes(rootProps, prop)).toBe(true);
				}
			);

			expect(wrapper.first().prop(['data-testid'])).toBe(10);
			expect(wrapper.first().prop(['width'])).toBe(100);
			expect(wrapper.first().prop(['height'])).toBe(20);
			expect(wrapper.first().prop(['className'])).toContain('wut');
			expect(wrapper.first().prop(['style'])).toMatchObject({
				marginRight: 10,
			});
		});
		it('should omit some props', () => {
			const rootProps = keys(wrapper.first().props());

			forEach(['initialState', 'callbackId'], (prop) => {
				expect(includes(rootProps, prop)).toBe(false);
			});
		});
	});
});
