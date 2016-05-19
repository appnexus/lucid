import React from 'react';
import _ from 'lodash';

// creates a React component
export function createClass(definition={}) {
	const {
		_lucidIsPrivate = false,
		statics = {},
		components = {},
		reducers = {},
		selectors = {},
		propName = null,
		render = () => null,
		...restDefinition,
	} = definition;

	const newDefinition = {
		...restDefinition,
		statics: {
			...statics,
			...components,
			_lucidIsPrivate,
			reducers,
			selectors,
			propName,
		},
		render,
	};

	newDefinition.statics.definition = newDefinition;

	return React.createClass(newDefinition);
}

// return all elements matching the specified types
export function filterTypes(children, types=[]) {
	types = [].concat(types); // coerce to Array

	return _.filter(
		React.Children.toArray(children),
		(element) => (React.isValidElement(element) && _.includes(types, element.type))
	);
}

// return all elements not matching the specified types
export function rejectTypes(children, types=[]) {
	types = [].concat(types); // coerce to Array

	return _.reject(
		React.Children.toArray(children),
		(element) => (React.isValidElement(element) && _.includes(types, element.type))
	);
}

// return an array of elements (of the given type) for each of the values
export function createElements(type, values=[]) {
	return _.reduce([].concat(values), (elements, typeValue) => {
		if (React.isValidElement(typeValue) && typeValue.type === type) {
			return elements.concat(typeValue);
		} else if (_.isPlainObject(typeValue) && !React.isValidElement(typeValue)) {
			return elements.concat(React.createElement(type, typeValue));
		} else if (_.isNil(typeValue)) {
			return elements;
		} else {
			return elements.concat(React.createElement(type, null, typeValue));
		}
	}, []);
}

// return all elements found in props and children of the specified types
export function findTypes(props, types=[]) {
	types = [].concat(types); // coerce to Array

	// get elements from props (using type.propName)
	const elementsFromProps = _.reduce(types, (acc, type) => {
		if (!_.isEmpty(type.propName)) {
			const propMatches = _.flatten(_.values(_.pick(props, type.propName)));
			return acc.concat(createElements(type, propMatches));
		}
		return acc;
	}, []);

	// return elements from props and elements from children
	return elementsFromProps.concat(filterTypes(props.children, types));
}
