import { map, isNil, escapeRegExp } from 'lodash';
import React, { useState } from 'react';
import { Meta } from '@storybook/react';

import SearchableSelect from './SearchableSelect';
import Underline from '../Underline/Underline';

//👇 Provide Storybook with the component name, 'section', any subcomponents and a description
export default {
	title: 'Controls/SearchableSelect',
	component: SearchableSelect,
	subcomponents: {
		'SearchableSelect.Placeholder': SearchableSelect.Placeholder,
		'SearchableSelect.Option': SearchableSelect.Option,
		'SearchableSelect.Option.Selected': SearchableSelect.Option.Selected,
		'SearchableSelect.OptionGroup': SearchableSelect.OptionGroup,
		'SearchableSelect.SearchField': SearchableSelect.SearchField,
		'SearchableSelect.NullOption': SearchableSelect.NullOption,
		'SearchableSelect.FixedOption': SearchableSelect.FixedOption,
	},
	parameters: {
		docs: {
			description: {
				component: SearchableSelect.peek.description,
			},
		},
	},
} as Meta;

//👇 Destructure any child components that we will need
const { Option, OptionGroup, SearchField } = SearchableSelect;

//👇 Add a key prop to each element of the array
function addKeys(children: any) {
	return map(children, (child, index) => ({ ...child, key: index }));
}

//👇 Create a “template” of how args map to rendering
const Template: any = (args) => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const handleSelect = (optionIndex: number | null) => {
		setSelectedIndex(optionIndex);
	};

	return (
		<section style={{ minHeight: 120 }}>
			<SearchableSelect {...args} onSelect={handleSelect}></SearchableSelect>
			{!isNil(selectedIndex) && (
				<section style={{ paddingTop: 9, paddingLeft: 9 }}>
					Selected Index: {JSON.stringify(selectedIndex)}
				</section>
			)}
		</section>
	);
};

//👇 Each story then reuses that template

/** Basic */
export const Basic = Template.bind({});
Basic.args = {
	Placeholder: 'Select State',
	maxMenuHeight: '200',
	children: addKeys([
		<Option value='AK'>Alaska</Option>,
		<Option value='HI'>Hawaii</Option>,
		<OptionGroup>
			PST
			<Option value='CA'>California</Option>
			<Option value='NV'>Nevada</Option>
			<Option value='OR'>Oregon</Option>
			<Option value='WA'>Washington</Option>
		</OptionGroup>,
		<OptionGroup>
			MST
			<Option value='CO'>Colorado</Option>
			<Option value='ID'>Idaho</Option>
			<Option value='MT'>Montana</Option>
			<Option value='NM'>New Mexico</Option>
			<Option value='ND'>North Dakota</Option>
			<Option value='SD'>South Dakota</Option>
			<Option value='WI'>Wisconsin</Option>
			<Option value='WY'>Wyoming</Option>
		</OptionGroup>,
		<OptionGroup>
			CST
			<Option value='AR'>Arkansas</Option>
			<Option value='IL'>Illinois</Option>
			<Option value='IN'>Indiana</Option>
			<Option value='IA'>Iowa</Option>
			<Option value='KS'>Kansas</Option>
			<Option value='KY'>Kentucky</Option>
			<Option value='MI'>Michigan</Option>
			<Option value='MN'>Minnesota</Option>
			<Option value='MS'>Mississippi</Option>
			<Option value='MO'>Missouri</Option>
			<Option value='NE'>Nebraska</Option>
			<Option value='OH'>Ohio</Option>
			<Option value='OK'>Oklahoma</Option>
			<Option value='TN'>Tennessee</Option>
			<Option value='TX'>Texas</Option>
			<Option value='UT'>Utah</Option>
		</OptionGroup>,
		<OptionGroup>
			EST
			<Option value='AL'>
				<span>USA: </span>Alabama
			</Option>
			<Option value='AZ'>Arizona</Option>
			<Option value='CT'>Connecticut</Option>
			<Option value='DE'>Delaware</Option>
			<Option value='DC'>District Of Columbia</Option>
			<Option value='FL'>Florida</Option>
			<Option value='GA'>Georgia</Option>
			<Option value='LA'>Louisiana</Option>
			<Option value='ME'>Maine</Option>
			<Option value='MD'>Maryland</Option>
			<Option value='MA'>Massachusetts</Option>
			<Option value='NH'>New Hampshire</Option>
			<Option value='NJ'>New Jersey</Option>
			<Option value='NY'>New York</Option>
			<Option value='NC'>North Carolina</Option>
			<Option value='PA'>Pennsylvania</Option>
			<Option value='RI'>Rhode Island</Option>
			<Option value='SC'>South Carolina</Option>
			<Option value='VT'>Vermont</Option>
			<Option value='VA'>Virginia</Option>
			<Option value='WV'>West Virginia</Option>
		</OptionGroup>,
	]),
};

