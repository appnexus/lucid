import React from 'react';
import createClass from 'create-react-class';
import { ExpanderClass } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			isExpanded: false,
		};
	},

	render() {
		return (
			<div>
				<ExpanderClass
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
