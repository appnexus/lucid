import assert from 'assert';
import { isElementOfType } from 'react-addons-test-utils';
import _ from 'lodash';
import React from 'react';
import { mount } from 'enzyme';
import describeWithDOM from './describe-with-dom';

import {
	createChildComponent,
	rejectNullElements,
	filterElementsByType,
	getChildComponentPropsArray,
	findAllChildComponents,
} from './child-component';

function isReactComponentClass (componentClass) {
	return _.isFunction(componentClass)
		&& _.has(componentClass, 'prototype')
		&& !!componentClass.prototype.isReactComponent;
}

describeWithDOM('#createChildComponent', () => {
	it('should return a React component class', () => {
		assert(isReactComponentClass(createChildComponent()));
	});

	it('should not render a child component element with other children', () => {
		const ChildComponent0 = createChildComponent();
		const ChildComponent1 = createChildComponent();
		const ParentComponent = React.createClass({
			displayName: 'ParentComponent',
			propTypes: {
				children: React.PropTypes.node
			},
			render() {
				const {
					children
				} = this.props;

				return (
					<section>{children}</section>
				);
			}
		});

		const wrapper = mount(
			<ParentComponent>
				<div className='test'>Many</div>
				<ChildComponent0>Hands</ChildComponent0>
				<div className='test'>Make</div>
				<ChildComponent1>Light</ChildComponent1>
				<div className='test'>Work</div>
			</ParentComponent>
		);
		assert.equal(wrapper.text(), 'ManyMakeWork');
	});

	describe('.findInChildren', () => {
		it('should return array of elements filtered by type from the given elements', () => {
			const LabeledField = React.createClass({
				propTypes: {
					children: React.PropTypes.node
				},
				statics: {
					Label: createChildComponent()
				},
				render() {
					const {
						children
					} = this.props;

					const labelElements = LabeledField.Label.findInChildren(children);

					assert(_.isArray(labelElements));
					assert.equal(_.size(labelElements), 1);
					_.forEach(labelElements, (labelElement) => {
						assert(isElementOfType(labelElement, LabeledField.Label));
					});

					return (
						<label>
							<div className='label-container'>{labelElements[0].props.children}</div>: <div className='field-container'>{children}</div>
						</label>
					);
				}
			});

			mount(
				<LabeledField>
					<LabeledField.Label>
						<strong>Name</strong>
					</LabeledField.Label>
					<input type='text' />
				</LabeledField>
			);
		});

	});

	describe('.findInChildrenAsProps', () => {
		it('should return array of props filtered by type from the given elements', () => {

			const SelectedItems = React.createClass({
				propTypes: {
					children: React.PropTypes.node
				},
				statics: {
					Item: createChildComponent()
				},
				render() {
					const {
						children
					} = this.props;

					const itemsProps = SelectedItems.Item.findInChildrenAsProps(children);

					assert(_.isArray(itemsProps));
					_.forEach(itemsProps, (itemProps) => {
						assert(_.has(itemProps, 'children'));
					});

					return (
						<ul className='selection'>
							{_.map(itemsProps, (itemProps, i) => (
								<li className={'item' + (itemProps.isAvailable ? ' available' : '')} key={i}>
									{itemProps.children}
								</li>
							))}
						</ul>
					);
				}
			});

			const wrapper = mount(
				<SelectedItems>
					<SelectedItems.Item>
						Education
					</SelectedItems.Item>
					<SelectedItems.Item isAvailable>
						Science
					</SelectedItems.Item>
					<SelectedItems.Item>
						Economics
					</SelectedItems.Item>
					<SelectedItems.Item isAvailable>
						Business
					</SelectedItems.Item>
				</SelectedItems>
			);
			const itemsWrapper = wrapper.find('li.item');

			assert.equal(itemsWrapper.at(0).text(), 'Education');
			assert(itemsWrapper.at(0).hasClass('item'));
			assert(!itemsWrapper.at(0).hasClass('available'));

			assert.equal(itemsWrapper.at(1).text(), 'Science');
			assert(itemsWrapper.at(1).hasClass('item'));
			assert(itemsWrapper.at(1).hasClass('available'));

			assert.equal(itemsWrapper.at(2).text(), 'Economics');
			assert(itemsWrapper.at(2).hasClass('item'));
			assert(!itemsWrapper.at(2).hasClass('available'));

			assert.equal(itemsWrapper.at(3).text(), 'Business');
			assert(itemsWrapper.at(3).hasClass('item'));
			assert(itemsWrapper.at(3).hasClass('available'));
		});
	});

	describe('.findInProps', () => {
		it('should return array of props from the given props object matching `propName`', () => {
			const SelectedItems = React.createClass({
				propTypes: {
					children: React.PropTypes.node
				},
				statics: {
					// When operating directly on props, `propName` must be defined
					Item: createChildComponent({ propName: 'Item' })
				},
				render() {
					const itemsProps = SelectedItems.Item.findInProps(this.props);

					assert(_.isArray(itemsProps));
					_.forEach(itemsProps, (itemProps) => {
						assert(_.has(itemProps, 'children'));
					});

					return (
						<ul className='selection'>
							{_.map(itemsProps, (itemProps, i) => (
								<li className={'item' + (itemProps.isAvailable ? ' available' : '')} key={i}>
									{itemProps.children}
								</li>
							))}
						</ul>
					);
				}
			});

			const wrapper = mount(
				<SelectedItems Item={[
					{ isAvailable: false, children: 'Education' },
					{ isAvailable: true, children: 'Science' },
					{ isAvailable: false, children: 'Economics' },
					{ isAvailable: true, children: 'Business' }
				]} />
			);

			const itemsWrapper = wrapper.find('li.item');

			assert.equal(itemsWrapper.at(0).text(), 'Education');
			assert(itemsWrapper.at(0).hasClass('item'));
			assert(!itemsWrapper.at(0).hasClass('available'));

			assert.equal(itemsWrapper.at(1).text(), 'Science');
			assert(itemsWrapper.at(1).hasClass('item'));
			assert(itemsWrapper.at(1).hasClass('available'));

			assert.equal(itemsWrapper.at(2).text(), 'Economics');
			assert(itemsWrapper.at(2).hasClass('item'));
			assert(!itemsWrapper.at(2).hasClass('available'));

			assert.equal(itemsWrapper.at(3).text(), 'Business');
			assert(itemsWrapper.at(3).hasClass('item'));
			assert(itemsWrapper.at(3).hasClass('available'));
		});
	});

	describe('.findInAllAsProps', () => {
		it('should return array of combined props from the given props object with `children`', () => {
			const SelectedItems = React.createClass({
				propTypes: {
					children: React.PropTypes.node
				},
				statics: {
					// When operating directly on props, `propName` must be defined
					Item: createChildComponent({ propName: 'Item' })
				},
				render() {
					const itemsProps = SelectedItems.Item.findInAllAsProps(this.props);

					assert(_.isArray(itemsProps));
					_.forEach(itemsProps, (itemProps) => {
						assert(_.has(itemProps, 'children'));
					});

					return (
						<ul className='selection'>
							{_.map(itemsProps, (itemProps, i) => (
								<li className={'item' + (itemProps.isAvailable ? ' available' : '')} key={i}>
									{itemProps.children}
								</li>
							))}
						</ul>
					);
				}
			});

			const wrapper = mount(
				<SelectedItems Item={[
					{ isAvailable: false, children: 'Education' },
					{ isAvailable: true, children: 'Science' }
				]}>
					<SelectedItems.Item>
						Economics
					</SelectedItems.Item>
					<SelectedItems.Item isAvailable>
						Business
					</SelectedItems.Item>
				</SelectedItems>
			);

			const itemsWrapper = wrapper.find('li.item');

			assert.equal(itemsWrapper.at(0).text(), 'Education');
			assert(itemsWrapper.at(0).hasClass('item'));
			assert(!itemsWrapper.at(0).hasClass('available'));

			assert.equal(itemsWrapper.at(1).text(), 'Science');
			assert(itemsWrapper.at(1).hasClass('item'));
			assert(itemsWrapper.at(1).hasClass('available'));

			assert.equal(itemsWrapper.at(2).text(), 'Economics');
			assert(itemsWrapper.at(2).hasClass('item'));
			assert(!itemsWrapper.at(2).hasClass('available'));

			assert.equal(itemsWrapper.at(3).text(), 'Business');
			assert(itemsWrapper.at(3).hasClass('item'));
			assert(itemsWrapper.at(3).hasClass('available'));
		});
	});
});

