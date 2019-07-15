import React from 'react';
import createClass from 'create-react-class';
import { Typography } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<Typography>Default (no variant specified)</Typography>
				<Typography variant='h1'>h1. Heading</Typography>
				<Typography variant='h2'>h2. Heading</Typography>
				<Typography variant='h3'>h3. Heading</Typography>
				<Typography variant='p'>p. paragraph text</Typography>
				<Typography variant='a'>a. link text</Typography>
				<Typography variant='pre'>pre. preformatted text</Typography>
				<Typography variant='code'>code. snazzy code</Typography>
			</div>
		);
	},
});
