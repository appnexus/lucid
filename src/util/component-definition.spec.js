import assert from 'assert';
import _ from 'lodash';
import { createLucidComponentDefinition } from './component-definition';

describe('#createLucidComponentDefinition', function() {
	it('should transform to object with subset of properties plus `propTypes`,`statics`', function() {
		const definition = {
			displayName: '',
			render() {}
		};
		let result = createLucidComponentDefinition(definition);
		assert(_.isEqual([], _.difference(_.xor(_.keys(result), _.keys(definition)), ['propTypes', 'statics'])));
	});

	it('should transform to object without properties `reducers`,`childProps`', function() {
		const definition = {
			reducers: {},
			childProps: {},
			propTypes: {},
			displayName: '',
			render() {}
		};
		let result = createLucidComponentDefinition(definition);
		let resultKeys = _.keys(result);
		assert(!_.includes(resultKeys, 'reducers'));
		assert(!_.includes(resultKeys, 'childProps'));
	});

	it('should transform to object nesting property names from `childProps` in `propTypes`', function() {
		const definition = {
			childProps: {
				ChildA: {},
				ChildB: {}
			},
			propTypes: {
				propertyZ: _.noop
			},
			displayName: '',
			render() {}
		};
		let result = createLucidComponentDefinition(definition);
		let defintionChildPropsPropertyNames = _.keys(_.get(definition, 'childProps'));
		let resultPropTypePropertyNames = _.keys(_.get(result, 'propTypes'));
		assert(_.isEqual([], _.difference(_.intersection(defintionChildPropsPropertyNames, resultPropTypePropertyNames), ['ChildA', 'ChildB'])));
	});

	it('should transform to object nesting `reducers` in `statics`', function() {
		const definition = {
			reducers: {},
			childProps: {},
			propTypes: {},
			displayName: '',
			render() {}
		};
		let result = createLucidComponentDefinition(definition);
		assert.equal(_.get(result, 'statics.reducers'), definition.reducers);
	});
});

