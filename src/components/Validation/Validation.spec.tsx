import _, { forEach, has, noop } from 'lodash';
import React from 'react';
import assert from 'assert';

import { common } from '../../util/generic-tests';
import { shallow } from 'enzyme';
import Validation from './Validation';
import TextField from '../TextField/TextField';

describe('Validation', () => {
	common(Validation, {
		getDefaultProps: () => ({
			children: <span>foo</span>,
		}),
	});

	describe('render', () => {
		it('should render children', () => {
			const content = <div>foo</div>;
			const wrapper = shallow(<Validation>{content}</Validation>);
			assert(wrapper.children().first().equals(content));
		});
	});

	describe('props', () => {
		describe('Error', () => {
			let wrapper: any;

			beforeEach(
				() =>
					(wrapper = shallow(
						<Validation Error='error'>
							<div>foo</div>
						</Validation>
					))
			);

			it('should add error class', () => {
				assert(wrapper.hasClass('lucid-Validation-is-error'));
			});

			it('should add error content', () => {
				assert.equal(
					wrapper.find('.lucid-Validation-error-content').text(),
					'error'
				);
			});
		});

		describe('null Error', () => {
			let wrapper: any;

			beforeEach(
				() =>
					(wrapper = shallow(
						<Validation Error={null}>
							<div>foo</div>
						</Validation>
					))
			);

			it('should not add error class', () => {
				assert(!wrapper.hasClass('lucid-Validation-is-error'));
			});

			it('should not add error content', () => {
				assert.equal(wrapper.find('.lucid-Validation-error-content').length, 0);
			});
		});

		describe('child components', () => {
			describe('Error', () => {
				it('should render an error', () => {
					const wrapper = shallow(
						<Validation>
							<Validation.Error>foo</Validation.Error>
							Content
						</Validation>
					);

					assert.equal(
						wrapper.find('.lucid-Validation-error-content').text(),
						'foo'
					);
				});
			});
		});

		describe('pass throughs for root div component', () => {
			let wrapper: any;

			const className = 'wut';

			beforeEach(() => {
				const props = {
					Error: <span>'test error'</span>,
					children: <TextField value='Text Field Text' />,
					className,
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = shallow(<Validation {...props} />);
			});

			afterEach(() => {
				wrapper.unmount();
			});

			it('passes through props not defined in `propTypes` to the root element.', () => {
				const rootProps = wrapper.find('.lucid-Validation').props();

				expect(wrapper.first().prop(['className'])).toContain(className);
				expect(wrapper.first().prop(['style'])).toMatchObject({
					marginRight: 10,
				});
				expect(wrapper.first().prop(['data-testid'])).toBe(10);

				// 'className' is plucked from the pass through object
				// but still appears becuase is is are also directly passed on the root element as a prop
				forEach(['className', 'data-testid', 'style', 'children'], (prop) => {
					expect(has(rootProps, prop)).toBe(true);
				});
			});
			it('omits the component specific props defined in `propTypes` (plus, in addition, `initialState`, and `callbackId`) from the root element', () => {
				const rootProps = wrapper.find('.lucid-Validation').props();

				forEach(['Error', 'initialState', 'callbackId'], (prop) => {
					expect(has(rootProps, prop)).toBe(false);
				});
			});
		});
	});
});
