import React from 'react';
import createClass from 'create-react-class';
import { SingleSelect } from '../../../index';

const { Placeholder, Option } = SingleSelect;

export default createClass({
	getInitialState() {
		return {
			selectedIndex: null,
		};
	},

	handleSelect(optionIndex) {
		this.setState({
			selectedIndex: optionIndex,
		});
	},

	render() {
		return (
			<section>
				<SingleSelect isInvisible onSelect={this.handleSelect}>
					<Placeholder>Select Color</Placeholder>
					<Option>Red</Option>
					<Option>Green</Option>
					<Option>Blue</Option>
				</SingleSelect>

				<section style={{ marginTop: '10px' }}>
					Selected Index: {JSON.stringify(this.state.selectedIndex)}
				</section>
			</section>
		);
	},
});
