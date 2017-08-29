import React from 'react';
import createReactClass from 'create-react-class';
import { LineChart } from '../../../index';

export default createReactClass({
	render() {
		return <LineChart data={[]} yAxisFields={['blueberries']} />;
	},
});
