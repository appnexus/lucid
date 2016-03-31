import _ from 'lodash';
import React from 'react';

import Expander from '../Expander';

export default React.createClass({
	render() {
		return (
			<div>
				<Expander>
					<Expander.Label>bar</Expander.Label>
					<p>Yadda yadda yadda</p>
				</Expander>
			</div>
		);
	}
});
