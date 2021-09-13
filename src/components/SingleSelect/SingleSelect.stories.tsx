import { map, isNil } from 'lodash';
import React, { useState } from 'react';
import { Meta } from '@storybook/react';
//import { Subtitle } from '@storybook/addon-docs';
//import { isNil } from 'lodash';

import {
	SingleSelect,
	PlusIcon,
	SuccessIcon,
	InfoIcon,
	DangerIcon,
} from '../../index';
import { SingleSelectDumb } from './SingleSelect';

//import { ISingleSelectOptionProps } from './SingleSelect';

//const { Placeholder, Option } = SingleSelect;

export default {
	title: 'Controls/SingleSelect',
	component: SingleSelect,
	subcomponents: {
		'SingleSelect.Placeholder': SingleSelect.Placeholder,
		'SingleSelect.Option': SingleSelect.Option,
		'SingleSelect.Option.Selected': SingleSelect.Option.Selected,
		'SingleSelect.OptionGroup': SingleSelect.OptionGroup,
	},
	parameters: {
		docs: {
			description: {
				component: SingleSelectDumb.peek.description,
			},
		},
	},
} as Meta;

//👇 Destructure the child components that we will need from single select
const { Option, OptionGroup } = SingleSelect;

//👇 Add a key prop to each element of the array
function addKeys(children) {
	return map(children, (child, index) => ({ ...child, key: index }));
}

//👇 We create a “template” of how args map to rendering
const Template: any = (args) => {
	const [selectedIndex, setSelected] = useState<number | null>(null);
	const [selectedOptionName, setSelectedOptionName] = useState<string | null>(
		null
	);
	const { showSelectedIndex } = args;

	const handleSelect = (optionIndex: number | null) => {
		const name = !isNil(optionIndex)
			? args.children[optionIndex].props.name
			: null;
		setSelected(optionIndex);
		setSelectedOptionName(name);
	};

	return (
		<section style={{ minHeight: 90 }}>
			<SingleSelect {...args} onSelect={(e) => handleSelect(e)}></SingleSelect>
			{showSelectedIndex && !isNil(selectedIndex) && (
				<section style={{ paddingTop: 9, paddingLeft: 9 }}>
					Selected Index: {JSON.stringify(selectedIndex)}
				</section>
			)}
			{selectedOptionName && (
				<section style={{ paddingLeft: 9 }}>
					<p>Selected Option Name: {JSON.stringify(selectedOptionName)}</p>
				</section>
			)}
		</section>
	);
};

//👇 Each story then reuses that template

/** Default */
export const Default = Template.bind({});
Default.args = {
	Placeholder: 'Select a Color',
	showSelectedIndex: true,
	children: addKeys([
		<Option>Red</Option>,
		<Option>Green</Option>,
		<Option>Blue</Option>,
	]),
};

/** Named Options */
export const NamedOptions = Template.bind({});
NamedOptions.args = {
	...Default.args,
	children: addKeys([
		<Option name='red'>Red</Option>,
		<Option name='green'>Green</Option>,
		<Option name='blue'>Blue</Option>,
	]),
};
NamedOptions.parameters = {
	docs: {
		description: {
			story: `Use named options when you need to display different values within the dropdown and elsewhere on the screen after the user makes a selection.
                `,
		},
	},
};

/** Formatted Options */
const OptionCols = ({ col1, col2 }: { col1: string; col2: string }) => (
	<div style={{ display: 'flex' }}>
		<div style={{ width: 100 }}>{col1}</div>
		<div>{col2}</div>
	</div>
);

