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
	describe('user clicks on the rendered control', () => {
		it('calls the function passed in as the `onSelect` prop...', () => {
			_.forEach(['', '-native', '-visualization-container', '-visualization-glow', '-visualization-handle'], (classSubString) => {
				const onSelect = sinon.spy();
				const wrapper = mount(<Switch onSelect={onSelect} />);

				wrapper.find(`.lucid-Switch${classSubString}`).simulate('click');
				assert(onSelect.calledOnce);
			});
		});

		it('...and when `isSelected` is true passes along false as the first argument and a React synthetic event as the second argument.', () => {
			_.forEach(['', '-native', '-visualization-container', '-visualization-glow', '-visualization-handle'], (classSubString) => {
				const onSelect = sinon.spy();
				const wrapper = mount(<Switch isSelected={true} onSelect={onSelect} />);

				wrapper.find(`.lucid-Switch${classSubString}`).simulate('click');
				assert.equal(onSelect.args[0][0], false);
				assert(onSelect.args[0][1] instanceof SyntheticEvent);
			});
		});

		it('...and when `isSelected` is false passes along true as the first argument and a React synthetic event as the second argument.', () => {
			_.forEach(['', '-native', '-visualization-container', '-visualization-glow', '-visualization-handle'], (classSubString) => {
				const onSelect = sinon.spy();
				const wrapper = mount(<Switch isSelected={false} onSelect={onSelect} />);

				wrapper.find(`.lucid-Switch${classSubString}`).simulate('click');
				assert.equal(onSelect.args[0][0], true);
				assert(onSelect.args[0][1] instanceof SyntheticEvent);
			});
		});
	});

	describe('user taps on the rendered control', () => {
		it('calls the function passed in as the `onSelect` prop...', () => {
			_.forEach(['', '-native', '-visualization-container', '-visualization-glow', '-visualization-handle'], (classSubString) => {
				const onSelect = sinon.spy();
				const wrapper = mount(<Switch onSelect={onSelect} />);

				wrapper.find(`.lucid-Switch${classSubString}`).simulate('touchend');
				assert(onSelect.calledOnce);
			});
		});

		it('...and when `isSelected` is true passes along false as the first argument and a React synthetic event as the second argument.', () => {
			_.forEach(['', '-native', '-visualization-container', '-visualization-glow', '-visualization-handle'], (classSubString) => {
				const onSelect = sinon.spy();
				const wrapper = mount(<Switch isSelected={true} onSelect={onSelect} />);

				wrapper.find(`.lucid-Switch${classSubString}`).simulate('touchend');
				assert.equal(onSelect.args[0][0], false);
				assert(onSelect.args[0][1] instanceof SyntheticEvent);
			});
		});

		it('...and when `isSelected` is false passes along true as the first argument and a React synthetic event as the second argument.', () => {
			_.forEach(['', '-native', '-visualization-container', '-visualization-glow', '-visualization-handle'], (classSubString) => {
				const onSelect = sinon.spy();
				const wrapper = mount(<Switch isSelected={false} onSelect={onSelect} />);

				wrapper.find(`.lucid-Switch${classSubString}`).simulate('touchend');
				assert.equal(onSelect.args[0][0], true);
				assert(onSelect.args[0][1] instanceof SyntheticEvent);
			});
		});
	});
});
