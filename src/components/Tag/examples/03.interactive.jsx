import React from 'react';
import createClass from 'create-react-class';
import { Tag } from '../../../index';
import _ from 'lodash';

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

export default createClass({
	getInitialState() {
		return {
			removedItems: {},
		};
	},

	handleRemove({ props: { callbackId } }) {
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
