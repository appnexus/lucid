import React from 'react';
import _ from 'lodash';
import { DropMenu } from '../../../index';

export default React.createClass({
	getInitialState() {
		return {
		  selectedIndices: []
		};
	},

	handleSelect(optionIndex) {
		 this.setState({
			selectedIndices: [optionIndex]
		 });
	},

	render() {
		const { selectedIndices } = this.state;
		const options = ['Red', 'Green', 'Blue'];

		return (
			<DropMenu onSelect={this.handleSelect}>
				<DropMenu.Control>{_.isEmpty(selectedIndices) ? 'Select' : options[_.last(selectedIndices)]}</DropMenu.Control>
				{_.map(options, (optionText, index) => (
					<DropMenu.Option key={'Option-' + index}>{optionText}</DropMenu.Option>
				))}
			</DropMenu>
		);
	}
});
