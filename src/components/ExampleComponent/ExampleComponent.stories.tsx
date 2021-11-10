import React from 'react';
import createClass from 'create-react-class';
import ExampleComponent from './ExampleComponent';

export default {
	title: 'Documentation/ExampleComponent',
	component: ExampleComponent,
	parameters: {
		docs: {
			description: {
				component: (ExampleComponent as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	const ExampleComponent2: any = ExampleComponent;

	const Component = createClass({
		render() {
			return (
				<ExampleComponent2>
					Feel free to play with this example component to see how to create
					your own.
				</ExampleComponent2>
			);
		},
	});

	return <Component />;
};
Default.storyName = 'Default';

/* Prop Example */
export const PropExample = () => {
	const ExampleComponent2: any = ExampleComponent;

	const Component = createClass({
		render() {
			return (
				<ExampleComponent2 isX={true}>
					Be sure to show consumers of your component examples of how each prop
					is implemented.
				</ExampleComponent2>
			);
		},
	});

	return <Component />;
};
PropExample.storyName = 'PropExample';
