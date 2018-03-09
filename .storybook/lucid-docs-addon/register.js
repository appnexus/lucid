import '@storybook/addon-options/register';
import React from 'react';
import addons from '@storybook/addons';
import _ from 'lodash';
import ExampleCode from './ExampleCode';
import PropTypes from './PropTypes';
import ChildComponents from './ChildComponents';
import packageJson from '../../package.json';

class CodePanel extends React.Component {
	constructor(...args) {
		super(...args);
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

		// Clear the current notes on every story change.
		this.stopListeningOnStory = api.onStory(() => {
			this.onSource('');
		});
	}

	render() {
		const { code } = this.state;

		if (_.isEmpty(code)) {
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
		if (this.stopListeningOnStory) {
			this.stopListeningOnStory();
		}

		this.unmounted = true;
		const { channel, api } = this.props;
		channel.removeListener('lucid-docs-source', this.onSource);
	}
}

class PropsPanel extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = { props: null };
		this.onDisplayProps = this.onDisplayProps.bind(this);
		this.onDisplayChildComponents = this.onDisplayChildComponents.bind(this);
	}

	onDisplayProps(propsJSON) {
		if (!_.isString(propsJSON)) {
			return this.setState({
				props: null,
			});
		}

		try {
			this.setState({
				props: JSON.parse(propsJSON),
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

		// Clear the current notes on every story change.
		this.stopListeningOnStory = api.onStory(() => {
			this.onDisplayProps();
		});
	}

	componentWillUnmount() {
		if (this.stopListeningOnStory) {
			this.stopListeningOnStory();
		}

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

class SettingsPanel extends React.Component {
	constructor(...args) {
		super(...args);

		const [props] = args;
		const urlState = props.api.getUrlState();

		this.state = {
			addonPanelInRight: !!urlState.panelRight,
			showAddonPanel: true,
		};

		this.onTogglePanelDisplay = this.onTogglePanelDisplay.bind(this);
		this.onTogglePanelRight = this.onTogglePanelRight.bind(this);
	}

	onTogglePanelDisplay() {
		this.props.api.setOptions({
			showAddonPanel: !this.state.showAddonPanel,
		});
		this.setState({
			showAddonPanel: !this.state.showAddonPanel,
		});
	}

	onTogglePanelRight() {
		this.props.api.setOptions({
			addonPanelInRight: !this.state.addonPanelInRight,
		});
		this.setState({
			addonPanelInRight: !this.state.addonPanelInRight,
		});
	}

	componentWillUnmount() {
		if (this.stopListeningOnStory) {
			this.stopListeningOnStory();
		}

		this.unmounted = true;
	}

	render() {
		return (
			<div style={SettingsPanel.style.panelContent}>
				<p>
					<button
						style={SettingsPanel.style.button}
						onClick={this.onTogglePanelRight}
					>
						Toggle Layout
					</button>
				</p>
				<p>
					<button
						style={SettingsPanel.style.button}
						onClick={this.onTogglePanelDisplay}
					>
						Hide Panel
					</button>
				</p>
			</div>
		);
	}
}

SettingsPanel.style = {
	panelContent: {
		backgroundColor: 'white',
		width: '100%',
		padding: 6,
	},
	button: {
		border: '1px solid rgb(193, 193, 193)',
		fontSize: 10,
		cursor: 'pointer',
		borderRadius: 2,
		backgroundColor: 'rgb(247, 247, 247)',
		color: 'rgb(130, 130, 130)',
		fontWeight: 'normal',
		textTransform: 'uppercase',
		fontFamily:
			'-apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", "Lucida Grande", Arial, sans-serif',
		letterSpacing: 1,
		padding: '5px 10px',
	},
};

// Register the addon with a unique name.
addons.register('lucid-docs', api => {
	api.setOptions({
		name: 'Lucid UI',
		url: 'https://github.com/appnexus/lucid',
		showAddonPanel: false,
		addonPanelInRight: true,
	});

	// Also need to set a unique name to the panel.
	addons.addPanel('lucid-docs-panel-props', {
		title: 'Props',
		render: () => <PropsPanel channel={addons.getChannel()} api={api} />,
	});
	addons.addPanel('lucid-docs-panel-code', {
		title: 'Code',
		render: () => <CodePanel channel={addons.getChannel()} api={api} />,
	});
	//addons.addPanel('lucid-docs-panel-settings', {
	//	title: 'Settings',
	//	render: () => (
	//		<SettingsPanel
	//			channel={addons.getChannel()}
	//			api={api}
	//			setOptions={() => {}}
	//		/>
	//	),
	//});

	addons.getChannel().on('lucid-docs-panel-layout-toggle', () => {
		const urlState = api.getUrlState();
		api.setOptions({
			addonPanelInRight: !urlState.panelRight,
		});
	});

	addons.getChannel().on('lucid-docs-panel-hide-toggle', () => {
		const urlState = api.getUrlState();
		api.setOptions({
			showAddonPanel: !urlState.addons,
		});
	});
});
