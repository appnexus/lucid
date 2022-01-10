import React from 'react';
import createClass from 'create-react-class';
import SplitButton from './SplitButton';

export default {
	title: 'Controls/SplitButton',
	component: SplitButton,
	parameters: {
		docs: {
			description: {
				component: (SplitButton as any).peek.description,
			},
		},
	},
};

/* Basic */
export const Basic = () => {
	const style = { marginRight: '20px', height: 100 };

	const Component = createClass({
		render() {
			return (
				<div>
					<SplitButton style={style}>
						<SplitButton.Button>Basic</SplitButton.Button>
						<SplitButton.Button>One</SplitButton.Button>
						<SplitButton.Button>Two</SplitButton.Button>
					</SplitButton>

					<SplitButton kind='primary' style={style}>
						<SplitButton.Button>Primary</SplitButton.Button>
						<SplitButton.Button>One</SplitButton.Button>
						<SplitButton.Button>Two</SplitButton.Button>
					</SplitButton>
				</div>
			);
		},
	});

	return <Component />;
};

/* Disabled */
export const Disabled = () => {
	const Component = createClass({
		render() {
			return (
				<div style={{ height: 100 }}>
					<SplitButton>
						<SplitButton.Button isDisabled>Save</SplitButton.Button>
						<SplitButton.Button isDisabled>
							This action should be disabled
						</SplitButton.Button>
						<SplitButton.Button>This one should be enabled</SplitButton.Button>
						<SplitButton.Button isDisabled>
							This should be disabled, too
						</SplitButton.Button>
					</SplitButton>
				</div>
			);
		},
	});

	return <Component />;
};

/* Up */
export const Up = () => {
	const Component = createClass({
		render() {
			return (
				<div style={{ height: 100 }}>
					<SplitButton direction='up' kind='primary'>
						<SplitButton.Button>Save</SplitButton.Button>
						<SplitButton.Button>Action 01</SplitButton.Button>
						<SplitButton.Button>Here's Another Action</SplitButton.Button>
						<SplitButton.Button>And Another Action</SplitButton.Button>
					</SplitButton>
				</div>
			);
		},
	});

	return <Component />;
};

/* Sizes */
export const Sizes = () => {
	const style = { marginRight: '20px', height: 100 };

	const Component = createClass({
		render() {
			return (
				<div>
					<SplitButton size='large' style={style}>
						<SplitButton.Button>Large</SplitButton.Button>
						<SplitButton.Button>One</SplitButton.Button>
						<SplitButton.Button>Two</SplitButton.Button>
					</SplitButton>
					<SplitButton size='small' style={style}>
						<SplitButton.Button>Small</SplitButton.Button>
						<SplitButton.Button>One</SplitButton.Button>
						<SplitButton.Button>Two</SplitButton.Button>
					</SplitButton>
					<SplitButton size='short' style={style}>
						<SplitButton.Button>Short</SplitButton.Button>
						<SplitButton.Button>One</SplitButton.Button>
						<SplitButton.Button>Two</SplitButton.Button>
					</SplitButton>
				</div>
			);
		},
	});

	return <Component />;
};
