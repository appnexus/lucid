import React from 'react';
import { SearchableMultiSelect, Resizer } from '../../../index';

const {
	Option,
} = SearchableMultiSelect;

export default React.createClass({
	render() {
		return (
			<Resizer>
				{(width) => {
					const responsiveMode = width >= 768 ? 'large' : 'small';

					return (
						<div style={{ marginBottom: '300px' }}>
							<h5>Loading</h5>
							<SearchableMultiSelect responsiveMode={responsiveMode} isLoading={true}><Option>Alabama</Option></SearchableMultiSelect>

							<h5>Disabled</h5>
							<SearchableMultiSelect responsiveMode={responsiveMode} isDisabled={true}><Option>Alabama</Option></SearchableMultiSelect>
						</div>
					);
				}}
			</Resizer>
		);
	},
});
