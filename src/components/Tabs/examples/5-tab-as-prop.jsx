import React from 'react';
import { Tabs } from '../../../index';

export default React.createClass({
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
