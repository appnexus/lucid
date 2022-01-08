import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import IconSelect from './IconSelect';
import ClockIcon from '../Icon/ClockIcon/ClockIcon';
import StopwatchIcon from '../Icon/StopwatchIcon/StopwatchIcon';
import SwitchLabeled from '../SwitchLabeled/SwitchLabeled';

//👇 Provide Storybook with the component name, 'section', any subcomponents and a description
export default {
	title: 'Controls/IconSelect',
	component: IconSelect,
	parameters: {
		docs: {
			description: {
				component: IconSelect.peek.description,
			},
		},
	},
} as Meta;

//👇 Create a “template” of how args map to rendering
const Template: any = (args) => {
	const [selectedIcon, setSelectedIcon] = useState<string>('item2');

	const handleSelect = (id: string) => {
		// when selected, set `selectedIcon`
		setSelectedIcon(id);
	};

	return (
		<section>
			<IconSelect
				{...args}
				onSelect={handleSelect}
				items={
					[
						{
							id: 'item1',
							icon: <ClockIcon />,
							isSelected: selectedIcon === 'item1',
							label: 'Foo Bar',
						},
						{
							id: 'item2',
							icon: <StopwatchIcon />,
							isSelected: selectedIcon === 'item2',
							label: 'Bax Tar',
						},
					] as any
				}
			/>
		</section>
	);
};

//👇 Each story then reuses that template

/** Default: Select One Icon */
export const Default = Template.bind({});
Default.args = {
	kind: 'single', // renders as radio buttons
};

/** Select Multiple Icons */
export const SelectMultipleIcons = (args) => {
	const [selectedIcons, setSelectedIcons] = useState<string[]>(['item2']);

	const isSelected = (id: string) => {
		return selectedIcons.includes(id);
	};

	const handleSelect = (selectedId: string) => {
		if (isSelected(selectedId)) {
			// if selected, then remove from list
			setSelectedIcons(selectedIcons.filter((id: any) => id !== selectedId));
		} else {
			// add it to the list
			setSelectedIcons([...selectedIcons, selectedId]);
		}
	};

	return (
		<section>
			<IconSelect
				{...args}
				onSelect={handleSelect}
				items={
					[
						{
							id: 'item1',
							icon: <ClockIcon />,
							isSelected: isSelected('item1'),
							label: 'Foo Bar',
						},
						{
							id: 'item2',
							icon: <StopwatchIcon />,
							isSelected: isSelected('item2'),
							label: 'Bax Tar',
						},
					] as any
				}
			/>
		</section>
	);
};
SelectMultipleIcons.args = {
	kind: 'multiple', // default value, renders as checkboxes
};

/** Partially Select Icons */
export const PartiallySelectIcons = (args) => {
	const [selectedIcons, setSelectedIcons] = useState<any>([
		{ id: 'item2', isPartial: true },
	]);

	const isSelected = (id: any) => {
		//return false;
		return selectedIcons.some(({ id: selectedId }: any) => id === selectedId);
	};

	const isPartiallySelected = (id: any) => {
		//return false;
		return selectedIcons.some(
			({ id: selectedId, isPartial }: any) => id === selectedId && isPartial
		);
	};

	const handleSelect = (selectedId: any) => {
		//const icons = selectedIcons;

		if (isPartiallySelected(selectedId)) {
			// if partially selected, remove from the list
			setSelectedIcons(
				selectedIcons.filter(({ id }: any) => id !== selectedId)
			);
		} else if (isSelected(selectedId)) {
			// if already selected, ensure isPartial is true
			setSelectedIcons(
				selectedIcons.map(({ id, isPartial }: any) => ({
					id,
					isPartial: isPartial || id === selectedId,
				}))
			);
		} else {
			// add selected icon to list
			setSelectedIcons([
				...selectedIcons,
				{ id: selectedId, isPartial: false },
			]);
		}
	};

	return (
		<section>
			<IconSelect
				{...args}
				onSelect={handleSelect}
				items={[
					{
						id: 'item1',
						icon: <ClockIcon />,
						isSelected: isSelected('item1'),
						isPartial: isPartiallySelected('item1'),
						label: 'Foo Bar',
					},
					{
						id: 'item2',
						icon: <StopwatchIcon />,
						isSelected: isSelected('item2'),
						isPartial: isPartiallySelected('item2'),
						label: 'Bax Tar',
					},
				]}
			/>
		</section>
	);
};

/** Disabled Icon Select */
export const DisabledIconSelect = (args) => {
	const [selectedIcons, setSelectedIcons] = useState<string[]>(['item2']);
	const [isDisabled, setIsDisabled] = useState<boolean>(true);

	const isSelected = (id: any) => {
		return selectedIcons.includes(id);
	};

	const handleSelect = (selectedId: any) => {
		if (isSelected(selectedId)) {
			// if selected, then remove from the list
			setSelectedIcons(selectedIcons.filter((id: any) => id !== selectedId));
		} else {
			// add it to the list
			setSelectedIcons([...selectedIcons, selectedId]);
		}
	};

	const handleToggleDisabled = () => {
		setIsDisabled(!isDisabled);
	};

	return (
		<section>
			<SwitchLabeled
				Label={`IconSelect ${isDisabled ? 'Disabled' : 'Enabled'}`}
				isSelected={!isDisabled}
				onSelect={handleToggleDisabled}
			/>

			<IconSelect
				{...args}
				isDisabled={isDisabled}
				onSelect={handleSelect}
				items={
					[
						{
							id: 'item1',
							icon: <ClockIcon />,
							isSelected: isSelected('item1'),
							label: 'Always Disabled',
							isDisabled: true,
						},
						{
							id: 'item2',
							icon: <StopwatchIcon />,
							isSelected: isSelected('item2'),
							label: 'Bax Tar',
						},
					] as any
				}
			/>
		</section>
	);
};
