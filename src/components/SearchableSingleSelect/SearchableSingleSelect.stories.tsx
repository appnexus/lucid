import {
	includes,
	map,
	reduce,
	indexOf,
	constant,
	escapeRegExp,
	get,
} from 'lodash';
import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import SearchableSingleSelect from './SearchableSingleSelect';
import Underline from '../Underline/Underline';

//👇 Provide Storybook with the component name, 'section', any subcomponents and a description
export default {
	title: 'Controls/SearchableSingleSelect',
	component: SearchableSingleSelect,
	subcomponents: {
		'SearchableSingleSelect.Placeholder': SearchableSingleSelect.SearchField,
		'SearchableSingleSelect.Option': SearchableSingleSelect.Option,
		'SearchableSingleSelect.Option.Selected':
			SearchableSingleSelect.Option.Selected,
		'SearchableSingleSelect.OptionGroup': SearchableSingleSelect.OptionGroup,
		'SearchableSingleSelect.SearchField': SearchableSingleSelect.SearchField,
	},
	parameters: {
		docs: {
			description: {
				component: SearchableSingleSelect.peek.description,
			},
		},
	},
} as Meta;

//👇 Destructure any child components that we will need
const { Option, OptionGroup } = SearchableSingleSelect;

//👇 Add a key prop to each child element of the array
function addKeys(children: any) {
	return map(children, (child, index) => ({ ...child, key: index }));
}

//👇 Create a “template” of how args map to rendering
const Template: any = (args) => {
	return (
		<section>
			<SearchableSingleSelect {...args} style={{ maxWidth: '200px' }} />
		</section>
	);
};

//👇 Each story then reuses that template

/** Basic */
export const Basic = Template.bind({});
Basic.args = {
	SearchField: { placeholder: 'Search State' },
	children: addKeys([
		<Option>Alabama</Option>,
		<Option>Alaska</Option>,
		<Option>Arizona</Option>,
		<Option>Arkansas</Option>,
		<Option>California</Option>,
		<Option>Colorado</Option>,
		<Option>Connecticut</Option>,
		<Option>Delaware</Option>,
		<Option>Florida</Option>,
		<Option>Georgia</Option>,
		<Option>Hawaii</Option>,
		<Option>Idaho</Option>,
		<Option>Illinois</Option>,
		<Option>Indiana</Option>,
		<Option>Iowa</Option>,
		<Option>Kansas</Option>,
		<Option>Kentucky</Option>,
		<Option>Louisiana</Option>,
		<Option>Maine</Option>,
		<Option>Maryland</Option>,
		<Option>Massachusetts</Option>,
		<Option>Michigan</Option>,
		<Option>Minnesota</Option>,
		<Option>Mississippi</Option>,
		<Option>Missouri</Option>,
		<Option>Montana Nebraska</Option>,
		<Option>Nevada</Option>,
		<Option>New Hampshire</Option>,
		<Option>New Jersey</Option>,
		<Option>New Mexico</Option>,
		<Option>New York</Option>,
		<Option>North Carolina</Option>,
		<Option>North Dakota</Option>,
		<Option>Ohio</Option>,
		<Option>Oklahoma</Option>,
		<Option>Oregon</Option>,
		<Option>Pennsylvania Rhode Island</Option>,
		<Option>South Carolina</Option>,
		<Option>South Dakota</Option>,
		<Option>Tennessee</Option>,
		<Option>Texas</Option>,
		<Option>Utah</Option>,
		<Option>Vermont</Option>,
		<Option>Virginia</Option>,
		<Option>Washington</Option>,
		<Option>West Virginia</Option>,
		<Option>Wisconsin</Option>,
		<Option>Wyoming</Option>,
	]),
};

