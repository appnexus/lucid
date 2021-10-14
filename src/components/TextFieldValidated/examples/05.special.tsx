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
					Error={null}
					special={{
						message: 'This is a special with `success` text and border',
						textColor: 'success',
						borderColor: 'success',
					}}
				/>
				<TextFieldValidated
					style={style}
					value={this.state.value}
					onChangeDebounced={() => {}}
					Error={null}
					special={{
						message: 'This is a special with `primary` text and border',
						textColor: 'primary',
						borderColor: 'primary',
					}}
				/>
				<TextFieldValidated
					style={style}
					value={this.state.value}
					onChangeDebounced={() => {}}
					Error={null}
					special={{
						message: 'This is a special with `danger` text and border',
						textColor: 'danger',
						borderColor: 'danger',
					}}
				/>
				<TextFieldValidated
					style={style}
					value={this.state.value}
					onChangeDebounced={() => {}}
					Error={null}
					special={{
						message: 'This is a special with `warning` text and border',
						textColor: 'warning',
						borderColor: 'warning',
					}}
				/>
				<TextFieldValidated
					style={style}
					value={this.state.value}
					onChangeDebounced={() => {}}
					Error={null}
					special={{
						message: 'This is a special with `info` text and border',
						textColor: 'info',
						borderColor: 'info',
					}}
				/>
			</div>
		);
	},
});
