import React from 'react';
import _ from 'lodash';

export function getDeepPaths (obj, path=[]) {
	return _.reduce(obj, (terminalKeys, value, key) => (
		_.isPlainObject(value) ?
			terminalKeys.concat(getDeepPaths(value, path.concat(key))) :
			terminalKeys.concat([path.concat(key)])
	), []);
}

export function omitFunctionPropsDeep(obj) {
	return _.reduce(obj, (memo, value, key) => {
		if (_.isPlainObject(value)) {
			memo[key] = omitFunctionPropsDeep(value);
		} else if (!_.isFunction(value)) {
			memo[key] = value;
		}
		return memo;
	}, {});
}

export function bindReducerToState(reducerFunction, { getState, setState }, path=[]) {
	let localPath = _.take(path, _.size(path) - 1);
	return _.assign(function (...args) {
		if (_.isEmpty(localPath)) {
			setState(reducerFunction(getState(), ...args));
		} else {
			let localNextState = reducerFunction(_.get(getState(), localPath), ...args);
			setState(_.set(_.clone(getState()), localPath, localNextState));
		}
	}, { path });
}

export function bindReducersToState(reducers, { getState, setState }) {
	return _.reduce(getDeepPaths(reducers), (memo, path) => {
		return _.set(memo, path, bindReducerToState(_.get(reducers, path), { getState, setState }, path));
	}, {});
};

export function getStatefulPropsContext(reducers, { getState, setState }) {
	const boundReducers = bindReducersToState(reducers, { getState, setState });

	const combineFunctionsCustomizer = (objValue, srcValue) => {
		if (_.isFunction(srcValue) && _.isFunction(objValue)) {
			return function (...args) {
				objValue(...args);
				return srcValue(...args);
			};
		}

		return overwriteArrays(objValue, srcValue);
	};

	const bindFunctionOverwritesCustomizer = (objValue, srcValue) => {
		if (_.isFunction(srcValue) && _.isFunction(objValue)) {
			return bindReducerToState(srcValue, { getState, setState }, objValue.path);
		}

		return overwriteArrays(objValue, srcValue);
	};

	return {
		getPropReplaceReducers(props) {
			return _.mergeWith({}, boundReducers, getState(), props, bindFunctionOverwritesCustomizer);
		},
		getProps(props) {
			return _.mergeWith({}, boundReducers, getState(), props, combineFunctionsCustomizer);
		}
	};
};

function overwriteArrays (objValue, srcValue) {
	if (_.isArray(srcValue) && _.isArray(objValue)) {
		return srcValue;
	}

	// If we don't have this clause, lodash (as of 4.7.0) will attempt to
	// deeply clone the react children, which is really freaking slow.
	if (_.isArray(srcValue) && _.isUndefined(objValue)) {
		return srcValue;
	}
}

export function buildHybridComponent(baseComponent, opts) {

	if (baseComponent._isLucidHybridComponent && process.NODE_ENV !== 'production') {
		console.warn('Input component is already a Lucid hybdrid component. Lucid exports hybrid components by default. To access the dumb components, use the -Dumb suffix, e.g. "ComponentDumb"');
		return baseComponent;
	}

	opts = _.merge({
		setStateWithNewProps: true, // if true, new props will update state, else prop has priority over existing state
		replaceEvents: false // if true, function props replace the existing reducers, else they are invoked *after* state reducer returns
	}, opts);

	const { reducers } = baseComponent;
	const otherProps = _.omit(baseComponent.propTypes, _.filter(_.keys(reducers), (propName) => _.isFunction(propName)), ['children', 'className']);

	return React.createClass({
		propTypes: otherProps,
		statics: _.chain(baseComponent).omit(['displayName', 'propTypes', 'getDefaultProps', 'defaultProps']).assign({
			_isLucidHybridComponent: true
		}).value(),
		displayName: baseComponent.displayName,
		getInitialState() {
			if (opts.setStateWithNewProps) {
				return _.mergeWith({}, omitFunctionPropsDeep(baseComponent.getDefaultProps()), omitFunctionPropsDeep(this.props), overwriteArrays);
			}
			return omitFunctionPropsDeep(baseComponent.getDefaultProps());
		},
		componentWillReceiveProps(nextProps) {
			if (opts.setStateWithNewProps) {
				let nextPropsData = omitFunctionPropsDeep(nextProps);
				this.setState(_.mergeWith({}, _.pick(this.state, _.intersection(_.keys(this.state), _.keys(nextPropsData))), nextPropsData, overwriteArrays));
			}
		},
		componentWillMount() {
			this.boundContext = getStatefulPropsContext(reducers, {
				getState: () => { return this.state; },
				setState: (state) => { this.setState(state); }
			});
		},
		render() {
			if (opts.replaceEvents) {
				return React.createElement(baseComponent, this.boundContext.getPropReplaceReducers(this.props), this.props.children);
			}
			return React.createElement(baseComponent, this.boundContext.getProps(this.props), this.props.children);
		}
	});
}

export function buildStatefulComponent(...args) {
	if(process.NODE_ENV !== 'production') {
		console.warn('buildStatefulComponent has been renamed to buildHybridComponent.');
	}
	return buildHybridComponent(...args);
}
