import assert from 'assert';
import _ from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';

import {
	createClass,
	filterTypes,
	rejectTypes,
	createElements,
	findTypes,
} from './component-types';

function isReactComponentClass(componentClass) {
	return _.isFunction(componentClass)
		&& _.has(componentClass, 'prototype')
		&& !!componentClass.prototype.isReactComponent;
}


describe('component-types', () => {
	describe('createClass', () => {
		it('should return a React component type.', () => {
			assert(isReactComponentClass(createClass()), 'must be a React component');
		});

		it('should make child `components` static properties.', () => {
			const Panel = createClass({
				components: {
					Header: createClass(),
					Footer: createClass()
				}
			});

			assert(_.has(Panel, 'Header'), 'must have `Header` as a static property');
			assert(_.has(Panel, 'Footer'), 'must have `Footer` as a static property');
		});

		it('should make `reducers` a static property.', () => {
			const panelReducers = {
				onExpand() {}
			};

			const Panel = createClass({
				reducers: panelReducers
			});

			assert(_.has(Panel, 'reducers'), 'must have `reducers` as a static property');
			assert.equal(_.get(Panel, 'reducers'), panelReducers, 'static `reducers` must equal defined reducers');
		});

		it('should make `selectors` a static property.', () => {
			const panelSelectors = {
				isValid() {}
			};

			const Panel = createClass({
				selectors: panelSelectors
			});

			assert(_.has(Panel, 'selectors'), 'must have `selectors` as a static property');
			assert.equal(_.get(Panel, 'selectors'), panelSelectors, 'static `selectors` must equal defined selectors');
		});

		it('should make `propName` a static property.', () => {
			const Panel = createClass({
				propName: ['Panel', 'panel', 'panels']
			});

			assert(_.has(Panel, 'propName'), 'must have `propName` as a static property');
			assert(_.isEqual(_.get(Panel, 'propName'), ['Panel', 'panel', 'panels']), 'static `propName` must equal defined prop names');
		});
	});

	describe('filterTypes', () => {
		it('should filter elements by a single component type', () => {
			const Test = createClass();
			const elements = [
				<span>Many</span>,
				<Test>Hands</Test>,
				<span>Make</span>,
				<Test>Light</Test>,
				<span>Work</span>
			];

			const spanElements = filterTypes(elements, 'span');

			assert.equal(3, spanElements.length, 'length must be 3');
			assert(React.isValidElement(spanElements[0]), 'must be a valid React element');
			assert.equal('Many', shallow(spanElements[0]).text(), 'text must be `Many`');
			assert(React.isValidElement(spanElements[1]), 'must be a valid React element');
			assert.equal('Make', shallow(spanElements[1]).text(), 'text must be `Make`');
			assert(React.isValidElement(spanElements[2]), 'must be a valid React element');
			assert.equal('Work', shallow(spanElements[2]).text(), 'text must be `Work`');
		});

		it('should filter elements by many component types', () => {
			const Test = createClass();
			const elements = [
				<span>Many</span>,
				<Test>Hands</Test>,
				<section>Make</section>,
				<Test>Light</Test>,
				<section>Work</section>
			];

			const spanElements = filterTypes(elements, ['section', Test]);

			assert.equal(4, spanElements.length, 'length must be 4');
			assert(React.isValidElement(spanElements[0]), 'must be a valid React element');
			assert.equal(Test, spanElements[0].type, 'type must be `Test`');
			assert(React.isValidElement(spanElements[1]), 'must be a valid React element');
			assert.equal('Make', shallow(spanElements[1]).text(), 'text must be `Make`');
			assert(React.isValidElement(spanElements[2]), 'must be a valid React element');
			assert.equal(Test, spanElements[0].type, 'type must be `Test`');
			assert(React.isValidElement(spanElements[3]), 'must be a valid React element');
			assert.equal('Work', shallow(spanElements[3]).text(), 'text must be `Work`');
		});
	});

	describe('rejectTypes', () => {
		it('should reject elements of a single component type', () => {
			const Test = createClass();
			const elements = [
				<span>Many</span>,
				<Test>Hands</Test>,
				<span>Make</span>,
				<Test>Light</Test>,
				<span>Work</span>
			];

			const nonSpanElements = rejectTypes(elements, 'span');

			assert.equal(2, nonSpanElements.length, 'length must be 2');
			assert(React.isValidElement(nonSpanElements[0]), 'must be a valid React element');
			assert.equal(Test, nonSpanElements[0].type, 'type must be `Test`');
			assert.equal('Hands', nonSpanElements[0].props.children, 'first element must have the string `Hands`');
			assert(React.isValidElement(nonSpanElements[1]), 'must be a valid React element');
			assert.equal(Test, nonSpanElements[1].type, 'type must be `Test`');
			assert.equal('Light', nonSpanElements[1].props.children, 'second element must have the string `Light`');
		});

		it('should reject elements of many component types', () => {
			const Test = createClass();
			const elements = [
				<span>Many</span>,
				<Test>Hands</Test>,
				<section>Make</section>,
				<Test>Light</Test>,
				<span>Work</span>
			];

			const remainingElements = rejectTypes(elements, [Test, 'span']);

			assert.equal(1, remainingElements.length, 'length must be 1');
			assert(React.isValidElement(remainingElements[0]), 'must be a valid React element');
			assert.equal('section', shallow(remainingElements[0]).type(), 'type must be `section`');
			assert.equal('Make', shallow(remainingElements[0]).text(), 'element must have the string `Make`');
		});
	});

	describe('createElements', () => {
		it('should create elements of the given type from the array', () => {
			const Test = createClass();

			const elements = createElements(Test, [
				<Test />,
				<button />,
				'test',
				null,
				{ foo: 'bar' }
			]);
			assert.equal(4, elements.length, 'length must be 4');
			_.forEach(elements, (element) => {
				assert.equal(Test, element.type, 'type must be Test');
			});
			assert.equal('button', elements[1].props.children.type, 'element must be a button');
			assert.equal('test', elements[2].props.children, 'element children must be `test`');
			assert(_.isEqual({ foo: 'bar' }, elements[3].props), 'element props must match');
		});
	});

	describe('findTypes', () => {
		it('should find all elements of the same type from children', () => {
			const Test = createClass({ propName: 'test' });

			const Parent = createClass({
				render() {
					const testElements = findTypes(this.props, Test);

					assert.equal(2, testElements.length, 'length must be 2');
					assert.equal('foo', _.get(testElements[0].props, 'foo'), 'element must have prop `foo`');
					assert.equal('bar', _.get(testElements[1].props, 'bar'), 'element must have prop `bar`');
				}
			});
			shallow(
				<Parent>
					<button />
					<Test foo='foo' />
					<button />
					<Test bar='bar' />
					<button />
				</Parent>
			);
		});

		it('should find all elements of the same type from props if type has `propName` defined', () => {
			const Test = createClass({ propName: ['test', 'tests'] });

			const Parent = createClass({
				render() {
					const testElements = findTypes(this.props, Test);

					assert.equal(3, testElements.length, 'length must be 3');
					assert.equal('this prop is a component', _.get(testElements[0].props, 'children'), 'element children must match prop value');
					assert(_.isEqual({ myProp: 'xyz' }, testElements[1].props), 'element props must match props');
					assert.equal('anotherProp', _.get(testElements[2].props, 'children'), 'element children must match prop value');
				}
			});
			shallow(
				<Parent test='this prop is a component' tests={[{ myProp: 'xyz' }, 'anotherProp']} />
			);
		});

		it('should find all elements of the same type from props and children', () => {
			const Test = createClass({ propName: ['test', 'tests'] });

			const Parent = createClass({
				render() {
					const testElements = findTypes(this.props, Test);

					assert.equal(5, testElements.length, 'length must be 3');
					assert.equal('this prop is a component', _.get(testElements[0].props, 'children'), 'element children must match prop value');
					assert(_.isEqual({ myProp: 'xyz' }, testElements[1].props), 'element props must match props');
					assert.equal('anotherProp', _.get(testElements[2].props, 'children'), 'element children must match prop value');
					assert.equal('foo', _.get(testElements[3].props, 'foo'), 'element must have prop `foo`');
					assert.equal('bar', _.get(testElements[4].props, 'bar'), 'element must have prop `bar`');
				}
			});
			shallow(
				<Parent test='this prop is a component' tests={[{ myProp: 'xyz' }, 'anotherProp']}>
					<button />
					<Test foo='foo' />
					<button />
					<Test bar='bar' />
					<button />
				</Parent>
			);
		});
	});
});
