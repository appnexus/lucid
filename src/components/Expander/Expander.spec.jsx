import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import describeWithDOM from '../../util/describe-with-dom';
import { common, controls } from '../../util/generic-tests';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import Expander from './Expander';

describe('Expander', () => {
	common(Expander);
	controls(Expander, {
		callbackName: 'onToggle',
		controlSelector: '.lucid-Expander-header',
		eventType: 'click'
	});

	describe('props', () => {
		describe('isExpanded', () => {
			it('sets the value of the `direction` prop on its `ChevronIcon` instance to "up" when `true`.', () => {
				assert.equal(shallow(<Expander isExpanded={true} />).find(ChevronIcon).prop('direction'), 'up');
			});

			it('sets the value of the `direction` prop on its `ChevronIcon` instance to "down" when `false`.', () => {
				assert.equal(shallow(<Expander isExpanded={false} />).find(ChevronIcon).prop('direction'), 'down');
			});

			it('adds the "lucid-Expander-is-expanded" class to the root element when `true`.', () => {
				assert.equal(shallow(<Expander isExpanded={true} />).find('.lucid-Expander-is-expanded').length, 1);
			});

			it('adds the "lucid-Expander-content-is-expanded" class to its content container element when `true`.', () => {
				assert.equal(shallow(<Expander isExpanded={true} />).find('.lucid-Expander-content-is-expanded').length, 1);
			});

			it('defaults to `false`.', () => {
				assert.equal(mount(<Expander />).prop('isExpanded'), false);
			});
		});

		describe('onToggle', () => {
			it('defaults to the Lodash `noop` method.', () => {
				assert.equal(mount(<Expander />).prop('onToggle'), _.noop);
			});
		});

		describe('Label (as a prop)', () => {
			it('renders the value in the header in a `SPAN` element neighboring its `ChevronIcon` instance.', () => {
				assert.equal(
					shallow(<Expander Label='foo' />)
							.find(ReactCSSTransitionGroup)
							.find('span')
							.prop('children'),
					'foo'
				);
			});
		});

		describe('Label (as a child)', () => {
			it('renders the value in the header in a `SPAN` element neighboring its `ChevronIcon` instance.', () => {
				const wrapper = shallow(
					<Expander>
						<Expander.Label>foo</Expander.Label>
					</Expander>
				);

				assert.equal(
					wrapper
							.find(ReactCSSTransitionGroup)
							.find('span')
							.prop('children'),
					'foo'
				);
			});
		});

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to the root element.', () => {
				const wrapper = shallow(
					<Expander
							className='wut'
							isExpanded={true}
							onToggle={_.noop}
							style={{ marginRight: 10 }}
							foo={1}
							bar={2}
					/>
				);
				const rootProps = wrapper.find('.lucid-Expander').props();

				assert(_.has(rootProps, 'foo'));
				assert(_.has(rootProps, 'bar'));
			});
		});
	});
});

describeWithDOM('Expander', () => {
	describe('user clicks on the header', () => {
		it('calls the function passed in as the `onToggle` prop', () => {
			const onToggle = sinon.spy();
			const wrapper = mount(
				<Expander onToggle={onToggle} />
			);

			wrapper.find('.lucid-Expander-header').simulate('click');
			wrapper.find('.lucid-Expander-icon').simulate('click');
			wrapper.find('.lucid-Expander-text').simulate('click');

			assert.equal(onToggle.callCount, 3);

			wrapper.unmount();
		});

		it('should call `onToggle` correctly when not `isExpanded`', () => {
			const onToggle = sinon.spy();
			const wrapper = mount(
				<Expander isExpanded={false} onToggle={onToggle} />
			);

			wrapper.find('.lucid-Expander-header').simulate('click');
			wrapper.find('.lucid-Expander-icon').simulate('click');
			wrapper.find('.lucid-Expander-text').simulate('click');

			assert.equal(onToggle.args[0][0], true);
			assert.equal(onToggle.args[1][0], true);
			assert.equal(onToggle.args[2][0], true);

			wrapper.unmount();
		});

		it('should call `onToggle` correctly when `isExpanded`', () => {
			const onToggle = sinon.spy();
			const wrapper = mount(
				<Expander isExpanded={true} onToggle={onToggle} />
			);

			wrapper.find('.lucid-Expander-header').simulate('click');
			wrapper.find('.lucid-Expander-icon').simulate('click');
			wrapper.find('.lucid-Expander-text').simulate('click');

			assert.equal(onToggle.args[0][0], false);
			assert.equal(onToggle.args[1][0], false);
			assert.equal(onToggle.args[2][0], false);

			wrapper.unmount();
		});
	});
});
