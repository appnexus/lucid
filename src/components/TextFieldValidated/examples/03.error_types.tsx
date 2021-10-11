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
					Info={'This is an info'}
				/>
				<TextFieldValidated
					style={style}
					value={this.state.value}
					onChangeDebounced={() => {}}
					Error={null}
					special={{
						message: 'This has green text and border',
						textColor: 'green',
						borderColor: 'green',
					}}
				/>
				<TextFieldValidated
					style={style}
					value={this.state.value}
					onChangeDebounced={() => {}}
					Error={null}
					special={{
						message: 'This has aquamarine text and border',
						textColor: 'aquamarine',
						borderColor: 'aquamarine',
					}}
				/>
				<TextFieldValidated
					style={style}
					value={this.state.value}
					onChangeDebounced={() => {}}
					Error={null}
					special={{
						message: 'This has blue text and border',
						textColor: 'blue',
						borderColor: 'blue',
					}}
				/>
				<TextFieldValidated
					style={style}
					value={this.state.value}
					onChangeDebounced={() => {}}
					Error={null}
					special={{
						message: 'This has purple text and border',
						textColor: 'purple',
						borderColor: 'purple',
					}}
				/>
				<TextFieldValidated
					style={style}
					value={this.state.value}
					onChangeDebounced={() => {}}
					Error={null}
					special={{
						message: 'This has yellow text and border',
						textColor: 'yellow',
						borderColor: 'yellow',
					}}
				/>
				<TextFieldValidated
					style={style}
					value={this.state.value}
					onChangeDebounced={() => {}}
					Error={null}
					special={{
						message: 'This has orange text and border',
						textColor: 'orange',
						borderColor: 'orange',
					}}
				/>
				<TextFieldValidated
					style={style}
					value={this.state.value}
					onChangeDebounced={() => {}}
					Error={null}
					special={{
						message: 'This has red text and border',
						textColor: 'red',
						borderColor: 'red',
					}}
				/>
				<TextFieldValidated
					style={style}
					value={this.state.value}
					onChangeDebounced={() => {}}
					Error={null}
					special={{
						message: 'This has grey text and border',
						textColor: 'grey',
						borderColor: 'grey',
					}}
				/>
				<TextFieldValidated
					style={style}
					value={this.state.value}
					onChangeDebounced={() => {}}
					Error={null}
					special={{
						message: 'This has mixed text and border',
						textColor: 'purple',
						borderColor: 'aquamarine',
					}}
				/>
			</div>
		);
	},
});