/** Props */
export const Props = (args) => {
	return (
		<section>
			<h5>Loading</h5>
			<SearchableSingleSelect {...args} isLoading={true}>
				<Option>Alabama</Option>
			</SearchableSingleSelect>

			<h5>Disabled</h5>
			<SearchableSingleSelect {...args} isDisabled={true}>
				<Option>Alabama</Option>
			</SearchableSingleSelect>
		</section>
	);
};
Props.args = {
	...Basic.args,
	SearchField: { placeholder: '' },
};
Props.parameters = {
	docs: {
		description: {
			story: `Apply \`isLoading\` to the dropdown when it is loading, and apply \`isDisabled\` to the dropdown if none of the options are currently available.
            `,
		},
	},
};

/** Asynchronous */
const allData: any = {
	100: { name: 'Rita Daniel' },
	101: { name: 'Meghan Mcgowan' },
	102: { name: 'Latisha Kent' },
	103: { name: 'Jeannine Horton' },
	104: { name: 'Noreen Joyner' },
	105: { name: 'Angelique Head' },
	106: { name: 'Kim Salinas' },
	107: { name: 'Alexis Small' },
	108: { name: 'Fernandez Singleton' },
	109: { name: 'Jacqueline Alvarado' },
	110: { name: 'Cornelia Roman' },
	111: { name: 'John Gonzales' },
	112: { name: 'Mcleod Hodge' },
	113: { name: 'Fry Barrera' },
	114: { name: 'Jannie Compton' },
	115: { name: 'June Odom' },
	116: { name: 'Rose Foster' },
	117: { name: 'Kathryn Prince' },
	118: { name: 'Hebert Bowman' },
	119: { name: 'Shawn Burgess' },
};

export const Asynchronous = (args) => {
	const [selectedId, setSelectedId] = useState<number | null>(null); // current selection
	const [visibleIds, setVisibleIds] = useState<any[]>([]); // aka current search results
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSearch = (searchText) => {
		setIsLoading(true);

		// Fake an API call
		setTimeout(() => {
			const searchResults = reduce(
				allData,
				(acc: any[], { name }: { name: string }, id: string) => {
					return includes(name.toLowerCase(), searchText.toLowerCase())
						? acc.concat(id)
						: acc;
				},
				[]
			);

			setIsLoading(false);
			setVisibleIds(searchResults);
		});
	};

	const handleSelect = (index: string, event: any) => {
		const optionsId = get(event, 'props.callbackId', null);
		setSelectedId(optionsId);
	};

	const selectedIndex =
		indexOf(visibleIds, selectedId) === -1
			? null
			: indexOf(visibleIds, selectedId);

	return (
		<section>
			<SearchableSingleSelect
				{...args}
				isLoading={isLoading}
				onSelect={handleSelect}
				onSearch={handleSearch}
				selectedIndex={selectedIndex}
				optionFilter={constant(true)}
				SearchField={{
					placeholder: 'Type here to simulate an API backed search',
				}}
			>
				{map(visibleIds, (id) => (
					<Option key={id} callbackId={id}>
						{allData[id].name}
					</Option>
				))}
			</SearchableSingleSelect>
		</section>
	);
};

