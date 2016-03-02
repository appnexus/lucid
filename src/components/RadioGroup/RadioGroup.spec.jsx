import _ from 'lodash';
import React from 'react';
import assert from 'assert';
// import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import getRandom from '../../util/random';
import { common } from '../../util/generic-tests';

import RadioGroup from './RadioGroup';

describe('RadioGroup', () => {
	common(RadioGroup);

	describe('props', () => {
		describe('name', () => {
			it('sets the `name` attribute of the child radio buttons.', () => {
				const name = getRandom();
				const wrapper = shallow(
					<RadioGroup name={name}>
						<RadioGroup.RadioButton />
						<RadioGroup.RadioButton />
						<RadioGroup.RadioButton />
					</RadioGroup>
				);

				_.forEach(wrapper.find('RadioButton').nodes, (node) => {
					assert.equal(node.props.name, name);
				});
			});

			it('defaults to a string that is passed along to the children.', () => {
				// Use `mount` here to get at the props that are actually passed
				// to the component's root element (which includes the defaults)
				// as opposed to the props that are provided by the consumer to
				// the component.
				const wrapper = mount(
					<RadioGroup>
						<RadioGroup.RadioButton />
						<RadioGroup.RadioButton />
						<RadioGroup.RadioButton />
					</RadioGroup>
				);
				const name = wrapper.first().prop('name');

				_.forEach(wrapper.find('RadioButton').nodes, (node) => {
					assert.equal(node.props.name, name);
				});
			});
		});

		describe('onSelect', () => {
			it('defaults to the Lodash `noop` method.', () => {
				const wrapper = shallow(<RadioGroup />);

				assert.equal(wrapper.prop('onSelect'), _.noop);
			});
		});

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to the root element.', () => {
				const wrapper = shallow(
					<RadioGroup foo={1} bar={2} baz={3} qux={4} quux={5}>
						<RadioGroup.RadioButton />
						<RadioGroup.RadioButton />
						<RadioGroup.RadioButton />
					</RadioGroup>
				);
				const rootProps = _.keys(wrapper.first().props());

				// It should pass `foo`, `bar`, `baz`, `qux`, and `quux` through
				// to the root element.
				_.forEach(['foo', 'bar', 'baz', 'qux', 'quux'], (prop) => {
					assert(_.includes(rootProps, prop));
				});
			});
		});
	});
});


