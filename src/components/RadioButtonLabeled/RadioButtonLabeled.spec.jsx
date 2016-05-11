import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import SyntheticEvent from 'react/lib/SyntheticEvent';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import describeWithDOM from '../../util/describe-with-dom';
import { common } from '../../util/generic-tests';

import RadioButtonLabeled from './RadioButtonLabeled';
import RadioButton from '../RadioButton/RadioButton';

SyntheticEvent;
sinon;
describeWithDOM;

describe('RadioButtonLabeled', () => {
	common(RadioButtonLabeled);

	describe('props', () => {
		describe('isDisabled', () => {
			it('passes the value through to its `RadioButton` instance.', () => {
				const wrapper = shallow(<RadioButtonLabeled isDisabled={true} />);

				assert.equal(wrapper.find(RadioButton).prop('isDisabled'), true);
			});

			it('defaults to `false`.', () => {
				const wrapper = mount(<RadioButtonLabeled />);

				assert.equal(wrapper.prop('isDisabled'), false);
			});
		});

		describe('isSelected', () => {
			it('passes the value through to its `RadioButton` instance.', () => {
				const wrapper = shallow(<RadioButtonLabeled isSelected={true} />);

				assert.equal(wrapper.find(RadioButton).prop('isSelected'), true);
			});

			it('defaults to `false`.', () => {
				const wrapper = mount(<RadioButtonLabeled />);

				assert.equal(wrapper.prop('isSelected'), false);
			});
		});

		describe('onSelect', () => {
			it('passes the value through to its `RadioButton` instance.', () => {
				const foo = () => null;
				const wrapper = shallow(<RadioButtonLabeled onSelect={foo} />);

				assert.equal(wrapper.find(RadioButton).prop('onSelect'), foo);
			});

			it('defaults to the Lodash `noop` method.', () => {
				const wrapper = mount(<RadioButtonLabeled />);

				assert.equal(wrapper.prop('onSelect'), _.noop);
			});
		});

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to its `RadioButton` instance.', () => {
				const wrapper = shallow(
					<RadioButtonLabeled
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
				const radioButtonProps = wrapper.find(RadioButton).props();

				// It should pass `foo`, `bar`, `baz`, `qux`, and `quux` through
				// to the `RadioButton` instance.
				_.forEach(['foo', 'bar', 'baz', 'qux', 'quux'], (prop) => {
					assert(_.has(radioButtonProps, prop));
				});
			});
		});
	});
});
