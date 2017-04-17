import React from 'react';
import { SingleSelect } from '../../../index';

const { Placeholder, Option } = SingleSelect;

export default React.createClass({
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

				<SingleSelect onSelect={this.handleSelect}>
					<Placeholder>Select Color</Placeholder>
					<Option>Red</Option>
					<Option>Green</Option>
					<Option>Blue</Option>
				</SingleSelect>

				<section>
					Selected Index: {JSON.stringify(this.state.selectedIndex)}
				</section>
			</section>
		);
	},
});
