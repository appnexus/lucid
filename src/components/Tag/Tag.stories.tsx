import React, { useState } from 'react';
import createClass from 'create-react-class';
import _ from 'lodash';
import { Meta, Story } from '@storybook/react';

import Tag, { ITagProps } from '../Tag/Tag';

export default {
	title: 'Communication/Tag',
	component: Tag,
	args: Tag.defaultProps,
	parameters: {
		docs: {
			description: {
				component: Tag.peek.description,
			},
		},
	},
} as Meta;

export const Basic: Story<ITagProps> = (args) => {
	return (
		<div>
			<div>
				<Tag {...args}>Amet</Tag>
				<Tag {...args}>nam</Tag>
				<Tag {...args}>quibusdam</Tag>
				<Tag {...args} isRemovable>
					nobis
				</Tag>
				<Tag {...args} isRemovable>
					autem
				</Tag>
				<Tag {...args} isRemovable>
					sapiente
				</Tag>
			</div>

			<div>
				<Tag {...args}>
					Fruits
					<Tag {...args}>Apples</Tag>
					<Tag {...args}>Oranges</Tag>
					<Tag {...args}>Bananas</Tag>
				</Tag>
				<Tag {...args} isRemovable>
					Vegetables
					<Tag {...args} isRemovable>
						Carrots
					</Tag>
					<Tag {...args} isRemovable>
						Spinach
					</Tag>
					<Tag {...args} isRemovable>
						Celery
					</Tag>
				</Tag>
			</div>
		</div>
	);
};

export const Nested: Story<ITagProps> = (args) => {
	const words = [
		'Fashion',
		'The',
		'Vexillologist',
		'Cold Brew',
		'This is a longer sentence that should be handled okay',
	];

	return (
		<div>
			<Tag {...args}>
				Grouped items
				{_.times(8, (n) => (
					<Tag key={n}>{words[n % words.length]}</Tag>
				))}
			</Tag>

			<Tag {...args} isRemovable>
				Grouped items
				{_.times(10, (n) => (
					<Tag {...args} isRemovable key={n}>
						{words[n % words.length]}
					</Tag>
				))}
			</Tag>
		</div>
	);
};
Nested.parameters = {
	docs: {
		description: {
			story: `Use a parent \`tag\` to group child \`tags\` into categories. This example also shows you how to dynamically generate a list of \`tags\`.`,
		},
	},
};

export const DoubleNested: Story<ITagProps> = (args) => {
	const words = [
		'Fashion',
		'The',
		'Vexillologist',
		'Cold Brew',
		'This is a longer sentence that should be handled okay but what if it is even longer than you could ever think imaginable',
	];

	return (
		<div>
			<Tag {...args} isTop>
				Global:
				<Tag {...args}>
					Group 1
					{_.times(4, (n) => (
						<Tag {...args} key={n}>
							{words[n % words.length]}
						</Tag>
					))}
				</Tag>
				<Tag {...args}>
					Group 2
					{_.times(4, (n) => (
						<Tag {...args} key={n}>
							{words[n % words.length]}
						</Tag>
					))}
				</Tag>
			</Tag>

			<Tag {...args} isTop>
				In-Progess:
				<Tag {...args}>
					Group 1
					{_.times(4, (n) => (
						<Tag {...args} key={n}>
							{words[n % words.length]}
						</Tag>
					))}
				</Tag>
				<Tag {...args}>
					Group 2
					{_.times(4, (n) => (
						<Tag {...args} key={n}>
							{words[n % words.length]}
						</Tag>
					))}
				</Tag>
			</Tag>
		</div>
	);
};
DoubleNested.parameters = {
	docs: {
		description: {
			story: `Double nesting allows you to add a third level of hierarchy to your \`tag\` categorization.`,
		},
	},
};

