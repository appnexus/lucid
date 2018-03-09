import React from 'react';
import _ from 'lodash';
import addons from '@storybook/addons';
import { stripIndent } from '../../src/docs/util';
import marksy from 'marksy';

import { setOptions } from '@storybook/addon-options';

const compile = marksy({ createElement: React.createElement });

const isReactComponent = value =>
	typeof value === 'function' &&
	value.prototype &&
	value.prototype.isReactComponent;

const getDefaultPropValue = (componentRef, property) => {
	const defaultValue = _.get(componentRef, ['defaultProps', property]);
	return _.isUndefined(defaultValue)
		? _.get(componentRef, ['peekDefaultProps', property])
		: defaultValue;
};

const getPropTypeData = resolverFn => {
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

const getPropsData = componentRef => {
	return _.map(componentRef.propTypes, (resolverFn, property) => {
		return {
			...getPropTypeData(resolverFn),
			name: property,
			defaultValue: getDefaultPropValue(componentRef, property),
		};
	});
};

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
		_.pickBy(componentRef, isReactComponent),
		(childComponent, key) => {
			const recursiveChildComponentData = getChildComponentsData(
				childComponent,
				maxRecursiveHeight,
				recursiveHeight + 1,
				path.concat(key)
			);
			return {
				name: key,
				path: path.concat(key),
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

class Hoverable extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = {
			isHovered: false,
		};
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
	}

	handleMouseOver() {
		this.setState({ isHovered: true });
	}

	handleMouseOut() {
		this.setState({ isHovered: false });
	}

	render() {
		return React.cloneElement(this.props.children(this.state.isHovered), {
			onMouseOver: this.handleMouseOver,
			onMouseOut: this.handleMouseOut,
		});
	}
}

export const withPanelLayoutToggle = StoryComponent => {
	const channel = addons.getChannel();
	const onToggle = () => {
		channel.emit('lucid-docs-panel-layout-toggle');
	};

	return ({ kind, story }) => {
		return (
			<div>
				<StoryComponent {...{ kind, story }} />
				<Hoverable>
					{hover => (
						<div
							style={{
								position: 'fixed',
								bottom: 0,
								right: 28,
								width: 24,
								height: 24,
								backgroundColor: 'rgba(0,0,0,.12)',
								cursor: 'pointer',
								opacity: hover ? '1' : '0.5',
							}}
							onClick={onToggle}
							title="Toggle Layout"
						>
							<div
								style={{
									position: 'absolute',
									bottom: 0,
									left: 0,
									width: 24,
									height: 8,
									backgroundColor: 'rgba(0,0,0,.12)',
								}}
							/>
							<div
								style={{
									position: 'absolute',
									top: 0,
									right: 0,
									width: 8,
									height: 24,
									backgroundColor: 'rgba(0,0,0,.12)',
								}}
							/>
						</div>
					)}
				</Hoverable>
			</div>
		);
	};
};
export const withPanelHideToggle = StoryComponent => {
	const channel = addons.getChannel();
	const onToggle = () => {
		channel.emit('lucid-docs-panel-hide-toggle');
	};

	return ({ kind, story }) => {
		return (
			<div>
				<StoryComponent {...{ kind, story }} />
				<Hoverable>
					{hover => (
						<div
							style={{
								position: 'fixed',
								bottom: 0,
								right: 0,
								width: 24,
								height: 24,
								backgroundColor: 'rgba(0,0,0,.12)',
								cursor: 'pointer',
								opacity: hover ? '1' : '0.5',
							}}
							onClick={onToggle}
							title="Toggle Panel"
						>
							<div
								style={{
									position: 'absolute',
									bottom: 0,
									left: 0,
									width: 24,
									height: 8,
									backgroundColor: 'rgba(0,0,0,.03)',
									outline: '2px dashed rgba(0,0,0,.12)',
									outlineOffset: -1,
								}}
							/>
						</div>
					)}
				</Hoverable>
			</div>
		);
	};
};

const getDefaultExport = mod => (mod.__esModule ? mod.default : mod);

export const exampleStory = ({ component, code, example, path, options }) => {
	const StoryComponent = options
		? props => {
				setOptions(options);
				return React.createElement(getDefaultExport(example), props);
			}
		: getDefaultExport(example);

	const componentRef = getDefaultExport(component);

	const storyWithCode = withCode(code)(StoryComponent);
	const storyWithProps = withProps(componentRef)(storyWithCode);
	const storyWithChildComponents = withChildComponents(componentRef, 1, path)(
		storyWithProps
	);
	const storyWithDescription = withDescription(componentRef)(
		storyWithChildComponents
	);
	//return storyWithDescription;

	const storyWithPanelLayoutToggle = withPanelLayoutToggle(
		storyWithDescription
	);
	const storyWithPanelHideToggle = withPanelHideToggle(
		storyWithPanelLayoutToggle
	);
	return storyWithPanelHideToggle;
};
