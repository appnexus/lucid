import _, { forEach, has } from 'lodash';
import assert from 'assert';
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { mount, shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import SwitchLabeled from './SwitchLabeled';
import Switch from '../Switch/Switch';

describe('SwitchLabeled', () => {
	common(SwitchLabeled);

	describe('props', () => {
		describe('isDisabled', () => {
			it('passes the value through to its `Switch` instance.', () => {
				const wrapper = shallow(<SwitchLabeled isDisabled={true} />);

				assert.equal(wrapper.find(Switch).prop('isDisabled'), true);
			});

			it('defaults to `false`.', () => {
				const wrapper = mount(<SwitchLabeled />);

				assert.equal(wrapper.prop('isDisabled'), false);
			});
		});

		describe('isSelected', () => {
			it('passes the value through to its `Switch` instance.', () => {
				const wrapper = shallow(<SwitchLabeled isSelected={true} />);

				assert.equal(wrapper.find(Switch).prop('isSelected'), true);
			});

			it('defaults to `false`.', () => {
				const wrapper = mount(<SwitchLabeled />);

				assert.equal(wrapper.prop('isSelected'), false);
			});
		});

		describe('onSelect', () => {
			it('passes the value through to its `Switch` instance.', () => {
				const foo = () => null;
				const wrapper = shallow(<SwitchLabeled onSelect={foo} />);

				assert.equal(wrapper.find(Switch).prop('onSelect'), foo);
			});

			it('defaults to the Lodash `noop` method.', () => {
				const wrapper = mount(<SwitchLabeled />);

				assert.equal(wrapper.prop('onSelect'), _.noop);
			});
		});

		describe('Label (as a prop)', () => {
			it('renders the value in a `span` neighboring its `Switch` instance.', () => {
				const wrapper = shallow(<SwitchLabeled Label={'foo'} />);

				assert.equal(
					wrapper.find(CSSTransition).find('span').prop('children'),
					'foo'
				);
			});
		});

		describe('Label (as a child)', () => {
			it('renders the value in a `span` neighboring its `Switch` instance.', () => {
				const wrapper = shallow(
					<SwitchLabeled>
						<SwitchLabeled.Label>foo</SwitchLabeled.Label>
					</SwitchLabeled>
				);

				assert.equal(
					wrapper.find(CSSTransition).find('span').prop('children'),
					'foo'
				);
			});
		});

		describe('pass throughs', () => {
			let wrapper: any;

			const extraProps = {
				foo: 1,
				bar: 2,
				baz: 3,
				qux: 4,
				quux: 5,
				Label: 'test default',
				className: 'wut',
				style: { marginRight: 10 },
				initialState: { test: true },
				callbackId: 1,
				'data-testid': 10,
			};

			beforeEach(() => {
				wrapper = shallow(
					<SwitchLabeled
						isDisabled={true}
						isSelected={true}
						onSelect={_.noop}
						{...extraProps}
					/>
				);
			});

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('passes through all props not defined in `propTypes` to its `Switch` instance.', () => {
				const switchProps = wrapper.find(Switch).props();

				// It should pass `foo`, `bar`, `baz`, `qux`, and `quux`
				// and `className`, and 'data-testid' through
				// to the `Switch` instance.
				forEach(
					[
						'foo',
						'bar',
						'baz',
						'qux',
						'quux',
						'isDisabled',
						'isSelected',
						'onSelect',
						'className',
						'callbackId',
						'data-testid',
					],
					(prop) => {
						expect(has(switchProps, prop)).toBe(true);
					}
				);
			});
			it('omits all props defined in `propTypes from its `Switch` instance', () => {
				const switchProps = wrapper.find(Switch).props();

				// It should omit `Label', 'children', and 'initialState'
				// from the `Switch` instance.
				forEach(['Label', 'style', 'initialState'], (prop) => {
					expect(has(switchProps, prop)).toBe(false);
				});
			});
		});
	});
});
