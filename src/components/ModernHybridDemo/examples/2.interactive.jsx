import React from 'react';
import createClass from 'create-react-class';
import { ModernHybridDemoSmart } from '../ModernHybridDemo';

export default createClass({
	getInitialState() {
		return {
			isExpanded: false,
		};
	},

	render() {
		return (
			<div>
				<ModernHybridDemoSmart
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
