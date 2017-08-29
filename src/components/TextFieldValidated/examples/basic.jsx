import React from 'react';
import createReactClass from 'create-react-class';
import { TextFieldValidated } from '../../../index';

export default createReactClass({
	render() {
		return <TextFieldValidated Error="Nope, not even close!" />;
	},
});
