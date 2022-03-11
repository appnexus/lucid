import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { common } from '../../util/generic-tests';

import { RadioGroupDumb as RadioGroup } from './RadioGroup';
import RadioButtonLabeled from '../RadioButtonLabeled/RadioButtonLabeled';
import RadioButton from '../RadioButton/RadioButton';

const defaultProps = RadioGroup.defaultProps;
const radioButtonDefaultProps = RadioButton.defaultProps;

describe('RadioGroup', () => {
	common(RadioGroup);

	describe('props', () => {
		describe('name', () => {
			it('sets the `name` attribute of the child radio buttons.', () => {
				const name = 'radio';
				const wrapper = shallow(
					<RadioGroup {...defaultProps} name={name}>
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
					</RadioGroup>
				);

				wrapper.find(RadioButtonLabeled).forEach((node) => {
					assert.strictEqual(node.props().name, name);
				});
			});

			it('defaults to a string that is passed along to the children.', () => {
				const wrapper = mount(
					<RadioGroup {...defaultProps}>
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
					</RadioGroup>
				);
				const name = wrapper.first().prop('name');

				wrapper.find(RadioButtonLabeled).forEach((node) => {
					assert.strictEqual(node.props().name, name);
				});
			});
		});

		describe('isDisabled', () => {
			it('should set `isDisabled` to true for all child radio buttons', () => {
				const wrapper = shallow(
					<RadioGroup {...defaultProps} isDisabled={true}>
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
					</RadioGroup>
				);
				wrapper.find(RadioButtonLabeled).forEach((node) => {
					assert(node.props().isDisabled);
				});
			});

			it('should set `isDisabled` to true for all child radio buttons even if the child radio buttons have isDisabled set as false', () => {
				const wrapper = shallow(
					<RadioGroup {...defaultProps} isDisabled={true}>
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
						<RadioGroup.RadioButton
							{...radioButtonDefaultProps}
							isDisabled={false}
						/>
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
					</RadioGroup>
				);
				wrapper.find(RadioButtonLabeled).forEach((node) => {
					assert(node.props().isDisabled);
				});
			});

			it('should allow specific radio buttons to be disabled', () => {
				const wrapper = shallow(
					<RadioGroup {...defaultProps} isDisabled={false}>
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
						<RadioGroup.RadioButton
							{...radioButtonDefaultProps}
							isDisabled={true}
						/>
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
					</RadioGroup>
				);

				const childNodes = wrapper.find(RadioButtonLabeled);

				assert.strictEqual(childNodes.at(1).props().isDisabled, true);
			});
		});

		describe('selectedIndex', () => {
			it('sets the `isSelected` prop of the child radio button at the matching index to true...', () => {
				const wrapper = shallow(
					<RadioGroup {...defaultProps} selectedIndex={2}>
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
					</RadioGroup>
				);
				const childNodes = wrapper.find(RadioButtonLabeled);

				assert.strictEqual(childNodes.at(0).props().isSelected, false);
				assert.strictEqual(childNodes.at(1).props().isSelected, false);
				assert.strictEqual(childNodes.at(2).props().isSelected, true);
			});

			it('...except when a child component already has an explicitly defined `isSelected` prop which takes precedence.', () => {
				const wrapper = shallow(
					<RadioGroup {...defaultProps} selectedIndex={2}>
						<RadioGroup.RadioButton
							{...radioButtonDefaultProps}
							isSelected={true}
						/>
						<RadioGroup.RadioButton
							{...radioButtonDefaultProps}
							isSelected={true}
						/>
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
					</RadioGroup>
				);
				const childNodes = wrapper.find(RadioButtonLabeled);

				assert.strictEqual(childNodes.at(0).props().isSelected, false);
				assert.strictEqual(childNodes.at(1).props().isSelected, true);
				assert.strictEqual(childNodes.at(2).props().isSelected, false);
			});

			it('defaults to 0.', () => {
				const wrapper = shallow(
					<RadioGroup {...defaultProps}>
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
					</RadioGroup>
				);
				const childNodes = wrapper.find(RadioButtonLabeled);

				assert.strictEqual(childNodes.at(0).props().isSelected, true);
				assert.strictEqual(childNodes.at(1).props().isSelected, false);
				assert.strictEqual(childNodes.at(2).props().isSelected, false);
			});
		});

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to the root element.', () => {
				const wrapper = shallow(
					<RadioGroup
						{...defaultProps}
						{...{ foo: 1, bar: 2, baz: 3, qux: 4, quux: 5 }}
						className='testClassName'
					>
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
						<RadioGroup.RadioButton {...radioButtonDefaultProps} />
					</RadioGroup>
				);
				const rootProps = _.keys(wrapper.first().props());

				// It should pass 'className' and 'children'
				// and `foo`, `bar`, `baz`, `qux`, and `quux` asthrough
				// to the root element.
				_.forEach(
					['className', 'children', 'foo', 'bar', 'baz', 'qux', 'quux'],
					(prop) => {
						assert(_.includes(rootProps, prop));
					}
				);
			});
		});

		describe('nonPassThroughs', () => {
			it('filters out the nonPassThroughs from the component wrapper.', () => {
				const nonPassThroughs = {
					children: <RadioGroup.RadioButton {...radioButtonDefaultProps} />,
					className: 'testClassName',
					name: 'test-name',
					onSelect: _.noop,
					selectedIndex: 1,
					isDisabled: true,
				};
				const combinedProps = { ...defaultProps, ...nonPassThroughs };

				const wrapper = shallow(<RadioGroup {...combinedProps} />);

				expect(wrapper.prop('name')).toBeUndefined;
				expect(wrapper.prop('onSelect')).toBeUndefined;
				expect(wrapper.prop('selectedIndex')).toBeUndefined;
				expect(wrapper.prop('isDisabled')).toBeUndefined;
			});
		});
	});
});

