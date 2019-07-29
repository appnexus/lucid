import React from 'react';
import { Underline } from '../../../index.js';

export default class extends React.Component {
	render() {
		return <Underline match='bar'>foo bar baz</Underline>;
	}
}
