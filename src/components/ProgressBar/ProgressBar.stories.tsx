import React from 'react';
import createClass from 'create-react-class';
import TextField from '../TextField/TextField';
import ProgressBar from './ProgressBar';

export default {
	title: 'Communication/ProgressBar',
	component: ProgressBar,
	parameters: {
		docs: {
			description: {
				component: (ProgressBar as any).peek.description,
			},
		},
	},
};

/* Basic */
export const Basic = () => {
	const style = {
		marginBottom: '10px',
		marginTop: '10px',
	};

	class Component extends React.Component {
		constructor(props: any) {
			super(props);
			this.state = {
				value: '',
				percentComplete: 95,
			};
		}

		render() {
			return (
				<div>
					Enter % complete:
					<TextField
						style={style}
						value={(this.state as any).value}
						onSubmit={(value) =>
							this.setState({ percentComplete: value, value: '' })
						}
					/>
					<ProgressBar percentComplete={(this.state as any).percentComplete} />
				</div>
			);
		}
	}
	return <Component />;
};

/* Kinds */
export const Kinds = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<p>Default</p>
					<ProgressBar kind='default' percentComplete={75} />
					<p>Success</p>
					<ProgressBar kind='success' percentComplete={75} />
					<p>Warning</p>
					<ProgressBar kind='warning' percentComplete={75} />
					<p>Danger</p>
					<ProgressBar kind='danger' percentComplete={75} />
					<p>Info</p>
					<ProgressBar kind='info' percentComplete={75} />
				</div>
			);
		},
	});

	return <Component />;
};

/* With Title */
export const WithTitle = () => {
	const Component = createClass({
		render() {
			return (
				<ProgressBar percentComplete={75}>
					<ProgressBar.Title>This is a title</ProgressBar.Title>
				</ProgressBar>
			);
		},
	});

	return <Component />;
};