/** Grouped Options */
export const GroupedOptions = Template.bind({});
GroupedOptions.args = {
	children: addKeys([
		<OptionGroup>
			Northeast
			<Option>Connecticut</Option>
			<Option>Delaware</Option>
			<Option>Maine</Option>
			<Option>Maryland</Option>
			<Option>Massachusetts</Option>
			<Option>New Hampshire</Option>
			<Option>New Jersey</Option>
			<Option>New York</Option>
			<Option>Pennsylvania</Option>
			<Option>Rhode Island</Option>
			<Option>Vermont</Option>
		</OptionGroup>,
		<OptionGroup>
			Southeast
			<Option>Alabama</Option>
			<Option>Arkansas</Option>
			<Option>Florida</Option>
			<Option>Georgia</Option>
			<Option>Kentucky</Option>
			<Option>Louisiana</Option>
			<Option>Mississippi</Option>
			<Option>North Carolina</Option>
			<Option>South Carolina</Option>
			<Option>Tennessee</Option>
			<Option>Virginia</Option>
			<Option>West Virginia</Option>
		</OptionGroup>,
		<OptionGroup>
			Midwest
			<Option>Illinois</Option>
			<Option>Indiana</Option>
			<Option>Iowa</Option>
			<Option>Kansas</Option>
			<Option>Michigan</Option>
			<Option>Minnesota</Option>
			<Option>Missouri</Option>
			<Option>Nebraska</Option>
			<Option>North Dakota</Option>
			<Option>Ohio</Option>
			<Option>South Dakota</Option>
			<Option>Wisconsin</Option>
		</OptionGroup>,
		<OptionGroup>
			Southwest
			<Option>Arizona</Option>
			<Option>New Mexico</Option>
			<Option>Oklahoma</Option>
			<Option>Texas</Option>
		</OptionGroup>,
		<OptionGroup>
			West
			<Option>California</Option>
			<Option>Colorado</Option>
			<Option>Idaho</Option>
			<Option>Montana</Option>
			<Option>Nevada</Option>
			<Option>Oregon</Option>
			<Option>Utah</Option>
			<Option>Washington</Option>
			<Option>Wyoming</Option>
		</OptionGroup>,
		<Option>Alaska</Option>,
		<Option>Hawaii</Option>,
	]),
};
GroupedOptions.parameters = {
	docs: {
		description: {
			story: `Grouped options allows you to have sections within your dropdown. Use this to help frame users' understanding of the options.
            `,
		},
	},
};

/** Selected Option */
export const SelectedOption = Template.bind({});
SelectedOption.args = {
	...Basic.args,
	SearchField: {
		placeholder: 'Search Color',
	},
	children: addKeys([
		<Option Selected={<div style={{ color: 'red' }}>RED</div>}>Red</Option>,
		<Option Selected={<div style={{ color: 'blue' }}>BLUE</div>}>Blue</Option>,
		<Option Selected={<div style={{ color: 'green' }}>GREEN</div>}>
			Green
		</Option>,
	]),
};

/** Invalid Option */
export const InvalidOption = () => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const handleSelect = (optionIndex: number | null) => {
		setSelectedIndex(optionIndex);
	};

	return (
		<SearchableSingleSelect
			onSelect={handleSelect}
			Error={selectedIndex === 2 ? null : 'Please Choose Green'}
		>
			<Option Selected={<div style={{ color: 'red' }}>RED</div>}>Red</Option>
			<Option Selected={<div style={{ color: 'blue' }}>BLUE</div>}>Blue</Option>
			<Option Selected={<div style={{ color: 'green' }}>GREEN</div>}>
				Green
			</Option>
		</SearchableSingleSelect>
	);
};

/** Formatted Options */
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
		return new RegExp(escapeRegExp(searchText), 'i').test(filterText);
	}
	return true;
};

export const FormattedOptions = Template.bind({});
FormattedOptions.args = {
	...Basic.args,
	SearchField: {
		placeholder: 'Search Options',
	},
	optionFilter,
	children: addKeys([
		<OptionGroup>
			<OptionCols col1='ID' col2='NAME' col3='DESCRIPTION' />

			<Option filterText='13 Drone lorem ipsum dolor sit' Selected='Drone (13)'>
				{({ searchText }: { searchText: string }) => (
					<OptionCols
						col1='13'
						col2='Drone'
						col3='lorem ipsum dolor sit'
						textMatch={searchText}
					/>
				)}
			</Option>

			<Option
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
			</Option>

			<Option
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
			</Option>

			<Option
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
			</Option>
		</OptionGroup>,
	]),
};
FormattedOptions.parameters = {
	docs: {
		description: {
			story: `Use multiple columns of data in your dropdown when additional information is needed to make a selection.
            `,
		},
	},
};
