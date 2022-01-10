import React from 'react';
import createClass from 'create-react-class';
import _ from 'lodash';
import Switch from './Switch';

export default {
	title: 'Controls/Switch',
	component: Switch,
	parameters: {
		docs: {
			description: {
				component: (Switch as any).peek.description,
			},
		},
	},
};

/* States */
export const States = () => {
	const Component = createClass({
		render() {
			return (
				<ul>
					<li>
						<label>Unselected</label>
						<Switch tabIndex={20} />
					</li>
					<li>
						<label>Selected</label>
						<Switch isSelected={true} tabIndex={21} />
					</li>
					<li>
						<label>Disabled</label>
						<Switch isDisabled={true} tabIndex={22} />
					</li>
					<li>
						<label>Disabled & selected</label>
						<Switch isDisabled={true} isSelected={true} tabIndex={23} />
					</li>
				</ul>
			);
		},
	});

	return <Component />;
};

/* Interactive */
export const Interactive = () => {
	const Component = createClass({
		getInitialState() {
			return {
				disabled: {
					isSelected: false,
				},
				enabled: {
					isSelected: false,
				},
			};
		},

		handleDisabledSelected(isSelected: any) {
			this.setState(
				_.assign({}, this.state, {
					disabled: _.assign({}, this.state.disabled, {
						isSelected,
					}),
				})
			);
		},

		handleEnabledSelected(isSelected: any) {
			this.setState(
				_.assign({}, this.state, {
					enabled: _.assign({}, this.state.enabled, {
						isSelected,
					}),
				})
			);
		},

		render() {
			return (
				<ul>
					<li>
						<label>Enabled</label>
						<Switch
							isDisabled={false}
							isSelected={this.state.enabled.isSelected}
							onSelect={this.handleEnabledSelected}
							tabIndex={10}
						/>
					</li>
					<li>
						<label>Disabled</label>
						<Switch
							isDisabled={true}
							isSelected={this.state.disabled.isSelected}
							onSelect={this.handleDisabledSelected}
							tabIndex={11}
						/>
					</li>
				</ul>
			);
		},
	});

	return <Component />;
};

/* Include Exclude */
export const IncludeExclude = () => {
	const Component = createClass({
		render() {
			return (
				<ul>
					<li>
						<label>Unselected</label>
						<Switch tabIndex={20} isIncludeExclude={true} />
					</li>
					<li>
						<label>Selected</label>
						<Switch isSelected={true} tabIndex={21} isIncludeExclude={true} />
					</li>
					<li>
						<label>Disabled</label>
						<Switch isDisabled={true} tabIndex={22} isIncludeExclude={true} />
					</li>
					<li>
						<label>Disabled & selected</label>
						<Switch
							isDisabled={true}
							isSelected={true}
							tabIndex={23}
							isIncludeExclude={true}
						/>
					</li>
				</ul>
			);
		},
	});

	return <Component />;
};
IncludeExclude.storyName = 'IncludeExclude';
