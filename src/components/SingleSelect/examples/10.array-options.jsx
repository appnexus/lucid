import React from 'react';
import createReactClass from 'create-react-class';
import { SingleSelect } from '../../../index';

export default createReactClass({
	render() {
		return (
			<section style={{ minHeight: 90 }}>
				<SingleSelect Placeholder="Select a number" Option={[1, 2, 3]} />
			</section>
		);
	},
});
