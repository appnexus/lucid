import React, { useState } from 'react';
import _ from 'lodash';
import { Meta, Story } from '@storybook/react';

import DropMenu, { IDropMenuProps } from './DropMenu';
import TextField from '../TextField/TextField';
import ChevronIcon from '../Icon/ChevronIcon/ChevronIcon';
import Button from '../Button/Button';

export default {
	title: 'Helpers/DropMenu',
	component: DropMenu,
	parameters: {
		docs: {
			description: {
				component: DropMenu.peek.description,
			},
		},
		layout: 'centered',
	},
	argTypes: {
		children: { control: false },
	},
} as Meta;

/* Basic */
export const Basic: Story<IDropMenuProps> = (args) => {
	const [selectedIndices, setSelectedIndices] = useState<Array<number | null>>(
		[]
	);

	const { Control, Option } = DropMenu;

	const handleSelect = (optionIndex: any) => {
		setSelectedIndices((selectedIndices) => [...selectedIndices, optionIndex]);
	};

	const options = [
		'MS-DOS',
		'Windows',
		'OS/2',
		'Windows Phone',
		'Windows Mobile',
		'Pocket PC',
	];

	return (
		<DropMenu {...args} onSelect={(i) => handleSelect(i)}>
			<Control>
				{_.isEmpty(selectedIndices)
					? 'Select OS'
					: options[_.last(selectedIndices) as any]}
			</Control>
			{_.map(options, (optionText, index) => (
				<Option key={'Option-' + index}>{optionText}</Option>
			))}
		</DropMenu>
	);
};

/* Button Menu */
export const ButtonMenu: Story<IDropMenuProps> = (args) => {
	const [selectedIndices, setSelectedIndices] = useState<Array<number | null>>(
		[]
	);

	const { Control, Option } = DropMenu;

	const options = ['Red', 'Green', 'Blue'];

	const handleSelect = (optionIndex: any) => {
		setSelectedIndices((selectedIndices) => [...selectedIndices, optionIndex]);
	};

	return (
		<DropMenu {...args} onSelect={(i) => handleSelect(i)}>
			<Control>
				<Button style={{ minWidth: '90px' }}>
					{_.isEmpty(selectedIndices)
						? 'Select Color'
						: options[_.last(selectedIndices) as any]}
				</Button>
			</Control>
			{_.map(options, (optionText, index) => (
				<Option key={'Option-' + index}>{optionText}</Option>
			))}
		</DropMenu>
	);
};

/* Disabled Control */
export const DisabledControl: Story<IDropMenuProps> = (args) => {
	const { Control, Option } = DropMenu;

	return (
		<DropMenu {...args}>
			<Control>
				<Button tabIndex={-1}>Select Color</Button>
			</Control>
			<Option>Red</Option>
			<Option>Green</Option>
			<Option>Blue</Option>
		</DropMenu>
	);
};
DisabledControl.args = {
	isDisabled: true,
};

/* Disabled Options */
export const DisabledOptions: Story<IDropMenuProps> = (args) => {
	const { Control, Option } = DropMenu;

	const [selectedIndices, setSelectedIndices] = useState<Array<number | null>>(
		[]
	);

	const options = ['Red', 'Green', 'Blue'];

	const handleSelect = (optionIndex: any) => {
		setSelectedIndices((selectedIndices) => [...selectedIndices, optionIndex]);
	};

	return (
		<DropMenu {...args} onSelect={(i) => handleSelect(i)}>
			<Control>
				{_.isEmpty(selectedIndices)
					? 'Select Color'
					: options[_.last(selectedIndices) as any]}
			</Control>
			{_.map(options, (optionText, index) => (
				<Option key={'Option-' + index} isDisabled>
					{optionText}
				</Option>
			))}
		</DropMenu>
	);
};

/* Grouped Options */
export const GroupedOptions: Story<IDropMenuProps> = (args) => {
	const { Control, Option, OptionGroup } = DropMenu;

	return (
		<DropMenu {...args}>
			<Control>
				<Button>Select Color</Button>
			</Control>

			<OptionGroup>
				<Option>Select Color</Option>
			</OptionGroup>

			<OptionGroup>
				Screen
				<Option>Red</Option>
				<Option>Green</Option>
				<Option>Blue</Option>
			</OptionGroup>

			<OptionGroup>
				Print
				<Option>Cyan</Option>
				<Option>Yellow</Option>
				<Option>Magenta</Option>
				<Option>Black</Option>
			</OptionGroup>
		</DropMenu>
	);
};

