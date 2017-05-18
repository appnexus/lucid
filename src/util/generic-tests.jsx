import sinon from 'sinon';
import { basename } from 'path';
import React from 'react';
import PropTypes from 'prop-types';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import _ from 'lodash';
import glob from 'glob';
import * as lucid from '../index';

// Common tests for all our components
export function common(
	Component,
	{
		getDefaultProps = _.constant({}),
		exemptFunctionProps = [],
		exemptChildComponents = [],
		selectRoot = _.identity,
	} = {}
) {
	function generateDefaultProps(props = {}) {
		return _.assign({}, getDefaultProps(), props);
	}

	describe('[common]', () => {
		if (!Component) {
			throw new Error('An undefined component was passed to generic tests.');
		}

		if (Component._isLucidHybridComponent) {
			throw new Error(
				`You're trying to run generic tests on a hybrid component which is bad and won't work and will make you cry. Check your spec files for ${Component.displayName} and import the raw component instead of the hybrid version.`
			);
		}

		it('should have a `displayName` defined', () => {
			assert(Component.displayName);
		});

		it('should pass through styles to the root element', () => {
			const style = {
				backgroundColor: '#f0f',
			};
			const wrapper = shallow(
				<Component {...generateDefaultProps()} style={style} />
			);

			const rootWrapper = selectRoot(wrapper).first();
			const rootStyle = rootWrapper.prop('style');
			assert(
				_.every(style, (val, key) => val === rootStyle[key]),
				'root style must contain passed styles'
			);
		});

		it('should pass through `className`', () => {
			const expectedClass = 'rAnDoM';
			const wrapper = shallow(
				<Component {...generateDefaultProps()} className={expectedClass} />
			);
			const rootWrapper = selectRoot(wrapper).first();
			const classNames = rootWrapper.prop('className').split(' ');

			assert(
				_.includes(classNames, expectedClass),
				`'${classNames}' should include '${expectedClass}'`
			);
		});

		it('should have an application scoped base class', () => {
			const expectedClass = 'lucid-' + Component.displayName;
			const wrapper = shallow(<Component {...generateDefaultProps()} />);
			const rootWrapper = selectRoot(wrapper).first();
			const classNames = rootWrapper.prop('className').split(' ');

			assert(
				_.includes(classNames, expectedClass),
				`'${classNames}' should include '${Component.displayName}'`
			);
		});

		it('should have only application scoped classes', () => {
			const wrapper = shallow(<Component {...generateDefaultProps()} />);
			const rootWrapper = selectRoot(wrapper).first();
			const parentClasses = rootWrapper.prop('className').split(' ');
			const childrenClasses = rootWrapper.children().reduce((acc, node) => {
				if (!node.prop('className')) {
					return acc;
				}

				return acc.concat(node.prop('className').split(' '));
			}, []);

			const allClasses = parentClasses.concat(childrenClasses);

			_.forEach(allClasses, className => {
				assert(
					_.includes(className, `lucid-${Component.displayName}`),
					`${className} must be scoped`
				);
			});
		});

		describe('function propTypes', () => {
			const funcProps = _.pickBy(
				Component.propTypes,
				propType => propType === PropTypes.func
			);

			_.forEach(funcProps, (propType, propName) => {
				it(`${propName} should only use onX convention for function proptypes`, () => {
					assert(
						_.startsWith(propName, 'on') ||
							_.includes(exemptFunctionProps, propName),
						`${propName} must follow onX convention`
					);
				});
			});
		});

		describe('child components', () => {
			const childComponents = _.omit(Component.definition.statics, [
				'_isPrivate',
				'definition',
				'propName',
				'reducers',
				'selectors',
			]);

			describe('propNames in propTypes', () => {
				_.flow(
					x => _.map(x, 'propName'),
					x => _.compact(x),
					x => _.flatMap(x, _.castArray),
					x =>
						_.reject(x, propName =>
							_.includes(exemptChildComponents, propName)
						),
					x =>
						_.forEach(x, propName => {
							it(`should include ${propName} in propTypes`, () => {
								assert(
									Component.propTypes[propName],
									`must include ${propName} in propTypes`
								);
							});
						})
				)(childComponents);
			});
		});

		describe('example testing', () => {
			const fileNames = glob.sync(
				`./src/components/**/${Component.displayName}/examples/*.jsx`
			);
			_.each(fileNames, path => {
				const Example = require('../../' + path).default;
				const title = basename(path, '.jsx');
				it(`should match snapshot(s) for ${title}`, () => {
					const shallowExample = shallow(<Example />);

					// If the root of the example is an instance of the Component under test, snapshot it.
					// Otherwise, look under the root for instances of the Component and snapshot those.
					if (shallowExample.is(Component.displayName)) {
						expect(
							shallow(<Component {...shallowExample.props()} />)
						).toMatchSnapshot();
					} else {
						shallowExample.find(Component.displayName).forEach(example => {
							expect(
								shallow(<Component {...example.props()} />)
							).toMatchSnapshot();
						});
					}
				});
			});
		});

		// Only run this test if it's a public component
		if (!Component._isPrivate) {
			it('should be available as an exported module from index.js', () => {
				assert(lucid[Component.displayName]);
			});
		}
	});
}

// Common tests for all our icon components
export function icons(Component) {
	describe('[icon]', () => {
		it('should add the correct class for isClickable', () => {
			const wrapper = mount(<Component isClickable={true} />);
			const targetClassName = 'lucid-Icon-is-clickable';
			assert(
				wrapper.find('svg').hasClass(targetClassName),
				`Missing '${targetClassName}' class`
			);
		});
	});
}

// Common tests for all control components
export function controls(
	Component,
	{ callbackName, controlSelector, eventType, additionalProps = {} }
) {
	// Use DOM tests here since some of our controls use dom events under the hood
	describe('[control]', () => {
		it('should callback with `event` and `props`', () => {
			const expectedSpecialProp = 32;
			const props = {
				specialProp: expectedSpecialProp,
				[callbackName]: sinon.spy(),
				...additionalProps,
			};
			const wrapper = mount(<Component {...props} />);

			wrapper.find(controlSelector).simulate(eventType);

			// Last argument should be an object with `uniqueId` and `event`
			const { props: { specialProp }, event } = _.last(
				props[callbackName].args[0]
			);

			assert(event, 'missing event');
			assert.equal(
				specialProp,
				expectedSpecialProp,
				'incorrect or missing specialProp'
			);
		});
	});
}

const NativeDate = global.Date;
const createMockDateClass = (...args) =>
	_.assign(
		function MockDate() {
			return new NativeDate(...args);
		},
		{
			UTC: NativeDate.UTC,
			parse: NativeDate.parse,
			now: () => new NativeDate(...args).getTime(),
			prototype: NativeDate.prototype,
		}
	);

export const mockDate = _.assign(
	(...args) => {
		global.Date = createMockDateClass(...args);
	},
	{
		restore() {
			global.Date = NativeDate;
		},
	}
);
