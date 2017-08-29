import React from 'react';
import createReactClass from 'create-react-class';
import { Expander } from '../../../index';

export default createReactClass({
	render() {
		return (
			<div>
				<Expander isExpanded={true}>
					<Expander.Label>Show Less</Expander.Label>
					<p>
						You can't get rid of me. Keep clicking that icon as much as you want, but I'm here to stay!
					</p>
				</Expander>
			</div>
		);
	},
});
