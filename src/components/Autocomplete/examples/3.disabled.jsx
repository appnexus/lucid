import React from 'react';
import { Autocomplete } from '../../../index';

export default React.createClass({
	render() {

		return (
			<section style={{ minHeight: 100 }}>
				<Autocomplete placeholder='Enter a word...' isDisabled />
			</section>
		);
	}
});
