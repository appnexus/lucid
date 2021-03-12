import React from 'react';
import _ from 'lodash';
import addons from '@storybook/addons';
import { getPropsData, stripIndent} from './util';
import marksy from 'marksy';

const compile = marksy({ createElement: React.createElement });

const isReactComponent = value =>
	typeof value === 'function' &&
	value.prototype &&
	value.prototype.isReactComponent;

const isChildComponent = (value, key) =>
	isReactComponent(value) || (/^[A-Z]/.test(key) && _.isFunction(value));

const getChildComponentsData = (
	componentRef,
	maxRecursiveHeight = 1,
	recursiveHeight = 0,
	path = []
) => {
	if (recursiveHeight >= maxRecursiveHeight) {
		return [];
	}

	return _.map(
		_.pickBy(componentRef, isChildComponent),
		(childComponent, key) => {
			const recursiveChildComponentData = getChildComponentsData(
				childComponent,
				maxRecursiveHeight,
				recursiveHeight + 1,
				path.concat(key as any)
			);
			return {
				name: key,
				path: path.concat(key as any),
				displayName: childComponent.displayName,
				description: stripIndent(
					_.get(childComponent, 'peek.description')
				).trim(),
				isPrivate: _.get(
					childComponent,
					'peek.isPrivate',
					childComponent._isPrivate
				),
				props: getPropsData(childComponent),
				childComponents: recursiveChildComponentData,
			};
		}
	);
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

export const withChildComponents = (componentRef, maxHeight, path) => {
	return StoryComponent => {
		return props => {
			const channel = addons.getChannel();
			channel.emit(
				'lucid-docs-display-child-components',
				JSON.stringify(
					getChildComponentsData(componentRef, maxHeight, undefined, path)
				)
			);
			return <StoryComponent {...props} />;
		};
	};
};

export const getDefaultExport = mod => (mod.__esModule ? mod.default : mod);

export const exampleStory = ({ component, code, example, path }) => {
	const StoryComponent = getDefaultExport(example);
	const componentRef = getDefaultExport(component);

	const storyWithCode = withCode(code)(StoryComponent);
	const storyWithProps = withProps(componentRef)(storyWithCode);
	const storyWithChildComponents = withChildComponents(componentRef, 1, path)(
		storyWithProps
	);

	return storyWithChildComponents;
};
