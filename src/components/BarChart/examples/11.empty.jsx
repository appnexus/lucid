import React from 'react';
import createClass from 'create-react-class';
import { BarChart } from '../../../index';

export default createClass({
	render() {
		return <BarChart width={750} data={[]} yAxisTitle='Revenue' />;
	},
});
