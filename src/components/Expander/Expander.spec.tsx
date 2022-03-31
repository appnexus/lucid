import _, { forEach, has } from 'lodash';
import assert from 'assert';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { common, controls } from '../../util/generic-tests';
import { ExpanderDumb as Expander } from './Expander';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';

describe('Expander', () => {
	common(Expander);
	controls(Expander, {
		callbackName: 'onToggle',
		controlSelector: '.lucid-Expander-header-toggle',
		eventType: 'click',
	});

	describe('props', () => {
		describe('isExpanded', () => {
			it('sets the value of the `direction` prop on its `ChevronIcon` instance to "up" when `true`.', () => {
				assert.equal(
					shallow(<Expander isExpanded={true} />)
						.find(ChevronIcon)
						.prop('direction'),
					'up'
				);
			});

			it('sets the value of the `direction` prop on its `ChevronIcon` instance to "down" when `false`.', () => {
				assert.equal(
					shallow(<Expander isExpanded={false} />)
						.find(ChevronIcon)
						.prop('direction'),
					'down'
				);
			});

			it('adds the "lucid-Expander-is-expanded" class to the root element when `true`.', () => {
				assert.equal(
					shallow(<Expander isExpanded={true} />).find(
						'.lucid-Expander-is-expanded'
					).length,
					1
				);
			});

			it('adds the "lucid-Expander-content-is-expanded" class to its content container element when `true`.', () => {
				const wrapper = shallow(<Expander isExpanded={true} />);
				assert.equal(wrapper.find('.lucid-Expander-is-expanded').length, 1);
			});

			it('defaults to `false`.', () => {
				assert.equal(mount(<Expander />).prop('isExpanded'), false);
			});
		});

		describe('onToggle', () => {
			it('defaults to the Lodash `noop` method.', () => {
				assert.equal(mount(<Expander />).prop('onToggle'), _.noop);
			});
		});

		describe('kind', () => {
			it('defaults "simple".', () => {
				assert.equal(mount(<Expander />).prop('kind'), 'simple');
			});
			it('accepts "highlighted".', () => {
				assert.equal(
					mount(<Expander kind='highlighted' />).prop('kind'),
					'highlighted'
				);
			});
			it('`kind=highlighted` adds the "lucid-Expander-kind-highlighted" class.', () => {
				const wrapper = shallow(
					<Expander isExpanded={true} kind='highlighted' />
				);
				assert.equal(
					wrapper.find('.lucid-Expander-kind-highlighted').length,
					1
				);
			});
		});

		describe('Label (as a prop)', () => {
			it('renders the value in the header in `lucid-Expander-text` class neighboring `ChevronIcon` instance.', () => {
				assert.equal(
					shallow(<Expander Label='foo' />)
						.find('.lucid-Expander-text')
						.prop('children'),
					'foo'
				);
			});
		});

		describe('Label (as a child)', () => {
			it('renders the value in the header in `lucid-Expander-text` class neighboring `ChevronIcon` instance.', () => {
				const wrapper = shallow(
					<Expander>
						<Expander.Label>foo</Expander.Label>
					</Expander>
				);

				assert.equal(
					wrapper.find('.lucid-Expander-text').prop('children'),
					'foo'
				);
			});
		});

		describe('AdditionalLabelContent (as a prop)', () => {
			it('renders the value in `lucid-Expander-additional-content` class', () => {
				const additionalContent = <div>Hello</div>;
				const wrapper = shallow(
					<Expander>
						<Expander.AdditionalLabelContent>
							{additionalContent}
						</Expander.AdditionalLabelContent>
					</Expander>
				);
				assert.equal(
					wrapper.find('.lucid-Expander-additional-content').prop('children'),
					additionalContent
				);
			});
		});

		describe('AdditionalLabelContent (as a child)', () => {
			it('renders the value in `lucid-Expander-additional-content` class', () => {
				const additionalContent = <div>Hello</div>;
				const wrapper = shallow(
					<Expander AdditionalLabelContent={additionalContent} />
				);
				assert.equal(
					wrapper.find('.lucid-Expander-additional-content').prop('children'),
					additionalContent
				);
			});
		});

		describe('pass throughs', () => {
			let wrapper: any;
			const defaultProps = Expander.defaultProps;

			beforeEach(() => {
				const props = {
					...defaultProps,
					className: 'wut',
					isExpanded: true,
					onToggle: _.noop,
					Label: <div>Label</div>,
					AdditionalLabelContent: <div>Additional Label Content</div>,
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = shallow(<Expander {...props} />);
			});

			afterEach(() => {
				wrapper.unmount();
			});

			it('passes through props not defined in `propTypes` to the root element.', () => {
				const rootProps = wrapper.find('.lucid-Expander').props();

				expect(wrapper.first().prop(['className'])).toContain('wut');
				expect(wrapper.first().prop(['style'])).toMatchObject({
					marginRight: 10,
				});
				expect(wrapper.first().prop(['data-testid'])).toBe(10);

				// 'className' and 'style' are plucked from the pass through object
				// but still appear becuase they are also directly passed to the root element as a prop
				forEach(['className', 'data-testid', 'style', 'children'], (prop) => {
					expect(has(rootProps, prop)).toBe(true);
				});
			});
			it('omits all the props defined in `propTypes` (plus, in addition, `initialState`, and `callbackId`) to the root element', () => {
				const rootProps = wrapper.find('.lucid-Expander').props();

				forEach(
					[
						'isExpanded',
						'onToggle',
						'Label',
						'AdditionalLabelContent',
						'kind',
						'initialState',
						'callbackId',
					],
					(prop) => {
						expect(has(rootProps, prop)).toBe(false);
					}
				);
			});
		});
	});
});

describe('Expander', () => {
	let wrapper: any;

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	describe('user clicks on the header', () => {
		it('calls the function passed in as the `onToggle` prop', () => {
			const onToggle = sinon.spy();
			wrapper = mount(<Expander onToggle={onToggle} Label='foo' />);

			wrapper.find('.lucid-Expander-header-toggle').first().simulate('click');
			wrapper.find('.lucid-Expander-icon').first().simulate('click');
			wrapper.find('.lucid-Expander-text').first().simulate('click');

			assert.equal(onToggle.callCount, 3);
		});

		it('should call `onToggle` correctly when not `isExpanded`', () => {
			const onToggle = sinon.spy();
			wrapper = mount(
				<Expander isExpanded={false} onToggle={onToggle} Label='foo' />
			);

			wrapper.find('.lucid-Expander-header-toggle').first().simulate('click');
			wrapper.find('.lucid-Expander-icon').first().simulate('click');
			wrapper.find('.lucid-Expander-text').first().simulate('click');

			assert.equal(onToggle.args[0][0], true);
			assert.equal(onToggle.args[1][0], true);
			assert.equal(onToggle.args[2][0], true);
		});

		it('should call `onToggle` correctly when `isExpanded`', () => {
			const onToggle = sinon.spy();
			wrapper = mount(
				<Expander isExpanded={true} onToggle={onToggle} Label='foo' />
			);

			wrapper.find('.lucid-Expander-header-toggle').first().simulate('click');
			wrapper.find('.lucid-Expander-icon').first().simulate('click');
			wrapper.find('.lucid-Expander-text').first().simulate('click');

			assert.equal(onToggle.args[0][0], false);
			assert.equal(onToggle.args[1][0], false);
			assert.equal(onToggle.args[2][0], false);
		});
	});
});
