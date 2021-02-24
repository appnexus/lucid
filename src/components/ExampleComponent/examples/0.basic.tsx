import React from 'react';
import createClass from 'create-react-class';
import ExampleComponent from '../ExampleComponent';

const ExampleComponent2: any = ExampleComponent;

export default createClass({
	render() {
		return (
			<ExampleComponent2>
				Feel free to play with this example component to see how to create your
				own.
			</ExampleComponent2>
		);
	},
});
