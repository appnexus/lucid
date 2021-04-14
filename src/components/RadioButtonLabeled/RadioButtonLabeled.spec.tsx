import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import { shallow } from 'enzyme';

import { common } from '../../util/generic-tests';

import RadioButtonLabeled from './RadioButtonLabeled';
import RadioButton from '../RadioButton/RadioButton';

describe('RadioButtonLabeled', () => {
	common(RadioButtonLabeled);

	describe('render', () => {
		it('should allow multiple Label children', () => {
			const wrapper = shallow(
				<RadioButtonLabeled>
					<RadioButtonLabeled.Label>
						<span>one</span>
						<span>two</span>
					</RadioButtonLabeled.Label>
				</RadioButtonLabeled>
			);

			assert.equal(
				wrapper.find(RadioButtonLabeled.Label).children().at(0).text(),
				'one',
				'wrong or missing first Label child'
			);
			assert.equal(
				wrapper.find(RadioButtonLabeled.Label).children().at(1).text(),
				'two',
				'wrong or missing second Label child'
			);
		});
	});

	describe('props', () => {
		describe('isDisabled', () => {
			it('passes the value through to its `RadioButton` instance.', () => {
				const wrapper = shallow(<RadioButtonLabeled isDisabled={true} />);

				assert.equal(wrapper.find(RadioButton).prop('isDisabled'), true);
			});
		});

		describe('isSelected', () => {
			it('passes the value through to its `RadioButton` instance.', () => {
				const wrapper = shallow(<RadioButtonLabeled isSelected={true} />);

				assert.equal(wrapper.find(RadioButton).prop('isSelected'), true);
			});
		});

		describe('onSelect', () => {
			it('passes the value through to its `RadioButton` instance.', () => {
				const foo = () => null;
				const wrapper = shallow(<RadioButtonLabeled onSelect={foo} />);

				assert.equal(wrapper.find(RadioButton).prop('onSelect'), foo);
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
						{...{
							foo: 1,
							bar: 2,
							baz: 3,
							qux: 4,
							quux: 5,
						}}
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
