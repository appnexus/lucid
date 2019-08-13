import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'react-peek/prop-types';
import _ from 'lodash';
import {
	isPlainObjectOrEsModule,
	omitFunctionPropsDeep,
} from './state-management';

type TypesType<P> =
	| ICreateClassComponentClass<P>
	| Array<ICreateClassComponentClass<P>>
	| { propName: string }

interface ICreateClassComponentSpec<P extends { [key: string]: any }, S>
	extends React.Mixin<P, S> {
	_isPrivate?: boolean;
	initialState?: S;
	propName?: string;
	components?: {
		[key: string]: ICreateClassComponentClass<{}>;
	};
	statics?: {
		definition?: ICreateClassComponentSpec<P, S>;
		[key: string]: any;
	};
	// TODO: improve these with a stricter type https://stackoverflow.com/a/54775885/895558
	reducers?: { [K in keyof P]?: (arg0: S, ...args: any[]) => S };
	selectors?: { [K in keyof P]?: (arg0: S) => any };
	render?(): React.ReactNode;

	// TODO: could this be better handled by adding a third type parameter that
	// allows the components to define what the extra class properties would
	// be?
	[key: string]: any;
}

export interface ICreateClassComponentClass<P>
	extends React.ClassicComponentClass<P> {
	propName?: string;

	// TODO: fix this too
	[key: string]: any;
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

	// Intentionally keep this object type inferred so it can be passed to
	// `createReactClass`
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

	if (!_.isUndefined(newDefinition.statics)) {
		newDefinition.statics.definition = newDefinition;
	}

	return createReactClass(newDefinition);
}

// return all elements matching the specified types
export function filterTypes<P>(
	children: React.ReactNode,
	types?: TypesType<P>
): React.ReactNode[] {
	if (types === undefined) {
		return [];
	}

	types = _.castArray(types);

	return _.filter(
		React.Children.toArray(children),
		element => React.isValidElement(element) && _.includes(types, element.type)
	);
}

// return all elements not matching the specified types
export function rejectTypes(children: React.ElementType, types = []): React.ReactNode[] {
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
): React.ReactElement[] {
	return _.reduce(
		values,
		(elements: Array<React.ReactElement<P>>, typeValue): React.ReactElement[] => {
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
export function findTypes<P extends { children?: React.ReactNode }>(
	props: P,
	types?: TypesType<P>
): React.ReactNode[] {
	if (types === undefined) {
		return [];
	}

	// get elements from props (using types.propName)
	const elementsFromProps: React.ReactNode[] = _.reduce(
		_.castArray(types),
		(acc: React.ReactNode[], type): React.ReactNode[] => {
			return _.isNil(type.propName)
				? []
				: createElements(
						type,
						_.flatten(_.values(_.pick(props, type.propName)))
				  );
		},
		[]
	);

	if(props.children === undefined) {
		return elementsFromProps;
	}

	// return elements from props and elements from children
	return elementsFromProps.concat(filterTypes<P>(props.children, types));
}

// return the first element found in props and children of the specificed type(s)
export function getFirst<P>(
	props: P,
	types:
		| TypesType<P>
		| undefined,
	defaultValue?: React.ReactNode
): {} | null | undefined {
	return _.first(findTypes<P>(props, types)) || defaultValue;
}

// Omit props defined in propTypes of the given type and any extra keys given
// in third argument
//
// We also have a "magic" prop that's always excluded called `callbackId`. That
// prop can be used to identify a component in a list without having to create
// extra closures.
//
// Note: The Partial<P> type is referring to the props passed into the omitProps,
// not the props defined on the component.
export function omitProps<P extends object> (
	props: P,
	component: ICreateClassComponentClass<P> | undefined,
	keys: string[] = [],
	targetIsDOMElement = true
): { [key: string]: any } {
	// We only want to exclude the `callbackId` key when we're omitting props
	// destined for a dom element
	const additionalOmittedKeys = targetIsDOMElement
		? ['initialState', 'callbackId']
		: ['initialState'];

	// this is to support non-createClass components that we've converted to TypeScript
	if(component === undefined) {
		return _.omit(
			props,
			keys.concat(additionalOmittedKeys)
		);
	}

	return _.omit(
		props,
		_.keys(component.propTypes)
			.concat(keys)
			.concat(additionalOmittedKeys)
	);
}
