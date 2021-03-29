import React from 'react';
import addons from '@storybook/addons';
import { DOCS_RENDERED, STORY_RENDERED } from '@storybook/core-events';
import _ from 'lodash';
import ExampleCode from './ExampleCode';
import PropTypes from './PropTypes';
import ChildComponents from './ChildComponents';
import packageJson from '../../package.json';

class CodePanel extends React.Component<any, any> {
	unmounted: boolean;

	constructor(props, state) {
		super(props, state);
		this.unmounted = false;
		this.state = { code: '' };
		this.onSource = this.onSource.bind(this);
	}

	onSource(code) {
		if (!_.isString(code)) {
			return this.setState({
				code: '',
			});
		}

		this.setState({
			code,
		});
	}

	componentDidMount() {
		const { channel, api } = this.props;
		// Listen to the notes and render it.
		channel.on('lucid-docs-source', this.onSource);
	}

	render() {
		const { code } = this.state as any;

		if (_.isEmpty(code) || !this.props.active) {
			return null;
		}

		return (
			<div style={{ width: '100%' }}>
				<ExampleCode code={code} hasCodepen packageJson={packageJson} />
			</div>
		);
	}

	// This is some cleanup tasks when the CodePanel is unmounting.
	componentWillUnmount() {
		this.onSource('');
		this.unmounted = true;
		const { channel, api } = this.props;
		channel.removeListener('lucid-docs-source', this.onSource);
	}
}

class PropsPanel extends React.Component<any, any> {
	unmounted: boolean;
	constructor(props, state) {
		super(props, state);
		this.unmounted = false;
		this.state = { props: null };
		this.onDisplayProps = this.onDisplayProps.bind(this);
		this.onDisplayChildComponents = this.onDisplayChildComponents.bind(this);
	}

	onDisplayProps(propsJSON = null) {
		if (!_.isString(propsJSON)) {
			return this.setState({
				props: null,
			});
		}

		try {
			this.setState({
				props: JSON.parse(propsJSON || '{}'),
			});
		} catch (err) {
			console.log('Error parsing props JSON.');
			console.error(err.stack);
			this.setState({
				props: null,
			});
		}
	}

	onDisplayChildComponents(childComponentJSON) {
		if (!_.isString(childComponentJSON)) {
			return this.setState({
				childComponents: null,
			});
		}

		try {
			this.setState({
				childComponents: JSON.parse(childComponentJSON),
			});
		} catch (err) {
			console.log('Error parsing props JSON.');
			console.error(err.stack);
			this.setState({
				childComponents: null,
			});
		}
	}

	componentDidMount() {
		const { channel, api } = this.props;
		// Listen to the notes and render it.
		channel.on('lucid-docs-display-props', this.onDisplayProps);
		channel.on(
			'lucid-docs-display-child-components',
			this.onDisplayChildComponents
		);
	}

	componentWillUnmount() {
		this.onDisplayProps();
		this.unmounted = true;
		const { channel, api } = this.props;
		channel.removeListener('lucid-docs-display-props', this.onDisplayProps);
		channel.removeListener(
			'lucid-docs-display-child-components',
			this.onDisplayChildComponents
		);
	}

	render() {
		const { childComponents, props: componentProps } = this.state;

		if (!this.props.active) {
			return null;
		}

		return (
			<div
				style={{
					backgroundColor: 'white',
					width: '100%',
					overflow: 'auto',
					padding: 10,
					position: 'relative',
				}}
			>
				<PropTypes props={componentProps} />
				{!_.isEmpty(childComponents) && (
					<ChildComponents childComponents={childComponents} />
				)}
			</div>
		);
	}
}

function getName(title) {
	const parts = title.indexOf('|') > 0 ? title.split('|') : [title];
	const name = parts[parts.length - 1];
	return name;
}

// Register the addon with a unique name.
addons.register('lucid-docs', (api) => {
	// Check here is necessary to be compatible with older versions of storybook.
	if (api.on) {
		api.on(STORY_RENDERED, () => {
			const storyData: any = api.getCurrentStoryData();
			const name = getName(storyData.kind);
			document.title = `${name} - Lucid UI`;
		});

		api.on(DOCS_RENDERED, (title) => {
			const name = getName(title);
			document.title = `${name} - Lucid UI`;
		});
	}

	// Also need to set a unique name to the panel.
	addons.addPanel('lucid-docs-panel-props', {
		title: 'Props',
		render: ({ active }) => (
			<PropsPanel active={active} channel={addons.getChannel()} api={api} />
		),
	});
	addons.addPanel('lucid-docs-panel-code', {
		title: 'Code',
		render: ({ active }) => (
			<CodePanel active={active} channel={addons.getChannel()} api={api} />
		),
	});

	addons.getChannel().on('lucid-docs-panel-layout-toggle', () => {
		const urlState: any = api.getUrlState();
		api.setOptions({
			panelPosition: !urlState.panelRight ? 'right' : 'bottom',
		});
	});

	addons.getChannel().on('lucid-docs-panel-hide-toggle', () => {
		const urlState: any = api.getUrlState();
		api.setOptions({
			showPanel: !urlState.addons,
		});
	});
});
