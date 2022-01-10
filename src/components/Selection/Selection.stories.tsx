import { set, map, get } from 'lodash';
import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';

import Selection, { ISelectionProps } from './Selection';
import Resizer from '../Resizer/Resizer';

export default {
	title: 'Communication/Selection',
	component: Selection,
	parameters: {
		docs: {
			description: {
				component: Selection.peek.description,
			},
		},
	},
} as Meta;

/* Kinds */
export const Kinds: Story<ISelectionProps> = (args) => {
	return (
		<Resizer>
			{(width) => {
				const responsiveMode = width >= 400 ? 'large' : 'small';

				return (
					<div>
						<div style={{ margin: '10px' }}>
							<Selection
								{...args}
								isRemovable={false}
								responsiveMode={responsiveMode}
								kind='container'
								Label='Container Light Not Removable'
							/>
						</div>

						<div style={{ margin: '10px' }}>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								kind='container'
								Label='Container Light'
							/>
						</div>

						<div style={{ margin: '10px' }}>
							<Selection
								{...args}
								isFilled
								isRemovable={false}
								responsiveMode={responsiveMode}
								kind='container'
								Label='Container Filled Not Removable'
							/>
						</div>

						<div style={{ margin: '10px' }}>
							<Selection
								{...args}
								isFilled
								responsiveMode={responsiveMode}
								kind='container'
								Label='Container Filled'
							/>
						</div>

						<div style={{ margin: '10px' }}>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								Label='Default'
							/>
						</div>

						<div style={{ margin: '10px' }}>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								kind='success'
								Label='Success'
							/>
						</div>

						<div style={{ margin: '10px' }}>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								kind='danger'
								Label='Danger'
							/>
						</div>

						<div style={{ margin: '10px' }}>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								kind='info'
								Label='Info'
							/>
						</div>

						<div style={{ margin: '10px' }}>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								kind='warning'
								Label='Warning'
							/>
						</div>
					</div>
				);
			}}
		</Resizer>
	);
};

/* Nested */
export const Nested: Story<ISelectionProps> = (args) => {
	return (
		<Resizer>
			{(width) => {
				const responsiveMode = width >= 400 ? 'large' : 'small';

				return (
					<div>
						<Selection
							{...args}
							isTop
							responsiveMode={responsiveMode}
							Label='Arts and Entertainment'
						>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								Label='Item 1'
							/>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								Label='Item 2'
							/>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								Label='Item 3'
							>
								<Selection
									{...args}
									responsiveMode={responsiveMode}
									Label='Item 1'
								/>
								<Selection
									{...args}
									responsiveMode={responsiveMode}
									Label='Item 2'
								/>
								<Selection
									{...args}
									responsiveMode={responsiveMode}
									Label='Item 3'
								/>
							</Selection>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								Label='Item 4'
							>
								<Selection
									{...args}
									responsiveMode={responsiveMode}
									Label='Item 1'
								/>
								<Selection
									{...args}
									responsiveMode={responsiveMode}
									Label='Item 2'
								/>
								<Selection
									{...args}
									responsiveMode={responsiveMode}
									Label='Item 3'
								/>
								<Selection
									{...args}
									responsiveMode={responsiveMode}
									Label='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
								/>
							</Selection>
						</Selection>

						<Selection
							{...args}
							isTop
							responsiveMode={responsiveMode}
							kind='info'
							Label='Arts and Entertainment'
						>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								kind='info'
								Label='Item 1'
							/>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								kind='info'
								Label='Item 2'
							/>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								kind='info'
								Label='Item 3'
							>
								<Selection
									{...args}
									responsiveMode={responsiveMode}
									kind='info'
									Label='Item 1'
								/>
								<Selection
									{...args}
									responsiveMode={responsiveMode}
									kind='info'
									Label='Item 2'
								/>
								<Selection
									{...args}
									responsiveMode={responsiveMode}
									kind='info'
									Label='Item 3'
								/>
							</Selection>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								kind='warning'
								Label='Item 4'
							>
								<Selection
									{...args}
									responsiveMode={responsiveMode}
									kind='warning'
									Label='Item 1'
								/>
								<Selection
									{...args}
									responsiveMode={responsiveMode}
									kind='warning'
									Label='Item 2'
								/>
								<Selection
									{...args}
									responsiveMode={responsiveMode}
									kind='warning'
									Label='Item 3'
								/>
								<Selection
									{...args}
									responsiveMode={responsiveMode}
									kind='warning'
									Label='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
								/>
							</Selection>
						</Selection>

						<Selection
							{...args}
							isTop
							responsiveMode={responsiveMode}
							kind='success'
							hasBackground
							isBold
							Label='Leisure'
						>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								kind='danger'
								Label='Item 1'
							/>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								kind='danger'
								Label='Item 2'
							/>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								kind='danger'
								Label='Item 3'
							/>
						</Selection>

						<Selection
							{...args}
							isTop
							responsiveMode={responsiveMode}
							kind='danger'
							hasBackground
							isBold
							Label='Arts and Entertainment'
						>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								kind='success'
								Label='Item 1'
							/>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								kind='success'
								Label='Item 2'
							/>
							<Selection
								{...args}
								responsiveMode={responsiveMode}
								kind='success'
								Label='Item 3'
							/>
						</Selection>
					</div>
				);
			}}
		</Resizer>
	);
};

/* Interactive */
export const Interactive: Story<ISelectionProps> = (args) => {
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
			],
		],
		[
			'Lord of the Rings',
			['Adrahil', 'Adrahil II', 'Araglas', 'Aragorn I', 'Aragorn II Elessar'],
		],
		[
			'Star Trek',
			[
				'Jonathan Archer',
				'Ayala',
				'Azan',
				'Bareil Antos',
				'Julian Bashir',
				'Season 6 (TNG)',
				'Lieutenant, JG (S1-3)',
			],
		],
	];

	const [removedItems, setRemovedItems] = useState<Object>({});
	const handleRemove = ({ props }) => {
		const { callbackId } = props;
		setRemovedItems({ ...set(removedItems, callbackId, true) });
	};

	return (
		<Resizer>
			{(width) => {
				const responsiveMode = width >= 400 ? 'large' : 'small';

				return (
					<div>
						{map(groups, ([group, names], groupIndex) => {
							const groupCallbackId = `${groupIndex}`;
							if (get(removedItems, groupCallbackId) === true) {
								return null;
							}
							return (
								<Selection
									{...args}
									key={groupCallbackId}
									responsiveMode={responsiveMode}
									isRemovable={true}
									isBold
									hasBackground
									kind='container'
									onRemove={handleRemove}
									callbackId={groupCallbackId}
									Label={group}
								>
									{map(names, (name, nameIndex) => {
										const nameCallbackId = `${groupIndex}.${nameIndex}`;
										if (get(removedItems, nameCallbackId) === true) {
											return null;
										}
										return (
											<Selection
												{...args}
												key={nameCallbackId}
												responsiveMode={responsiveMode}
												isRemovable={true}
												onRemove={handleRemove}
												callbackId={nameCallbackId}
												Label={name}
											/>
										);
									})}
								</Selection>
							);
						})}
					</div>
				);
			}}
		</Resizer>
	);
};
