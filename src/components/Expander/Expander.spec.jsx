import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import ReactTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { common, controls } from '../../util/generic-tests';
import { ExpanderDumb as Expander } from './Expander';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';

describe('Expander', () => {
	common(Expander);
	controls(Expander, {
		callbackName: 'onToggle',
		controlSelector: '.lucid-Expander-header',
		eventType: 'click',
	});

	describe('props', () => {
		describe('isExpanded', () => {
			it('sets the value of the `direction` prop on its `ChevronIcon` instance to "up" when `true`.', () => {
				assert.equal(
					shallow(<Expander isExpanded={true} />)
						.find(ChevronIcon)
						.prop('direction'),
					'up'
				);
			});

			it('sets the value of the `direction` prop on its `ChevronIcon` instance to "down" when `false`.', () => {
				assert.equal(
					shallow(<Expander isExpanded={false} />)
						.find(ChevronIcon)
						.prop('direction'),
					'down'
				);
			});

			it('adds the "lucid-Expander-is-expanded" class to the root element when `true`.', () => {
				assert.equal(
					shallow(<Expander isExpanded={true} />).find(
						'.lucid-Expander-is-expanded'
					).length,
					1
				);
			});

			it('adds the "lucid-Expander-content-is-expanded" class to its content container element when `true`.', () => {
				const wrapper = shallow(<Expander isExpanded={true} />);
				assert.equal(wrapper.find('.lucid-Expander-is-expanded').length, 1);
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

		describe('kind', () => {
			it('defaults "simple".', () => {
				assert.equal(mount(<Expander />).prop('kind'), 'simple');
			});
			it('accepts "highlighted".', () => {
				assert.equal(
					mount(<Expander kind="highlighted" />).prop('kind'),
					'highlighted'
				);
			});
			it('`kind=highlighted` adds the "lucid-Expander-kind-highlighted" class.', () => {
				const wrapper = shallow(
					<Expander isExpanded={true} kind="highlighted" />
				);
				assert.equal(
					wrapper.find('.lucid-Expander-kind-highlighted').length,
					1
				);
			});
		});

		describe('Label (as a prop)', () => {
			it('renders the value in the header in a `SPAN` element neighboring its `ChevronIcon` instance.', () => {
				assert.equal(
					shallow(<Expander Label="foo" />)
						.find(ReactTransitionGroup)
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
					wrapper.find(ReactTransitionGroup).find('span').prop('children'),
					'foo'
				);
			});
		});

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to the root element.', () => {
				const wrapper = shallow(
					<Expander
						className="wut"
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

describe('Expander', () => {
	let wrapper;

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	describe('user clicks on the header', () => {
		it('calls the function passed in as the `onToggle` prop', () => {
			const onToggle = sinon.spy();
			wrapper = mount(<Expander onToggle={onToggle} />);

			wrapper.find('.lucid-Expander-header').simulate('click');
			wrapper.find('.lucid-Expander-icon').simulate('click');
			wrapper.find('.lucid-Expander-text').simulate('click');

			assert.equal(onToggle.callCount, 3);
		});

		it('should call `onToggle` correctly when not `isExpanded`', () => {
			const onToggle = sinon.spy();
			wrapper = mount(<Expander isExpanded={false} onToggle={onToggle} />);

			wrapper.find('.lucid-Expander-header').simulate('click');
			wrapper.find('.lucid-Expander-icon').simulate('click');
			wrapper.find('.lucid-Expander-text').simulate('click');

			assert.equal(onToggle.args[0][0], true);
			assert.equal(onToggle.args[1][0], true);
			assert.equal(onToggle.args[2][0], true);
		});

		it('should call `onToggle` correctly when `isExpanded`', () => {
			const onToggle = sinon.spy();
			wrapper = mount(<Expander isExpanded={true} onToggle={onToggle} />);

			wrapper.find('.lucid-Expander-header').simulate('click');
			wrapper.find('.lucid-Expander-icon').simulate('click');
			wrapper.find('.lucid-Expander-text').simulate('click');

			assert.equal(onToggle.args[0][0], false);
			assert.equal(onToggle.args[1][0], false);
			assert.equal(onToggle.args[2][0], false);
		});
	});
});
