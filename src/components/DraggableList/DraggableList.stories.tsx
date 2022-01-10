import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import DraggableList, { IDraggableListProps } from './DraggableList';
import CheckboxLabeled from '../CheckboxLabeled/CheckboxLabeled';

export default {
	title: 'Controls/DraggableList',
	component: DraggableList,
	parameters: {
		docs: {
			description: {
				component: DraggableList.peek.description,
			},
		},
	},
} as Meta;

/* Basic */
export const Basic: Story<IDraggableListProps> = (args) => {
	const [items, setItems] = useState([
		'Item One',
		'Item Two',
		'Item Three',
		'Item Four',
		'Item Five',
	]);

	const handleDrop = ({
		oldIndex,
		newIndex,
	}: {
		oldIndex: number;
		newIndex: number;
	}) => {
		const updatedItems = items.filter(
			(column: string, index: number) => index !== oldIndex
		);
		updatedItems.splice(newIndex, 0, items[oldIndex]);
		console.info(updatedItems);
		setItems(updatedItems);
	};

	return (
		<DraggableList {...args} onDrop={handleDrop}>
			{items.map((text: string) => (
				<DraggableList.Item key={text}>{text}</DraggableList.Item>
			))}
		</DraggableList>
	);
};

/* No Drag Handle */
export const NoDragHandle: Story<IDraggableListProps> = (args) => {
	const [items, setItems] = useState([
		'Item One',
		'Item Two',
		'Item Three',
		'Item Four',
		'Item Five',
	]);

	const handleDrop = ({
		oldIndex,
		newIndex,
	}: {
		oldIndex: number;
		newIndex: number;
	}) => {
		const updatedItems = items.filter(
			(column: string, index: number) => index !== oldIndex
		);
		updatedItems.splice(newIndex, 0, items[oldIndex]);
		setItems(updatedItems);
	};

	return (
		<DraggableList {...args} onDrop={handleDrop} hasDragHandle={false}>
			{items.map((text: string) => (
				<DraggableList.Item key={text}>{text}</DraggableList.Item>
			))}
		</DraggableList>
	);
};

/* With Children */
export const WithChildren: Story<IDraggableListProps> = (args) => {
	const [items, setItems] = useState([
		'Item One',
		'Item Two',
		'Item Three',
		'Item Four',
		'Item Five',
	]);

	const handleDrop = ({
		oldIndex,
		newIndex,
	}: {
		oldIndex: number;
		newIndex: number;
	}) => {
		const updatedItems = items.filter(
			(column: string, index: number) => index !== oldIndex
		);
		updatedItems.splice(newIndex, 0, items[oldIndex]);
		setItems(updatedItems);
	};

	return (
		<DraggableList {...args} onDrop={handleDrop} style={{ width: 500 }}>
			{items.map((text: string) => (
				<DraggableList.Item key={text}>
					<div style={{ display: 'flex', alignItems: 'center', height: 50 }}>
						<CheckboxLabeled Label={text} />
					</div>
				</DraggableList.Item>
			))}
		</DraggableList>
	);
};
