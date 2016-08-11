import React from 'react';
import { Resizer } from '../../../index';

export default React.createClass({
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
