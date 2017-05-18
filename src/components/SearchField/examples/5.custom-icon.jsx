import React from 'react';
import createClass from 'create-react-class';
import { SearchField, LoadingIcon } from '../../../index';

export default createClass({
	render() {
		return (
			<SearchField>
				<SearchField.Icon><LoadingIcon /></SearchField.Icon>
			</SearchField>
		);
	},
});