export const Interactive: Story<ITagProps> = (args) => {
	const groups = [
		['Last Man on Earth', ['Phil']],
		['Last Woman on Earth', ['Carol']],
		[
			'Star Wars',
			[
				'Ask Aak',
				'Admiral Gial Ackbar',
				'Acros-Krik',
				'Ak-Rev',
				'Stass Allie',
				'Almec',
				'Mas Amedda',
				'Amee',
				'Padmé Amidala',
				'Cassian Andor',
				'Bail Antilles',
				'Raymus Antilles',
				'Wedge Antilles',
				'Queen Apailana',
				'Commander Appo',
				'Passel Argente',
				'Faro Argyus',
				'Seti Ashgad',
				'AZI-3',
			],
		],
		[
			'Lord of the Rings',
			[
				'Adrahil',
				'Adrahil II',
				'Aegnor',
				'Aerandir',
				'Aghan',
				'Aglahad',
				'Ailinel',
				'Alatar',
				'Aldamir',
				'Aldor',
				'Almarian',
				'Almiel',
				'Amandil',
				'Amdír',
				'Amlaith',
				'Amrod',
				'Amroth',
				'Anardil',
				'Anborn',
				'Ancalagon The Black',
				'Andróg',
				'Angbor',
				'Angelimar',
				'Angelimir',
				'Angrod',
				'Anárion',
				'Ar-Adûnakhôr',
				'Ar-Gimilzôr',
				'Ar-Pharazôn',
				'Ar-Sakalthôr',
				'Ar-Zimrathôn',
				'Arador',
				'Araglas',
				'Aragorn I',
				'Aragorn II Elessar',
			],
		],
		[
			'Star Trek',
			[
				'Jonathan Archer',
				'Ayala',
				'Azan',
				'Reginald Barclay',
				'Lieutenant, JG (TNG,FCT)',
				'Engineering Officer (TNG,Movies)',
				'Bareil Antos',
				'Julian Bashir',
				'Season 6 (TNG)',
				'Lieutenant, JG (S1-3)',
			],
		],
	];

	const [removedItems, setRemovedItems] = useState<object>({});

	const handleRemove = ({ props: { callbackId } }: any) => {
		const newRemovedItems = _.set(removedItems, callbackId, true);
		setRemovedItems({ ...newRemovedItems });
	};

	return (
		<div>
			{_.map(groups, ([group, names], groupIndex) => {
				const groupCallbackId = `${groupIndex}`;
				if (_.get(removedItems, groupCallbackId) === true) {
					return null;
				}

				return (
					<Tag
						{...args}
						key={groupCallbackId}
						isRemovable={true}
						onRemove={handleRemove}
						callbackId={groupCallbackId}
					>
						{group}
						{_.map(names, (name, nameIndex) => {
							const nameCallbackId = `${groupIndex}.${nameIndex}`;

							if (_.get(removedItems, nameCallbackId) === true) {
								return null;
							}

							return (
								<Tag
									{...args}
									key={nameCallbackId}
									isRemovable={true}
									onRemove={handleRemove}
									callbackId={nameCallbackId}
								>
									{name}
								</Tag>
							);
						})}
					</Tag>
				);
			})}
		</div>
	);
};
Interactive.parameters = {
	docs: {
		description: {
			story: `Use interactive \`tags\` to allow users to remove a selection.`,
		},
	},
};

export const Colors: Story<ITagProps> = (args) => {
	return (
		<div>
			<Tag {...args}>
				<Tag {...args} kind={'info'}>
					notitia
				</Tag>
				<Tag {...args} kind={'danger'}>
					periculum
				</Tag>
				<Tag {...args} kind={'default'}>
					deficio
				</Tag>
			</Tag>
			<Tag {...args}>
				<Tag {...args} isRemovable kind={'info'}>
					notitia
				</Tag>
				<Tag {...args} isRemovable kind={'danger'}>
					periculum
				</Tag>
			</Tag>
		</div>
	);
};
Colors.parameters = {
	docs: {
		description: {
			story: `\`Tag\` is available in two additional colors: \`kind='danger'\` for settings that can not be saved (for example, custom dates outside of the flight range), and \`kind='default'\` for disabled items (for example, past flights). The \`'default'\` color cannot be used for the \`isRemovable\` \`tag\`.`,
		},
	},
};
