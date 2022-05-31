import assert from 'assert';
import _, { forEach } from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';

import {
	createClass,
	filterTypes,
	rejectTypes,
	createElements,
	findTypes,
	addSpecialOmittedProps,
} from './component-types';

function isReactComponentClass(componentClass: unknown) {
	return (
		_.isFunction(componentClass) &&
		_.has(componentClass, 'prototype') &&
		!!componentClass.prototype.isReactComponent
	);
}

describe('component-types', () => {
	describe('createClass', () => {
		it('should return a React component type.', () => {
			assert(
				isReactComponentClass(createClass({})),
				'must be a React component'
			);
		});

		it('should make child `components` static properties.', () => {
			const Panel = createClass({
				components: {
					Header: createClass({}),
					Footer: createClass({}),
				},
			});

			assert(_.has(Panel, 'Header'), 'must have `Header` as a static property');
			assert(_.has(Panel, 'Footer'), 'must have `Footer` as a static property');
		});

		it('should make `reducers` a static property.', () => {
			const panelReducers = {
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				onExpand() {},
			} as any;

			const Panel = createClass({
				reducers: panelReducers,
			});

			assert(
				_.has(Panel, 'reducers'),
				'must have `reducers` as a static property'
			);
			assert.equal(
				_.get(Panel, 'reducers'),
				panelReducers,
				'static `reducers` must equal defined reducers'
			);
		});

		it('should make `selectors` a static property.', () => {
			const panelSelectors = {
				isValid: () => {},
			};

			const Panel = createClass({
				selectors: panelSelectors,
			});

			assert(
				_.has(Panel, 'selectors'),
				'must have `selectors` as a static property'
			);
			assert.equal(
				_.get(Panel, 'selectors'),
				panelSelectors,
				'static `selectors` must equal defined selectors'
			);
		});

		it('should make `initialState` a static property.', () => {
			const initialState = { foo: 'bar' };

			const Panel = createClass({
				initialState,
			});

			assert(
				_.has(Panel, 'initialState'),
				'must have `initialState` as a static property'
			);
			assert.equal(
				_.get(Panel, 'initialState'),
				initialState,
				'static `initialState` must equal defined initialState'
			);
		});

		it('should use `getDefaultProps` for default initialState', () => {
			const defaultProps = { baz: 'qux' };

			const Panel = createClass({
				getDefaultProps: () => defaultProps,
			});

			assert(
				_.has(Panel, 'initialState'),
				'must have `initialState` as a static property'
			);
			assert.deepEqual(
				_.get(Panel, 'initialState'),
				defaultProps,
				'static `initialState` must equal return value of `getDefaultProps`'
			);
		});

		it('should move `getDefaultProps` to `defaultProps` on the returned item', () => {
			const defaultProps = { name: 'jon' };

			const NameBadge = createClass({
				getDefaultProps: () => defaultProps,
			});

			assert(
				!_.has(NameBadge, 'getDefaultProps'),
				'must not have `getDefaultProps` as a static property'
			);
			assert.deepEqual(
				NameBadge.defaultProps,
				defaultProps,
				'static `defaultProps` must equal expected value passed as `getDefaultProps`'
			);
		});

		it('should make `propName` a static property.', () => {
			const Panel = createClass({
				propName: ['Panel', 'panel', 'panels'],
			});

			assert(
				_.has(Panel, 'propName'),
				'must have `propName` as a static property'
			);
			assert(
				_.isEqual(_.get(Panel, 'propName'), ['Panel', 'panel', 'panels']),
				'static `propName` must equal defined prop names'
			);
		});
	});

	describe('filterTypes', () => {
		it('should filter elements by a single component type', () => {
			const Option = createClass({});
			const elements = [
				<span key='1'>Many</span>,
				<Option key='2'>Hands</Option>,
				<span key='3'>Make</span>,
				<Option key='4'>Light</Option>,
				<span key='5'>Work</span>,
			];

			const spanElements = filterTypes(elements, 'span');

			assert.equal(3, spanElements.length, 'length must be 3');
			assert(
				React.isValidElement(spanElements[0]),
				'must be a valid React element'
			);
			assert.equal(
				'Many',
				shallow(spanElements[0]).text(),
				'text must be `Many`'
			);
			assert(
				React.isValidElement(spanElements[1]),
				'must be a valid React element'
			);
			assert.equal(
				'Make',
				shallow(spanElements[1]).text(),
				'text must be `Make`'
			);
			assert(
				React.isValidElement(spanElements[2]),
				'must be a valid React element'
			);
			assert.equal(
				'Work',
				shallow(spanElements[2]).text(),
				'text must be `Work`'
			);
		});

		it('should filter elements by many component types', () => {
			const Option = createClass({});
			const elements = [
				<span key='1'>Many</span>,
				<Option key='2'>Hands</Option>,
				<section key='3'>Make</section>,
				<Option key='4'>Light</Option>,
				<section key='5'>Work</section>,
			];

			const spanElements = filterTypes(elements, ['section', Option]);

			assert.equal(4, spanElements.length, 'length must be 4');
			assert(
				React.isValidElement(spanElements[0]),
				'must be a valid React element'
			);
			assert.equal(Option, spanElements[0].type, 'type must be `Option`');
			assert(
				React.isValidElement(spanElements[1]),
				'must be a valid React element'
			);
			assert.equal(
				'Make',
				shallow(spanElements[1]).text(),
				'text must be `Make`'
			);
			assert(
				React.isValidElement(spanElements[2]),
				'must be a valid React element'
			);
			assert.equal(Option, spanElements[0].type, 'type must be `Option`');
			assert(
				React.isValidElement(spanElements[3]),
				'must be a valid React element'
			);
			assert.equal(
				'Work',
				shallow(spanElements[3]).text(),
				'text must be `Work`'
			);
		});
	});

	describe('rejectTypes', () => {
		it('should reject elements of a single component type', () => {
			const Option = createClass({});
			const elements = [
				<span key='1'>Many</span>,
				<Option key='2'>Hands</Option>,
				<span key='3'>Make</span>,
				<Option key='4'>Light</Option>,
				<span key='5'>Work</span>,
			];

			const nonSpanElements = rejectTypes(elements, 'span');

			assert.equal(2, nonSpanElements.length, 'length must be 2');
			assert(
				React.isValidElement(nonSpanElements[0]),
				'must be a valid React element'
			);
			assert.equal(Option, nonSpanElements[0].type, 'type must be `Option`');
			assert.equal(
				'Hands',
				nonSpanElements[0].props.children,
				'first element must have the string `Hands`'
			);
			assert(
				React.isValidElement(nonSpanElements[1]),
				'must be a valid React element'
			);
			assert.equal(Option, nonSpanElements[1].type, 'type must be `Option`');
			assert.equal(
				'Light',
				nonSpanElements[1].props.children,
				'second element must have the string `Light`'
			);
		});

		it('should reject elements of many component types', () => {
			const Option = createClass({});
			const elements = [
				<span key='1'>Many</span>,
				<Option key='2'>Hands</Option>,
				<section key='3'>Make</section>,
				<Option key='4'>Light</Option>,
				<span key='5'>Work</span>,
			];

			const remainingElements = rejectTypes(elements, [Option, 'span']);

			assert.equal(1, remainingElements.length, 'length must be 1');
			assert(
				React.isValidElement(remainingElements[0]),
				'must be a valid React element'
			);
			assert.equal(
				'section',
				shallow(remainingElements[0]).type(),
				'type must be `section`'
			);
			assert.equal(
				'Make',
				shallow(remainingElements[0]).text(),
				'element must have the string `Make`'
			);
		});
	});

	describe('createElements', () => {
		it('should create elements of the given type from the array', () => {
			const Option = createClass({});

			const elements = createElements(Option, [
				<Option key='1' />,
				<button key='2' />,
				'red',
				null,
				{ isDisabled: true },
			]);
			assert.equal(5, elements.length, 'length must be 5');
			_.forEach(elements, (element) => {
				assert.equal(Option, element.type, 'type must be Option');
			});
			assert.equal(
				'button',
				elements[1].props.children.type,
				'element must be a button'
			);
			assert.equal(
				'red',
				elements[2].props.children,
				'element children must be `red`'
			);
			assert(
				_.isNull(elements[3].props.children),
				'must pass null values through'
			);
			assert(
				_.isEqual({ isDisabled: true }, elements[4].props),
				'element props must match'
			);
		});
	});

	describe('findTypes', () => {
		it('should find all elements of the same type from children', (done) => {
			const Option: any = createClass({ propName: 'option' });

			const Selector: any = createClass({
				render() {
					const optionElements: any = findTypes(this.props, Option);

					assert.equal(2, optionElements.length, 'length must be 2');
					assert.equal(
						true,
						_.get(optionElements[0].props, 'isDisabled'),
						'element must have prop `isDisabled`'
					);
					assert.equal(
						'Select red',
						_.get(optionElements[1].props, 'title'),
						'element must have prop `title`'
					);
					done();
				},
			} as any);

			shallow(
				<Selector>
					<button />
					<Option isDisabled={true} />
					<button />
					<Option title='Select red'>Red</Option>
					<button />
				</Selector>
			);
		});

		it('should find all elements of the same type from props if type has `propName` defined', (done) => {
			const Option = createClass({ propName: ['option', 'options'] });

			const Selector: any = createClass({
				render() {
					const optionElements: any = findTypes(this.props, Option);

					assert.equal(3, optionElements.length, 'length must be 3');
					assert.equal(
						'red',
						_.get(optionElements[0].props, 'children'),
						'element children must match prop value'
					);
					assert(
						_.isEqual(
							{ children: 'green', isDisabled: true },
							optionElements[1].props
						),
						'element props must match props'
					);
					assert.equal(
						'blue',
						_.get(optionElements[2].props, 'children'),
						'element children must match prop value'
					);
					done();
				},
			} as any);

			shallow(
				<Selector
					option='red'
					options={[{ children: 'green', isDisabled: true }, 'blue']}
				/>
			);
		});

		it('should find all elements of the same type from props and children', (done) => {
			const Option: any = createClass({ propName: ['option', 'options'] });

			const Selector: any = createClass({
				render() {
					const optionElements: any = findTypes(this.props, Option);

					assert.equal(5, optionElements.length, 'length must be 3');
					assert.equal(
						'red',
						_.get(optionElements[0].props, 'children'),
						'element children must match prop value'
					);
					assert(
						_.isEqual(
							{ children: 'green', isDisabled: true },
							optionElements[1].props
						),
						'element props must match props'
					);
					assert.equal(
						'blue',
						_.get(optionElements[2].props, 'children'),
						'element children must match prop value'
					);
					assert.equal(
						true,
						_.get(optionElements[3].props, 'isDisabled'),
						'element must have prop `isDisabled`'
					);
					assert.equal(
						'Select red',
						_.get(optionElements[4].props, 'title'),
						'element must have prop `title`'
					);
					done();
				},
			} as any);

			shallow(
				<Selector
					option='red'
					options={[{ children: 'green', isDisabled: true }, 'blue']}
				>
					<button />
					<Option isDisabled={true} />
					<button />
					<Option title='Select red'>Red</Option>
					<button />
				</Selector>
			);
		});
	});

	describe('addSpecialOmittedProps', () => {
		const props = ['children', 'className', 'isDisabled', 'isLoading'];

		it('should add `callbackId` from props by default', () => {
			const nonPassThroughs = addSpecialOmittedProps(props);

			forEach(['initialState', 'callbackId'], (prop) => {
				expect(nonPassThroughs.includes(prop)).toBe(true);
			});
		});

		it('should not add `callbackId` when targetIsDOMElement is false', () => {
			const nonPassThroughs = addSpecialOmittedProps(props, false);

			forEach(['callbackId'], (prop) => {
				expect(nonPassThroughs.includes(prop)).toBe(false);
			});
		});
	});
});
