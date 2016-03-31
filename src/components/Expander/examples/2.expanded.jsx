import _ from 'lodash';
import React from 'react';

import Expander from '../Expander';

export default React.createClass({
	render() {
		return (
			<div>
				<Expander isExpanded={true}>
					<Expander.Label>foo</Expander.Label>
					<p>Blah blah blah</p>
				</Expander>
			</div>
		);
	}
});
