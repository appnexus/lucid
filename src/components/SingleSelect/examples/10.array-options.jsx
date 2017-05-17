import React from 'react';
import createClass from 'create-react-class';
import { SingleSelect } from '../../../index';

export default createClass({
	render() {
		return (
			<section style={{ minHeight: 90 }}>
				<SingleSelect Placeholder="Select a number" Option={[1, 2, 3]} />
			</section>
		);
	},
});
