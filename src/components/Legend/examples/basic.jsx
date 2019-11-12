import React from 'react';
import createClass from 'create-react-class';

import { Legend } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<Legend>
					<Legend.Item hasPoint={true} color='#ff0000'>
						Hello
					</Legend.Item>
				</Legend>
			</div>
		);
	},
});
