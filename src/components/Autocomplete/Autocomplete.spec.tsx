import _ from 'lodash';
import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import sinon from 'sinon';

import { findTypes } from '../../util/component-types';
import { common } from '../../util/generic-tests';
import { AutocompleteDumb as Autocomplete } from './Autocomplete';
import { DropMenuDumb as DropMenu } from '../DropMenu/DropMenu';
import * as KEYCODE from '../../constants/key-code';

describe('Autocomplete', () => {
	common(Autocomplete);

	describe('render', () => {
		it('should render a DropMenu', () => {
			const wrapper = shallow(<Autocomplete />, {
				disableLifecycleMethods: true,
			});

			assert.strictEqual(wrapper.find('DropMenu').length, 1);
		});
	});

	describe('props', () => {
		describe('isDisabled', () => {
			it('should pass the `isDisabled` prop thru to the underlying DropMenu', () => {
				const wrapper = shallow(<Autocomplete isDisabled={true} />, {
					disableLifecycleMethods: true,
				});

				const dropMenuWrapper = wrapper.find('DropMenu');

				assert.strictEqual(dropMenuWrapper.prop('isDisabled'), true);
			});

			it('should apply the appropriate classNames to the control', () => {
				const wrapper = shallow(<Autocomplete isDisabled={true} />, {
					disableLifecycleMethods: true,
				});

				const controlWrapper = wrapper.find('.lucid-Autocomplete-Control');

				assert(
					controlWrapper.hasClass('lucid-Autocomplete-Control-is-disabled')
				);
			});
		});

		describe('suggestions', () => {
			it('should create `DropMenu.Option`s for each suggestion and pass thru to underlying DropMenu', () => {
				const wrapper = shallow(
					<Autocomplete
						suggestions={['Portland', 'portal', 'porridge', 'potent', 'please']}
					/>,
					{ disableLifecycleMethods: true }
				);

				const options = _.map(
					findTypes(wrapper.find(DropMenu).props(), DropMenu.Option),
					'props'
				);

				assert.strictEqual('Portland', options[0].children);
				assert.strictEqual('portal', options[1].children);
				assert.strictEqual('porridge', options[2].children);
				assert.strictEqual('potent', options[3].children);
				assert.strictEqual('please', options[4].children);
			});
		});

		describe('value', () => {
			let wrapper: any;
			let rootMountNode: any;

			beforeEach(() => {
				rootMountNode = document.createElement('div');
				document.body.appendChild(rootMountNode);
			});

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}

				document.body.removeChild(rootMountNode);
			});

			it('should set the text value of the input', () => {
				wrapper = mount(<Autocomplete value='Portland' />, {
					attachTo: rootMountNode,
				});

				const inputDOMNode: any = document.querySelector(
					'.lucid-Autocomplete-Control-input'
				);

				assert.strictEqual(
					inputDOMNode.value,
					'Portland',
					'input value must match prop value'
				);
			});

			it('should change the text value of the input when the prop changes', () => {
				wrapper = mount(<Autocomplete value='Portland' />, {
					attachTo: rootMountNode,
				});

				wrapper.setProps({
					...wrapper.props(),
					value: 'Boston',
				});
				const inputDOMNode: any = document.querySelector(
					'.lucid-Autocomplete-Control-input'
				);

				assert.strictEqual(
					inputDOMNode.value,
					'Boston',
					'input value must match bew prop value'
				);
			});
		});

		describe('DropMenu', () => {
			it('should pass thru all DropMenu props to the underlying DropMenu', () => {
				const explicitDropMenuProps = {
					isExpanded: true,
					// direction: 'up',
					focusedIndex: 2,
				};

				const wrapper = shallow(
					<Autocomplete DropMenu={explicitDropMenuProps} />,
					{ disableLifecycleMethods: true }
				);

				const dropMenuProps: any = wrapper.find('DropMenu').props();

				_.forEach(explicitDropMenuProps, (value, key) => {
					assert(_.isEqual(dropMenuProps[key], value));
				});
			});
		});

		describe('onChange', () => {
			let wrapper: any;
			let rootMountNode: any;

			beforeEach(() => {
				rootMountNode = document.createElement('div');
				document.body.appendChild(rootMountNode);
			});

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}

				document.body.removeChild(rootMountNode);
			});

			describe('suggestion', () => {
				/* eslint-disable no-console */
				let error: any;

				beforeEach(() => {
					error = console.error;
					console.error = jest.fn();
				});

				afterEach(() => {
					console.error = error;
				});

				it('should be called when a suggestion is selected from the menu', () => {
					const onChange = sinon.spy();

					wrapper = mount(
						<Autocomplete
							onChange={onChange}
							DropMenu={{ isExpanded: true }}
							suggestions={[
								'Portland',
								'portal',
								'porridge',
								'potent',
								'please',
							]}
							{...{ testProp: 'foo' }}
						/>
					);

					const menuDOMNode: any = document.querySelector(
						'.lucid-ContextMenu-FlyOut .lucid-DropMenu-option-container'
					);
					menuDOMNode.children[2].click();

					assert(onChange.called);
					const [textValue, { props, event }] = onChange.lastCall.args;
					assert.strictEqual(textValue, 'porridge');
					assert(props);
					assert.strictEqual(props.testProp, 'foo');
					assert(event);
					expect(console.error).toHaveBeenCalledTimes(1);
				});

				it('should be called when user types into the text box', () => {
					const onChange = sinon.spy();

					wrapper = mount(
						<Autocomplete onChange={onChange} {...{ testProp: 'foo' }} />,
						{
							attachTo: rootMountNode,
						}
					);

					const inputDOMNode: any = document.querySelector(
						'.lucid-Autocomplete-Control-input'
					);

					// set the input value and dispatch an `input` event
					inputDOMNode.value = 'aaa';
					const inputEvent = document.createEvent('Event');
					inputEvent.initEvent('input', true, true);
					inputDOMNode.dispatchEvent(inputEvent);

					assert(onChange.called, 'onChange must be called');
					const [textValue, { props, event }] = onChange.lastCall.args;
					assert.strictEqual(textValue, 'aaa', 'value must match input');
					assert(props, 'props must be passed');
					assert.strictEqual(
						props.testProp,
						'foo',
						'aditional props must be included'
					);
					assert(event, 'event must be passed');
				});

				/* eslint-enable no-console */
			});
		});

		describe('onSelect', () => {
			let wrapper: any;

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('should be called when a suggestion is selected from the menu', () => {
				const onSelect: any = sinon.spy();

				wrapper = mount(
					<Autocomplete
						onSelect={onSelect}
						DropMenu={{ isExpanded: true }}
						suggestions={['Portland', 'portal', 'porridge', 'potent', 'please']}
						{...{ testProp: 'foo' }}
					/>
				);

				const menuDOMNode: any = document.querySelector(
					'.lucid-ContextMenu-FlyOut .lucid-DropMenu-option-container'
				);
				menuDOMNode.children[2].click();

				assert(onSelect.called, 'onSelect must be called');
				const [optionIndex, { props, event }] = onSelect.lastCall.args;
				assert.strictEqual(optionIndex, 2, 'optionIndex must be accurate');
				assert(props, 'props must be passed');
				assert.strictEqual(
					props.testProp,
					'foo',
					'aditional props must be included'
				);
				assert(event, 'event must be passed');
			});
		});

		describe('onExpand', () => {
			let wrapper: any;
			let rootMountNode: any;

			beforeEach(() => {
				rootMountNode = document.createElement('div');
				document.body.appendChild(rootMountNode);
			});

			afterEach(() => {
				if (wrapper && wrapper.exists()) {
					wrapper.unmount();
				}

				document.body.removeChild(rootMountNode);
			});

			it('should be called when the input value changes to a non-empty value', () => {
				const onExpand = sinon.spy();

				wrapper = mount(
					<Autocomplete
						onExpand={onExpand}
						suggestions={['Portland', 'portal', 'porridge', 'potent', 'please']}
						{...{ testProp: 'foo' }}
					/>,
					{ attachTo: rootMountNode }
				);

				const inputDOMNode: any = document.querySelector(
					'.lucid-Autocomplete-Control-input'
				);

				// set the input value and dispatch an `input` event
				inputDOMNode.value = 'aaa';
				const inputEvent = document.createEvent('Event');
				inputEvent.initEvent('input', true, true);
				inputDOMNode.dispatchEvent(inputEvent);

				assert(onExpand.called, 'onExpand must be called');
				const [{ props, event }] = onExpand.lastCall.args;
				assert(props, 'props must be passed');
				assert.strictEqual(
					props.testProp,
					'foo',
					'aditional props must be included'
				);
				assert(event, 'event must be passed');
			});

			it('should be called when not expanded and down array key is pressed', () => {
				const onExpand = sinon.spy();

				const wrapper = shallow(
					<Autocomplete
						onExpand={onExpand}
						suggestions={['Portland', 'portal', 'porridge', 'potent', 'please']}
						{...{ testProp: 'foo' }}
						DropMenu={{
							isExpanded: false,
						}}
					/>,
					{ disableLifecycleMethods: true }
				);

				wrapper.find('.lucid-Autocomplete-Control-input').simulate('keydown', {
					keyCode: KEYCODE.ArrowDown,
					stopPropagation: _.noop,
				});

				assert(onExpand.called, 'onExpand must be called');
				const [{ props, event }] = onExpand.lastCall.args;
				assert(props, 'props must be passed');
				assert.strictEqual(
					props.testProp,
					'foo',
					'aditional props must be included'
				);
				assert(event, 'event must be passed');
			});

			it('should be called when the control input is clicked', () => {
				const onExpand = sinon.spy();

				wrapper = mount(
					<Autocomplete
						onExpand={onExpand}
						suggestions={['Portland', 'portal', 'porridge', 'potent', 'please']}
						{...{ testProp: 'foo' }}
					/>,
					{ attachTo: rootMountNode }
				);

				wrapper.find('.lucid-Autocomplete-Control-input').simulate('click');

				assert(onExpand.called, 'onExpand must be called');
				const [{ props, event }] = onExpand.lastCall.args;
				assert(props, 'props must be passed');
				assert.strictEqual(
					props.testProp,
					'foo',
					'aditional props must be included'
				);
				assert(event, 'event must be passed');
			});

			it('should be called when not expanded the non-input control is clicked', () => {
				const onExpand = sinon.spy();

				wrapper = mount(
					<Autocomplete
						onExpand={onExpand}
						suggestions={['Portland', 'portal', 'porridge', 'potent', 'please']}
						{...{ testProp: 'foo' }}
						DropMenu={{
							isExpanded: false,
						}}
					/>,
					{ attachTo: rootMountNode }
				);

				wrapper.find('.lucid-Autocomplete-Control').simulate('click');

				assert(onExpand.called, 'onExpand must be called');
				const [{ props, event }] = onExpand.lastCall.args;
				assert(props, 'props must be passed');
				assert.strictEqual(
					props.testProp,
					'foo',
					'aditional props must be included'
				);
				assert(event, 'event must be passed');
			});
		});
	});
});
