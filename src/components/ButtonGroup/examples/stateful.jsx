import React from 'react';
import createReactClass from 'create-react-class';
import { ButtonGroup } from '../../../index';

export default createReactClass({
	render() {
		return (
			<ButtonGroup>
				<ButtonGroup.Button>Zero</ButtonGroup.Button>
				<ButtonGroup.Button>One</ButtonGroup.Button>
				<ButtonGroup.Button>Two</ButtonGroup.Button>
				<ButtonGroup.Button>Three</ButtonGroup.Button>
			</ButtonGroup>
		);
	},
});
