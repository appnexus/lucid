import _, { forEach, has } from 'lodash';
import assert from 'assert';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { common, controls } from '../../util/generic-tests';
import { ExpanderPanelDumb as ExpanderPanel } from './ExpanderPanel';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';

describe('ExpanderPanel', () => {
	common(ExpanderPanel);
	controls(ExpanderPanel, {
		callbackName: 'onToggle',
		controlSelector: '.lucid-ExpanderPanel-header',
		eventType: 'click',
	});

	describe('props', () => {
		describe('isExpanded', () => {
			it('sets the value of the `direction` prop on its `ChevronIcon` instance to "up" when `true`.', () => {
				const wrapper = shallow(<ExpanderPanel isExpanded={true} />);
				const direction = wrapper.find(ChevronIcon).prop('direction');

				assert.equal(
					direction,
					'up',
					`direction was wrong, actual "${direction}", expected: "up"`
				);
			});

			it('sets the value of the `direction` prop on its `ChevronIcon` instance to "down" when `false`.', () => {
				const wrapper = shallow(<ExpanderPanel isExpanded={false} />);
				const direction = wrapper.find(ChevronIcon).prop('direction');

				assert.equal(
					direction,
					'down',
					`direction was wrong, actual "${direction}", expected: "up"`
				);
			});

			it('adds the "lucid-ExpanderPanel-is-collapsed" class to the root element when `false`.', () => {
				const wrapper = shallow(<ExpanderPanel isExpanded={false} />);

				assert.equal(
					wrapper.find('.lucid-ExpanderPanel-is-collapsed').length,
					1,
					'could not find element with ".lucid-ExpanderPanel-is-collapsed" class'
				);
			});

			it('adds the "lucid-ExpanderPanel-content-is-expanded" class to its content container element when `true`.', () => {
				const wrapper = shallow(<ExpanderPanel isExpanded={true} />);
				assert.equal(
					wrapper.find('.lucid-ExpanderPanel-content-is-expanded').length,
					1,
					'could not find element with ".lucid-ExpanderPanel-content-is-expanded" class'
				);
			});
		});

		describe('Header', () => {
			it('renders the value in the header in a `span` element', () => {
				const wrapper = shallow(<ExpanderPanel Header='yolo' />);
				const headerText = wrapper
					.find('.lucid-ExpanderPanel-header')
					.children()
					.at(1)
					.text();

				assert.equal(
					headerText,
					'yolo',
					`Header text was wrong, actual: "${headerText}", expected: "yolo"`
				);
			});
		});

		describe('pass throughs', () => {
			let wrapper: any;
			const defaultProps = ExpanderPanel.defaultProps;

			beforeEach(() => {
				const props = {
					...defaultProps,
					isExpanded: true,
					onToggle: _.noop,
					onRest: _.noop,
					onRestAppliedOnCollapse: true,
					Header: <div>ExpanderPanel Header Prop</div>,
					hasPadding: false,
					isDisabled: true,
					className: 'wut',
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = shallow(<ExpanderPanel {...props} />);
			});

			afterEach(() => {
				wrapper.unmount();
			});

			it('passes through props not defined in `propTypes`, including `callbackId`, to the root element.', () => {
				const rootProps = wrapper.find('.lucid-ExpanderPanel').props();

				expect(wrapper.first().prop(['className'])).toContain('wut');
				expect(wrapper.first().prop(['style'])).toMatchObject({
					marginRight: 10,
				});
				expect(wrapper.first().prop(['data-testid'])).toBe(10);
				expect(wrapper.first().prop(['callbackId'])).toBe(1);

				// 'className' and 'style' are plucked from the pass through object
				// but still appear becuase they are also directly passed to the root element as props
				forEach(['className', 'data-testid', 'style', 'children'], (prop) => {
					expect(has(rootProps, prop)).toBe(true);
				});
			});

			it('omits all the props defined in `propTypes` (plus, in addition, `initialState`) from the root element', () => {
				const rootProps = wrapper.find('.lucid-ExpanderPanel').props();

				// The default props and, if it exists, `initialState` are omitted from the pass through object
				forEach(
					[
						'isExpanded',
						'onToggle',
						'onRest',
						'onRestAppliedOnCollapse',
						'isDisabled',
						'hasPadding',
						'initialState',
						'Header',
					],
					(prop) => {
						expect(has(rootProps, prop)).toBe(false);
					}
				);
			});
		});
	});
});

describe('ExpanderPanel', () => {
	let wrapper: any;

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	describe('user clicks on the header', () => {
		it('calls the function passed in as the `onToggle` prop', () => {
			const onToggle = sinon.spy();
			wrapper = mount(<ExpanderPanel onToggle={onToggle} />);

			wrapper.find('.lucid-ExpanderPanel-header').first().simulate('click');
			wrapper.find('.lucid-ExpanderPanel-icon').first().simulate('click');

			assert.equal(
				onToggle.callCount,
				2,
				`onToggle called the wrong number of times, actual: ${onToggle.callCount}, expected: 2`
			);
		});

		it('should call `onToggle` correctly when not `isExpanded`', () => {
			const onToggle = sinon.spy();
			wrapper = mount(<ExpanderPanel isExpanded={false} onToggle={onToggle} />);

			wrapper.find('.lucid-ExpanderPanel-header').first().simulate('click');
			wrapper.find('.lucid-ExpanderPanel-icon').first().simulate('click');

			assert.equal(
				onToggle.args[0][0],
				true,
				'onToggle not called with `true`'
			);
			assert.equal(
				onToggle.args[1][0],
				true,
				'onToggle not called with `true`'
			);
		});

		it('should call `onToggle` correctly when `isExpanded`', () => {
			const onToggle = sinon.spy();
			wrapper = mount(<ExpanderPanel isExpanded={true} onToggle={onToggle} />);

			wrapper.find('.lucid-ExpanderPanel-header').first().simulate('click');
			wrapper.find('.lucid-ExpanderPanel-icon').first().simulate('click');

			assert.equal(
				onToggle.args[0][0],
				false,
				'onToggle not called with `false`'
			);
			assert.equal(
				onToggle.args[1][0],
				false,
				'onToggle not called with `false`'
			);
		});
	});
});
