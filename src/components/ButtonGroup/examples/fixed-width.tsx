import React from 'react';
import createClass from 'create-react-class';
import { ButtonGroupDumb as ButtonGroup } from '../../../index';

export default createClass({
	render() {
		const buttonStyle = { width: '100px' };
		return (
			<ButtonGroup selectedIndices={[1, 2]}>
				<ButtonGroup.Button style={buttonStyle}>Smol</ButtonGroup.Button>
				<ButtonGroup.Button style={buttonStyle}>Lonnnnnnnng</ButtonGroup.Button>
				<ButtonGroup.Button style={buttonStyle}>Medium</ButtonGroup.Button>
			</ButtonGroup>
		);
	},
});
