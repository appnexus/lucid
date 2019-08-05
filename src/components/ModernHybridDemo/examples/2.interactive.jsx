import React from 'react';
import createClass from 'create-react-class';
import { ModernHybridDemo } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			isExpanded: false,
		};
	},

	render() {
		return (
			<div>
				<ModernHybridDemo
					isExpanded={this.state.isExpanded}
					onToggle={this.handleExpanded}
				/>
			</div>
		);
	},

	handleExpanded(isExpanded) {
		this.setState({
			isExpanded: isExpanded,
		});
	},
});
