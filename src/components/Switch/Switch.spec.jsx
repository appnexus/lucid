import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import SyntheticEvent from 'react/lib/SyntheticEvent';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import describeWithDOM from '../../util/describe-with-dom';
import { common } from '../../util/generic-tests';

import Switch from './Switch';

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

			_.forEach(['', '-native', '-visualization-container', '-visualization-glow', '-visualization-handle'], (classSubString) => {
				_.forEach(['click', 'touchend'], (event) => {
					onSelect = sinon.spy();
					wrapper = mount(<Switch onSelect={onSelect} />);
					wrapper.find(`.lucid-Switch${classSubString}`).simulate(event);
					assert(onSelect.calledOnce);
				});
			});
		});

		it('passes the opposite of the value of the `isSelected` prop as the first argument.', () => {
			const onSelect = sinon.spy();
			const wrapper = mount(<Switch isSelected={true} onSelect={onSelect} />);

			wrapper.find(`.lucid-Switch`).simulate('click');
			assert.equal(onSelect.args[0][0], false);
		});

		it('passes the React synthetic event as the second argument.', () => {
			const onSelect = sinon.spy();
			const wrapper = mount(<Switch onSelect={onSelect} />);

			wrapper.find(`.lucid-Switch`).simulate('click');
			assert(onSelect.args[0][1] instanceof SyntheticEvent);
		});
	});
});
