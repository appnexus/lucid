import _, { forEach, has, noop } from 'lodash';
import React from 'react';
import assert from 'assert';
import { mount, shallow } from 'enzyme';

import Portal from './Portal';

describe('Portal', () => {
	describe('props', () => {
		describe('portalId', () => {
			it('should set the id of the portal DOM element portalId', () => {
				const wrapper = mount(<Portal portalId='test1234' />);

				assert(document.getElementById('test1234'));
				wrapper.unmount();
			});
		});

		describe('data-test-id', () => {
			it('should set the data-test-id of the portal DOM element portalId', () => {
				const wrapper = shallow(<Portal className='test-classname' />);
				expect(
					wrapper.find('[data-test-id="test-classname"]').exists()
				).toEqual(true);
			});
		});

		describe('children', () => {
			it('should pass thru children', () => {
				const wrapper = mount(
					<Portal portalId='test1234'>
						<button>test</button>
					</Portal>
				);

				assert(
					(document as any).getElementById('test1234').querySelector('button')
				);

				wrapper.unmount();
			});
		});

		describe('pass throughs', () => {
			let wrapper: any;

			const className = 'wut';

			beforeEach(() => {
				const props = {
					portalId: 'example-portal123',
					'data-test-id': className,
					onClick: noop,
					className,
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = shallow(<Portal {...props} />);
			});

			afterEach(() => {
				wrapper.unmount();
			});

			it('passes through props not defined in `propTypes` to the root element.', () => {
				const rootProps = wrapper.find('.lucid-Portal').props();

				expect(wrapper.find('.lucid-Portal').prop(['className'])).toContain(
					className
				);
				expect(wrapper.find('.lucid-Portal').prop(['style'])).toMatchObject({
					marginRight: 10,
				});
				expect(wrapper.find('.lucid-Portal').prop(['data-testid'])).toBe(10);
				expect(wrapper.find('.lucid-Portal').prop(['data-test-id'])).toBe(
					className
				);

				// 'className' is plucked from the pass through object
				// but still appears becuase is is are also directly passed on the root element as a prop
				forEach(
					['className', 'data-test-id', 'data-testid', 'style', 'children'],
					(prop) => {
						expect(has(rootProps, prop)).toBe(true);
					}
				);
			});
			it('omits the props defined in `propTypes` (plus, in addition, `initialState`, and `callbackId`) from the root element', () => {
				const rootProps = wrapper.find('.lucid-Portal').props();
				forEach(['portalId', 'initialState', 'callbackId'], (prop) => {
					expect(has(rootProps, prop)).toBe(false);
				});
			});
		});
	});

	it('removes itself on unmount', () => {
		const wrapper = mount(<Portal portalId='unmount-test' />);
		expect(document.getElementById('unmount-test')).toBeTruthy();
		wrapper.unmount();
		expect(document.getElementById('unmount-test')).toBeNull();
	});
});