describe('RadioGroup.Label', () => {
	it('passes its children through as the `Label` prop for the corresponding `RadioButtonLabeled`.', () => {
		const wrapper = shallow(
			<RadioGroup {...defaultProps}>
				<RadioGroup.RadioButton {...radioButtonDefaultProps}>
					<RadioGroup.Label>foo</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton {...radioButtonDefaultProps}>
					<RadioGroup.Label>bar</RadioGroup.Label>
				</RadioGroup.RadioButton>
				<RadioGroup.RadioButton {...radioButtonDefaultProps}>
					<RadioGroup.Label>
						<span>baz</span>
						<span>qux</span>
					</RadioGroup.Label>
				</RadioGroup.RadioButton>
			</RadioGroup>
		);
		const labels = wrapper.find(RadioGroup.Label);

		assert.strictEqual(labels.at(0).children().text(), 'foo');
		assert.strictEqual(labels.at(1).children().text(), 'bar');
		assert.strictEqual(labels.at(2).children().at(0).text(), 'baz');
		assert.strictEqual(labels.at(2).children().at(1).text(), 'qux');
	});
});

describe('RadioGroup', () => {
	it('should handle multiple children', () => {
		const wrapper = mount(
			<RadioGroup {...defaultProps}>
				<RadioGroup.RadioButton {...radioButtonDefaultProps}>
					<RadioGroup.Label>
						<span id='foo'>foo</span>
						<span id='bar'>bar</span>
					</RadioGroup.Label>
				</RadioGroup.RadioButton>
			</RadioGroup>
		);

		assert.strictEqual(wrapper.find('#foo').text(), 'foo');
		assert.strictEqual(wrapper.find('#bar').text(), 'bar');
	});

	describe('user selects one of the radio button children', () => {
		it('calls the function passed in as the `onSelect` prop...', () => {
			const onSelect: any = jest.fn();
			const wrapper = mount(
				<RadioGroup {...defaultProps} onSelect={onSelect}>
					<RadioGroup.RadioButton
						{...radioButtonDefaultProps}
						data-test-name='zero'
					/>
					<RadioGroup.RadioButton
						{...radioButtonDefaultProps}
						data-test-name='one'
					/>
					<RadioGroup.RadioButton
						{...radioButtonDefaultProps}
						data-test-name='two'
					/>
				</RadioGroup>
			);

			wrapper.find('RadioButton[data-test-name="one"]').simulate('click');
			expect(onSelect).toBeCalledTimes(1);
		});

		it('...and passes along the index of that child as the first argument and a React synthetic event as the second argument.', () => {
			const onSelect = jest.fn();
			const wrapper = mount(
				<RadioGroup {...defaultProps} onSelect={onSelect}>
					<RadioGroup.RadioButton
						{...radioButtonDefaultProps}
						data-test-name='zero'
					/>
					<RadioGroup.RadioButton
						{...radioButtonDefaultProps}
						data-test-name='one'
					/>
					<RadioGroup.RadioButton
						{...radioButtonDefaultProps}
						data-test-name='two'
					/>
				</RadioGroup>
			);

			wrapper.find('RadioButton[data-test-name="one"]').simulate('click');

			expect(onSelect).toBeCalledTimes(1);
			expect(onSelect.mock.calls[0][0]).toBe(1);
			expect(onSelect.mock.calls[0][1]).toHaveProperty('event');
			expect(onSelect.mock.calls[0][1]).toHaveProperty('props', {
				callbackId: 1,
				className: undefined,
				'data-test-name': 'one',
				isDisabled: false,
				isSelected: false,
				name: '1-lucid-RadioGroup-1',
				onSelect: expect.anything(),
			});
		});

		it('calls the `onSelect` prop, if a function, of the child prior to calling its own.', () => {
			const childOnSelect = sinon.spy();
			const onSelect: any = sinon.spy();
			const wrapper = mount(
				<RadioGroup {...defaultProps} onSelect={onSelect}>
					<RadioGroup.RadioButton
						{...radioButtonDefaultProps}
						data-test-name='zero'
					/>
					<RadioGroup.RadioButton
						{...radioButtonDefaultProps}
						onSelect={childOnSelect}
						data-test-name='one'
					/>
					<RadioGroup.RadioButton
						{...radioButtonDefaultProps}
						data-test-name='two'
					/>
				</RadioGroup>
			);

			wrapper.find('RadioButton[data-test-name="one"]').simulate('click');
			assert(childOnSelect.calledBefore(onSelect));
		});

		it('tests that the correct onSelect is called', () => {
			const onSelect: any = jest.fn();
			const wrapper = mount(
				<RadioGroup {...defaultProps} onSelect={onSelect}>
					<RadioGroup.RadioButton
						{...radioButtonDefaultProps}
						isDisabled={false}
						isSelected={false}
						onSelect={_.noop}
						data-test-name='zero'
					/>
					<RadioGroup.RadioButton
						data-test-name='one'
						{...radioButtonDefaultProps}
					/>
					<RadioGroup.RadioButton
						data-test-name='two'
						{...radioButtonDefaultProps}
					/>
				</RadioGroup>
			);

			wrapper
				.find('RadioButton[data-test-name="one"] > span')
				.simulate('click');

			expect(onSelect).toBeCalledTimes(1);
			expect(onSelect).toBeCalledWith(1, {
				event: expect.anything(),
				props: {
					callbackId: 1,
					className: undefined,
					'data-test-name': 'one',
					isDisabled: false,
					isSelected: false,
					name: '1-lucid-RadioGroup-1',
					onSelect: expect.anything(),
				},
			});
		});
	});
});
