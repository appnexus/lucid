import React from 'react';
import _ from 'lodash';
import addons from '@storybook/addons';
import { stripIndent } from '../../src/docs/util';
import marksy from 'marksy';

import { setOptions } from '@storybook/addon-options';

const compile = marksy({ createElement: React.createElement });

const getDefaultPropValue = (componentRef, property) => {
	const defaultValue = _.get(componentRef, ['defaultProps', property]);
	return _.isUndefined(defaultValue)
		? _.get(componentRef, ['peekDefaultProps', property])
		: defaultValue;
};

const getPropTypeData = resolverFn => {
	const type = _.get(resolverFn, ['peek', 'type']);

	let oneOfData;
	if (type === 'oneOf') {
		oneOfData = _.get(resolverFn, ['peek', 'args', 0]);
	}

	let arrayOfData;
	if (type === 'arrayOf') {
		const arrayOfResolverFn = _.get(resolverFn, ['peek', 'args', 0]);
		arrayOfData = getPropTypeData(arrayOfResolverFn);
	}

	let oneOfTypeData;
	if (type === 'oneOfType') {
		const oneOfTypeResolverFns = _.get(resolverFn, ['peek', 'args', 0]);
		oneOfTypeData = _.map(oneOfTypeResolverFns, getPropTypeData);
	}

	let instanceOfData;
	if (type === 'instanceOf') {
		const instanceOfClass = _.get(resolverFn, ['peek', 'args', 0]);
		instanceOfData = instanceOfClass.name;
	}

	let objectOfData;
	if (type === 'objectOf') {
		const objectOfResolverFn = _.get(resolverFn, ['peek', 'args', 0]);
		objectOfData = getPropTypeData(objectOfResolverFn);
	}

	let shapeData;
	if (type === 'shape') {
		const shapeObject = _.get(resolverFn, ['peek', 'args', 0]);
		shapeData = _.mapValues(shapeObject, getPropTypeData);
	}

	return {
		...resolverFn.peek,
		type,
		oneOfData,
		arrayOfData,
		oneOfTypeData,
		instanceOfData,
		objectOfData,
		shapeData,
	};
};

const getPropsData = componentRef => {
	return _.map(componentRef.propTypes, (resolverFn, property) => {
		return {
			...getPropTypeData(resolverFn),
			name: property,
			defaultValue: getDefaultPropValue(componentRef, property),
		};
	});
};

export const withDescription = componentRef => {
	return StoryComponent => {
		return ({ kind, story }) => {
			return (
				<div>
					<h1>{kind}</h1>
					<section>
						{compile(stripIndent(componentRef.peek.description)).tree}
					</section>
					<h2>{story}</h2>
					<StoryComponent {...{ kind, story }} />
				</div>
			);
		};
	};
};

export const withProps = componentRef => {
	return StoryComponent => {
		return props => {
			const channel = addons.getChannel();
			channel.emit(
				'lucid-docs-display-props',
				JSON.stringify(getPropsData(componentRef))
			);
			return <StoryComponent {...props} />;
		};
	};
};

export const withCode = (source = null) => {
	return StoryComponent => {
		return props => {
			const channel = addons.getChannel();
			channel.emit('lucid-docs-source', source);

			return <StoryComponent {...props} />;
		};
	};
};

const getDefaultExport = mod => (mod.__esModule ? mod.default : mod);

export const exampleStory = ({ component, code, example, options }) => {
	const StoryComponent = options
		? props => {
				setOptions(options);
				return React.createElement(getDefaultExport(example), props);
			}
		: getDefaultExport(example);

	const componentRef = getDefaultExport(component);

	const storyWithCode = withCode(code)(StoryComponent);
	const storyWithProps = withProps(componentRef)(storyWithCode);
	const storyWithDescription = withDescription(componentRef)(storyWithProps);

	return storyWithDescription;
};
