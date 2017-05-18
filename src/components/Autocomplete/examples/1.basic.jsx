import React from 'react';
import { Autocomplete } from '../../../index';
import createClass from 'create-react-class';

export default createClass({
	render() {
		return (
			<Autocomplete
				placeholder="Enter a word..."
				suggestions={[
					'Portland',
					'pinky and the brain',
					'playa please',
					'porridge',
					'portal',
					'potent potables',
					'potent',
				]}
			/>
		);
	},
});
