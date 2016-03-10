import React from 'react';
import _ from 'lodash';
import { createChildComponent } from './child-component';

export function createLucidComponentDefinition(componentDefinition) {
	let {
		arrayOf,
		shape,
		oneOfType,
		node
	} = React.PropTypes;
	let reducers = _.get(componentDefinition, 'reducers');
	let childProps = _.get(componentDefinition, 'childProps', {});
	let childPropsList = _.reduce(childProps, (list, value, key) => list.concat({
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
