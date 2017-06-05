import React from 'react';
import createClass from 'create-react-class';
import { SearchableMultiSelect, Resizer } from '../../../index';

const { Option } = SearchableMultiSelect;

export default createClass({
	render() {
		return (
			<Resizer>
				{width => {
					const responsiveMode = width >= 768 ? 'large' : 'small';

					return (
						<section>
							<h5>Loading</h5>
							<SearchableMultiSelect
								responsiveMode={responsiveMode}
								isLoading={true}
							>
								<Option>Alabama</Option>
							</SearchableMultiSelect>

							<h5>Disabled</h5>
							<SearchableMultiSelect
								responsiveMode={responsiveMode}
								isDisabled={true}
							>
								<Option>Alabama</Option>
							</SearchableMultiSelect>

							<h5>Custom option selections</h5>
							<SearchableMultiSelect
								responsiveMode={responsiveMode}
								selectedIndices={[0, 1, 2, 3]}
							>
								<Option Selection={{ kind: 'warning' }}>Washington</Option>
								<Option Selection={{ kind: 'success' }}>Oregon</Option>
								<Option Selection={{ kind: 'danger' }}>California</Option>
								<Option Selection={{ kind: 'container' }}>Nevada</Option>
							</SearchableMultiSelect>

							<h5>No remove all option</h5>
							<SearchableMultiSelect
								responsiveMode={responsiveMode}
								hasRemoveAll={false}
								initialState={{
									selectedIndices: [0, 1, 2],
								}}
							>
								<Option>Washington</Option>
								<Option>Oregon</Option>
								<Option>California</Option>
							</SearchableMultiSelect>
						</section>
					);
				}}
			</Resizer>
		);
	},
});
