import React from 'react';
import createClass from 'create-react-class';
import { Tabs } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<Tabs
					Tab={[
						{ Title: 'Bert', children: 'Bert' },
						{ Title: 'Ernie', children: 'Ernie' },
					]}
				/>
			</div>
		);
	},
});
