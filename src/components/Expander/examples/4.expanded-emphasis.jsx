import React from 'react';
import { Expander } from '../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<Expander kind='emphasis' isExpanded={true}>
					<Expander.Label>Show Less</Expander.Label>
					<p>You can't get rid of me. Keep clicking that icon as much as you want, but I'm here to stay!</p>
				</Expander>
			</div>
		);
	},
});
