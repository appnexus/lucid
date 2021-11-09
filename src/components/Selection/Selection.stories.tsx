import React from 'react';
import createClass from 'create-react-class';
import { Selection, Resizer } from './../../index';
import _ from 'lodash';

export default {
	title: 'Communication/Selection',
	component: Selection,
	parameters: {
		docs: {
			description: {
				component: (Selection as any).peek.description,
			},
		},
	},
};

/* Kinds */
export const Kinds = () => {
	const Component = createClass({
		render() {
			return (
				<Resizer>
					{(width) => {
						const responsiveMode = width >= 400 ? 'large' : 'small';

						return (
							<div>
								<div style={{ margin: '10px' }}>
									<Selection
										isRemovable={false}
										responsiveMode={responsiveMode}
										kind='container'
										Label='Container Light Not Removable'
									/>
								</div>

								<div style={{ margin: '10px' }}>
									<Selection
										responsiveMode={responsiveMode}
										kind='container'
										Label='Container Light'
									/>
								</div>

								<div style={{ margin: '10px' }}>
									<Selection
										isFilled
										isRemovable={false}
										responsiveMode={responsiveMode}
										kind='container'
										Label='Container Filled Not Removable'
									/>
								</div>

								<div style={{ margin: '10px' }}>
									<Selection
										isFilled
										responsiveMode={responsiveMode}
										kind='container'
										Label='Container Filled'
									/>
								</div>

								<div style={{ margin: '10px' }}>
									<Selection responsiveMode={responsiveMode} Label='Default' />
								</div>

								<div style={{ margin: '10px' }}>
									<Selection
										responsiveMode={responsiveMode}
										kind='success'
										Label='Success'
									/>
								</div>

								<div style={{ margin: '10px' }}>
									<Selection
										responsiveMode={responsiveMode}
										kind='danger'
										Label='Danger'
									/>
								</div>

								<div style={{ margin: '10px' }}>
									<Selection
										responsiveMode={responsiveMode}
										kind='info'
										Label='Info'
									/>
								</div>

								<div style={{ margin: '10px' }}>
									<Selection
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
		},
	});

	return <Component />;
};
Kinds.storyName = 'Kinds';

/* Nested */
export const Nested = () => {
	const Component = createClass({
		render() {
			return (
				<Resizer>
					{(width) => {
						const responsiveMode = width >= 400 ? 'large' : 'small';

						return (
							<div>
								<Selection
									isTop
									responsiveMode={responsiveMode}
									Label='Arts & Entertainment'
								>
									<Selection responsiveMode={responsiveMode} Label='Item 1' />
									<Selection responsiveMode={responsiveMode} Label='Item 2' />
									<Selection responsiveMode={responsiveMode} Label='Item 3'>
										<Selection responsiveMode={responsiveMode} Label='Item 1' />
										<Selection responsiveMode={responsiveMode} Label='Item 2' />
										<Selection responsiveMode={responsiveMode} Label='Item 3' />
									</Selection>
									<Selection responsiveMode={responsiveMode} Label='Item 4'>
										<Selection responsiveMode={responsiveMode} Label='Item 1' />
										<Selection responsiveMode={responsiveMode} Label='Item 2' />
										<Selection responsiveMode={responsiveMode} Label='Item 3' />
										<Selection
											responsiveMode={responsiveMode}
											Label='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
										/>
									</Selection>
								</Selection>

								<Selection
									isTop
									responsiveMode={responsiveMode}
									kind='info'
									Label='Arts & Entertainment'
								>
									<Selection
										responsiveMode={responsiveMode}
										kind='info'
										Label='Item 1'
									/>
									<Selection
										responsiveMode={responsiveMode}
										kind='info'
										Label='Item 2'
									/>
									<Selection
										responsiveMode={responsiveMode}
										kind='info'
										Label='Item 3'
									>
										<Selection
											responsiveMode={responsiveMode}
											kind='info'
											Label='Item 1'
										/>
										<Selection
											responsiveMode={responsiveMode}
											kind='info'
											Label='Item 2'
										/>
										<Selection
											responsiveMode={responsiveMode}
											kind='info'
											Label='Item 3'
										/>
									</Selection>
									<Selection
										responsiveMode={responsiveMode}
										kind='warning'
										Label='Item 4'
									>
										<Selection
											responsiveMode={responsiveMode}
											kind='warning'
											Label='Item 1'
										/>
										<Selection
											responsiveMode={responsiveMode}
											kind='warning'
											Label='Item 2'
										/>
										<Selection
											responsiveMode={responsiveMode}
											kind='warning'
											Label='Item 3'
										/>
										<Selection
											responsiveMode={responsiveMode}
											kind='warning'
											Label='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
										/>
									</Selection>
								</Selection>

								<Selection
									isTop
									responsiveMode={responsiveMode}
									kind='success'
									hasBackground
									isBold
									Label='Leisure'
								>
									<Selection
										responsiveMode={responsiveMode}
										kind='danger'
										Label='Item 1'
									/>
									<Selection
										responsiveMode={responsiveMode}
										kind='danger'
										Label='Item 2'
									/>
									<Selection
										responsiveMode={responsiveMode}
										kind='danger'
										Label='Item 3'
									/>
								</Selection>

								<Selection
									isTop
									responsiveMode={responsiveMode}
									kind='danger'
									hasBackground
									isBold
									Label='Arts & Entertainment'
								>
									<Selection
										responsiveMode={responsiveMode}
										kind='success'
										Label='Item 1'
									/>
									<Selection
										responsiveMode={responsiveMode}
										kind='success'
										Label='Item 2'
									/>
									<Selection
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
		},
	});

	return <Component />;
};
Nested.storyName = 'Nested';

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

	const Component = createClass({
		getInitialState() {
			return {
				removedItems: {},
			};
		},

		handleRemove({ props: { callbackId } }: { props: { callbackId: string } }) {
			this.setState({
				removedItems: _.set(this.state.removedItems, callbackId, true),
			});
		},

		render() {
			const { removedItems } = this.state;

			return (
				<Resizer>
					{(width) => {
						const responsiveMode = width >= 400 ? 'large' : 'small';

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
											kind='container'
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

	return <Component />;
};
Interactive.storyName = 'Interactive';
