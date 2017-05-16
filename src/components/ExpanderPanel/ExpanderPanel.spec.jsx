import _ from 'lodash';
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
				const wrapper = shallow(<ExpanderPanel Header="yolo" />);
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
			it('passes through all props not defined in `propTypes` to the root element', () => {
				const wrapper = shallow(
					<ExpanderPanel
						className="wut"
						isExpanded={true}
						onToggle={_.noop}
						style={{ marginRight: 10 }}
						foo={1}
						bar={2}
					/>
				);
				const rootProps = wrapper.find('.lucid-ExpanderPanel').props();

				assert(_.has(rootProps, 'foo'), 'props missing "foo" prop');
				assert(_.has(rootProps, 'bar'), 'props missing "bar" prop');
			});
		});
	});
});

describe('ExpanderPanel', () => {
	let wrapper;

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	describe('user clicks on the header', () => {
		it('calls the function passed in as the `onToggle` prop', () => {
			const onToggle = sinon.spy();
			wrapper = mount(<ExpanderPanel onToggle={onToggle} />);

			wrapper.find('.lucid-ExpanderPanel-header').simulate('click');
			wrapper.find('.lucid-ExpanderPanel-icon').simulate('click');

			assert.equal(
				onToggle.callCount,
				2,
				`onToggle called the wrong number of times, actual: ${onToggle.callCount}, expected: 2`
			);
		});

		it('should call `onToggle` correctly when not `isExpanded`', () => {
			const onToggle = sinon.spy();
			wrapper = mount(<ExpanderPanel isExpanded={false} onToggle={onToggle} />);

			wrapper.find('.lucid-ExpanderPanel-header').simulate('click');
			wrapper.find('.lucid-ExpanderPanel-icon').simulate('click');

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

			wrapper.find('.lucid-ExpanderPanel-header').simulate('click');
			wrapper.find('.lucid-ExpanderPanel-icon').simulate('click');

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