/* Text Menu */
export const TextMenu: Story<IDropMenuProps> = (args) => {
	const [selectedIndices, setSelectedIndices] = useState<Array<number | null>>(
		[]
	);

	const { Control, Option } = DropMenu;

	const options = ['Red', 'Green', 'Blue'];

	const handleSelect = (optionIndex: any) => {
		setSelectedIndices((selectedIndices) => [...selectedIndices, optionIndex]);
	};

	return (
		<DropMenu {...args} onSelect={(i) => handleSelect(i)}>
			<Control>
				{_.isEmpty(selectedIndices) ? (
					<TextField placeholder='Text DropMenu' />
				) : (
					options[_.last(selectedIndices) as any]
				)}
			</Control>
			{_.map(options, (optionText, index) => (
				<Option key={'Option-' + index}>{optionText}</Option>
			))}
		</DropMenu>
	);
};

/* Action Menu */
export const ActionMenu: Story<IDropMenuProps> = (args) => {
	const [selectedIndices, setSelectedIndices] = useState<Array<number | null>>(
		[]
	);

	const { Control, Option } = DropMenu;

	const options = ['Select Color', 'Red', 'Green', 'Blue'];

	const handleSelect = (optionIndex: any) => {
		setSelectedIndices((selectedIndices) => [...selectedIndices, optionIndex]);
	};
	return (
		<DropMenu {...args} onSelect={(i) => handleSelect(i)}>
			<Control>
				{_.isEmpty(selectedIndices)
					? 'Select Color'
					: options[_.last(selectedIndices) as any]}
				<ChevronIcon direction='down' style={{ marginLeft: '5px' }} />
			</Control>
			{_.map(options, (optionText, index) => (
				<Option key={'Option-' + index}>{optionText}</Option>
			))}
		</DropMenu>
	);
};

/* No Wrapping */
export const NoWrapping: Story<IDropMenuProps> = (args) => {
	const options = [
		'Intentionally run off screen -- Adipisicing totam saepe officia repellat quo cupiditate ducimus hic? Quod temporibus corrupti eaque ullam quo nulla corporis !',
		'Adipisicing totam provident excepturi officia non cum alias? Labore possimus adipisci id eveniet numquam tempora totam est. Explicabo recusandae quo tempore',
		'Consectetur doloribus dignissimos exercitationem vel tempora praesentium nostrum eveniet inventore. Odit inventore quas optio id eum nisi. Minima consequuntur',
	];

	const { Control, Option } = DropMenu;

	const [selectedIndices, setSelectedIndices] = useState<Array<number | null>>(
		[]
	);

	const handleSelect = (optionIndex: any) => {
		setSelectedIndices((selectedIndices) => [...selectedIndices, optionIndex]);
	};

	return (
		<div style={{ textAlign: 'right' }}>
			<DropMenu {...args} onSelect={(i) => handleSelect(i)} alignment='center'>
				<Control>
					<Button>
						{_.isEmpty(selectedIndices)
							? 'Click Me'
							: options[_.last(selectedIndices) as any]}
					</Button>
				</Control>

				{_.map(options, (optionText, index) => (
					<Option isWrapped={false} key={'Option-' + index}>
						{optionText}
					</Option>
				))}
			</DropMenu>
		</div>
	);
};

/* Stateless */
export const Stateless: Story<IDropMenuProps> = (args) => {
	const { Control, Option, OptionGroup } = DropMenu;

	return (
		<DropMenu
			{...args}
			selectedIndices={[0]}
			focusedIndex={3}
			isExpanded
			direction='down'
		>
			<Control>
				<Button>Select Color</Button>
			</Control>

			<OptionGroup>
				Preferred
				<Option>Red</Option>
				<Option>Green</Option>
				<Option>Blue</Option>
			</OptionGroup>

			<Option>Orange</Option>
			<Option isDisabled>Violet</Option>
			<Option isDisabled>Brown</Option>
		</DropMenu>
	);
};
