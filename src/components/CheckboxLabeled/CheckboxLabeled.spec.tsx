import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import { shallow } from 'enzyme';

import { common } from '../../util/generic-tests';

import CheckboxLabeled from './CheckboxLabeled';
import Checkbox from '../Checkbox/Checkbox';

describe('CheckboxLabeled', () => {
	common(CheckboxLabeled);

	describe('props', () => {
		describe('isDisabled', () => {
			it('passes the value through to its `Checkbox` instance.', () => {
				const wrapper = shallow(<CheckboxLabeled isDisabled={true} />);

				assert.equal(wrapper.find(Checkbox).prop('isDisabled'), true);
			});
		});

		describe('isSelected', () => {
			it('passes the value through to its `Checkbox` instance.', () => {
				const wrapper = shallow(<CheckboxLabeled isSelected={true} />);

				assert.equal(wrapper.find(Checkbox).prop('isSelected'), true);
			});
		});

		describe('onSelect', () => {
			it('passes the value through to its `Checkbox` instance.', () => {
				const foo = () => null;
				const wrapper = shallow(<CheckboxLabeled onSelect={foo} />);

				assert.equal(wrapper.find(Checkbox).prop('onSelect'), foo);
			});
		});

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to its `Checkbox` instance.', () => {
				const wrapper = shallow(
					<CheckboxLabeled
						className='wut'
						isDisabled={true}
						isSelected={true}
						style={{ fontWeight: 'bold' }}
						onSelect={_.noop}
						{...{
							foo: 1,
							bar: 2,
							baz: 3,
							qux: 4,
							quux: 5,
						}}
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
