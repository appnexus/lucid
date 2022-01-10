import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Portal from './Portal';
import Button from '../Button/Button';

export default {
	title: 'Utility/Portal',
	component: Portal,
	parameters: {
		docs: {
			description: {
				component: (Portal as any).peek.description,
			},
		},
	},
};

/* Basic */
export const Basic = () => {
	const Component = createClass({
		getInitialState() {
			return {
				left: 216,
				top: 460,
			};
		},

		handleClick(event) {
			const { height, width } = event.target.getBoundingClientRect();

			this.setState({
				left: event.pageX - width / 2,
				top: event.pageY - height / 2,
			});
		},

		render() {
			const { left, top } = this.state;
			return (
				<Portal
					portalId='example-portal123'
					className='example-portal-container'
					style={{
						width: 128,
						height: 128,
						backgroundColor: '#2abbb0',
						color: '#fff',
						boxShadow: '0 0 36px rgba(0, 0, 0, 0.5)',
						transition: 'left .5s, top .5s',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						cursor: 'pointer',
						position: 'absolute',
						left: left,
						top: top,
					}}
					onClick={this.handleClick}
				>
					<section
						style={{
							pointerEvents: 'none',
							textAlign: 'center',
						}}
					>
						<p>click to move</p>
						<p>
							({left}, {top})
						</p>
						<p>inspect me</p>
					</section>
				</Portal>
			);
		},
	});

	return <Component />;
};

/* Context */
export const Context = () => {
	const context: any = React.createContext({
		display: 'hello',
	});

	class ExampleApp extends React.Component {
		static propTypes: {
			children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
		};
		constructor(props: any) {
			super(props);
			this.state = {
				counter: 0,
				increment: () => {
					this.setState(({ counter }: any) => ({ counter: counter + 1 }));
				},
			};
		}

		render() {
			return (
				<context.Provider value={this.state}>
					{this.props.children}
				</context.Provider>
			);
		}
	}
	ExampleApp.propTypes = {
		children: PropTypes.node,
	};

	const Component = createClass({
		render() {
			return (
				<ExampleApp>
					<context.Consumer>
						{({ counter, increment }: any) => (
							<div>
								<h1>counter: {counter}</h1>
								<Button kind='primary' onClick={increment}>
									increment
								</Button>
							</div>
						)}
					</context.Consumer>
					<Portal
						style={{
							marginTop: 20,
							border: '1px solid #333',
							padding: 10,
							width: 100,
							height: 100,
							backgroundColor: 'yellow',
						}}
					>
						<context.Consumer>
							{({ counter, increment }: any) => (
								<div>
									inside the portal counter: {counter}
									<Button kind='primary' onClick={increment}>
										increment
									</Button>
								</div>
							)}
						</context.Consumer>
					</Portal>
				</ExampleApp>
			);
		},
	});

	return <Component />;
};
