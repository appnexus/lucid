import React from 'react';
import createClass from 'create-react-class';
import { LineChart } from '../../../index';

export default createClass({
	render() {
		return <LineChart data={[]} yAxisFields={['blueberries']} />;
	},
});
