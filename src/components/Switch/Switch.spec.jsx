import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import describeWithDOM from '../../util/describe-with-dom';
import { common } from '../../util/generic-tests';
import { bindClassNames } from '../../util/style-helpers';

import Switch from './Switch';

const generateBoundClassNames = bindClassNames('Switch');

describe('Switch', () => {
	common(Switch);

	const booleanValues = [true, false];

	describe('props', () => {
		describe('isDisabled', () => {
			it('sets the `disabled` attribute of the native check box element.', () => {
				_.forEach(booleanValues, (testValue) => {
					const wrapper = shallow(<Switch isDisabled={testValue} />);

					assert.equal(wrapper.find('input[type="checkbox"]').prop('disabled'), testValue);
				});
			});

			it('defaults to `false`.', () => {
				const wrapper = mount(<Switch />);

				assert.equal(wrapper.prop('isDisabled'), false);
			});
		});

		describe('isSelected', () => {
			it('sets the `checked` attribute of the native check box element.', () => {
				_.forEach(booleanValues, (testValue) => {
					const wrapper = shallow(<Switch isSelected={testValue} />);

					assert.equal(wrapper.find('input[type="checkbox"]').prop('checked'), testValue);
				});
			});

			it('defaults to `false`.', () => {
				const wrapper = mount(<Switch />);

				assert.equal(wrapper.prop('isSelected'), false);
			});
		});

		describe('onSelect', () => {
			it('defaults to the Lodash `noop` method.', () => {
				const wrapper = mount(<Switch />);

				assert.equal(wrapper.prop('onSelect'), _.noop);
			});
		});

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to the native input.', () => {
				const wrapper = mount(
					<Switch className='wut' isDisabled={true} isSelected={true} style={{ fontWeight: 'bold' }} onSelect={_.noop}
							foo={1} bar={2} baz={3} qux={4} quux={5} />
				);
				const nativeProps = _.keys(wrapper.find('input[type="checkbox"]').props());

				// It should pass `foo`, `bar`, `baz`, `qux`, and `quux` through
				// to the native input.
				_.forEach(['foo', 'bar', 'baz', 'qux', 'quux'], (prop) => {
					assert(_.includes(nativeProps, prop));
				});
			});
		});
	});
});

describeWithDOM('Switch', () => {
	describe('user clicks or taps on the rendered control', () => {
		it('calls the function passed in as the `onSelect` prop.', () => {
			let onSelect;
			let wrapper;

			_.forEach(['~', 'native', 'visualization-container', 'visualization-glow', 'visualization-handle'], (classSubString) => {
				_.forEach(['click', 'touchend'], (event) => {
					onSelect = sinon.spy();
					wrapper = mount(<Switch onSelect={onSelect} />);
					wrapper.find(`.${generateBoundClassNames(classSubString)}`).simulate(event);
					assert(onSelect.calledOnce);
				});
			});
		});
	});
});
