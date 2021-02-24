import React from 'react';
import createClass from 'create-react-class';
import ExampleComponent from '../ExampleComponent';

const ExampleComponent2: any = ExampleComponent;

export default createClass({
	render() {
		return (
			<ExampleComponent2 isX={true}>
				Be sure to show consumers of your component examples of how each prop is
				implemented.
			</ExampleComponent2>
		);
	},
});