describe('#rejectNullElements', () => {
	it('should filter out child component elements from other children', () => {
		const ChildComponent0 = createChildComponent();
		const ChildComponent1 = createChildComponent();
		const ParentComponent = React.createClass({
			displayName: 'ParentComponent',
			propTypes: {
				children: React.PropTypes.node
			},
			render() {
				const {
					children
				} = this.props;

				var normalElements = rejectNullElements(children);

				assert.equal(_.size(normalElements), 3);

				_.forEach(normalElements, (element) => {
					assert.equal(element.props.className, 'test');
				});

				return (
					<section>{children}</section>
				);
			}
		});

		const wrapper = mount(
			<ParentComponent>
				<div className='test'>Many</div>
				<ChildComponent0>Hands</ChildComponent0>
				<div className='test'>Make</div>
				<ChildComponent1>Light</ChildComponent1>
				<div className='test'>Work</div>
			</ParentComponent>
		);

		assert.equal(wrapper.text(), 'ManyMakeWork');
	});
});

describe('#filterElementsByType', () => {
	it('should filter child component elements which match the given element types in render order', () => {
		const ChildComponent0 = createChildComponent();
		const ChildComponent1 = createChildComponent();
		const ChildComponent2 = createChildComponent();
		const ParentComponent = React.createClass({
			displayName: 'ParentComponent',
			propTypes: {
				children: React.PropTypes.node
			},
			render() {
				const {
					children
				} = this.props;

				var filteredElements = filterElementsByType(children, [ChildComponent0, ChildComponent2]);

				assert.equal(_.size(filteredElements), 3);
				assert(React.isValidElement(filteredElements[0]));
				assert(filteredElements[0].type === ChildComponent2);
				assert(filteredElements[0].props.children === 'So');
				assert(React.isValidElement(filteredElements[1]));
				assert(filteredElements[1].type === ChildComponent0);
				assert(filteredElements[1].props.children === 'Hands');
				assert(React.isValidElement(filteredElements[2]));
				assert(filteredElements[2].type === ChildComponent2);
				assert(filteredElements[2].props.children === 'Fun');

				return (
					<section>{children}</section>
				);
			}
		});

		const wrapper = mount(
			<ParentComponent>
				<ChildComponent2>So</ChildComponent2>
				<div className='test'>Many</div>
				<ChildComponent0>Hands</ChildComponent0>
				<div className='test'>Make</div>
				<ChildComponent1>Light</ChildComponent1>
				<div className='test'>Work</div>
				<ChildComponent2>Fun</ChildComponent2>
			</ParentComponent>
		);

		assert.equal(wrapper.text(), 'ManyMakeWork');
	});
});

