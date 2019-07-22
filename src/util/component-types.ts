import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'react-peek/prop-types';
import _ from 'lodash';
import {
	isPlainObjectOrEsModule,
	omitFunctionPropsDeep,
} from './state-management';

interface ICreateClassComponentSpec<P, S> extends React.ComponentSpec<P, S> {
	_isPrivate?: boolean;
	propName?: string;
}

interface ICreateClassComponentClass<P> extends React.ClassicComponentClass<P> {
	propName?: string;
}

// creates a React component
export function createClass<P, S>(
	spec: ICreateClassComponentSpec<P, S>
): ICreateClassComponentClass<P> {
	const {
		_isPrivate = false,
		getDefaultProps,
		statics = {},
		components = {},
		reducers = {},
		selectors = {},
		initialState = getDefaultProps &&
			omitFunctionPropsDeep(getDefaultProps.apply(spec)),
		propName = null,
		propTypes = {},
		render = () => null,
		...restDefinition
	} = spec;

	const newDefinition = {
		getDefaultProps,
		...restDefinition,
		statics: {
			...statics,
			...components,
			_isPrivate,
			reducers,
			selectors,
			initialState,
			propName,
		},
		propTypes: _.assign(
			{},
			propTypes,
			_.mapValues(
				spec.components,
				(componentValue, componentKey) =>
					PropTypes.any`Props for ${componentValue.displayName || componentKey}`
			)
		),
		render,
	};

	newDefinition.statics.definition = newDefinition;

	return createReactClass(newDefinition);
}

// return all elements matching the specified types
// TODO: could this support multiple types? We don't seem to use it in practice
// but it would be nice to no include a breaking change here.
export function filterTypes<P>(
	children: React.ReactNode,
	type: ICreateClassComponentClass<P>
) {
	return _.filter(
		React.Children.toArray(children),
		element => React.isValidElement(element) && type === element.type
	);
}

// return all elements not matching the specified types
export function rejectTypes(children: React.ElementType, types = []) {
	types = [].concat(types); // coerce to Array

	return _.reject(
		React.Children.toArray(children),
		element => React.isValidElement(element) && _.includes(types, element.type)
	);
}

// return an array of elements (of the given type) for each of the values
export function createElements<P>(
	type: ICreateClassComponentClass<P>,
	values: Array<React.ReactElement<P> | P> = []
) {
	return _.reduce(
		values,
		(elements: Array<React.ReactElement<P>>, typeValue) => {
			if (React.isValidElement(typeValue) && typeValue.type === type) {
				return elements.concat(typeValue);
			} else if (
				isPlainObjectOrEsModule(typeValue) &&
				!React.isValidElement(typeValue)
			) {
				return elements.concat(React.createElement(type, typeValue));
			} else if (_.isUndefined(typeValue)) {
				return elements;
			} else {
				return elements.concat(React.createElement(type, null, typeValue));
			}
		},
		[]
	);
}

// return all elements found in props and children of the specified types
// TODO: the type param below is a breaking change, but there is not any expected
// consumer usage of multiple types
export function findTypes<P>(
	props: { children: React.ReactNode },
	type: ICreateClassComponentClass<P>
) {
	// get elements from props (using type.propName)
	if (!_.isUndefined(type.propName)) {
		const propMatches = _.flatten(_.values(_.pick(props, type.propName)));
		return createElements(type, propMatches);
	}

	// return elements from props and elements from children
	return filterTypes<P>(props.children, type);
}

// return the first element found in props and children of the specificed type(s)
export function getFirst<P extends { children: React.ReactNode }>(
	props: P,
	type: ICreateClassComponentClass<P>,
	defaultValue: React.ReactNode
) {
	return _.first(findTypes(props, type)) || defaultValue;
}

// Omit props defined in propTypes of the given type and any extra keys given
// in third argument
//
// We also have a "magic" prop that's always excluded called `callbackId`. That
// prop can be used to identify a component in a list without having to create
// extra closures.
export function omitProps<P extends { children: React.ReactNode }>(
	props: P,
	type: ICreateClassComponentClass<P>,
	keys: string[] = [],
	targetIsDOMElement = true
) {
	// We only want to exclude the `callbackId` key when we're omitting props
	// destined for a dom element
	const additionalOmittedKeys = targetIsDOMElement
		? ['initialState', 'callbackId']
		: ['initialState'];

	return _.omit(
		props,
		_.keys(type.propTypes)
			.concat(keys)
			.concat(additionalOmittedKeys)
	);
}
