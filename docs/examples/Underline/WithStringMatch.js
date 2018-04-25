import React from 'react';
import { Underline } from '../../../src/index.js';

export default class extends React.Component {
	render() {
		return <Underline match="bar">foo bar baz</Underline>;
	}
}
