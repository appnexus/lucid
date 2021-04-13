import _ from 'lodash';

export const stripIndent = (text) => {
	if (!text) {
		return '';
	}

	const sigLines = text.split(/\n/).filter((line) => !/^\s*$/.test(line));
	const leadingWhitespaces = sigLines.map((line) => {
		const reg = /^(\s*)/g.exec(line);
		reg ? reg[1] : null;
	});
	const minimumLeadingWhitespace = leadingWhitespaces.reduce((min, line) => {
		return line && line.length < min && min.length ? line : min;
	}, leadingWhitespaces[0]);
	return text
		.split(/\n/)
		.map((line) => line.replace(minimumLeadingWhitespace, ''))
		.join('\n');
};

export const formatSource = (source) =>
	source
		.replace(/(\.\.\/)*(src\/)?index(\.js)?/, 'lucid-ui')
		.replace(/\t/g, '  ')
		.replace(/\/\/\s?begin-hide-from-docs[\s\S]*\/\/\s?end-hide-from-docs/, '')
		.replace(/\n*$/, '\n');

// custom props parsing for storybook DocsPage
// our usage of prop types and peek break some assumptions that storybook makes about how props info is passed
// this function tries to get prop type info from typescript (via react-docgen-typescript-loader) for TS components
// then falls back on propTypes for non-TS components
// in addition, it handles setting default values based on defaultProps
export const getPropDefs = (component) =>
	_.sortBy(
		_.sortBy(
			_.has(component, '__docgenInfo')
				? getPropsFromDocgen(component)
				: getPropsFromPropTypes(component),
			(prop) => prop.name
		),
		(prop) => !prop.required
	);

const getPropsFromDocgen = (component) =>
	_.map(
		component.__docgenInfo.props,
		({ type, required, description, defaultValue }, property) =>
			mergePropwithDefaults(component, {
				type,
				required,
				description,
				defaultValue,
				name: property,
			})
	);

const getPropsFromPropTypes = (component) =>
	_.map(
		getPropsData(component),
		({ name, type, isRequired, dynamicData, text, defaultValue }) =>
			mergePropwithDefaults(component, {
				name,
				type: {
					name: propTypeName({ type, dynamicData }),
				},
				required: isRequired,
				description: text,
				defaultValue,
			})
	);

const mergePropwithDefaults = (
	component,
	{ name, type, required, description, defaultValue }
) => {
	// compare with defaultProps to set props optional and set default value as needed
	const defaultValueValue =
		_.get(defaultValue, 'defaultValue.value') ||
		getDefaultPropValue(component, name);
	return {
		name,
		type,
		required: required && _.isUndefined(defaultValueValue),
		description,
		defaultValue: defaultValueValue,
	};
};

// formatter function for complex PropTypes similar to <PropType> from lucid-docs-addon
const propTypeName = ({ type, ...propData }) => {
	if (type === 'oneOf') {
		return `${type}: ${JSON.stringify(propData.dynamicData, null, 2)}`;
	}

	if (type === 'arrayOf' || type === 'objectOf') {
		return `${type}: ${propTypeName({ ...propData.dynamicData })}`;
	}

	if (type === 'oneOfType') {
		return `${type}: ${_.map(propData.dynamicData, propTypeName).join(', ')}`;
	}

	if (type === 'instanceOf') {
		return `${type}: ${propData.dynamicData}`;
	}

	if (type === 'shape') {
		return `${type}: { ${_.map(
			propData.dynamicData,
			(propTypeData, key) => `${key}: ${propTypeName({ ...propTypeData })}`
		).join(', ')} }`;
	}

	return type;
};

// helper function for parsing PropTypes and peek data to generate props information
export const getPropsData = (componentRef) => {
	return _.map(componentRef.propTypes, (resolverFn, property) => {
		return {
			...getPropTypeData(resolverFn),
			name: property,
			defaultValue: getDefaultPropValue(componentRef, property),
		};
	});
};

const getDefaultPropValue = (componentRef, property) => {
	const defaultValue = _.get(componentRef, ['defaultProps', property]);
	return _.isUndefined(defaultValue)
		? _.get(componentRef, ['peekDefaultProps', property])
		: defaultValue;
};

const getPropTypeData = (resolverFn) => {
	const type = _.get(resolverFn, ['peek', 'type']);
	let dynamicData;

	if (type === 'oneOf') {
		dynamicData = _.get(resolverFn, ['peek', 'args', 0]);
	}

	if (type === 'arrayOf') {
		const arrayOfResolverFn = _.get(resolverFn, ['peek', 'args', 0]);
		dynamicData = getPropTypeData(arrayOfResolverFn);
	}

	if (type === 'oneOfType') {
		const oneOfTypeResolverFns = _.get(resolverFn, ['peek', 'args', 0]);
		dynamicData = _.map(oneOfTypeResolverFns, getPropTypeData);
	}

	if (type === 'instanceOf') {
		const instanceOfClass = _.get(resolverFn, ['peek', 'args', 0]);
		dynamicData = instanceOfClass.name;
	}

	if (type === 'objectOf') {
		const objectOfResolverFn = _.get(resolverFn, ['peek', 'args', 0]);
		dynamicData = getPropTypeData(objectOfResolverFn);
	}

	if (type === 'shape') {
		const shapeObject = _.get(resolverFn, ['peek', 'args', 0]);
		dynamicData = _.mapValues(shapeObject, getPropTypeData);
	}

	return {
		...resolverFn.peek,
		type,
		text: stripIndent(_.get(resolverFn, ['peek', 'text'])).trim(),
		dynamicData,
	};
};
