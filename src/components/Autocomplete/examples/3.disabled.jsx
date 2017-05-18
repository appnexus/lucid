import React from 'react';
import createClass from 'create-react-class';
import { Autocomplete } from '../../../index';

export default createClass({
	render() {
		return (
			<section style={{ minHeight: 100 }}>
				<Autocomplete placeholder="Enter a word..." isDisabled />
			</section>
		);
	},
});
