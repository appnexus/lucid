import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
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
			let expectedClass = 'bert-' + Component.displayName;
			const wrapper = shallow(<Component />);
			let classNames = wrapper.first().prop('className').split(' ');

			assert(_.includes(classNames, expectedClass), `'${classNames}' should include '${Component.displayName}'`);
		});

		it('should have only application scoped classes', () => {
			const wrapper = shallow(<Component>test</Component>);
			let parentClasses = wrapper.first().prop('className').split(' ');
			let childrenClasses = wrapper.children().reduce((acc, node) => {
				return acc.concat(node.prop('className').split(' '))
			}, []);

			let allClasses = parentClasses.concat(childrenClasses);

			assert(_.every(allClasses, (className) => {
				return _.includes(className, 'bert-' + Component.displayName);
			}));
		});

		it('should only use onX convention for function proptypes', () => {
			assert(_.every(Component.propTypes, (value, key) => {
				// See the following tests from the React source code to figure out how
				// this works: https://github.com/facebook/react/blob/v0.14.7/src/isomorphic/classic/types/__tests__/ReactPropTypes-test.js
				let props = {};
				props[key] = _.noop;

				let isFunction = !(value(props, key) instanceof Error);

				if (isFunction && !_.startsWith(key, 'on')) {
					return false
				}

				return true;
			}));
		});

	});
}
