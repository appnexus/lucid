import React from 'react';
import { Autocomplete } from '../../../index';

export default React.createClass({

	render() {
		return (
			<Autocomplete
				placeholder='Enter a word...'
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