describe('#getChildComponentPropsArray', () => {
	it('should return array of props from the given props object matching the given child component type', () => {
		// `propName` must be defined to define component via props
		const Item = createChildComponent({ propName: 'Item' });

		const SelectedItems = React.createClass({
			propTypes: {
				children: React.PropTypes.node
			},
			statics: {
				Item: createChildComponent({ propName: 'Item' })
			},
			render() {
				const itemsProps = getChildComponentPropsArray(this.props, Item);

				assert(_.isArray(itemsProps));
				_.forEach(itemsProps, (itemProps) => {
					assert(_.has(itemProps, 'children'));
				});

				return (
					<ul className='selection'>
						{_.map(itemsProps, (itemProps, i) => (
							<li className={'item' + (itemProps.isAvailable ? ' available' : '')} key={i}>
								{itemProps.children}
							</li>
						))}
					</ul>
				);
			}
		});

		const wrapper = mount(
			<SelectedItems Item={[
				{ isAvailable: false, children: 'Education' },
				{ isAvailable: true, children: 'Science' },
				{ isAvailable: false, children: 'Economics' },
				{ isAvailable: true, children: 'Business' }
			]} />
		);

		const itemsWrapper = wrapper.find('li.item');

		assert.equal(itemsWrapper.at(0).text(), 'Education');
		assert(itemsWrapper.at(0).hasClass('item'));
		assert(!itemsWrapper.at(0).hasClass('available'));

		assert.equal(itemsWrapper.at(1).text(), 'Science');
		assert(itemsWrapper.at(1).hasClass('item'));
		assert(itemsWrapper.at(1).hasClass('available'));

		assert.equal(itemsWrapper.at(2).text(), 'Economics');
		assert(itemsWrapper.at(2).hasClass('item'));
		assert(!itemsWrapper.at(2).hasClass('available'));

		assert.equal(itemsWrapper.at(3).text(), 'Business');
		assert(itemsWrapper.at(3).hasClass('item'));
		assert(itemsWrapper.at(3).hasClass('available'));
	});
});

