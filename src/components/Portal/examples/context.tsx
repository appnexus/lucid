import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';

import { Button, Portal } from '../../../index';

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

export default createClass({
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
