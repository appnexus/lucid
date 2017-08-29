import React from 'react';
import createReactClass from 'create-react-class';
import _ from 'lodash';
import { DropMenu } from '../../../index';

export default createReactClass({
	getInitialState() {
		return {
			selectedIndices: [],
		};
	},

	handleSelect(optionIndex) {
		this.setState({
			selectedIndices: [optionIndex],
		});
	},

	render() {
		const { selectedIndices } = this.state;
		const options = ['Red', 'Green', 'Blue'];

		return (
			<DropMenu onSelect={this.handleSelect}>
				<DropMenu.Control>
					{_.isEmpty(selectedIndices)
						? 'Select'
						: options[_.last(selectedIndices)]}
				</DropMenu.Control>
				{_.map(options, (optionText, index) => (
					<DropMenu.Option key={'Option-' + index}>
						{optionText}
					</DropMenu.Option>
				))}
			</DropMenu>
		);
	},
});
