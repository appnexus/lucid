import sinon from 'sinon';
import { parse } from 'path';
import React from 'react';
import PropTypes from 'prop-types';
import { mount, shallow, render } from 'enzyme';
import assert from 'assert';
import _, { each, omit, keys, includes, forEach } from 'lodash';
import glob from 'glob';
import { addons, mockChannel } from '@storybook/addons';
import timekeeper from 'timekeeper';

addons.setChannel(mockChannel());

interface ICommonConfig {
	getDefaultProps?: () => {};
	exemptFunctionProps?: string[];
	exemptChildComponents?: string[];
	selectRoot?: any;
	noExport?: boolean;
}

// Common tests for all our components
export function common(Component: any, config: ICommonConfig = {} as any) {
	const {
		getDefaultProps = _.constant({}),
		exemptFunctionProps = [],
		exemptChildComponents = [],
		selectRoot = _.identity,
		noExport = false,
	} = config;

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
				<Component {...generateDefaultProps()} style={style} />,
				{ disableLifecycleMethods: true }
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
				<Component {...generateDefaultProps()} className={expectedClass} />,
				{ disableLifecycleMethods: true }
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
			const wrapper = shallow(<Component {...generateDefaultProps()} />, {
				disableLifecycleMethods: true,
			});
			const rootWrapper = selectRoot(wrapper).first();
			const classNames = rootWrapper.prop('className').split(' ');

			assert(
				_.includes(classNames, expectedClass),
				`'${classNames}' should include '${Component.displayName}'`
			);
		});

		it('should have only application scoped classes', () => {
			const wrapper = shallow(<Component {...generateDefaultProps()} />, {
				disableLifecycleMethods: true,
			});
			const rootWrapper = selectRoot(wrapper).first();
			const parentClasses = rootWrapper.prop('className').split(' ');
			const childrenClasses = rootWrapper.children().reduce((acc, node) => {
				if (!node.prop('className')) {
					return acc;
				}

				return acc.concat(node.prop('className').split(' '));
			}, []);

			const allClasses = parentClasses.concat(childrenClasses);

			_.forEach(allClasses, (className) => {
				assert(
					_.includes(className, `lucid-${Component.displayName}`),
					`${className} must be scoped`
				);
			});
		});

		describe('function propTypes', () => {
			const funcProps = _.pickBy(
				Component.propTypes,
				(propType) => propType === PropTypes.func
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
			// Child components are all function types which start with a capital letter
			const childComponents = _.pickBy(Component, (value, key) => {
				return /^[A-Z]/.test(key) && _.isFunction(value);
			});

			describe('propNames in propTypes', () => {
				_.flow(
					(x) => _.map(x, 'propName'),
					(x) => _.compact(x),
					(x) => _.flatMap(x, _.castArray),
					(x) =>
						_.reject(x, (propName) =>
							_.includes(exemptChildComponents, propName)
						),
					(x) =>
						_.forEach(x, (propName) => {
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
				`./src/components/**/${Component.displayName}/*.stories.@(j|t)sx`
			);
			each(fileNames, (path) => {
				const lib = require('../../' + path.replace('.tsx', ''));

				each(omit(lib, ['default']), (Story, name) => {
					it(`should match snapshot(s) for ${name}`, () => {
						let result;
						try {
							result = render(<Story {...Story.args} />, {
								disableLifecycleMethods: true,
							});
							expect(result).toMatchSnapshot();
						} catch (err) {
							expect(err).toMatchSnapshot();
						}
					});
				});
			});

			// Support for older examples
			const exampleFileNames = glob.sync(
				`./src/components/**/${Component.displayName}/examples/*.@(j|t)sx`
			);
			_.each(exampleFileNames, (path) => {
				const lib = require('../../' + path.replace('.tsx', ''));

				const Example = lib.default;

				const title = parse(path).name;
				it(`should match snapshot(s) for ${title}`, () => {
					const shallowExample = shallow(<Example />, {
						disableLifecycleMethods: true,
					});

					// If the root of the example is an instance of the Component under test, snapshot it.
					// Otherwise, look under the root for instances of the Component and snapshot those.
					if (shallowExample.is(Component.displayName)) {
						expect(
							shallow(<Component {...shallowExample.props()} />, {
								disableLifecycleMethods: true,
							})
						).toMatchSnapshot();
					} else {
						shallowExample.find(Component.displayName).forEach((example) => {
							expect(
								shallow(<Component {...example.props()} />, {
									disableLifecycleMethods: true,
								})
							).toMatchSnapshot();
						});
					}
				});
			});
		});
	});
}

// Common tests for all our icon components

interface IIconConfig {
	includeInitialState: boolean;
}

export function icons(Component: any, config: IIconConfig = {} as any) {
	// The default expectation is for every Icon to omit `initailState`,
	// if it is passed through to the underlying element
	const { includeInitialState = false } = config;

	describe('[icon]', () => {
		it('should almost always omit the `initialState` key', () => {
			const wrapper = shallow(<Component initialState={{ testState: true }} />);
			const rootProps = keys(wrapper.first().props());

			expect(includes(rootProps, 'initialState')).toBe(includeInitialState);
		});

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

export function passThroughs(Component: any, config: IIconConfig = {} as any) {
	// The default expectation is for every Component to omit `initialState`,
	// if it is passed through to the underlying element
	const { includeInitialState = false } = config;

	describe('pass throughs', () => {
		it('should almost always omit the `initialState` key', () => {
			const wrapper = shallow(<Component initialState={{ testState: true }} />);
			const rootElementProps = keys(wrapper.first().props());

			expect(includes(rootElementProps, 'initialState')).toBe(
				includeInitialState
			);
		});
		it('should pass through all props not defined in `propTypes` to the root element', () => {
			const wrapper = shallow(
				<Component
					{...{
						foo: 1,
						bar: 2,
						baz: 3,
						qux: 4,
						quux: 5,
					}}
				/>
			);
			const rootElementProps = keys(wrapper.first().props());

			// It should pass `foo`, `bar`, `baz`, `qux`, and `quux`
			// to the root element.
			forEach(['foo', 'bar', 'baz', 'qux', 'quux'], (prop) => {
				expect(includes(rootElementProps, prop)).toBe(true);
			});
		});
	});
}

// Common tests for all control components
export function controls(
	Component: any,
	{ callbackName, controlSelector, eventType, additionalProps = {} }: any
) {
	// Use DOM tests here since some of our controls use dom events under the hood
	describe('[control]', () => {
		it('should callback with `event` and `props`', () => {
			const expectedSpecialProp = 32;
			const props = {
				specialprop: expectedSpecialProp,
				[callbackName]: sinon.spy(),
				...additionalProps,
			};
			const wrapper = mount(<Component {...props} />);

			wrapper.find(controlSelector).first().simulate(eventType);

			// Last argument should be an object with `uniqueId` and `event`
			const {
				props: { specialprop },
				event,
			}: any = _.last(props[callbackName].args[0]);

			assert(event, 'missing event');
			assert.equal(
				specialprop,
				expectedSpecialProp,
				'incorrect or missing specialProp'
			);
		});
	});
}

// Common tests for all Functional Components
//
// These tests are intended to help us make sure our FCs are shaped corrected.
// They are necessary because there isn't a perfect way to get the defaultProps
// to be factored in correctly yet with React/TypeScript:
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30695#issuecomment-474780159
export function functionalComponents(FC: any) {
	// Use DOM tests here since some of our controls use dom events under the hood
	describe('[functionalComponent]', () => {
		it('should have the correct `peek` properties', () => {
			expect(FC.propName === undefined || typeof FC.propName === 'string').toBe(
				true
			);
			expect(
				FC._isPrivate === undefined || typeof FC._isPrivate === 'boolean'
			).toBe(true);

			expect(typeof FC.peek).toBe('object');
			expect(typeof FC.peek.description).toBe('string');
			expect(
				FC.peek.extend === undefined || typeof FC.peek.extend === 'string'
			).toBe(true);
			expect(
				FC.peek.extend === undefined || typeof FC.peek.extend === 'string'
			).toBe(true);
			expect(
				FC.peek.categories === undefined || Array.isArray(FC.peek.categories)
			).toBe(true);
			expect(
				FC.peek.madeFrom === undefined || Array.isArray(FC.peek.madeFrom)
			).toBe(true);
		});
	});
}

export const mockDate = (dateString: string) => {
	timekeeper.freeze(new Date(dateString));
};
