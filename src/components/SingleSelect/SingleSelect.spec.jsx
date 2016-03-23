import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import sinon from 'sinon';
import describeWithDOM from '../../util/describe-with-dom';
import { rejectNullElements } from '../../util/child-component';
import _ from 'lodash';
import { common } from '../../util/generic-tests';
import SingleSelect from './SingleSelect';
import DropMenu from '../DropMenu/DropMenu';

const {
	Placeholder,
	Option,
	OptionGroup
} = SingleSelect;

describe('SingleSelect', () => {
	common(SingleSelect);

	describe('render', () => {
		it('should render a DropMenu', () => {
			const wrapper = shallow(
				<SingleSelect>
					<Placeholder>control</Placeholder>
					<Option>option a</Option>
					<Option>option b</Option>
					<Option>option c</Option>
				</SingleSelect>
			);

			assert.equal(wrapper.find('DropMenu').length, 1);
		});
	});

	describe('props', () => {
		describe('children', () => {
			it('should not render any direct child elements which are not SingleSelect-specific', () => {
				const wrapper = shallow(
					<SingleSelect>
						<button>button</button>
						<Placeholder>control<i>italic</i></Placeholder>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
						<h1>header</h1>
					</SingleSelect>
				);

				assert.equal(wrapper.find('button').length, 0);
				assert.equal(wrapper.find('h1').length, 0);
				assert.equal(wrapper.find('i').length, 1);
			});
		});

		describeWithDOM('hasReset', () => {
			let wrapper;

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('should render the placeholder option as the first one in the menu and be a null option', () => {
				wrapper = mount(
					<SingleSelect hasReset={true} selectedIndex={1} DropMenu={{ isExpanded: true }}>
						<Placeholder>select one</Placeholder>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</SingleSelect>
				);

				const menuDOMNode = document.querySelector('.lucid-ContextMenu-FlyOut');

				assert(_.includes(menuDOMNode.children[0].className, 'lucid-DropMenu-Option-is-null'));
			});

			it('should not render the placeholder null option as the first one in the menu', () => {
				wrapper = mount(
					<SingleSelect hasReset={false} selectedIndex={1} DropMenu={{ isExpanded: true }}>
						<Placeholder>select one</Placeholder>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</SingleSelect>
				);

				const menuDOMNode = document.querySelector('.lucid-ContextMenu-FlyOut');

				assert(!_.includes(menuDOMNode.children[0].className, 'lucid-DropMenu-Option-is-null'));
			});
		});

		describe('isDisabled', () => {
			it('should pass the `isDisabled` prop thru to the underlying DropMenu', () => {
				const wrapper = shallow(
					<SingleSelect isDisabled={true}>
						<Placeholder>select one</Placeholder>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</SingleSelect>
				);

				const dropMenuWrapper = wrapper.find('DropMenu');

				assert.equal(dropMenuWrapper.prop('isDisabled'), true);
			});

			it('should apply the appropriate classNames to the control', () => {
				const wrapper = shallow(
					<SingleSelect isDisabled={true} selectedIndex={2}>
						<Placeholder>select one</Placeholder>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</SingleSelect>
				);

				const controlWrapper = wrapper.find('.lucid-SingleSelect-Control');

				assert(controlWrapper.hasClass('lucid-SingleSelect-Control-is-disabled'));
				assert(!controlWrapper.hasClass('lucid-SingleSelect-Control-is-selected'));
			});
		});

		describe('selectedIndex', () => {
			it('should pass the selectedIndex in an array of 1 to the underlying DropMenu', () => {
				const wrapper = shallow(
					<SingleSelect selectedIndex={2}>
						<Placeholder>select one</Placeholder>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</SingleSelect>
				);

				const dropMenuWrapper = wrapper.find('DropMenu');

				assert(_.isEqual(dropMenuWrapper.prop('selectedIndices'), [2]));
			});

			it('should render selected option in the control', () => {
				const wrapper = shallow(
					<SingleSelect selectedIndex={2}>
						<Placeholder>select one</Placeholder>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</SingleSelect>
				);

				const dropMenuWrapper = wrapper.find('DropMenu');
				const dropMenuControlProps = _.first(DropMenu.Control.findInChildrenAsProps(dropMenuWrapper.prop('children'))); _.first(dropMenuControlProps)
				const dropMenuControlWrapper = shallow(dropMenuControlProps.children);

				assert.equal('option c', dropMenuControlWrapper.find('.lucid-SingleSelect-Control-content').text());
			});
		});

		describeWithDOM('onSelect', () => {
			let wrapper;

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});


			it('should be called when an option is selected with the appropriate arguments', () => {
				const onSelect = sinon.spy();

				wrapper = mount(
					<SingleSelect onSelect={onSelect} DropMenu={{ isExpanded: true }}>
						<Placeholder>select one</Placeholder>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option testProp='foo'>option c</Option>
					</SingleSelect>
				);

				const menuDOMNode = document.querySelector('.lucid-ContextMenu-FlyOut');
				menuDOMNode.children[2].click();

				assert(onSelect.called);
				const [optionIndex, { props, event }] = onSelect.lastCall.args;
				assert.equal(optionIndex, 2);
				assert(props);
				assert.equal(props.testProp, 'foo');
				assert(event);
			});
		});

		describe('DropMenu', () => {
			it('should pass thru all DropMenu props to the underlying DropMenu', () => {
				const explicitDropMenuProps = {
					isExpanded: true,
					direction: 'up',
					focusedIndex: 2
				};

				const wrapper = shallow(
					<SingleSelect DropMenu={explicitDropMenuProps}>
						<Placeholder>control</Placeholder>
						<Option>option a</Option>
						<Option>option b</Option>
						<Option>option c</Option>
					</SingleSelect>
				);

				const dropMenuProps = wrapper.find('DropMenu').props();

				_.forEach(explicitDropMenuProps, (value, key) => {
					assert(_.isEqual(dropMenuProps[key], value));
				});
			});
		});

	});

	describe('child elements', () => {
		describe('Placeholder', () => {
			it('should pass the placeholder thru to the underlying DropMenu Control when no option is selected', () => {
				const wrapper = shallow(
					<SingleSelect selectedIndex={null}>
						<Placeholder>select one</Placeholder>
						<Option name='OptionA'>option a</Option>
						<Option name='OptionB'>option b</Option>
						<Option name='OptionC'>option c</Option>
					</SingleSelect>
				);

				// navigate down the virutal DOM tree to find the Control content
				const dropMenuWrapper = wrapper.find('DropMenu');
				const dropMenuChildren = dropMenuWrapper.prop('children')
				const controlProps = _.first(DropMenu.Control.findInChildrenAsProps(dropMenuChildren));
				const dropMenuControlChildElement = _.first(React.Children.toArray(controlProps.children));
				const singleSelectControlChildren = React.Children.toArray(dropMenuControlChildElement.props.children);
				const singleSelectControlContent = singleSelectControlChildren[0];

				assert.equal(React.Children.toArray(singleSelectControlContent.props.children)[0], 'select one');
			});

			it('should pass the placeholder thru to the underlying DropMenu NullOption when an option is selected', () => {
				const wrapper = shallow(
					<SingleSelect selectedIndex={1}>
						<Placeholder>select one</Placeholder>
						<Option name='OptionA'>option a</Option>
						<Option name='OptionB'>option b</Option>
						<Option name='OptionC'>option c</Option>
					</SingleSelect>
				);

				// navigate down the virutal DOM tree to find the Control content
				const dropMenuWrapper = wrapper.find('DropMenu');
				const dropMenuChildren = dropMenuWrapper.prop('children')
				const nullOptionProps = _.first(DropMenu.NullOption.findInChildrenAsProps(dropMenuChildren));

				assert.equal(React.Children.toArray(nullOptionProps.children)[0], 'select one');
			});
		});

		describe('Option', () => {
			it('should pass options thru to the underlying DropMenu', () => {
				const wrapper = shallow(
					<SingleSelect>
						<Placeholder>select one</Placeholder>
						<Option name='OptionA'>option a</Option>
						<Option name='OptionB'>option b</Option>
						<Option name='OptionC'>option c</Option>
					</SingleSelect>
				);

				const dropMenuWrapper = wrapper.find('DropMenu');
				const dropMenuChildren = dropMenuWrapper.prop('children')
				const optionsProps = DropMenu.Option.findInChildrenAsProps(dropMenuChildren);

				assert.equal(_.size(optionsProps), 3);
				assert(_.isEqual(optionsProps[0], {
					name: 'OptionA',
					children: 'option a'
				}));
				assert(_.isEqual(optionsProps[1], {
					name: 'OptionB',
					children: 'option b'
				}));
				assert(_.isEqual(optionsProps[2], {
					name: 'OptionC',
					children: 'option c'
				}));
			});
		});

		describe('OptionGroup', () => {
			let wrapper;
			let dropMenuWrapper;
			let dropMenuChildren;
			let optionGroupProps;

			beforeEach(() => {
				wrapper = shallow(
					<SingleSelect>
						<Placeholder>select one</Placeholder>
						<OptionGroup name='TestGroup'>
							Group Label
							<Option name='OptionA'>option a</Option>
							<Option name='OptionB'>option b</Option>
							<Option name='OptionC'>option c</Option>
						</OptionGroup>
					</SingleSelect>
				);

				dropMenuWrapper = wrapper.find('DropMenu');
				dropMenuChildren = dropMenuWrapper.prop('children')
				optionGroupProps = _.first(DropMenu.OptionGroup.findInChildrenAsProps(dropMenuChildren));

			});

			it('should pass thru all props to the underlying DropMenu OptionGroup', () => {
				assert.equal(optionGroupProps.name, 'TestGroup');
			});

			it('should pass options thru to the underlying DropMenu OptionGroup Options', () => {
				const optionsProps = DropMenu.Option.findInChildrenAsProps(optionGroupProps.children);

				assert.equal(_.size(optionsProps), 3);
				assert(_.isEqual(optionsProps[0], {
					name: 'OptionA',
					children: 'option a'
				}));
				assert(_.isEqual(optionsProps[1], {
					name: 'OptionB',
					children: 'option b'
				}));
				assert(_.isEqual(optionsProps[2], {
					name: 'OptionC',
					children: 'option c'
				}));

			});

			it('should pass all other elemens thru to the underlying DropMenu OptionGroup', () => {
				const otherOptionGroupChildren = rejectNullElements(optionGroupProps.children)

				assert.equal(_.first(otherOptionGroupChildren), 'Group Label');
			});
		});
	});
});
