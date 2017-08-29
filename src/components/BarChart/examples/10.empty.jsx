import React from 'react';
import createReactClass from 'create-react-class';
import { BarChart } from '../../../index';

export default createReactClass({
	render() {
		return <BarChart data={[]} yAxisTitle="Revenue" />;
	},
});
