import React from 'react';
import createClass from 'create-react-class';
import { OutwardArrowsIcon } from '../../../../index';

export default createClass({
	render() {
		return (
			<div>
				<h5>Horizontal</h5>
				<OutwardArrowsIcon kind="horizontal" />

				<h5>Vertical</h5>
				<OutwardArrowsIcon kind="vertical" />

				<h5>Diagonal</h5>
				<OutwardArrowsIcon kind="diagonal" />
			</div>
		);
	},
});
