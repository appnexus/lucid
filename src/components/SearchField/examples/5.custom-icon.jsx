import React from 'react';
import createReactClass from 'create-react-class';
import { SearchField, LoadingIcon } from '../../../index';

export default createReactClass({
	render() {
		return (
			<SearchField>
				<SearchField.Icon><LoadingIcon /></SearchField.Icon>
			</SearchField>
		);
	},
});
