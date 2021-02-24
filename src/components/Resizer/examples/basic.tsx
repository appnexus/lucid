import React from 'react';
import createClass from 'create-react-class';
import { Resizer } from '../../../index';

export default createClass({
	render() {
		return (
			<Resizer>
				{(width, height) => (
					<div>
						<div>Width: {width}</div>
						<div>Height: {height}</div>
					</div>
				)}
			</Resizer>
		);
	},
});
