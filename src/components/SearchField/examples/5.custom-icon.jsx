import React from 'react';
import { SearchField, LoadingIcon } from '../../../index';

export default React.createClass({
	render() {
		return (
			<SearchField>
				<SearchField.Icon><LoadingIcon /></SearchField.Icon>
			</SearchField>
		);
	},
});
