import React from 'react';
import createClass from 'create-react-class';
import _ from 'lodash';
import Tag from '../Tag/Tag';

export default {
	title: 'Communication/Tag',
	component: Tag,
	parameters: {
		docs: {
			description: {
				component: (Tag as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<div>
						<Tag>Amet</Tag>
						<Tag>nam</Tag>
						<Tag>quibusdam</Tag>
						<Tag isRemovable>nobis</Tag>
						<Tag isRemovable>autem</Tag>
						<Tag isRemovable>sapiente</Tag>
					</div>

					<div>
						<Tag>
							Fruits
							<Tag>Apples</Tag>
							<Tag>Oranges</Tag>
							<Tag>Bananas</Tag>
						</Tag>
						<Tag isRemovable>
							Vegetables
							<Tag isRemovable>Carrots</Tag>
							<Tag isRemovable>Spinach</Tag>
							<Tag isRemovable>Celery</Tag>
						</Tag>
					</div>
				</div>
			);
		},
	});

	return <Component />;
};
Default.storyName = 'Default';

/* Nested */
export const Nested = () => {
	const words = [
		'Fashion',
		'The',
		'Vexillologist',
		'Cold Brew',
		'This is a longer sentence that should be handled okay',
	];

	const Component = createClass({
		render() {
			return (
				<div>
					<Tag>
						Grouped items
						{_.times(8, (n) => (
							<Tag key={n}>{words[n % words.length]}</Tag>
						))}
					</Tag>

					<Tag isRemovable>
						Grouped items
						{_.times(10, (n) => (
							<Tag isRemovable key={n}>
								{words[n % words.length]}
							</Tag>
						))}
					</Tag>
				</div>
			);
		},
	});

	// begin-hide-from-docs
	const notes = `
Use a parent tag to group child tags into categories. This example also shows you how to dynamically generate a list of tags.
`;
	// end-hide-from-docs

	return <Component />;
};
Nested.storyName = 'Nested';

/* Double Nested */
export const DoubleNested = () => {
	const words = [
		'Fashion',
		'The',
		'Vexillologist',
		'Cold Brew',
		'This is a longer sentence that should be handled okay but what if it is even longer than you could ever think imaginable',
	];

	const Component = createClass({
		render() {
			return (
				<div>
					<Tag isTop>
						Global:
						<Tag>
							Group 1
							{_.times(4, (n) => (
								<Tag key={n}>{words[n % words.length]}</Tag>
							))}
						</Tag>
						<Tag>
							Group 2
							{_.times(4, (n) => (
								<Tag key={n}>{words[n % words.length]}</Tag>
							))}
						</Tag>
					</Tag>

					<Tag isTop>
						In-Progess:
						<Tag>
							Group 1
							{_.times(4, (n) => (
								<Tag key={n}>{words[n % words.length]}</Tag>
							))}
						</Tag>
						<Tag>
							Group 2
							{_.times(4, (n) => (
								<Tag key={n}>{words[n % words.length]}</Tag>
							))}
						</Tag>
					</Tag>
				</div>
			);
		},
	});

	// begin-hide-from-docs
	const notes = `
This allows you to add a third level of hierarchy to your tag categorization.
`;
	// end-hide-from-docs

	return <Component />;
};
DoubleNested.storyName = 'DoubleNested';

/* Interactive */
export const Interactive = () => {
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

	const Component = createClass({
		getInitialState() {
			return {
				removedItems: {},
			};
		},

		handleRemove({ props: { callbackId } }: any) {
			this.setState({
				removedItems: _.set(this.state.removedItems, callbackId, true),
			});
		},

		render() {
			const { removedItems } = this.state;

			return (
				<div>
					{_.map(groups, ([group, names], groupIndex) => {
						const groupCallbackId = `${groupIndex}`;

						if (_.get(removedItems, groupCallbackId) === true) {
							return null;
						}

						return (
							<Tag
								key={groupCallbackId}
								isRemovable={true}
								onRemove={this.handleRemove}
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
											key={nameCallbackId}
											isRemovable={true}
											onRemove={this.handleRemove}
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
		},
	});

	// begin-hide-from-docs
	const notes = `
Use interactive tags to allow users to remove a selection.
`;
	// end-hide-from-docs

	return <Component />;
};
Interactive.storyName = 'Interactive';

/* Colors */
export const Colors = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<Tag>
						<Tag kind={'info'}>notitia</Tag>
						<Tag kind={'danger'}>periculum</Tag>
						<Tag kind={'default'}>deficio</Tag>
					</Tag>
					<Tag>
						<Tag isRemovable kind={'info'}>
							notitia
						</Tag>
						<Tag isRemovable kind={'danger'}>
							periculum
						</Tag>
					</Tag>
				</div>
			);
		},
	});

	// begin-hide-from-docs
	const notes = `
Tags are available in two additional colors:

- \`kind='danger'\` for settings that can not be saved, for example custom dates outside of the flight range.
- \`kind='default\` for disabled items, for example past flights. This color can not be used for \`isRemovable\` tags.
`;
	// end-hide-from-docs

	return <Component />;
};
Colors.storyName = 'Colors';
