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
			</div>
		);
	},
});
