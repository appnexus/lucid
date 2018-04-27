import React from 'react';
import _ from 'lodash';
import { SearchableSelect, Underline } from '../../../src/index.js';

const OptionCols = ({ col1, col2, textMatch }) => (
	<div style={{ display: 'flex' }}>
		<div style={{ width: 100 }}>
			<Underline match={textMatch}>{col1}</Underline>
		</div>
		<div>
			<Underline match={textMatch}>{col2}</Underline>
		</div>
	</div>
);

const optionFilter = (searchText, { filterText }) => {
	if (filterText) {
		return new RegExp(_.escapeRegExp(searchText), 'i').test(filterText);
	}
	return true;
};

export default class extends React.Component {
	render() {
		return (
			<SearchableSelect optionFilter={optionFilter}>
				<SearchableSelect.OptionGroup>
					<OptionCols col1="ID" col2="NAME" />

					<SearchableSelect.Option filterText="Foo" Selected="Foo (1234)">
						{({ searchText }) => (
							<OptionCols col1="1234" col2="Foo" textMatch={searchText} />
						)}
					</SearchableSelect.Option>

					<SearchableSelect.Option filterText="Bar" Selected="Bar (2345)">
						{({ searchText }) => (
							<OptionCols col1="2345" col2="Bar" textMatch={searchText} />
						)}
					</SearchableSelect.Option>

					<SearchableSelect.Option filterText="Baz" Selected="Baz (3456)">
						{({ searchText }) => (
							<OptionCols col1="3456" col2="Baz" textMatch={searchText} />
						)}
					</SearchableSelect.Option>
				</SearchableSelect.OptionGroup>
			</SearchableSelect>
		);
	}
}
