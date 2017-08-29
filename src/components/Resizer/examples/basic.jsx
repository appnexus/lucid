import React from 'react';
import createReactClass from 'create-react-class';
import { Resizer } from '../../../index';

export default createReactClass({
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
