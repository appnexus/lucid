import React from 'react';
import _ from 'lodash';
import { SearchableSingleSelect, Underline } from '../../../index';

// eslint-disable-next-line react/prop-types
const OptionCols = ({
	col1,
	col2,
	col3,
	textMatch,
}: {
	col1: string;
	col2: string;
	col3: string;
	textMatch?: string | undefined;
}) => (
	<div style={{ display: 'flex' }}>
		<div style={{ width: 100 }}>
			<Underline match={textMatch}>{col1}</Underline>
		</div>
		<div style={{ width: 100 }}>
			<Underline match={textMatch}>{col2}</Underline>
		</div>
		<div style={{ width: 200 }}>
			<Underline match={textMatch}>{col3}</Underline>
		</div>
	</div>
);

const optionFilter = (
	searchText: string,
	{ filterText }: { filterText: string }
) => {
	if (filterText) {
		return new RegExp(_.escapeRegExp(searchText), 'i').test(filterText);
	}
	return true;
};

export default class extends React.Component {
	render() {
		return (
			<SearchableSingleSelect optionFilter={optionFilter}>
				<SearchableSingleSelect.OptionGroup>
					<OptionCols col1='ID' col2='NAME' col3='DESCRIPTION' />

					<SearchableSingleSelect.Option
						filterText='13 Drone lorem ipsum dolor sit'
						Selected='Drone (13)'
					>
						{({ searchText }: { searchText: string }) => (
							<OptionCols
								col1='13'
								col2='Drone'
								col3='lorem ipsum dolor sit'
								textMatch={searchText}
							/>
						)}
					</SearchableSingleSelect.Option>

					<SearchableSingleSelect.Option
						filterText='14 Appa dolor sit amet consectetur'
						Selected='Appa (14)'
					>
						{({ searchText }: { searchText: string }) => (
							<OptionCols
								col1='14'
								col2='Appa'
								col3='dolor sit amet consectetur'
								textMatch={searchText}
							/>
						)}
					</SearchableSingleSelect.Option>

					<SearchableSingleSelect.Option
						filterText='15 Breakfast amet consectetur adipiscing elit'
						Selected='Breakfast (14)'
					>
						{({ searchText }: { searchText: string }) => (
							<OptionCols
								col1='14'
								col2='Breakfast'
								col3='amet consectetur adipiscing elit'
								textMatch={searchText}
							/>
						)}
					</SearchableSingleSelect.Option>

					<SearchableSingleSelect.Option
						filterText='16 Scout adipiscing elit sed do'
						Selected='Scout (15)'
					>
						{({ searchText }: { searchText: string }) => (
							<OptionCols
								col1='15'
								col2='Scout'
								col3='adipiscing elit sed do'
								textMatch={searchText}
							/>
						)}
					</SearchableSingleSelect.Option>
				</SearchableSingleSelect.OptionGroup>
			</SearchableSingleSelect>
		);
	}
}
