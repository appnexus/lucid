import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
	isPlainObjectOrEsModule,
	omitFunctionPropsDeep,
} from './state-management';
import { ValidationMap } from 'prop-types';

export interface StandardProps {
	/** Appended to the component-specific class names set on the root element.
	 * Value is run through the `classnames` library. */
	className?: string;

	/** Any valid React children. */
	children?: React.ReactNode;

	/** Styles that are passed through to native control. */
	style?: React.CSSProperties;

	/** A "magic" prop that's always excluded from DOM elements.
	 * `callbackId` can be used to identify a component in a list
	 *  without having to create extra closures. */
	callbackId?: string | number;
}

// Like `T & U`, but where there are overlapping properties using the type from U only.
// From https://github.com/pelotom/type-zoo/blob/1a08384d77967ed322356005636fbb8db3c16702/types/index.d.ts#L43
export type Overwrite<T, U> = Omit<T, keyof T & keyof U> & U;

// `D`: default props (should be provided when a functional component supports
// default props)
export interface FC<P> extends React.FC<P> {
	peek?: {
		description: string;
		notes?: {
			overview: string;
			intendedUse: string;
			technicalRecommendations: string;
		};
		categories?: string[];
		extend?: string;
		madeFrom?: string[];
	};
	categories?: string[];
	description?: string;
	propTypes?: object;
	propName?: string | string[];
	_isPrivate?: boolean;
}

type TypesType<P> =
	| ICreateClassComponentClass<P>
	| Array<ICreateClassComponentClass<P>>
	| FC<P>
	| Array<FC<P>>
	| { propName?: string | string[] }
	| any; // TODO: figure out a type that works with inferred functional components

interface ICreateClassComponentSpec<P, S> extends React.Mixin<P, S> {
	_isPrivate?: boolean;
	initialState?: S;
	propName?: string | string[];
	propTypes?: Required<{ [key in keyof P]: any }>;
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
	render?(
		this: { props: P } & {
			[k: string]: any;
		} /* allow for extra properties on `this` to be backward compatible */
	): React.ReactNode;

	// TODO: could this be better handled by adding a third type parameter that
	// allows the components to define what the extra class properties would
	// be?
	[key: string]: any;
}

export interface ICreateClassComponentClass<P>
	extends React.ClassicComponentClass<P> {
	propName?: string | string[];
}

/**
 * creates a React component
 */
export function createClass<P, S = {}>(
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
		render = (): null => null,
		...restDefinition
	} = spec;

	const propTypeValidators: ValidationMap<any> = {
		...propTypes,
		..._.mapValues(
			spec.components,
			(componentValue, componentKey): {} =>
				PropTypes.any /* Props for ${componentValue.displayName || componentKey} */
		),
	};

	// Intentionally keep this object type inferred so it can be passed to
	// `createReactClass`
	const newDefinition: React.ComponentSpec<P, S> = {
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
		propTypes: propTypeValidators,
		render,
	};

	if (!_.isUndefined(newDefinition.statics)) {
		newDefinition.statics.definition = newDefinition;
	}

	const newClass = createReactClass(newDefinition);

	// This conditional (and breaking change) was introduced to help us move from
	// legacy React classes to functional components & es6 classes which lack
	// `getDefaultProps`.
	if (newClass.getDefaultProps) {
		newClass.defaultProps = newClass.getDefaultProps();
		delete newClass.getDefaultProps;
	}

	return newClass;
}

/**
 * Return all elements matching the specified types
 */
export function filterTypes<P>(
	children: React.ReactNode,
	types?: TypesType<P>
): React.ReactElement[] {
	if (types === undefined) return [];

	return _.filter(
		React.Children.toArray(children),
		(element): boolean =>
			React.isValidElement(element) &&
			_.includes(_.castArray<any>(types), element.type)
	) as React.ReactElement[];
}

/**
 * Return all elements found in props and children of the specified types
 */
