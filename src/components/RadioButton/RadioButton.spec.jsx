import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import describeWithDOM from '../../util/describe-with-dom';
import { common } from '../../util/generic-tests';
import { bindClassNames } from '../../util/style-helpers';

import RadioButton from './RadioButton';

const generateBoundClassNames = bindClassNames('RadioButton');

describe('RadioButton', () => {
	common(RadioButton);

	const booleanValues = [true, false];

	describe('props', () => {
		describe('isDisabled', () => {
			it('sets the `disabled` attribute of the native check box element.', () => {
				_.forEach(booleanValues, (testValue) => {
					const wrapper = shallow(<RadioButton isDisabled={testValue} />);

					assert.equal(wrapper.find('input[type="radio"]').prop('disabled'), testValue);
				});
			});

			it('defaults to `false`.', () => {
				const wrapper = mount(<RadioButton />);

				assert.equal(wrapper.prop('isDisabled'), false);
			});
		});

		describe('isSelected', () => {
			it('sets the `checked` attribute of the native check box element.', () => {
				_.forEach(booleanValues, (testValue) => {
					const wrapper = shallow(<RadioButton isSelected={testValue} />);

					assert.equal(wrapper.find('input[type="radio"]').prop('checked'), testValue);
				});
			});

			it('defaults to `false`.', () => {
				const wrapper = mount(<RadioButton />);

				assert.equal(wrapper.prop('isSelected'), false);
			});
		});

		describe('onSelect', () => {
			it('defaults to the Lodash `noop` method.', () => {
				const wrapper = mount(<RadioButton />);

				assert.equal(wrapper.prop('onSelect'), _.noop);
			});
		});
	});
});

describeWithDOM('RadioButton', () => {
	describe('user clicks or taps on the rendered control', () => {
		it('calls the function passed in as the `onSelect` prop.', () => {
			let onSelect;
			let wrapper;

			_.forEach(['~', 'native', 'visualization-container', 'visualization-glow', 'visualization-handle'], (classSubString) => {
				_.forEach(['click', 'touchend'], (event) => {
					onSelect = sinon.spy();
					wrapper = mount(<RadioButton onSelect={onSelect} />);
					wrapper.find(`.${generateBoundClassNames(classSubString)}`).simulate(event);
					assert(onSelect.calledOnce);
				});
			});
		});

		it('passes the new value for `isSelected` as the first argument.', () => {
			const onSelect = sinon.spy();
			let wrapper;

			_.forEach([true, false], (initialIsSelected, i) => {
				wrapper = mount(<RadioButton isSelected={initialIsSelected} onSelect={onSelect} />);
				wrapper.find(`.${generateBoundClassNames('~')}`).simulate('click');
				assert.equal(onSelect.args[i][0], !initialIsSelected);
			});
		});
	});
});
