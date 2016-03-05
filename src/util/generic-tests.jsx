import sinon from 'sinon';
import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import describeWithDOM  from './describe-with-dom';
import _ from 'lodash';
import * as lucid from '../index';

// Common tests for all our components
export function common(Component, getDefaultProps=_.noop) {

	function generateDefaultProps(props={}) {
		return _.assign({}, getDefaultProps(), props);
	}

	describe(`[common]`, () => {
		it('should have a `displayName` defined', () => {
			assert(Component.displayName);
		});

		it('should pass through styles to the root element', () => {
			let style = {
				backgroundColor: '#f0f'
			};
			const wrapper = shallow(<Component {...generateDefaultProps()} style={style}/>);
			assert.deepEqual(wrapper.first().prop('style'), style);
		});

		it('should pass through `className`', () => {
			let expectedClass = 'rAnDoM';
			const wrapper = shallow(<Component {...generateDefaultProps()} className={expectedClass}/>);
			let classNames = wrapper.first().prop('className').split(' ');

			assert(_.includes(classNames, expectedClass), `'${classNames}' should include '${expectedClass}'`);
		});

		it('should have an application scoped base class', () => {
			let expectedClass = 'lucid-' + Component.displayName;
			const wrapper = shallow(<Component {...generateDefaultProps()} />);
			let classNames = wrapper.first().prop('className').split(' ');

			assert(_.includes(classNames, expectedClass), `'${classNames}' should include '${Component.displayName}'`);
		});

		it('should have only application scoped classes', () => {
			const wrapper = shallow(<Component {...generateDefaultProps()} />);
			let parentClasses = wrapper.first().prop('className').split(' ');
			let childrenClasses = wrapper.children().reduce((acc, node) => {
				if (!node.prop('className')) {
					return acc;
				}

				return acc.concat(node.prop('className').split(' '))
			}, []);

			let allClasses = parentClasses.concat(childrenClasses);

			assert(_.every(allClasses, (className) => {
				return _.includes(className, 'lucid-' + Component.displayName);
			}));
		});

		it('should only use onX convention for function proptypes', () => {
			assert(_.every(Component.propTypes, (value, key) => {
				// See the following tests from the React source code to figure out how
				// this works: https://github.com/facebook/react/blob/v0.14.7/src/isomorphic/classic/types/__tests__/ReactPropTypes-test.js
				let props = {};
				props[key] = _.noop;

				// Here we test the validation against a noop function, if it doesn't
				// have an error, then it's probably a function. The other possible is
				// that it's an `any`, so we'll test for that below
				let isProbablyFunction = !(value(props, key) instanceof Error);

				// We'll also test out a string to see if that valid
				props[key] = '';

				let isAny = isProbablyFunction && !(value(props, key) instanceof Error);

				// If it's probably a function, and it's not `any`, then we make sure
				// it starts with `on`
				if (isProbablyFunction && !isAny && !_.startsWith(key, 'on')) {
					return false
				}

				return true;
			}));
		});

		it('should be available as an exported module from index.js', () => {
			assert(lucid[Component.displayName]);
		});
	});
}

// Common tests for all our icon components
export function icons(Component) {
	describeWithDOM(`[icon]`, () => {
		it('should pass through isBadge prop to underlying Icon component', () => {
			const wrapper = mount(<Component isBadge={true} />);
			const classNames = wrapper.find('svg').prop('className').split(' ');
			const targetClassName = 'lucid-Icon-is-badge';
			assert(_.includes(classNames, targetClassName), `'${classNames}' should include '${targetClassName}'`);
		});
	});
}

// Common tests for all control components
export function controls(Component, { callbackName, controlSelector , eventType }) {
	// Use DOM tests here since some of our controls use dom events under the hood
	describeWithDOM('[control]', () => {
		it('should callback with `uniqueId` and `event` prop', () => {
			const expectedUniqueId = 32;
			const props = {
				uniqueId: expectedUniqueId,
				[callbackName]: sinon.spy(),
			};
			const wrapper = mount(<Component {...props} />);

			wrapper.find(controlSelector).simulate(eventType);

			// Last argument should be an object with `uniqueId` and `event`
			const { uniqueId, event } = _.last(props[callbackName].args[0]);

			assert(event, 'missing event');
			assert.equal(uniqueId, expectedUniqueId, 'incorrect or missing uniqueId');
		});
	});
}
