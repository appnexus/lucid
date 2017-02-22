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
							<SearchableMultiSelect responsiveMode={responsiveMode}>
								<Option value='CO'>Colorado</Option>
								<Option value='ID'>Idaho</Option>
								<Option value='MT'>Montana</Option>
								<Option value='NM'>New Mexico</Option>
								<Option value='ND'>North Dakota</Option>
								<Option value='SD'>South Dakota</Option>
								<Option value='WI'>Wisconsin</Option>
								<Option value='WY'>Wyoming</Option>
							</SearchableMultiSelect>
						</div>
					);
				}}
			</Resizer>
		);
	},
});
