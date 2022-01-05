import React from 'react';
import createClass from 'create-react-class';
import RadioButtonLabeled from './RadioButtonLabeled';

export default {
	title: 'Controls/RadioButtonLabeled',
	component: RadioButtonLabeled,
	parameters: {
		docs: {
			description: {
				component: (RadioButtonLabeled as any).peek.description,
			},
		},
	},
};

/* Interactive */
export const Interactive = () => {
	const style = {
		marginBottom: '3px',
	};

	const Component = createClass({
		getInitialState() {
			return {
				flavor: 'vanilla',
			};
		},

		handleSelectedChocolate() {
			this.setState({
				flavor: 'chocolate',
			});
		},

		handleSelectedCaramel() {
			this.setState({
				flavor: 'saltedCaramel',
			});
		},

		handleSelectedMint() {
			this.setState({
				flavor: 'mintChip',
			});
		},

		handleSelectedStrawberry() {
			this.setState({
				flavor: 'strawberry',
			});
		},

		handleSelectedVanilla() {
			this.setState({
				flavor: 'vanilla',
			});
		},

		render() {
			return (
				<section>
					<span
						style={{
							display: 'inline-flex',
							flexDirection: 'column',
							alignItems: 'flex-start',
						}}
					>
						<RadioButtonLabeled
							isSelected={this.state.flavor === 'vanilla'}
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedVanilla}
							style={style}
						>
							<RadioButtonLabeled.Label>Vanilla</RadioButtonLabeled.Label>
						</RadioButtonLabeled>
						<RadioButtonLabeled
							isSelected={this.state.flavor === 'chocolate'}
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedChocolate}
							style={style}
						>
							<RadioButtonLabeled.Label>Chocolate</RadioButtonLabeled.Label>
						</RadioButtonLabeled>
						<RadioButtonLabeled
							isSelected={this.state.flavor === 'strawberry'}
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedStrawberry}
							style={style}
						>
							<RadioButtonLabeled.Label>Strawberry</RadioButtonLabeled.Label>
						</RadioButtonLabeled>
						<RadioButtonLabeled
							isSelected={this.state.flavor === 'saltedCaramel'}
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedCaramel}
							style={style}
						>
							<RadioButtonLabeled.Label>
								Salted caramel
							</RadioButtonLabeled.Label>
						</RadioButtonLabeled>
						<RadioButtonLabeled
							isSelected={this.state.flavor === 'mintChip'}
							name='interactive-radio-buttons'
							onSelect={this.handleSelectedMint}
							style={style}
						>
							<RadioButtonLabeled.Label>
								Mint choc chip (the best)
							</RadioButtonLabeled.Label>
						</RadioButtonLabeled>
					</span>
				</section>
			);
		},
	});

	return <Component />;
};
Interactive.storyName = 'Interactive';

/* States */
export const States = () => {
	const style = {
		marginBottom: '3px',
		marginRight: '13px',
	};

	const Component = createClass({
		render() {
			return (
				<section>
					<RadioButtonLabeled style={style}>
						<RadioButtonLabeled.Label>(default props)</RadioButtonLabeled.Label>
					</RadioButtonLabeled>

					<section style={{ display: 'flex' }}>
						<RadioButtonLabeled isDisabled={true} style={style}>
							<RadioButtonLabeled.Label>Disabled</RadioButtonLabeled.Label>
						</RadioButtonLabeled>
						<RadioButtonLabeled isSelected={true} style={style}>
							<RadioButtonLabeled.Label>Selected</RadioButtonLabeled.Label>
						</RadioButtonLabeled>
						<RadioButtonLabeled
							isDisabled={true}
							isSelected={true}
							style={style}
						>
							<RadioButtonLabeled.Label>
								Disabled & selected
							</RadioButtonLabeled.Label>
						</RadioButtonLabeled>
					</section>
				</section>
			);
		},
	});

	return <Component />;
};
States.storyName = 'States';

/* Label As Child */
export const LabelAsChild = () => {
	const style = {
		marginBottom: '3px',
	};

	const Component = createClass({
		render() {
			return (
				<section>
					<section>
						<RadioButtonLabeled style={style}>
							<RadioButtonLabeled.Label>Just text</RadioButtonLabeled.Label>
						</RadioButtonLabeled>
						<RadioButtonLabeled style={style}>
							<RadioButtonLabeled.Label>
								<span>HTML element</span>
							</RadioButtonLabeled.Label>
						</RadioButtonLabeled>
					</section>
				</section>
			);
		},
	});

	return <Component />;
};
LabelAsChild.storyName = 'LabelAsChild';

/* Label As Prop */
export const LabelAsProp = () => {
	const style = {
		marginBottom: '3px',
	};

	const Component = createClass({
		render() {
			return (
				<section>
					<section>
						<RadioButtonLabeled Label='Just text' style={style} />
						<RadioButtonLabeled
							Label={<span>HTML element</span>}
							style={style}
						/>
						<RadioButtonLabeled
							Label={
								[
									'Text in an array',
									'Only the first value in the array is used',
									'The rest of these should be ignored',
								] as any
							}
							style={style}
						/>
						<RadioButtonLabeled
							Label={
								[
									<span key='1'>HTML element in an array</span>,
									<span key='2'>
										Again only the first value in the array is used
									</span>,
									<span key='3'>The rest should not be rendered</span>,
								] as any
							}
							style={style}
						/>
					</section>
				</section>
			);
		},
	});

	return <Component />;
};
LabelAsProp.storyName = 'LabelAsProp';
