import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import SyntheticEvent from 'react/lib/SyntheticEvent';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import describeWithDOM from '../../util/describe-with-dom';
import { common } from '../../util/generic-tests';

import LabeledCheckbox from './LabeledCheckbox';
import Checkbox from '../Checkbox/Checkbox';

SyntheticEvent;
sinon;
describeWithDOM;

describe('LabeledCheckbox', () => {
	common(LabeledCheckbox);

	describe('props', () => {
		describe('isDisabled', () => {
			it('passes the value through to its `Checkbox` instance.', () => {
				const wrapper = shallow(<LabeledCheckbox isDisabled={true} />);

				assert.equal(wrapper.find(Checkbox).prop('isDisabled'), true);
			});

			it('defaults to `false`.', () => {
				const wrapper = mount(<LabeledCheckbox />);

				assert.equal(wrapper.prop('isDisabled'), false);
			});
		});

		describe('isSelected', () => {
			it('passes the value through to its `Checkbox` instance.', () => {
				const wrapper = shallow(<LabeledCheckbox isSelected={true} />);

				assert.equal(wrapper.find(Checkbox).prop('isSelected'), true);
			});

			it('defaults to `false`.', () => {
				const wrapper = mount(<LabeledCheckbox />);

				assert.equal(wrapper.prop('isSelected'), false);
			});
		});

		describe('onSelect', () => {
			it('passes the value through to its `Checkbox` instance.', () => {
				const foo = () => null;
				const wrapper = shallow(<LabeledCheckbox onSelect={foo} />);

				assert.equal(wrapper.find(Checkbox).prop('onSelect'), foo);
			});

			it('defaults to the Lodash `noop` method.', () => {
				const wrapper = mount(<LabeledCheckbox />);

				assert.equal(wrapper.prop('onSelect'), _.noop);
			});
		});

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to its `Checkbox` instance.', () => {
				const wrapper = shallow(
					<LabeledCheckbox
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
				const checkboxProps = wrapper.find(Checkbox).props();

				// It should pass `foo`, `bar`, `baz`, `qux`, and `quux` through
				// to the `Checkbox` instance.
				_.forEach(['foo', 'bar', 'baz', 'qux', 'quux'], (prop) => {
					assert(_.has(checkboxProps, prop));
				});
			});
		});
	});
});
