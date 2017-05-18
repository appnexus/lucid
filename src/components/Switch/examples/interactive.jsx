import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { Switch } from '../../../index';

export default createClass({
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

	handleDisabledSelected(isSelected) {
		this.setState(
			_.assign({}, this.state, {
				disabled: _.assign({}, this.state.disabled, {
					isSelected,
				}),
			})
		);
	},

	handleEnabledSelected(isSelected) {
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
