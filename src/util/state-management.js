import React from 'react';
import _ from 'lodash';

function getDeepPaths (obj, path=[]) {
	return _.reduce(obj, (terminalKeys, value, key) => (
		_.isPlainObject(value) ?
			terminalKeys.concat(getDeepPaths(value, path.concat(key))) :
			terminalKeys.concat([path.concat(key)])
	), []);
}

function omitFunctionPropsDeep(obj) {
	return _.reduce(obj, (memo, value, key) => {
		if (_.isPlainObject(value)) {
			memo[key] = omitFunctionPropsDeep(value);
		} else if (!_.isFunction(value)) {
			memo[key] = value;
		}
		return memo;
	}, {});
}

export function buildStatefulComponent(baseComponent, opts) {
	opts = _.merge({
		setStateWithNewProps: true, // if true, new props will update state, else prop has priority over existing state
		replaceEvents: false // if true, function props replace the existing reducers, else they are invoked *after* state reducer returns
	}, opts);

	const { reducers } = baseComponent;
	const otherProps = _.omit(baseComponent.propTypes, _.filter(_.keys(reducers), (propName) => _.isFunction(propName)), ['children', 'className']);

	return React.createClass({
		propTypes: otherProps,
		statics: _.omit(baseComponent, ['displayName', 'propTypes', 'getDefaultProps', 'defaultProps']),
		displayName: baseComponent.displayName,
		getInitialState() {
			if (opts.setStateWithNewProps) {
				return _.merge({}, omitFunctionPropsDeep(baseComponent.getDefaultProps()), omitFunctionPropsDeep(this.props));
			}
			return omitFunctionPropsDeep(baseComponent.getDefaultProps());
		},
		componentWillReceiveProps(nextProps) {
			if (opts.setStateWithNewProps) {
				this.setState(omitFunctionPropsDeep(nextProps));
			}
		},
		componentWillMount() {
			this.boundContext = bindReducersToState(reducers, {
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

export function bindReducersToState(reducers, { getState, setState }) {
	function bindReducerToState(reducerFunction, path=[]) {
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

	const splatFuncs = _.reduce(getDeepPaths(reducers), (memo, path) => {
		return _.set(memo, path, bindReducerToState(_.get(reducers, path), path));
	}, {});

	const combineFunctionsCustomizer = (objValue, srcValue) => {
		if (_.isFunction(srcValue) && _.isFunction(objValue)) {
			return function (...args) {
				objValue(...args);
				return srcValue(...args);
			};
		}
	};

	const bindFunctionOverwritesCustomizer = (objValue, srcValue) => {
		if (_.isFunction(srcValue) && _.isFunction(objValue)) {
			return bindReducerToState(srcValue, objValue.path);
		}
	};

	return {
		getPropReplaceReducers(props) {
			return _.mergeWith({}, splatFuncs, getState(), props, bindFunctionOverwritesCustomizer);
		},
		getProps(props) {
			return _.mergeWith({}, splatFuncs, getState(), props, combineFunctionsCustomizer);
		}
	};
};
