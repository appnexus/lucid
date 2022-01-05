import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import RadioButton from './RadioButton';

export default {
	title: 'Controls/RadioButton',
	component: RadioButton,
	parameters: {
		docs: {
			description: {
				component: (RadioButton as any).peek.description,
			},
		},
	},
};

/* Interactive */
export const Interactive = () => {
	const style = {
		listStyleType: 'none',
		display: 'flex',
		alignItems: 'center',
	};

	const Component = createClass({
		getInitialState() {
			return {
				isSelected: false,
			};
		},

		handleSelected(isSelected: boolean) {
			this.setState(
				_.assign({}, this.state, {
					isSelected,
				})
			);
		},

		render() {
			return (
				<ul>
					<li style={style}>
						<label>Enabled</label>
						<RadioButton
							isSelected={this.state.isSelected}
							name='interactive-radio-buttons'
							onSelect={this.handleSelected}
							tabIndex={20}
						/>
					</li>
				</ul>
			);
		},
	});

	return <Component />;
};
Interactive.storyName = 'Interactive';

/* States */
export const States = () => {
	const style = {
		display: 'flex',
		alignItems: 'center',
	};

	const Component = createClass({
		render() {
			return (
				<ul>
					<li style={style}>
						<label>Unselected</label>
						<RadioButton tabIndex={20} />
					</li>
					<li style={style}>
						<label>Selected</label>
						<RadioButton isSelected={true} tabIndex={21} />
					</li>
					<li style={style}>
						<label>Disabled</label>
						<RadioButton isDisabled={true} tabIndex={22} />
					</li>
					<li style={style}>
						<label>Disabled & selected</label>
						<RadioButton isDisabled={true} isSelected={true} tabIndex={23} />
					</li>
				</ul>
			);
		},
	});

	return <Component />;
};
States.storyName = 'States';
