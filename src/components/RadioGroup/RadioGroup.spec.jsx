import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import SyntheticEvent from 'react/lib/SyntheticEvent';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import describeWithDOM from '../../util/describe-with-dom';
import getRandom from '../../util/random';

import RadioGroup from './RadioGroup';
import RadioButtonLabeled from '../RadioButtonLabeled/RadioButtonLabeled';

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

				_.forEach(wrapper.find(RadioButtonLabeled).nodes, (node) => {
					assert.equal(node.props.name, name);
				});
			});

			it('defaults to a string that is passed along to the children.', () => {
				const wrapper = mount(
					<RadioGroup>
						<RadioGroup.RadioButton />
						<RadioGroup.RadioButton />
						<RadioGroup.RadioButton />
					</RadioGroup>
				);
				const name = wrapper.first().prop('name');

				_.forEach(wrapper.find(RadioButtonLabeled).nodes, (node) => {
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

		describe('selectedIndex', () => {
			it('sets the `isSelected` prop of the child radio button at the matching index to true...', () => {
				const wrapper= shallow(
					<RadioGroup selectedIndex={2}>
						<RadioGroup.RadioButton />
						<RadioGroup.RadioButton />
						<RadioGroup.RadioButton />
					</RadioGroup>
				);
				const childNodes = wrapper.find(RadioButtonLabeled).nodes;

				assert.equal(childNodes[0].props.isSelected, false);
				assert.equal(childNodes[1].props.isSelected, false);
				assert.equal(childNodes[2].props.isSelected, true);
			});

			it('...except when a child component already has an explicitly defined `isSelected` prop which takes precedence.', () => {
				const wrapper = shallow(
					<RadioGroup selectedIndex={2}>
						<RadioGroup.RadioButton isSelected={true} />
						<RadioGroup.RadioButton isSelected={true} />
						<RadioGroup.RadioButton />
					</RadioGroup>
				);
				const childNodes = wrapper.find(RadioButtonLabeled).nodes;

				assert.equal(childNodes[0].props.isSelected, false);
				assert.equal(childNodes[1].props.isSelected, true);
				assert.equal(childNodes[2].props.isSelected, false);
			});

			it('defaults to 0.', () => {
				const wrapper = shallow(
					<RadioGroup>
						<RadioGroup.RadioButton />
						<RadioGroup.RadioButton />
						<RadioGroup.RadioButton />
					</RadioGroup>
				);
				const childNodes = wrapper.find(RadioButtonLabeled).nodes;

				assert.equal(childNodes[0].props.isSelected, true);
				assert.equal(childNodes[1].props.isSelected, false);
				assert.equal(childNodes[2].props.isSelected, false);
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

	describe('RadioGroup.Label', () => {
		it('passes its children through as the `Label` prop for the corresponding `RadioButtonLabeled`.', () => {
			const wrapper = shallow(
				<RadioGroup>
					<RadioGroup.RadioButton>
						<RadioGroup.Label>foo</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton>
						<RadioGroup.Label>bar</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton>
						<RadioGroup.Label>
							<span>baz</span>
							<span>qux</span>
						</RadioGroup.Label>
					</RadioGroup.RadioButton>
				</RadioGroup>
			);
			const labels = wrapper.find(RadioGroup.Label);

			assert.equal(labels.at(0).children().text(), 'foo');
			assert.equal(labels.at(1).children().text(), 'bar');
			assert.equal(labels.at(2).children().at(0).text(), 'baz');
			assert.equal(labels.at(2).children().at(1).text(), 'qux');
		});
	});
});

describeWithDOM('RadioGroup', () => {
	it.only('should handle multiple children', () => {
		const wrapper = mount(
			<RadioGroup>
				<RadioGroup.RadioButton>
					<RadioGroup.Label>
						<span id='foo'>foo</span>
						<span id='bar'>bar</span>
					</RadioGroup.Label>
				</RadioGroup.RadioButton>
			</RadioGroup>
		);

		assert.equal(wrapper.find('#foo').text(), 'foo');
		assert.equal(wrapper.find('#bar').text(), 'bar');
	});

	describe('user selects one of the radio button children', () => {
		it('calls the function passed in as the `onSelect` prop...', () => {
			const onSelect = sinon.spy();
			const wrapper = mount(
				<RadioGroup onSelect={onSelect}>
					<RadioGroup.RadioButton />
					<RadioGroup.RadioButton />
					<RadioGroup.RadioButton />
				</RadioGroup>
			);

			wrapper.children().at(1).children().simulate('click');
			assert(onSelect.calledOnce);
		});

		it('...and passes along the index of that child as the first argument and a React synthetic event as the second argument.', () => {
			const onSelect = sinon.spy();
			const wrapper = mount(
				<RadioGroup onSelect={onSelect}>
					<RadioGroup.RadioButton />
					<RadioGroup.RadioButton />
					<RadioGroup.RadioButton />
				</RadioGroup>
			);

			wrapper.children().at(1).children().simulate('click');
			assert.equal(onSelect.args[0][0], 1);
			assert(_.last(onSelect.args[0]).event instanceof SyntheticEvent);
		});

		it('calls the `onSelect` prop, if a function, of the child prior to calling its own.', () => {
			const childOnSelect = sinon.spy();
			const onSelect = sinon.spy();
			const wrapper = mount(
				<RadioGroup onSelect={onSelect}>
					<RadioGroup.RadioButton />
					<RadioGroup.RadioButton onSelect={childOnSelect} />
					<RadioGroup.RadioButton />
				</RadioGroup>
			);

			wrapper.children().at(1).children().simulate('click');
			assert(childOnSelect.calledBefore(onSelect));
		});
	});
});
