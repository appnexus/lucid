import React from 'react';
import createReactClass from 'create-react-class';
import { Tabs } from '../../../index';

export default createReactClass({
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
