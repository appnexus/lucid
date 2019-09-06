import React from 'react';
import { ProgressBar } from '../../../index';
import { TextField } from '../../../index';

const style = {
	marginBottom: '10px',
	marginTop: '10px',
};

export default class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			percentComplete: 95,
		};
	}

	render() {
		return (
			<div>
				Enter % complete:
				<TextField
					style={style}
					value={this.state.value}
					onSubmit={value =>
						this.setState({ percentComplete: value, value: '' })
					}
				/>
				<ProgressBar percentComplete={this.state.percentComplete} />
			</div>
		);
	}
}
