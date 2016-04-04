import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { mount, shallow } from 'enzyme';

import { common } from '../../util/generic-tests';

import LabeledSwitch from './LabeledSwitch';
import Switch from '../Switch/Switch';

describe('LabeledSwitch', () => {
	common(LabeledSwitch);

	describe('props', () => {
		describe('isDisabled', () => {
			it('passes the value through to its `Switch` instance.', () => {
				const wrapper = shallow(<LabeledSwitch isDisabled={true} />);

				assert.equal(wrapper.find(Switch).prop('isDisabled'), true);
			});

			it('defaults to `false`.', () => {
				const wrapper = mount(<LabeledSwitch />);

				assert.equal(wrapper.prop('isDisabled'), false);
			});
		});

		describe('isSelected', () => {
			it('passes the value through to its `Switch` instance.', () => {
				const wrapper = shallow(<LabeledSwitch isSelected={true} />);

				assert.equal(wrapper.find(Switch).prop('isSelected'), true);
			});

			it('defaults to `false`.', () => {
				const wrapper = mount(<LabeledSwitch />);

				assert.equal(wrapper.prop('isSelected'), false);
			});
		});

		describe('onSelect', () => {
			it('passes the value through to its `Switch` instance.', () => {
				const foo = () => null;
				const wrapper = shallow(<LabeledSwitch onSelect={foo} />);

				assert.equal(wrapper.find(Switch).prop('onSelect'), foo);
			});

			it('defaults to the Lodash `noop` method.', () => {
				const wrapper = mount(<LabeledSwitch />);

				assert.equal(wrapper.prop('onSelect'), _.noop);
			});
		});

		describe('Label (as a prop)', () => {
			it('renders the value in a `span` neighboring its `Switch` instance.', () => {
				const wrapper = shallow(
					<LabeledSwitch
							Label={'foo'}
					/>
				);

				assert.equal(wrapper.find(ReactCSSTransitionGroup).find('span').prop('children'), 'foo');
			});
		});

		describe('Label (as a child)', () => {
			it('renders the value in a `span` neighboring its `Switch` instance.', () => {
				const wrapper = shallow(
					<LabeledSwitch>
						<LabeledSwitch.Label>foo</LabeledSwitch.Label>
					</LabeledSwitch>
				);

				assert.equal(wrapper.find(ReactCSSTransitionGroup).find('span').prop('children'), 'foo');
			});
		});

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to its `Switch` instance.', () => {
				const wrapper = shallow(
					<LabeledSwitch
							className='wut'
							isDisabled={true}
							isSelected={true}
							style={{ fontWeight: 'bold' }}
							onSelect={_.noop}
							foo={1}
							bar={2}
							baz={3}
							qux={4}
							quux={5}
					/>
				);
				const switchProps = wrapper.find(Switch).props();

				// It should pass `foo`, `bar`, `baz`, `qux`, and `quux` through
				// to the `Switch` instance.
				_.forEach(['foo', 'bar', 'baz', 'qux', 'quux'], (prop) => {
					assert(_.has(switchProps, prop));
				});
			});
		});
	});
});
