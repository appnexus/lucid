import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import describeWithDOM  from './describe-with-dom';
import _ from 'lodash';

// Common tests for all our components
export function common(Component) {
	describe(`[common]`, () => {
		it('should pass through styles to the root element', () => {
			let style = {
				backgroundColor: '#f0f'
			};
			const wrapper = shallow(<Component style={style}/>);
			assert.deepEqual(wrapper.first().prop('style'), style);
		});

		it('should pass through className', () => {
			let expectedClass = 'rAnDoM';
			const wrapper = shallow(<Component className={expectedClass}/>);
			let classNames = wrapper.first().prop('className').split(' ');

			assert(_.includes(classNames, expectedClass), `'${classNames}' should include '${expectedClass}'`);
		});

		it('should have an application scoped base class', () => {
			let expectedClass = 'lucid-' + Component.displayName;
			const wrapper = shallow(<Component />);
			let classNames = wrapper.first().prop('className').split(' ');

			assert(_.includes(classNames, expectedClass), `'${classNames}' should include '${Component.displayName}'`);
		});

		it('should have only application scoped classes', () => {
			const wrapper = shallow(<Component>test</Component>);
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

	});
}

// Common tests for all our icon components
export function icons(Component) {
	describeWithDOM(`[icon]`, () => {
		it('should pass through isBadge prop to underlying Icon component', () => {
			const wrapper = mount(<Component isBadge={true} />);
			let classNames = wrapper.find('svg').prop('className').split(' ');
			let targetClassName = 'lucid-Icon-is-badge';
			assert(_.includes(classNames, targetClassName), `'${classNames}' should include '${targetClassName}'`);
		});
	});
}
