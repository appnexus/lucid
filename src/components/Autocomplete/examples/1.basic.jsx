import React from 'react';
import AutocompleteStateless from '../Autocomplete';
import { buildStatefulComponent } from '../../../util/state-management';

const Autocomplete = buildStatefulComponent(AutocompleteStateless);

export default React.createClass({

	render() {
		return (
			<Autocomplete
				placeholder='Enter a word...'
				suggestions={[
					'Portland',
					'portal',
					'porridge',
					'potent',
					'please'
				]}
			/>
		);
	}
});
