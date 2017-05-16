import React from 'react';
import { OutwardArrowsIcon } from '../../../../index';

export default React.createClass({
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
