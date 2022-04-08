import { map, isNil } from 'lodash';
import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import SingleSelect from './SingleSelect';
import DangerIcon from '../Icon/DangerIcon/DangerIcon';
import PlusIcon from '../Icon/PlusIcon/PlusIcon';
import SuccessIcon from '../Icon/SuccessIcon/SuccessIcon';
import InfoIcon from '../Icon/InfoIcon/InfoIcon';

//👇 Provide Storybook with the component name, 'section', any subcomponents and a description
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
				component: SingleSelect.peek.description,
			},
		},
	},
} as Meta;

//👇 Destructure any child components that we will need
const { Option, OptionGroup } = SingleSelect;

//👇 Add a key prop to each element of the array
function addKeys(children) {
	return map(children, (child, index) => ({ ...child, key: index }));
}

//👇 Create a “template” of how args map to rendering
const Template: any = (args) => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
	const [selectedOptionName, setSelectedOptionName] = useState<string | null>(
		null
	);

	const handleSelect = (optionIndex: number | null) => {
		const name = !isNil(optionIndex)
			? args.children[optionIndex].props.name
			: null;
		setSelectedIndex(optionIndex);
		setSelectedOptionName(name);
	};

	return (
		<section style={{ minHeight: '10em' }}>
			<SingleSelect {...args} onSelect={(e) => handleSelect(e)}></SingleSelect>
			{!isNil(selectedIndex) && (
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

/** Basic */
export const Basic = Template.bind({});
Basic.args = {
	Placeholder: 'Select Color',
	children: addKeys([
		<Option>Red</Option>,
		<Option>Green</Option>,
		<Option>Blue</Option>,
	]),
};

/** Named Options */
export const NamedOptions = Template.bind({});
NamedOptions.args = {
	...Basic.args,
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
	...Basic.args,
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
	...Basic.args,
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
	...Basic.args,
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
	...Basic.args,
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
	...Basic.args,
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

/** Max Menu Height */
export const MaxMenuHeight = Template.bind({});
MaxMenuHeight.args = {
	...Basic.args,
	maxMenuHeight: '7em',
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

/** Rich Content */
export const RichContent = Template.bind({});
RichContent.args = {
	...Basic.args,
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

/** No Selection Highlighting */
export const NoSelectionHighlighting = Template.bind({});
NoSelectionHighlighting.args = {
	...Basic.args,
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

/** Array Options */
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

/** Stateless */
export const Stateless = Template.bind({});
Stateless.args = {
	...Basic.args,
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

/** Invisible */
export const Invisible = Template.bind({});
Invisible.args = {
	...Basic.args,
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

/** Invisible and Disabled */
export const InvisibleAndDisabled = Template.bind({});
InvisibleAndDisabled.args = {
	...Basic.args,
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

/** With Title */
export const Title = Template.bind({});
Title.args = {
	...Basic.args,
	Title: 'Sample Title',
};
Title.parameters = {
	docs: {
		description: {
			story: `Setting the \`Title\` prop to 'Sample Title' adds a title to the single select.`,
		},
	},
};