export function findTypes<P extends { children?: React.ReactNode }>(
	props: P,
	types?: TypesType<P>
): React.ReactNode[] {
	if (types === undefined) {
		return [];
	}

	// get elements from props (using types.propName)
	const elementsFromProps: React.ReactNode[] = _.reduce(
		_.castArray<any>(types),
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

	if (props.children === undefined) {
		return elementsFromProps;
	}

	// return elements from props and elements from children
	return elementsFromProps.concat(filterTypes<P>(props.children, types));
}

// return all elements found in props and children of the specified types
// export function findTypes<P2>(
// 	props: { children?: React.ReactNode },
// 	types?: TypesType<P2>
// ): React.ReactNode[] {
// 	if (types === undefined) {
// 		return [];
// 	}

// 	// get elements from props (using types.propName)
// 	const elementsFromProps: React.ReactNode[] = _.reduce(
// 		_.castArray<any>(types),
// 		(acc: React.ReactNode[], type): React.ReactNode[] => {
// 			return _.isNil(type.propName)
// 				? []
// 				: createElements(
// 						type,
// 						_.flatten(_.values(_.pick(props, type.propName)))
// 				  );
// 		},
// 		[]
// 	);

// 	if (props.children === undefined) {
// 		return elementsFromProps;
// 	}

// 	// return elements from props and elements from children
// 	return elementsFromProps.concat(filterTypes<P2>(props.children, types));
// }

/**
 * Return all elements not matching the specified types
 */
export function rejectTypes<P>(
	children: React.ReactNode,
	types: TypesType<P> | Array<TypesType<P>>
): React.ReactNode[] {
	types = ([] as Array<TypesType<P>>).concat(types); // coerce to Array

	return _.reject(
		React.Children.toArray(children),
		(element): boolean =>
			React.isValidElement(element) && _.includes<any>(types, element.type)
	);
}

/**
 * Return an array of elements (of the given type) for each of the values
 */
export function createElements<P>(
	type: ICreateClassComponentClass<P>,
	values: Array<React.ReactElement<P> | P> = []
): React.ReactElement[] {
	return _.reduce(
		values,
		(
			elements: Array<React.ReactElement<P>>,
			typeValue
		): React.ReactElement[] => {
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

/**
 * Return the first element found in props and children of the specificed type(s)
 */
export function getFirst<P>(
	props: P,
	types: TypesType<P> | undefined,
	defaultValue?: React.ReactNode
): React.ReactNode | null | undefined {
	return _.first(findTypes<P>(props, types)) || defaultValue;
}

/**
 *  Adds any speicial omitted props to an array
 * @param {string[]} componentProps - an array of the component's props
 * @param {boolean} targetIsDOMElement - true by default; specifies if the top-level element of the component is a plain DOM Element or a React Component Element
 * @return {string[]} the array of component props plus the additional omitted keys
 * */

export function addSpecialOmittedProps<P>(
	componentProps: string[] = [],
	targetIsDOMElement: boolean = true
): { [key: string]: any } {
	// We only want to exclude the `callbackId` key when we're omitting props
	// destined for a DOM element.
	// We always want to add the `initialState` key
	// to the list of excluded props.
	const additionalOmittedKeys = targetIsDOMElement
		? ['initialState', 'callbackId']
		: ['initialState'];

	return componentProps.concat(additionalOmittedKeys);
}

/**
 * Deprecated from lucid-ui  May 25, 2022 by Noah Yasskin
 * Do not use this method because
 * the import PropTypes from 'prop-types' stopped working as desired
 * component.propTypes does not compile correctly
 * and props in the passThroughs object leak through
 * because they are not being omitted.
 */
// Omit props defined in propTypes of the given type and any extra keys given
// in third argument
//
// We also have a "magic" prop called `callbackId`.
// It can be used to identify a component in a list
// without having to create extra closures.
//
// It is always excluded from a DOM elements
//
// Note: The Partial<P> type is referring to the props passed into the omitProps,
// not the props defined on the component.
export function omitProps<P extends object>(
	props: Partial<P>,
	component: ICreateClassComponentClass<P> | undefined,
	keys: string[] = [],
	targetIsDOMElement: boolean = true
): { [key: string]: any } {
	// We only want to exclude the `callbackId` key when we're omitting props
	// destined for a DOM element.
	// We always want to exclude the `initialState` key.
	const additionalOmittedKeys = targetIsDOMElement
		? ['initialState', 'callbackId']
		: ['initialState'];

	// this is to support non-createClass components that we've converted to TypeScript
	if (component === undefined) {
		return _.omit(props, keys.concat(additionalOmittedKeys));
	}

	return _.omit(
		props,
		_.keys(component.propTypes).concat(keys).concat(additionalOmittedKeys)
	);
}
