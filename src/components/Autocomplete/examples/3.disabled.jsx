import React from 'react';
import createReactClass from 'create-react-class';
import { Autocomplete } from '../../../index';

export default createReactClass({
	render() {
		return (
			<section style={{ minHeight: 100 }}>
				<Autocomplete placeholder="Enter a word..." isDisabled />
			</section>
		);
	},
});
