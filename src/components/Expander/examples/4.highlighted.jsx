import React from 'react';
import createClass from 'create-react-class';
import { Expander } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<Expander kind="highlighted" isExpanded={true}>
					<Expander.Label>Show Less</Expander.Label>
					<p>
						You can't get rid of me. Keep clicking that icon as much as you want, but I'm here to stay!
					</p>
				</Expander>
			</div>
		);
	},
});
