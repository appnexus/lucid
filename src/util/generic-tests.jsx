import sinon from 'sinon';
import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import describeWithDOM  from './describe-with-dom';
import _ from 'lodash';
import * as lucid from '../index';

// Common tests for all our components
export function common(Component, {
	getDefaultProps = _.noop,
	selector = null,
	exemptFunctionProps = [],
} = {}) {

	function generateDefaultProps(props={}) {
		return _.assign({}, getDefaultProps(), props);
	}

	describe('[common]', () => {
		it('should have a `displayName` defined', () => {
			assert(Component.displayName);
		});

		it('should pass through styles to the root element', () => {
			let style = {
				backgroundColor: '#f0f',
			};
			const wrapper = shallow(<Component {...generateDefaultProps()} style={style}/>);
			const rootWrapper = selector ? wrapper.find(selector).first() : wrapper.first();
			const rootStyle = rootWrapper.prop('style');
			assert(_.every(style, (val, key) => val === rootStyle[key]), 'root style must contain passed styles');
		});

		it('should pass through `className`', () => {
			const expectedClass = 'rAnDoM';
			const wrapper = shallow(<Component {...generateDefaultProps()} className={expectedClass}/>);
			const rootWrapper = selector ? wrapper.find(selector).first() : wrapper.first();
			const classNames = rootWrapper.prop('className').split(' ');

			assert(_.includes(classNames, expectedClass), `'${classNames}' should include '${expectedClass}'`);
		});

		it('should have an application scoped base class', () => {
			const expectedClass = 'lucid-' + Component.displayName;
			const wrapper = shallow(<Component {...generateDefaultProps()} />);
			const rootWrapper = selector ? wrapper.find(selector).first() : wrapper.first();
			const classNames = rootWrapper.prop('className').split(' ');

			assert(_.includes(classNames, expectedClass), `'${classNames}' should include '${Component.displayName}'`);
		});

		it('should have only application scoped classes', () => {
			const wrapper = shallow(<Component {...generateDefaultProps()} />);
			const rootWrapper = selector ? wrapper.find(selector).first() : wrapper.first();
			const parentClasses = rootWrapper.prop('className').split(' ');
			const childrenClasses = rootWrapper.children().reduce((acc, node) => {
				if (!node.prop('className')) {
					return acc;
				}

				return acc.concat(node.prop('className').split(' '))
			}, []);

			const allClasses = parentClasses.concat(childrenClasses);

			_.forEach(allClasses, className => {
				assert(_.includes(className, `lucid-${Component.displayName}`), `${className} must be scoped`);
			});
		});

		it('should only use onX convention for function proptypes', () => {

			_.forEach(Component.propTypes, (value, key) => {
				// See the following tests from the React source code to figure out how
				// this works: https://github.com/facebook/react/blob/v0.14.7/src/isomorphic/classic/types/__tests__/ReactPropTypes-test.js
				let props = {};
				props[key] = _.noop;

				// Here we test the validation against a noop function, if it doesn't
				// have an error, then it's probably a function. The other possible is
				// that it's an `any`, so we'll test for that below
				const isProbablyFunction = !(value(props, key) instanceof Error);

				// We'll also test out a string to see if that valid
				props[key] = '';

				const isAny = isProbablyFunction && !(value(props, key) instanceof Error);

				// If it's probably a function, and it's not `any`, then we make sure
				// it starts with `on`

				if (isProbablyFunction) {
					assert(isAny || _.startsWith(key, 'on') || _.includes(exemptFunctionProps, key), `${key} must follow onX convention`);
				}

			});

		});

		// Only run this test if it's a public component
		if (!Component._lucidIsPrivate) {
			it('should be available as an exported module from index.js', () => {
				assert(lucid[Component.displayName]);
			});
		}
	});
}

// Common tests for all our icon components
export function icons(Component) {
	describeWithDOM('[icon]', () => {
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
		it('should callback with `event` and `props`', () => {
			const expectedSpecialProp = 32;
			const props = {
				specialProp: expectedSpecialProp,
				[callbackName]: sinon.spy(),
			};
			const wrapper = mount(<Component {...props} />);

			wrapper.find(controlSelector).simulate(eventType);

			// Last argument should be an object with `uniqueId` and `event`
			const { props: { specialProp }, event } = _.last(props[callbackName].args[0]);

			assert(event, 'missing event');
			assert.equal(specialProp, expectedSpecialProp, 'incorrect or missing specialProp');
		});
	});
}
