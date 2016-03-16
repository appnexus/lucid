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
	};

	const bindFunctionOverwritesCustomizer = (objValue, srcValue) => {
		if (_.isFunction(srcValue) && _.isFunction(objValue)) {
			return bindReducerToState(srcValue, { getState, setState }, objValue.path);
		}
	};

	return {
		getPropReplaceReducers(props, stateBeatsProps=false) {
			var args = [{}, boundReducers, getState(), props, bindFunctionOverwritesCustomizer];

			if (stateBeatsProps) {
				args = [{}, boundReducers, props, getState(), bindFunctionOverwritesCustomizer];
			}

			return _.mergeWith(...args);
		},
		getProps(props, stateBeatsProps=false) {
			var args = [{}, boundReducers, getState(), props, combineFunctionsCustomizer];

			if (stateBeatsProps) {
				args = [{}, boundReducers, props, getState(), combineFunctionsCustomizer];
			}

			return _.mergeWith(...args);
		}
	};
};

export function buildStatefulComponent(baseComponent, opts) {
	opts = _.merge({
		setStateWithNewProps: true, // if true, new props will update state, else prop has priority over existing state
		replaceEvents: false, // if true, function props replace the existing reducers, else they are invoked *after* state reducer returns
		stateBeatsProps: false, // if true, when the component re-renders, state will take precedence over props, but on componentwillreceiveprops it will still favor props, there is a very limited case where this useful, mostly with text inputs to keep the user input until new props come in
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
				let nextPropsData = omitFunctionPropsDeep(nextProps);
				this.setState(_.merge({}, _.pick(this.state, _.intersection(_.keys(this.state), _.keys(nextPropsData))), nextPropsData));
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
				return React.createElement(baseComponent, this.boundContext.getPropReplaceReducers(this.props, opts.stateBeatsProps), this.props.children);
			}
			return React.createElement(baseComponent, this.boundContext.getProps(this.props, opts.stateBeatsProps), this.props.children);
		}
	});
}