describe('#findAllChildComponents', () => {
	it('should return array of objects with `type` in render order for the given child component types', () => {

		const Select = React.createClass({
			render: () => null
		});

		const Option = createChildComponent({ propName: 'Option' });
		const OptionGroup = createChildComponent({ propName: 'OptionGroup' });

		const selectElement = (
			<Select Option={[{id: '0'}, {id: '1'}]} OptionGroup={{id: '2'}}>
				<OptionGroup id='a' />
				<span id='b' />
				<Option id='c' />
				<p id='d' />
				<OptionGroup id='e' />
				<div id='f' />
				<Option id='g' />
				<span id='h' />
				<OptionGroup id='i' />
			</Select>
		);

		const result = findAllChildComponents(selectElement.props, [OptionGroup, Option]);

		assert.equal(_.size(result), 8);
		assert.equal(result[0].type, OptionGroup);
		assert.equal(result[1].type, Option);
		assert.equal(result[2].type, Option);
		assert.equal(result[3].type, OptionGroup);
		assert.equal(result[4].type, Option);
		assert.equal(result[5].type, OptionGroup);
		assert.equal(result[6].type, Option);
		assert.equal(result[7].type, OptionGroup);
	});

	it('should return array of objects with `props` in render order for the given child component types', () => {

		const Select = React.createClass({
			render: () => null
		});

		const Option = createChildComponent({ propName: 'Option' });
		const OptionGroup = createChildComponent({ propName: 'OptionGroup' });

		const selectElement = (
			<Select Option={[{id: '0'}, {id: '1'}]} OptionGroup={{id: '2'}}>
				<OptionGroup id='a' />
				<span id='b' />
				<Option id='c' />
				<p id='d' />
				<OptionGroup id='e' />
				<div id='f' />
				<Option id='g' />
				<span id='h' />
				<OptionGroup id='i' />
			</Select>
		);

		const result = findAllChildComponents(selectElement.props, [OptionGroup, Option]);

		assert.equal(_.size(result), 8);
		assert.equal(result[0].props.id, '2');
		assert.equal(result[1].props.id, '0');
		assert.equal(result[2].props.id, '1');
		assert.equal(result[3].props.id, 'a');
		assert.equal(result[4].props.id, 'c');
		assert.equal(result[5].props.id, 'e');
		assert.equal(result[6].props.id, 'g');
		assert.equal(result[7].props.id, 'i');
	});
});
