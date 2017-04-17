import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import sinon from 'sinon';
import _ from 'lodash';
import { common } from '../../util/generic-tests';

import { DropMenuDumb as DropMenu } from './DropMenu';
import ContextMenu from '../ContextMenu/ContextMenu';
import * as KEYCODE from '../../constants/key-code';

const { Control, Header, Option, OptionGroup, NullOption } = DropMenu;

describe('DropMenu', () => {
	common(DropMenu);

	describe('render', () => {
		it('should render a ContextMenu', () => {
			const wrapper = shallow(
				<DropMenu isExpanded>
					<Control>control</Control>
					<Option>option a</Option>
					<Option>option b</Option>
					<Option>option c</Option>
				</DropMenu>
			);
			assert.equal(wrapper.find('ContextMenu').length, 1);
		});
	});

	describe('props', () => {
		describe('children', () => {
			it('should not render any direct child elements which are not DropMenu-specific', () => {
				const wrapper = shallow(
					<DropMenu className="MyDropMenu">
						<button>button</button>
						<Control>control <i>italic</i></Control>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
						<h1>header</h1>
					</DropMenu>
				);
				assert.equal(wrapper.find('button').length, 0);
				assert.equal(wrapper.find('h1').length, 0);
				assert.equal(wrapper.find('i').length, 1);
			});
		});

		describe('className', () => {
			it('should pass the className prop thru to the root element', () => {
				const wrapper = shallow(
					<DropMenu className="MyDropMenu">
						<Control>control</Control>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</DropMenu>
				);

				const dropMenuClassName = wrapper.first().prop('className');

				assert(_.includes(dropMenuClassName, 'MyDropMenu'));
			});

			describe('FlyOut', () => {
				let wrapper;

				afterEach(() => {
					if (wrapper) {
						wrapper.unmount();
					}
				});

				it('should pass the className prop thru to the FlyOut (portal) element', () => {
					wrapper = mount(
						<DropMenu isExpanded className="MyDropMenu">
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);

					const flyOutClassName = document.querySelector(
						'.lucid-DropMenu.lucid-ContextMenu-FlyOut'
					).className;

					assert(_.includes(flyOutClassName, 'MyDropMenu'));
				});
			});
		});

		describe('style', () => {
			it('should pass the style prop thru to the root element', () => {
				const wrapper = shallow(
					<DropMenu style={{ flex: 2 }}>
						<Control>control</Control>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</DropMenu>
				);

				const dropMenuStyle = wrapper.first().prop('style');

				assert(
					_.isEqual(dropMenuStyle, {
						flex: 2,
					})
				);
			});
		});

		describe('isDisabled', () => {
			it('should make the control handle `onClick`, `onKeyDown`, and have a `tabIndex` when `false`', () => {
				const wrapper = shallow(
					<DropMenu isDisabled={false}>
						<Control>control</Control>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</DropMenu>
				);

				const controlElement = wrapper.find('.lucid-DropMenu-Control');

				assert(!_.isNil(controlElement.prop('tabIndex')));
				assert(!_.isNil(controlElement.prop('onClick')));
				assert(!_.isNil(controlElement.prop('onKeyDown')));
			});

			it('should make the control not handle `onClick`, `onKeydown`, or have a `tabIndex` when `true`', () => {
				const wrapper = shallow(
					<DropMenu isDisabled={true}>
						<Control>control</Control>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</DropMenu>
				);

				const controlElement = wrapper.find('.lucid-DropMenu-Control');

				assert(_.isNil(controlElement.prop('tabIndex')));
				assert(_.isNil(controlElement.prop('onClick')));
				assert(_.isNil(controlElement.prop('onKeyDown')));
			});
		});

		describe('isExpanded', () => {
			it('should pass isExpanded to the underlying ContextMenu component thru props', () => {
				const wrapper = shallow(
					<DropMenu isExpanded>
						<Control>control</Control>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</DropMenu>
				);

				const contextMenuIsExpanded = wrapper
					.find('ContextMenu')
					.prop('isExpanded');

				assert.equal(contextMenuIsExpanded, true);
			});
		});

		describe('direction', () => {
			it('should pass the direction to the underlying ContextMenu component thru props', () => {
				const wrapper = shallow(
					<DropMenu direction="up">
						<Control>control</Control>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</DropMenu>
				);

				const contextMenuDirection = wrapper
					.find('ContextMenu')
					.prop('direction');

				assert.equal(contextMenuDirection, 'up');
			});
		});

		describe('selectedIndices', () => {
			let wrapper;

			afterEach(() => {
				wrapper.unmount();
			});

			it('should render the selected options with appropriate className', () => {
				wrapper = mount(
					<DropMenu isExpanded={true} selectedIndices={[0, 2]}>
						<Control>control</Control>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</DropMenu>
				);
				const optionDOMNodes = document.querySelectorAll(
					'.lucid-ContextMenu-FlyOut .lucid-DropMenu-Option'
				);

				assert(
					_.includes(
						optionDOMNodes[0].className,
						'lucid-DropMenu-Option-is-selected'
					)
				);
				assert(
					!_.includes(
						optionDOMNodes[1].className,
						'lucid-DropMenu-Option-is-selected'
					)
				);
				assert(
					_.includes(
						optionDOMNodes[2].className,
						'lucid-DropMenu-Option-is-selected'
					)
				);
			});
		});

		describe('focusedIndex', () => {
			let wrapper;

			afterEach(() => {
				wrapper.unmount();
			});

			it('should render the focused option with appropriate className', () => {
				wrapper = mount(
					<DropMenu isExpanded={true} focusedIndex={2}>
						<Control>control</Control>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</DropMenu>
				);
				const optionDOMNodes = document.querySelectorAll(
					'.lucid-ContextMenu-FlyOut .lucid-DropMenu-Option'
				);

				assert(
					!_.includes(
						optionDOMNodes[0].className,
						'lucid-DropMenu-Option-is-focused'
					)
				);
				assert(
					!_.includes(
						optionDOMNodes[1].className,
						'lucid-DropMenu-Option-is-focused'
					)
				);
				assert(
					_.includes(
						optionDOMNodes[2].className,
						'lucid-DropMenu-Option-is-focused'
					)
				);
			});
		});

		describe('portalId', () => {
			let wrapper;

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('should render an element under document.body with the same id', () => {
				wrapper = mount(
					<DropMenu portalId="test-dropmenu-portal" isExpanded={true}>
						<Control>control</Control>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</DropMenu>
				);

				const portalDOMNode = document.getElementById('test-dropmenu-portal');

				assert(_.isElement(portalDOMNode));
				assert.equal(document.body, portalDOMNode.parentNode);
			});
		});

		describe('flyOutStyle', () => {
			it('should pass flyOutStyle style object to the ContextMenu.FlyOut', () => {
				const styleObj = {
					width: 123,
					height: 321,
					backgroundColor: 'tan',
				};

				const wrapper = shallow(
					<DropMenu flyOutStyle={styleObj}>
						<Control>control</Control>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</DropMenu>
				);

				assert.deepEqual(
					styleObj,
					wrapper.find(ContextMenu.FlyOut).prop('style'),
					'style object must be passed through to ContextMenu.FlyOut'
				);
			});
		});

		describe('onExpand', () => {
			describe('mouse', () => {
				it('should be called when DropMenu [not expanded, clicked]', () => {
					const onExpand = sinon.spy();
					const wrapper = shallow(
						<DropMenu isExpanded={false} onExpand={onExpand}>
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);

					wrapper.find('.lucid-DropMenu-Control').simulate('click');

					assert(onExpand.called);
				});

				it('should not be called when DropMenu [expanded, clicked]', () => {
					const onExpand = sinon.spy();
					const wrapper = shallow(
						<DropMenu isExpanded={true} onExpand={onExpand}>
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);

					wrapper.find('.lucid-DropMenu-Control').simulate('click');

					assert(onExpand.notCalled);
				});
			});

			describe('keyboard', () => {
				it('should be called when DropMenu [not expanded, has focus, Down Arrow key pressed]', () => {
					const onExpand = sinon.spy();
					const wrapper = shallow(
						<DropMenu isExpanded={false} onExpand={onExpand}>
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);

					wrapper.find('.lucid-DropMenu-Control').simulate('keydown', {
						keyCode: KEYCODE.ArrowDown,
						preventDefault: _.noop,
					});

					assert(onExpand.called);
				});
			});
		});

		describe('onCollapse', () => {
			describe('mouse', () => {
				it('should be called when DropMenu [expanded, control clicked]', () => {
					const onCollapse = sinon.spy();
					const wrapper = shallow(
						<DropMenu isExpanded={true} onCollapse={onCollapse}>
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);

					wrapper.find('.lucid-DropMenu-Control').simulate('click');

					assert(onCollapse.called);
				});

				it('should not be called when DropMenu [not expanded, control clicked]', () => {
					const onCollapse = sinon.spy();
					const wrapper = shallow(
						<DropMenu isExpanded={false} onCollapse={onCollapse}>
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);

					wrapper.find('.lucid-DropMenu-Control').simulate('click');

					assert(onCollapse.notCalled);
				});

				it('should be called when DropMenu [expanded, ContextMenu onClickOut called]', () => {
					const onCollapse = sinon.spy();
					const wrapper = shallow(
						<DropMenu isExpanded={true} onCollapse={onCollapse}>
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);

					wrapper.find('ContextMenu').prop('onClickOut')();

					assert(onCollapse.called);
				});
			});

			describe('keyboard', () => {
				it('should be called when DropMenu [expanded, Escape key pressed]', () => {
					const onCollapse = sinon.spy();
					const wrapper = shallow(
						<DropMenu isExpanded={true} onCollapse={onCollapse}>
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);

					wrapper.find('.lucid-DropMenu-Control').simulate('keydown', {
						keyCode: KEYCODE.Escape,
						preventDefault: _.noop,
					});

					assert(onCollapse.called);
				});
			});
		});

		describe('onSelect', () => {
			describe('mouse', () => {
				let onSelect;
				let wrapper;

				beforeEach(() => {
					onSelect = sinon.spy();

					wrapper = mount(
						<DropMenu isExpanded={true} onSelect={onSelect}>
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);
				});

				afterEach(() => {
					wrapper.unmount();
					onSelect.reset();
				});

				it('should be called when DropMenu [expanded, option clicked]', () => {
					const optionDOMNodes = document.querySelectorAll(
						'.lucid-ContextMenu-FlyOut .lucid-DropMenu-Option'
					);

					optionDOMNodes[2].click();

					assert(onSelect.called);
					assert(onSelect.calledWith(2));
				});
			});

			describe('keyboard', () => {
				it('should be called when DropMenu [expanded, option focused, Enter key  pressed]', () => {
					const onSelect = sinon.spy();
					const wrapper = shallow(
						<DropMenu isExpanded={true} focusedIndex={2} onSelect={onSelect}>
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);

					wrapper.find('.lucid-DropMenu-Control').simulate('keydown', {
						keyCode: KEYCODE.Enter,
						preventDefault: _.noop,
					});

					assert(onSelect.called);
					assert(onSelect.calledWith(2));
				});
			});
		});

		describe('onFocusOption', () => {
			describe('keyboard', () => {
				it('should be called when DropMenu [expanded, focusedIndex=null, Down Arrow key pressed]', () => {
					const onFocusOption = sinon.spy();
					const wrapper = shallow(
						<DropMenu
							isExpanded={true}
							focusedIndex={null}
							onFocusOption={onFocusOption}
						>
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);

					wrapper.find('.lucid-DropMenu-Control').simulate('keydown', {
						keyCode: KEYCODE.ArrowDown,
						preventDefault: _.noop,
					});

					assert(onFocusOption.called);
				});

				it('should be called when DropMenu [expanded, focusedIndex={not last option}, Down Arrow key pressed]', () => {
					const onFocusOption = sinon.spy();
					const wrapper = shallow(
						<DropMenu
							isExpanded={true}
							focusedIndex={1}
							onFocusOption={onFocusOption}
						>
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);

					wrapper.find('.lucid-DropMenu-Control').simulate('keydown', {
						keyCode: KEYCODE.ArrowDown,
						preventDefault: _.noop,
					});

					assert(onFocusOption.called);
				});

				it('should not be called when DropMenu [expanded, focusedIndex={last option}, Down Arrow key pressed]', () => {
					const onFocusOption = sinon.spy();
					const wrapper = shallow(
						<DropMenu
							isExpanded={true}
							focusedIndex={2}
							onFocusOption={onFocusOption}
						>
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);

					wrapper.find('.lucid-DropMenu-Control').simulate('keydown', {
						keyCode: KEYCODE.ArrowDown,
						preventDefault: _.noop,
					});

					assert(onFocusOption.notCalled);
				});

				it('should be called when DropMenu [expanded, focusedIndex={not first option}, Up Arrow key pressed]', () => {
					const onFocusOption = sinon.spy();
					const wrapper = shallow(
						<DropMenu
							isExpanded={true}
							focusedIndex={2}
							onFocusOption={onFocusOption}
						>
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);

					wrapper.find('.lucid-DropMenu-Control').simulate('keydown', {
						keyCode: KEYCODE.ArrowUp,
						preventDefault: _.noop,
					});

					assert(onFocusOption.called);
				});

				it('should not be called when DropMenu [expanded, focusedIndex={first option}, Up Arrow key pressed]', () => {
					const onFocusOption = sinon.spy();
					const wrapper = shallow(
						<DropMenu
							isExpanded={true}
							focusedIndex={0}
							onFocusOption={onFocusOption}
						>
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);

					wrapper.find('.lucid-DropMenu-Control').simulate('keydown', {
						keyCode: KEYCODE.ArrowUp,
						preventDefault: _.noop,
					});

					assert(onFocusOption.notCalled);
				});

				it('should not be called when DropMenu [expanded, focusedIndex={null}, Up Arrow key pressed]', () => {
					const onFocusOption = sinon.spy();
					const wrapper = shallow(
						<DropMenu
							isExpanded={true}
							focusedIndex={null}
							onFocusOption={onFocusOption}
						>
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);

					wrapper.find('.lucid-DropMenu-Control').simulate('keydown', {
						keyCode: KEYCODE.ArrowUp,
						preventDefault: _.noop,
					});

					assert(onFocusOption.notCalled);
				});
			});

			describe('mouse', () => {
				let onFocusOption;
				let wrapper;

				beforeEach(() => {
					onFocusOption = sinon.spy();

					wrapper = mount(
						<DropMenu isExpanded={true} onFocusOption={onFocusOption}>
							<Control>control</Control>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</DropMenu>
					);
				});

				afterEach(() => {
					wrapper.unmount();
					onFocusOption.reset();
				});

				it('should be called when user moves mouse over option', () => {
					const optionDOMNodes = document.querySelectorAll(
						'.lucid-ContextMenu-FlyOut .lucid-DropMenu-Option'
					);
					const mouseMoveEvent = document.createEvent('MouseEvents');
					mouseMoveEvent.initMouseEvent(
						'mousemove', //event type : click, mousedown, mouseup, mouseover, mousemove, mouseout.
						true, //canBubble
						false, //cancelable
						window, //event's AbstractView : should be window
						1, // detail : Event's mouse click count
						50, // screenX
						50, // screenY
						50, // clientX
						50, // clientY
						false, // ctrlKey
						false, // altKey
						false, // shiftKey
						false, // metaKey
						0, // button : 0 = click, 1 = middle button, 2 = right button
						null // relatedTarget : Only used with some event types (e.g. mouseover and mouseout). In other cases, pass null.
					);
					optionDOMNodes[2].dispatchEvent(mouseMoveEvent);

					assert(onFocusOption.called);
					assert(onFocusOption.calledWith(2));
					assert(true);
				});
			});
		});
	});

	describe('child elements', () => {
		describe('Control', () => {
			it('should render the children of Control to the control container', () => {
				const wrapper = shallow(
					<DropMenu>
						<Control>control</Control>
					</DropMenu>
				);

				assert.equal('control', wrapper.find('.lucid-DropMenu-Control').text());
			});
		});

		describe('Option', () => {
			let wrapper;

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('should render the children of each Option in option nodes of the flyout menu', () => {
				wrapper = mount(
					<DropMenu isExpanded>
						<Control>control</Control>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</DropMenu>
				);

				const flyOutDOMNode = document.querySelector(
					'.lucid-DropMenu.lucid-ContextMenu-FlyOut'
				);
				const optionDOMNodes = flyOutDOMNode.querySelectorAll(
					'.lucid-DropMenu-Option'
				);

				assert.equal(optionDOMNodes.length, 3);
				assert.equal(optionDOMNodes[0].innerHTML, 'option a');
				assert.equal(optionDOMNodes[1].innerHTML, 'option b');
				assert.equal(optionDOMNodes[2].innerHTML, 'option c');
			});

			it('should not render children with `isHidden`', () => {
				wrapper = mount(
					<DropMenu isExpanded>
						<Control>control</Control>
						<Option isHidden>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</DropMenu>
				);

				const flyOutDOMNode = document.querySelector(
					'.lucid-DropMenu.lucid-ContextMenu-FlyOut'
				);
				const optionDOMNodes = flyOutDOMNode.querySelectorAll(
					'.lucid-DropMenu-Option'
				);

				assert.equal(optionDOMNodes.length, 2);
				assert.equal(optionDOMNodes[0].innerHTML, 'option b');
				assert.equal(optionDOMNodes[1].innerHTML, 'option c');
			});
		});

		describe('OptionGroup', () => {
			let wrapper;

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('should render the Options in each OptionGroup separated by dividers', () => {
				wrapper = mount(
					<DropMenu isExpanded>
						<Control>control</Control>
						<OptionGroup>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</OptionGroup>
						<OptionGroup>
							<Option>option p</Option>
							<Option>option q</Option>
						</OptionGroup>
						<OptionGroup>
							<Option>option x</Option>
							<Option>option y</Option>
							<Option>option z</Option>
						</OptionGroup>
					</DropMenu>
				);

				const flyOutDOMNode = document.querySelector(
					'.lucid-DropMenu.lucid-ContextMenu-FlyOut .lucid-DropMenu-option-container'
				);
				assert.equal(flyOutDOMNode.children.length, 10);
				assert.equal(flyOutDOMNode.children[0].innerHTML, 'option a');
				assert.equal(flyOutDOMNode.children[1].innerHTML, 'option b');
				assert.equal(flyOutDOMNode.children[2].innerHTML, 'option c');
				assert.equal(
					flyOutDOMNode.children[3].className,
					'lucid-DropMenu-OptionGroup-divider'
				);
				assert.equal(flyOutDOMNode.children[4].innerHTML, 'option p');
				assert.equal(flyOutDOMNode.children[5].innerHTML, 'option q');
				assert.equal(
					flyOutDOMNode.children[6].className,
					'lucid-DropMenu-OptionGroup-divider'
				);
				assert.equal(flyOutDOMNode.children[7].innerHTML, 'option x');
				assert.equal(flyOutDOMNode.children[8].innerHTML, 'option y');
				assert.equal(flyOutDOMNode.children[9].innerHTML, 'option z');

				assert(
					_.includes(
						flyOutDOMNode.children[0].className,
						'lucid-DropMenu-Option-is-grouped'
					)
				);
				assert(
					_.includes(
						flyOutDOMNode.children[1].className,
						'lucid-DropMenu-Option-is-grouped'
					)
				);
				assert(
					_.includes(
						flyOutDOMNode.children[2].className,
						'lucid-DropMenu-Option-is-grouped'
					)
				);
				assert(
					_.includes(
						flyOutDOMNode.children[4].className,
						'lucid-DropMenu-Option-is-grouped'
					)
				);
				assert(
					_.includes(
						flyOutDOMNode.children[5].className,
						'lucid-DropMenu-Option-is-grouped'
					)
				);
				assert(
					_.includes(
						flyOutDOMNode.children[7].className,
						'lucid-DropMenu-Option-is-grouped'
					)
				);
				assert(
					_.includes(
						flyOutDOMNode.children[8].className,
						'lucid-DropMenu-Option-is-grouped'
					)
				);
				assert(
					_.includes(
						flyOutDOMNode.children[9].className,
						'lucid-DropMenu-Option-is-grouped'
					)
				);
			});

			it('should render the ungrouped and grouped Options separated by dividers', () => {
				wrapper = mount(
					<DropMenu isExpanded>
						<Control>control</Control>

						<OptionGroup>
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</OptionGroup>

						<Option>option x</Option>
						<Option>option y</Option>
						<Option>option z</Option>
					</DropMenu>
				);

				const flyOutDOMNode = document.querySelector(
					'.lucid-DropMenu.lucid-ContextMenu-FlyOut .lucid-DropMenu-option-container'
				);
				assert.equal(flyOutDOMNode.children.length, 7);
				assert.equal(flyOutDOMNode.children[0].innerHTML, 'option a');
				assert.equal(flyOutDOMNode.children[1].innerHTML, 'option b');
				assert.equal(flyOutDOMNode.children[2].innerHTML, 'option c');
				assert.equal(
					flyOutDOMNode.children[3].className,
					'lucid-DropMenu-OptionGroup-divider'
				);
				assert.equal(flyOutDOMNode.children[4].innerHTML, 'option x');
				assert.equal(flyOutDOMNode.children[5].innerHTML, 'option y');
				assert.equal(flyOutDOMNode.children[6].innerHTML, 'option z');

				assert(
					_.includes(
						flyOutDOMNode.children[0].className,
						'lucid-DropMenu-Option-is-grouped'
					)
				);
				assert(
					_.includes(
						flyOutDOMNode.children[1].className,
						'lucid-DropMenu-Option-is-grouped'
					)
				);
				assert(
					_.includes(
						flyOutDOMNode.children[2].className,
						'lucid-DropMenu-Option-is-grouped'
					)
				);
				assert(
					!_.includes(
						flyOutDOMNode.children[4].className,
						'lucid-DropMenu-Option-is-grouped'
					)
				);
				assert(
					!_.includes(
						flyOutDOMNode.children[5].className,
						'lucid-DropMenu-Option-is-grouped'
					)
				);
				assert(
					!_.includes(
						flyOutDOMNode.children[6].className,
						'lucid-DropMenu-Option-is-grouped'
					)
				);
			});

			it('should render non-Option children of OptionGroups as group labels', () => {
				wrapper = mount(
					<DropMenu isExpanded>
						<Control>control</Control>

						<OptionGroup>
							Preferred
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</OptionGroup>

						<OptionGroup>
							Available
							<Option>option x</Option>
							<Option>option y</Option>
							<Option>option z</Option>
						</OptionGroup>
					</DropMenu>
				);

				const flyOutDOMNode = document.querySelector(
					'.lucid-DropMenu.lucid-ContextMenu-FlyOut .lucid-DropMenu-option-container'
				);
				assert.equal(flyOutDOMNode.children.length, 9);
				assert.equal(flyOutDOMNode.children[0].textContent, 'Preferred');
				assert.equal(flyOutDOMNode.children[1].innerHTML, 'option a');
				assert.equal(flyOutDOMNode.children[2].innerHTML, 'option b');
				assert.equal(flyOutDOMNode.children[3].innerHTML, 'option c');
				assert.equal(
					flyOutDOMNode.children[4].className,
					'lucid-DropMenu-OptionGroup-divider'
				);
				assert.equal(flyOutDOMNode.children[5].textContent, 'Available');
				assert.equal(flyOutDOMNode.children[6].innerHTML, 'option x');
				assert.equal(flyOutDOMNode.children[7].innerHTML, 'option y');
				assert.equal(flyOutDOMNode.children[8].innerHTML, 'option z');

				assert(
					_.includes(
						flyOutDOMNode.children[0].className,
						'lucid-DropMenu-label'
					)
				);
				assert(
					_.includes(
						flyOutDOMNode.children[5].className,
						'lucid-DropMenu-label'
					)
				);
			});

			it('should not render OptionGroups with `isHidden`', () => {
				wrapper = mount(
					<DropMenu isExpanded>
						<Control>control</Control>

						<OptionGroup isHidden>
							Preferred
							<Option>option a</Option>
							<Option>option b</Option>
							<Option>option c</Option>
						</OptionGroup>

						<OptionGroup>
							Available
							<Option>option x</Option>
							<Option>option y</Option>
							<Option>option z</Option>
						</OptionGroup>
					</DropMenu>
				);

				const flyOutDOMNode = document.querySelector(
					'.lucid-DropMenu.lucid-ContextMenu-FlyOut .lucid-DropMenu-option-container'
				);
				assert.equal(flyOutDOMNode.children.length, 4);
				assert.equal(flyOutDOMNode.children[0].textContent, 'Available');
				assert.equal(flyOutDOMNode.children[1].innerHTML, 'option x');
				assert.equal(flyOutDOMNode.children[2].innerHTML, 'option y');
				assert.equal(flyOutDOMNode.children[3].innerHTML, 'option z');

				assert(
					_.includes(
						flyOutDOMNode.children[0].className,
						'lucid-DropMenu-label'
					)
				);
			});
		});

		describe('NullOption', () => {
			let wrapper;

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('should render NullOption first with a divider immediately following', () => {
				wrapper = mount(
					<DropMenu isExpanded>
						<Control>control</Control>
						<NullOption>unselect</NullOption>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</DropMenu>
				);

				const flyOutDOMNode = document.querySelector(
					'.lucid-DropMenu.lucid-ContextMenu-FlyOut .lucid-DropMenu-option-container'
				);

				assert.equal(flyOutDOMNode.children.length, 5);
				assert.equal(flyOutDOMNode.children[0].innerHTML, 'unselect');
				assert.equal(
					flyOutDOMNode.children[1].className,
					'lucid-DropMenu-OptionGroup-divider'
				);
				assert.equal(flyOutDOMNode.children[2].innerHTML, 'option a');
				assert.equal(flyOutDOMNode.children[3].innerHTML, 'option b');
				assert.equal(flyOutDOMNode.children[4].innerHTML, 'option c');

				assert(
					_.includes(
						flyOutDOMNode.children[0].className,
						'lucid-DropMenu-Option'
					)
				);
				assert(
					_.includes(
						flyOutDOMNode.children[0].className,
						'lucid-DropMenu-Option-is-null'
					)
				);
				assert(
					_.includes(
						flyOutDOMNode.children[2].className,
						'lucid-DropMenu-Option'
					)
				);
				assert(
					_.includes(
						flyOutDOMNode.children[3].className,
						'lucid-DropMenu-Option'
					)
				);
				assert(
					_.includes(
						flyOutDOMNode.children[4].className,
						'lucid-DropMenu-Option'
					)
				);
			});
		});

		describe('Header', () => {
			let wrapper;

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('should render Header first if it is provided, followed by the option-container', () => {
				wrapper = mount(
					<DropMenu isExpanded>
						<Header>HeyDer</Header>
						<Control>control</Control>
						<NullOption>unselect</NullOption>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</DropMenu>
				);

				const flyOutDOMNode = document.querySelector(
					'.lucid-DropMenu.lucid-ContextMenu-FlyOut'
				);

				assert.equal(flyOutDOMNode.children.length, 2);
				assert.equal(flyOutDOMNode.children[0].innerHTML, 'HeyDer');
				assert.equal(
					flyOutDOMNode.children[1].className,
					'lucid-DropMenu-option-container'
				);
			});
		});
	});
});