export const FormattedOptions = Template.bind({});
FormattedOptions.args = {
	...Default.args,
	children: addKeys([
		<OptionGroup>
			<OptionCols col1='NAME' col2='ID' />

			<Option Selected='Red (#FF0000)'>
				<OptionCols col1='Red' col2='#FF0000' />
			</Option>

			<Option Selected='Green (#00FF00)'>
				<OptionCols col1='Green' col2='#00FF00' />
			</Option>

			<Option Selected='Blue (#0000FF)'>
				<OptionCols col1='Blue' col2='#0000FF' />
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

/** Grouped Options */
export const GroupedOptions = Template.bind({});
GroupedOptions.args = {
	...Default.args,
	children: addKeys([
		<OptionGroup>
			Screen
			<Option>Red</Option>
			<Option>Green</Option>
			<Option>Blue</Option>
		</OptionGroup>,
		<OptionGroup>
			Print
			<Option>Cyan</Option>
			<Option>Yellow</Option>
			<Option>Magenta</Option>
			<Option>Black</Option>
		</OptionGroup>,
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

/** Disabled Options */
export const DisabledOptions = Template.bind({});
DisabledOptions.args = {
	...Default.args,
	children: addKeys([
		<Option isDisabled>Red</Option>,
		<Option>Green</Option>,
		<Option isDisabled>Blue</Option>,
	]),
};
DisabledOptions.parameters = {
	docs: {
		description: {
			story: `Apply \`isDisabled\` to dropdown options that aren't currently available.
            `,
		},
	},
};

/** Disabled Select */
export const DisabledSelect = Template.bind({});
DisabledSelect.args = {
	...Default.args,
	isDisabled: true,
};
DisabledSelect.parameters = {
	docs: {
		description: {
			story: `Apply \`isDisabled\` to the dropdown if none of the options are currently available.
            `,
		},
	},
};

/** No Unselect */
export const NoUnselect = Template.bind({});
NoUnselect.args = {
	...Default.args,
	hasReset: false,
};
NoUnselect.parameters = {
	docs: {
		description: {
			story: `This removes the default state, displayed as the \`Placeholder\`. Use \`hasReset="false"\` to prevent users from deselecting a setting.
            `,
		},
	},
};

export const MaxMenuHeight = Template.bind({});
MaxMenuHeight.args = {
	...Default.args,
	maxMenuHeight: '12em',
	children: addKeys([
		<Option>Aliceblue</Option>,
		<Option>Antiquewhite</Option>,
		<Option>Aqua</Option>,
		<Option>Aquamarine</Option>,
		<Option>Azure</Option>,
		<Option>Beige</Option>,
		<Option>Bisque</Option>,
		<Option>Black</Option>,
		<Option>Blanchedalmond</Option>,
		<Option>Blue</Option>,
		<Option>Blueviolet</Option>,
		<Option>Brown</Option>,
		<Option>Burlywood</Option>,
		<Option>Cadetblue</Option>,
		<Option>Chartreuse</Option>,
	]),
};
MaxMenuHeight.parameters = {
	docs: {
		description: {
			story: `Provide a fixed menu height with the \`maxMenuHeight\` prop. It will allow users to scroll through the options within a fixed height.
            `,
		},
	},
};

export const RichContent = Template.bind({});
RichContent.args = {
	...Default.args,
	Placeholder: (
		<>
			<PlusIcon style={{ marginRight: 4 }} /> Add Color
		</>
	),
	children: addKeys([
		<Option>
			<DangerIcon style={{ marginRight: 4 }} /> Red
		</Option>,
		<Option>
			<SuccessIcon style={{ marginRight: 4 }} /> Green
		</Option>,
		<Option>
			<InfoIcon style={{ marginRight: 4 }} /> Blue
		</Option>,
	]),
};
RichContent.parameters = {
	docs: {
		description: {
			story: `You can include rich content in the dropdown. Use icons or other rich content where an image will help users make a selection: a company logo near the company name, for example.
            `,
		},
	},
};

export const NoSelectionHighlighting = Template.bind({});
NoSelectionHighlighting.args = {
	...Default.args,
	isSelectionHighlighted: false,
};
NoSelectionHighlighting.parameters = {
	docs: {
		description: {
			story: `Use \`isSelectionHighlighted="false"\` when the dropdown defaults to null selections such as 'All' or 'Any'. The grey outline indicates that this selection does not need users' attention.
            `,
		},
	},
};

export const ArrayOptions = Template.bind({});
ArrayOptions.args = {
	Placeholder: 'Select a Number',
	Option: addKeys([<Option>1</Option>, <Option>2</Option>, <Option>3</Option>]),
};
ArrayOptions.parameters = {
	docs: {
		description: {
			story: `If needed, you can pass your dropdown option data as an array.
            `,
		},
	},
};

export const Stateless = Template.bind({});
Stateless.args = {
	...Default.args,
	showSelectedIndex: false,
	selectedIndex: 1,
	DropMenu: { focusedIndex: 2, isExpanded: true },
	style: { minHeight: 220 },
	children: addKeys([
		<OptionGroup>
			Preferred
			<Option>Red</Option>
			<Option>Green</Option>
			<Option>Blue</Option>
		</OptionGroup>,
		<Option>Orange</Option>,
		<Option isDisabled>Violet</Option>,
		<Option isDisabled>Brown</Option>,
	]),
};
Stateless.parameters = {
	docs: {
		description: {
			story: `
            This example shows the various states available in \`SingleSelect\`.
            `,
		},
	},
};

export const Invisible = Template.bind({});
Invisible.args = {
	...Default.args,
	isInvisible: true,
};
Invisible.parameters = {
	docs: {
		description: {
			story: `Setting the \`IsInvisible\` prop to 'true' removes the dropdown border. The lack of a border gives the dropdown a lighter visual weight within a data-intense layout.
			`,
		},
	},
};

export const InvisibleAndDisabled = Template.bind({});
InvisibleAndDisabled.args = {
	...Default.args,
	isInvisible: true,
	isDisabled: true,
};
InvisibleAndDisabled.parameters = {
	docs: {
		description: {
			story: `Setting the \`IsInvisible\` prop to 'true' removes the dropdown border, and \`isDisabled\` indicates that the dropdown option isn't currently available.
			`,
		},
	},
};
