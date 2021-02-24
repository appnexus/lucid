import React from 'react';
import { Underline } from '../../../index';

export default class extends React.Component {
	render() {
		return <Underline match={/foo?/i}>foo bar baz</Underline>;
	}
}
