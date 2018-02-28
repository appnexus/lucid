import React from 'react';
import { Accordion } from '../../../src/index.js';

export default class extends React.Component {
	constructor(...args) {
		super(...args);

		this.state = { index: null };

		this.handleSelect = this.handleSelect.bind(this);
	}

	handleSelect(index) {
		this.setState({ index });
	}

	render() {
		const { index } = this.state;

		return (
			<Accordion onSelect={this.handleSelect}>
				<Accordion.Item Header={`Hello ${index === 0 ? '- selected' : ''}`}>
					World
				</Accordion.Item>
				<Accordion.Item Header={`Foo ${index === 1 ? '- selected' : ''}`}>
					Bar
				</Accordion.Item>
			</Accordion>
		);
	}
}
