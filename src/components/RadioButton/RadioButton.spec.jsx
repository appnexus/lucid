import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import SyntheticEvent from 'react/lib/SyntheticEvent';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import describeWithDOM from '../../util/describe-with-dom';
import { common } from '../../util/generic-tests';

import RadioButton from './RadioButton';

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

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to the native input.', () => {
				const wrapper = mount(
					<RadioButton className='wut' isDisabled={true} isSelected={true} style={{ fontWeight: 'bold' }} onSelect={_.noop}
							foo={1} bar={2} baz={3} qux={4} quux={5} />
				);
				const nativeProps = _.keys(wrapper.find('input[type="radio"]').props());

				// It should pass `foo`, `bar`, `baz`, `qux`, and `quux` through
				// to the native input.
				_.forEach(['foo', 'bar', 'baz', 'qux', 'quux'], (prop) => {
					assert(_.includes(nativeProps, prop));
				});
			});
		});
	});
});

describeWithDOM('RadioButton', () => {
	_.forEach([['click', 'click'], ['tap', 'touchend']], ([verb, event]) => {
		describe(`user ${verb}s on the rendered control`, () => {
			it('calls the function passed in as the `onSelect` prop if `isSelected` is false...', () => {
				_.forEach(['', '-native', '-visualization-container', '-visualization-glow', '-visualization-dot'], (classSubString) => {
					const onSelect = sinon.spy();
					const wrapper = mount(<RadioButton isSelected={false} onSelect={onSelect} />);

					wrapper.find(`.lucid-RadioButton${classSubString}`).simulate(event);
					assert(onSelect.calledOnce);
				});
			});

			it('...and passes along true as the first argument and a React synthetic event as the second argument.', () => {
				_.forEach(['', '-native', '-visualization-container', '-visualization-glow', '-visualization-dot'], (classSubString) => {
					const onSelect = sinon.spy();
					const wrapper = mount(<RadioButton isSelected={false} onSelect={onSelect} />);

					wrapper.find(`.lucid-RadioButton${classSubString}`).simulate(event);
					assert.equal(onSelect.args[0][0], true);
					assert(onSelect.args[0][1] instanceof SyntheticEvent);
				});
			});

			it('does not call the function passed in as the `onSelect` prop if `isSelected` is true.', () => {
				_.forEach(['', '-native', '-visualization-container', '-visualization-glow', '-visualization-dot'], (classSubString) => {
					const onSelect = sinon.spy();
					const wrapper = mount(<RadioButton isSelected={true} onSelect={onSelect} />);

					wrapper.find(`.lucid-RadioButton${classSubString}`).simulate(event);
					assert.equal(onSelect.calledOnce, false);
				});
			});
		});
	});
});
