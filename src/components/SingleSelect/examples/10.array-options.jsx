import React from 'react';
import { SingleSelect } from '../../../index';

export default React.createClass({
	render() {
		return (
			<section style={{ minHeight: 90 }}>
				<SingleSelect Placeholder="Select a number" Option={[1, 2, 3]} />
			</section>
		);
	},
});
