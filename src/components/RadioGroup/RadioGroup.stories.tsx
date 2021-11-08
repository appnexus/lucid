import React from 'react';
import createClass from 'create-react-class';
import { RadioGroup, RadioButtonLabeled, SingleSelect } from './../../index';

export default {
	title: 'Controls/Toggles/RadioGroup',
	component: RadioGroup,
	parameters: {
		docs: {
			description: {
				component: (RadioGroup as any).peek.description,
			},
		},
	},
};

/* Stateful */
export const Stateful = () => {
	const style = {
		marginRight: '13px',
	};

	const Component = createClass({
		render() {
			return (
				<RadioGroup>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>Alvin</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>Simon</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>Theodore</RadioGroup.Label>
					</RadioGroup.RadioButton>
				</RadioGroup>
			);
		},
	});

	return <Component />;
};
Stateful.storyName = 'Stateful';

/* Is Disabled */
export const IsDisabled = () => {
	const style = {
		marginRight: '13px',
	};

	const Component = createClass({
		render() {
			return (
				<RadioGroup isDisabled={true}>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>Superman</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>Batman</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>Wonder Woman</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>Aquaman</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>Robin</RadioGroup.Label>
					</RadioGroup.RadioButton>
				</RadioGroup>
			);
		},
	});

	return <Component />;
};
IsDisabled.storyName = 'IsDisabled';

/* Nested Select */
export const NestedSelect = () => {
	const style = {
		marginRight: '15px',
	};

	const subSelection = {
		display: 'block',
		marginTop: '13px',
	};

	const Component = createClass({
		getInitialState() {
			return {
				height: null,
			};
		},

		handleSelectedTallSimon() {
			this.setState({
				height: 'Tall Simon',
			});
		},

		handleSelectedShortSimon() {
			this.setState({
				height: 'Short Simon',
			});
		},

		render() {
			return (
				<RadioGroup>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>Alvin</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>
							Simon
							<RadioButtonLabeled
								isSelected={this.state.height === 'Tall Simon'}
								onSelect={this.handleSelectedTallSimon}
							>
								<RadioButtonLabeled.Label>Tall Simon</RadioButtonLabeled.Label>
							</RadioButtonLabeled>
							<RadioButtonLabeled
								isSelected={this.state.height === 'Short Simon'}
								onSelect={this.handleSelectedShortSimon}
							>
								<RadioButtonLabeled.Label>Short Simon</RadioButtonLabeled.Label>
							</RadioButtonLabeled>
						</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>
							Theodore
							<SingleSelect style={subSelection}>
								<SingleSelect.Option>Tall Theo</SingleSelect.Option>
								<SingleSelect.Option>Short Theo</SingleSelect.Option>
								<SingleSelect.Option>Average height Theo</SingleSelect.Option>
							</SingleSelect>
						</RadioGroup.Label>
					</RadioGroup.RadioButton>
				</RadioGroup>
			);
		},
	});

	// begin-hide-from-docs
	const notes = `
You can nest items in the \`RadioGroup\` for sub-selections. Please work with a designer to style and define states for sub-selections.
`;
	// end-hide-from-docs

	return <Component />;
};
NestedSelect.storyName = 'NestedSelect';

/* Selected Index As Prop */
export const SelectedIndexAsProp = () => {
	const style = {
		marginRight: '13px',
	};

	const Component = createClass({
		render() {
			return (
				<section>
					<RadioGroup
						name='name'
						selectedIndex={3}
						style={{
							display: 'inline-flex',
							flexDirection: 'column',
						}}
					>
						<RadioGroup.RadioButton style={style}>
							<RadioGroup.Label>Captain America</RadioGroup.Label>
						</RadioGroup.RadioButton>
						<RadioGroup.RadioButton style={style}>
							<RadioGroup.Label>Iron Man</RadioGroup.Label>
						</RadioGroup.RadioButton>
						<RadioGroup.RadioButton style={style}>
							<RadioGroup.Label>Thor</RadioGroup.Label>
						</RadioGroup.RadioButton>
						<RadioGroup.RadioButton style={style}>
							<RadioGroup.Label>Hulk</RadioGroup.Label>
						</RadioGroup.RadioButton>
						<RadioGroup.RadioButton style={style}>
							<RadioGroup.Label>Black Widow</RadioGroup.Label>
						</RadioGroup.RadioButton>
						<RadioGroup.RadioButton style={style}>
							<RadioGroup.Label>Hawkeye</RadioGroup.Label>
						</RadioGroup.RadioButton>
					</RadioGroup>
				</section>
			);
		},
	});

	return <Component />;
};
SelectedIndexAsProp.storyName = 'SelectedIndexAsProp';

/* Selected Index From Child */
export const SelectedIndexFromChild = () => {
	const style = {
		marginRight: '13px',
	};

	const Component = createClass({
		render() {
			return (
				<RadioGroup
					name='name'
					selectedIndex={3}
					style={{
						display: 'inline-flex',
						flexDirection: 'column',
					}}
				>
					<RadioGroup.RadioButton isSelected={true} style={style}>
						<RadioGroup.Label>Leonardo</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton isSelected={true} style={style}>
						<RadioGroup.Label>Raphael</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton isSelected={true} style={style}>
						<RadioGroup.Label>Donatello</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>Michelangelo</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>Venus</RadioGroup.Label>
					</RadioGroup.RadioButton>
				</RadioGroup>
			);
		},
	});

	return <Component />;
};
SelectedIndexFromChild.storyName = 'SelectedIndexFromChild';

/* Default Props */
export const DefaultProps = () => {
	const style = {
		marginRight: '13px',
	};

	const Component = createClass({
		render() {
			return (
				<RadioGroup>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>Superman</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>Batman</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>Wonder Woman</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>Aquaman</RadioGroup.Label>
					</RadioGroup.RadioButton>
					<RadioGroup.RadioButton style={style}>
						<RadioGroup.Label>Robin</RadioGroup.Label>
					</RadioGroup.RadioButton>
				</RadioGroup>
			);
		},
	});

	return <Component />;
};
DefaultProps.storyName = 'DefaultProps';
