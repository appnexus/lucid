import React from 'react';
import { Selection } from '../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<Selection Label='Default' />
				<Selection kind='container' Label='Container' />
				<Selection kind='success' Label='Success' />
				<Selection kind='danger' Label='Danger' />
				<Selection kind='info' Label='Info' />
				<Selection kind='warning' Label='Warning' />
			</div>
		);
	},
});
