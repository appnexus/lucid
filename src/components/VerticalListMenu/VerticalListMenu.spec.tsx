import _, { forEach, has } from 'lodash';
import React from 'react';
import assert from 'assert';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';

import { common } from '../../util/generic-tests';
import { VerticalListMenuDumb as VerticalListMenu } from './VerticalListMenu';

describe('VerticalListMenu', () => {
	common(VerticalListMenu);

	describe('render', () => {
		it('should have the correct number of children', () => {
			const wrapper = shallow(
				<VerticalListMenu>
					<VerticalListMenu.Item />
					<VerticalListMenu.Item />
					<VerticalListMenu.Item />
				</VerticalListMenu>
			);

			assert.equal(wrapper.find('.lucid-VerticalListMenu-Item').length, 3);
		});

		it('should render the Item content correctly', () => {
			const wrapper = shallow(
				<VerticalListMenu>
					<VerticalListMenu.Item>blarg</VerticalListMenu.Item>
				</VerticalListMenu>
			);

			assert.equal(
				wrapper.find('.lucid-VerticalListMenu-Item').text(),
				'blarg'
			);
		});
	});

	describe('props', () => {
		describe('selectedIndices', () => {
			it('should favor child props over parent level', () => {
				const wrapper = shallow(
					<VerticalListMenu selectedIndices={[0]} expandedIndices={[2]}>
						<VerticalListMenu.Item>Selected one</VerticalListMenu.Item>

						<VerticalListMenu.Item isSelected={true}>
							Selected two
						</VerticalListMenu.Item>

						<VerticalListMenu.Item>Expanded one</VerticalListMenu.Item>

						<VerticalListMenu.Item isExpanded={true}>
							Expanded two
						</VerticalListMenu.Item>
					</VerticalListMenu>
				);

				assert.equal(
					wrapper.find('.lucid-VerticalListMenu-Item-content-is-selected')
						.length,
					2
				);
			});
		});

		describe('onSelect', () => {
			it('should fire', () => {
				const onSelect: any = sinon.spy();
				const wrapper = shallow(
					<VerticalListMenu onSelect={onSelect}>
						<VerticalListMenu.Item>One</VerticalListMenu.Item>
						<VerticalListMenu.Item>Two</VerticalListMenu.Item>
					</VerticalListMenu>
				);

				wrapper
					.find('.lucid-VerticalListMenu-Item-content')
					.at(1)
					.simulate('click');

				assert(onSelect.called);
				assert.equal(
					onSelect.args[0][0],
					1,
					'wrong index on the onSelect callback'
				);
				assert(
					_.has(onSelect.args[0][1], 'event'),
					'missing `event` on the onSelect callback'
				);
				assert(
					_.has(onSelect.args[0][1], 'props'),
					'missing `props` on the onSelect callback'
				);
			});

			it('should fire on the child', () => {
				const onSelect: any = sinon.spy();
				const wrapper = shallow(
					<VerticalListMenu>
						<VerticalListMenu.Item>One</VerticalListMenu.Item>
						<VerticalListMenu.Item onSelect={onSelect}>
							Two
						</VerticalListMenu.Item>
					</VerticalListMenu>
				);

				wrapper
					.find('.lucid-VerticalListMenu-Item-content')
					.at(1)
					.simulate('click');

				assert(onSelect.called);
				assert.equal(
					onSelect.args[0][0],
					1,
					'wrong index on the onSelect callback'
				);
				assert(
					_.has(onSelect.args[0][1], 'event'),
					'missing `event` on the onSelect callback'
				);
				assert(
					_.has(onSelect.args[0][1], 'props'),
					'missing `props` on the onSelect callback'
				);
			});
		});

		describe('hasExpander', () => {
			it('should show expanders', () => {
				const wrapper = shallow(
					<VerticalListMenu>
						<VerticalListMenu.Item />
						<VerticalListMenu.Item hasExpander={true} />
						<VerticalListMenu.Item hasExpander={true} />
					</VerticalListMenu>
				);

				assert.equal(
					wrapper.find('.lucid-VerticalListMenu-Item-expander').length,
					2
				);
			});
		});

		// Since onToggle uses a Button under the hood, we need to do a `mount` test
		// to make sure it's passing the `event` object around correctly
		describe('onToggle', () => {
			let wrapper: any;

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('should fire', () => {
				const onToggle = sinon.spy();
				wrapper = mount(
					<VerticalListMenu onToggle={onToggle}>
						<VerticalListMenu.Item hasExpander={true} />
						<VerticalListMenu.Item hasExpander={true} />
					</VerticalListMenu>
				);

				wrapper
					.find('.lucid-VerticalListMenu-Item-expander')
					.at(0)
					.simulate('click');

				assert(onToggle.called);
				assert.equal(
					onToggle.args[0][0],
					0,
					'wrong index on the onToggle callback'
				);
				assert(
					_.has(onToggle.args[0][1], 'event'),
					'missing `event` on the onToggle callback'
				);
				assert(
					_.has(onToggle.args[0][1], 'props'),
					'missing `props` on the onToggle callback'
				);
			});

			it('should fire on the child', () => {
				const onToggle = sinon.spy();
				wrapper = mount(
					<VerticalListMenu>
						<VerticalListMenu.Item hasExpander={true} onToggle={onToggle} />
						<VerticalListMenu.Item hasExpander={true} />
					</VerticalListMenu>
				);

				wrapper
					.find('.lucid-VerticalListMenu-Item-expander')
					.at(0)
					.simulate('click');

				assert(onToggle.called);
				assert.equal(
					onToggle.args[0][0],
					0,
					'wrong index on the onToggle callback'
				);
				assert(
					_.has(onToggle.args[0][1], 'event'),
					'missing `event` on the onToggle callback'
				);
				assert(
					_.has(onToggle.args[0][1], 'props'),
					'missing `props` on the onToggle callback'
				);
			});
		});

		describe('pass throughs', () => {
			let wrapper: any;
			const defaultProps = VerticalListMenu.defaultProps;

			beforeEach(() => {
				const props = {
					...defaultProps,
					selectedIndices: [1],
					expandedIndicies: [1, 2],
					className: 'wut',
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = shallow(<VerticalListMenu {...props} />);
			});

			afterEach(() => {
				wrapper.unmount();
			});

			it('passes through props not defined in `propTypes` to the root element.', () => {
				const rootProps = wrapper.find('.lucid-VerticalListMenu').props();

				expect(wrapper.first().prop(['className'])).toContain('wut');
				expect(wrapper.first().prop(['style'])).toMatchObject({
					marginRight: 10,
				});
				expect(wrapper.first().prop(['data-testid'])).toBe(10);

				// 'className' and style are plucked from the pass through object
				// but still appears becuase each one is also directly added to the root element as a prop
				forEach(['className', 'data-testid', 'style', 'children'], (prop) => {
					expect(has(rootProps, prop)).toBe(true);
				});
			});
			it('omits the props defined in `propTypes` (plus, in addition, `initialState`, and `callbackId`) from the root element', () => {
				const rootProps = wrapper.find('.lucid-VerticalListMenu').props();
				forEach(
					[
						'selectedIndices',
						'expandedIndices',
						'onSelect',
						'onToggle',
						'initialState',
						'callbackId',
					],
					(prop) => {
						expect(has(rootProps, prop)).toBe(false);
					}
				);
			});
		});
	});

	describe('childComponents', () => {
		it("should correctly recognize other VerticalListMenu's as children", () => {
			const wrapper = shallow(
				<VerticalListMenu>
					<VerticalListMenu.Item>
						<div>Other random content</div>
						<VerticalListMenu>
							<VerticalListMenu.Item />
						</VerticalListMenu>
					</VerticalListMenu.Item>
				</VerticalListMenu>
			);

			assert.equal(
				wrapper.find('.lucid-VerticalListMenu-Item-nested-list').children()
					.length,
				1
			);
		});
	});
});