/** Loading */
export const Loading = Template.bind({});
Loading.args = {
	...Basic.args,
	isLoading: true,
	children: addKeys([
		<Option value='AL'>Alabama</Option>,
		<Option value='AK'>Alaska</Option>,
		<Option value='AZ'>Arizona</Option>,
		<Option value='AR'>Arkansas</Option>,
		<Option value='CA'>California</Option>,
		<Option value='CO'>Colorado</Option>,
		<Option value='CT'>Connecticut</Option>,
		<Option value='DE'>Delaware</Option>,
		<Option value='DC'>District Of Columbia</Option>,
		<Option value='FL'>Florida</Option>,
		<Option value='GA'>Georgia</Option>,
		<Option value='HI'>Hawaii</Option>,
		<Option value='ID'>Idaho</Option>,
		<Option value='IL'>Illinois</Option>,
		<Option value='IN'>Indiana</Option>,
		<Option value='IA'>Iowa</Option>,
		<Option value='KS'>Kansas</Option>,
		<Option value='KY'>Kentucky</Option>,
		<Option value='LA'>Louisiana</Option>,
		<Option value='ME'>Maine</Option>,
		<Option value='MD'>Maryland</Option>,
		<Option value='MA'>Massachusetts</Option>,
		<Option value='MI'>Michigan</Option>,
		<Option value='MN'>Minnesota</Option>,
		<Option value='MS'>Mississippi</Option>,
		<Option value='MO'>Missouri</Option>,
		<Option value='MT'>Montana</Option>,
		<Option value='NE'>Nebraska</Option>,
		<Option value='NV'>Nevada</Option>,
		<Option value='NH'>New Hampshire</Option>,
		<Option value='NJ'>New Jersey</Option>,
		<Option value='NM'>New Mexico</Option>,
		<Option value='NY'>New York</Option>,
		<Option value='NC'>North Carolina</Option>,
		<Option value='ND'>North Dakota</Option>,
		<Option value='OH'>Ohio</Option>,
		<Option value='OK'>Oklahoma</Option>,
		<Option value='OR'>Oregon</Option>,
		<Option value='PA'>Pennsylvania</Option>,
		<Option value='RI'>Rhode Island</Option>,
		<Option value='SC'>South Carolina</Option>,
		<Option value='SD'>South Dakota</Option>,
		<Option value='TN'>Tennessee</Option>,
		<Option value='TX'>Texas</Option>,
		<Option value='UT'>Utah</Option>,
		<Option value='VT'>Vermont</Option>,
		<Option value='VA'>Virginia</Option>,
		<Option value='WA'>Washington</Option>,
		<Option value='WV'>West Virginia</Option>,
		<Option value='WI'>Wisconsin</Option>,
		<Option value='WY'>Wyoming</Option>,
	]),
};

/** Custom Search Placeholder */
export const CustomSearchPlaceholder = Template.bind({});
CustomSearchPlaceholder.args = {
	...Basic.args,
	Placeholder: 'Select Color',
	children: addKeys([
		<SearchField placeholder='Type here to filter...' />,
		<Option>Blue</Option>,
		<Option>Green</Option>,
		<Option>Orange</Option>,
		<Option>Red</Option>,
	]),
};

/** Invisible */
export const Invisible = Template.bind({});
Invisible.args = {
	...Basic.args,
	isInvisible: true,
};

/** Formatted Options */
const OptionCols = ({
	col1,
	col2,
	textMatch,
}: {
	col1: string;
	col2: string;
	textMatch?: string | undefined;
}) => (
	<div style={{ display: 'flex' }}>
		<div style={{ width: 100 }}>
			<Underline match={textMatch}>{col1}</Underline>
		</div>
		<div>
			<Underline match={textMatch}>{col2}</Underline>
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
	Placeholder: 'Select Color',
	optionFilter: optionFilter,
	children: addKeys([
		<OptionGroup>
			<OptionCols col1='Name' col2='ID' />

			<Option filterText='Red' Selected='Red (#FF0000)'>
				{({ searchText }: { searchText: string }) => (
					<OptionCols col1='Red' col2='#FF0000' textMatch={searchText} />
				)}
			</Option>

			<Option filterText='Green' Selected='Green (#00FF00)'>
				{({ searchText }: { searchText: string }) => (
					<OptionCols col1='Green' col2='#00FF00' textMatch={searchText} />
				)}
			</Option>

			<Option filterText='Blue' Selected='Blue (#0000FF)'>
				{({ searchText }: { searchText: string }) => (
					<OptionCols col1='Blue' col2='#0000FF' textMatch={searchText} />
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

/** Invalid */
export const Invalid: any = (args) => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

	const handleSelect = (optionIndex: number | null) => {
		setSelectedIndex(optionIndex);
	};

	return (
		<section style={{ minHeight: 120 }}>
			<SearchableSelect
				{...args}
				Error={selectedIndex === 0 ? null : 'Please choose option California'}
				onSelect={handleSelect}
			></SearchableSelect>
			{!isNil(selectedIndex) && (
				<section style={{ paddingTop: 9, paddingLeft: 9 }}>
					Selected Index: {JSON.stringify(selectedIndex)}
				</section>
			)}
		</section>
	);
};

Invalid.args = {
	...Basic.args,
};
