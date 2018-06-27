import React from 'react';
import { ProgressBar } from '../../../src/index.js';

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			percentEntered: '',
			percentCompleteValue: 95,
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			percentEntered: event.target.value,
		});
	}

	handleSubmit(event) {
		this.setState({
			percentCompleteValue: this.state.percentEntered,
			percentEntered: '',
		});
		event.preventDefault();
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<input
						type="text"
						placeholder="Enter % complete"
						value={this.state.percentEntered}
						onChange={this.handleChange}
					/>
				</form>
				<ProgressBar percentComplete={this.state.percentCompleteValue} />
			</div>
		);
	}
}
