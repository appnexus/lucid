import React from 'react';
import createClass from 'create-react-class';
import { SingleSelect } from '../../../index';

const { Placeholder, Option } = SingleSelect;

export default createClass({
	getInitialState() {
		return {
			selectedIndex: null,
			selectedOptionName: null,
		};
	},

	handleSelect(optionIndex, { props: { name } }) {
		this.setState({
			selectedIndex: optionIndex,
			selectedOptionName: name,
		});
	},

	render() {
		return (
			<section>

				<SingleSelect onSelect={this.handleSelect}>
					<Placeholder>Select Color</Placeholder>
					<Option name="red">Red</Option>
					<Option name="green">Green</Option>
					<Option name="blue">Blue</Option>
				</SingleSelect>

				<section>
					<p>
						Selected Index: {JSON.stringify(this.state.selectedIndex)}
					</p>
					<p>
						Selected Option Name:
						{' '}
						{JSON.stringify(this.state.selectedOptionName)}
					</p>
				</section>
			</section>
		);
	},
});
