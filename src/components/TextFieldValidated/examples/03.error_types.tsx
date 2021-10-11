import React from 'react';
import createClass from 'create-react-class';

import { TextFieldValidated } from '../../../index';

const style = {
	marginBottom: '10px',
};

export default createClass({
	getInitialState() {
		return {
			value: '',
		};
	},

	render() {
		return (
			<div>
				<TextFieldValidated
					style={style}
					value={this.state.value}
					onChangeDebounced={() => {}}
					Error={'This is an error'}
				/>
				<TextFieldValidated
					style={style}
					value={this.state.value}
					onChangeDebounced={() => {}}
					Error={null}
					special={{
						message: 'This is a special in the "info" style',
						textColor: '#908f8f',
						borderColor: '#587eba',
					}}
				/>
				<TextFieldValidated
					style={style}
					value={this.state.value}
					onChangeDebounced={() => {}}
					Error={null}
					special={{
						message: 'This is a special with green text and border',
						textColor: '#49b27b',
						borderColor: '#49b27b',
					}}
				/>
			</div>
		);
	},
});
