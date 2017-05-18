import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { Selection, Resizer } from '../../../index';

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
			<Resizer>
				{width => {
					const responsiveMode = width >= 768 ? 'large' : 'small';

					return (
						<div>
							{_.map(groups, ([group, names], groupIndex) => {
								const groupCallbackId = `${groupIndex}`;
								if (_.get(removedItems, groupCallbackId) === true) {
									return null;
								}
								return (
									<Selection
										responsiveMode={responsiveMode}
										key={groupCallbackId}
										isRemovable={true}
										isBold
										hasBackground
										kind="container"
										onRemove={this.handleRemove}
										callbackId={groupCallbackId}
										Label={group}
									>
										{_.map(names, (name, nameIndex) => {
											const nameCallbackId = `${groupIndex}.${nameIndex}`;
											if (_.get(removedItems, nameCallbackId) === true) {
												return null;
											}
											return (
												<Selection
													responsiveMode={responsiveMode}
													key={nameCallbackId}
													isRemovable={true}
													onRemove={this.handleRemove}
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
	},
});
