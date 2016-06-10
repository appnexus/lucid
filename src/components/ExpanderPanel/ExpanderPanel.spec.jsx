import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import describeWithDOM from '../../util/describe-with-dom';
import { common, controls } from '../../util/generic-tests';
import ExpanderPanel from './ExpanderPanel';
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
				assert.equal(shallow(<ExpanderPanel isExpanded={true} />).find(ChevronIcon).prop('direction'), 'up');
			});

			it('sets the value of the `direction` prop on its `ChevronIcon` instance to "down" when `false`.', () => {
				assert.equal(shallow(<ExpanderPanel isExpanded={false} />).find(ChevronIcon).prop('direction'), 'down');
			});

			it('adds the "lucid-ExpanderPanel-is-collapsed" class to the root element when `false`.', () => {
				assert.equal(shallow(<ExpanderPanel isExpanded={false} />).find('.lucid-ExpanderPanel-is-collapsed').length, 1);
			});

			it('adds the "lucid-ExpanderPanel-content-is-expanded" class to its content container element when `true`.', () => {
				assert.equal(shallow(<ExpanderPanel isExpanded={true} />).find('.lucid-ExpanderPanel-content-is-expanded').length, 1);
			});
		});

		describe('Header', () => {
			it('renders the value in the header in a `span` element', () => {
				const wrapper = shallow(<ExpanderPanel Header='yolo' />);
				const headerText = wrapper.find('.lucid-ExpanderPanel-header').children().at(1).text();

				assert.equal(headerText, 'yolo');
			});
		});

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to the root element', () => {
				const wrapper = shallow(
					<ExpanderPanel
							className='wut'
							isExpanded={true}
							onToggle={_.noop}
							style={{ marginRight: 10 }}
							foo={1}
							bar={2}
					/>
				);
				const rootProps = wrapper.find('.lucid-ExpanderPanel').props();

				assert(_.has(rootProps, 'foo'));
				assert(_.has(rootProps, 'bar'));
			});
		});
	});
});

describeWithDOM('ExpanderPanel', () => {
	describe('user clicks on the header', () => {
		it('calls the function passed in as the `onToggle` prop', () => {
			const onToggle = sinon.spy();
			const wrapper = mount(
				<ExpanderPanel onToggle={onToggle} />
			);

			wrapper.find('.lucid-ExpanderPanel-header').simulate('click');
			wrapper.find('.lucid-ExpanderPanel-icon').simulate('click');

			assert.equal(onToggle.callCount, 2);

			wrapper.unmount();
		});

		it('should call `onToggle` correctly when not `isExpanded`', () => {
			const onToggle = sinon.spy();
			const wrapper = mount(
				<ExpanderPanel isExpanded={false} onToggle={onToggle} />
			);

			wrapper.find('.lucid-ExpanderPanel-header').simulate('click');
			wrapper.find('.lucid-ExpanderPanel-icon').simulate('click');

			assert.equal(onToggle.args[0][0], true);
			assert.equal(onToggle.args[1][0], true);

			wrapper.unmount();
		});

		it('should call `onToggle` correctly when `isExpanded`', () => {
			const onToggle = sinon.spy();
			const wrapper = mount(
				<ExpanderPanel isExpanded={true} onToggle={onToggle} />
			);

			wrapper.find('.lucid-ExpanderPanel-header').simulate('click');
			wrapper.find('.lucid-ExpanderPanel-icon').simulate('click');

			assert.equal(onToggle.args[0][0], false);
			assert.equal(onToggle.args[1][0], false);

			wrapper.unmount();
		});
	});
});
