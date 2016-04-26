import React from 'react';
import _ from 'lodash';
import { createChildComponent } from './child-component';

const {
	arrayOf,
	shape,
	oneOfType,
	node
} = React.PropTypes;

export function createClass(componentDefinition) {
	const lucidComponentDefinition = createLucidComponentDefinition(componentDefinition);
	return React.createClass(lucidComponentDefinition);
}

export function createLucidComponentDefinition(componentDefinition) {
	const reducers = _.get(componentDefinition, 'reducers', {});
	const childProps = _.get(componentDefinition, 'childProps', {});
	const childPropsList = _.reduce(childProps, (list, value, key) => list.concat({
		propTypes: value,
		baseName: key,
		propName: key,
		displayName: _.flatten([_.get(componentDefinition, 'displayName', [])]).concat([key]).join('.'),
	}), []);

	return _.assign({}, _.omit(componentDefinition, ['reducers', 'childProps']), {
		propTypes: _.assign(
			{},
			_.get(componentDefinition, 'propTypes'),
			_.reduce(
				childPropsList,
				(newPropTypes, childProp) => _.assign(
					{},
					newPropTypes,
					{[childProp.propName]: oneOfType([arrayOf(oneOfType([shape(childProp.propTypes), node])), shape(childProp.propTypes), node])}
				),
				{}
			)
		),
		statics: _.assign(
			{},
			_.get(componentDefinition, 'statics'),
			(reducers ? {reducers} : null),
			_.reduce(
				childPropsList,
				(exportedChildComponents, childProp) => _.assign(
					{},
					exportedChildComponents,
					{[childProp.baseName]: createChildComponent(childProp)}
				),
				{}
			)
		)
	});
}
