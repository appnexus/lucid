import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import BarChart from '../BarChart';

const data = _.map(_.range(0, 200), n => ({
	x: new Date() + n * 60 * 60 * 24,
	y: _.random(60, 100),
}));

export default createClass({
	render() {
		return <BarChart data={data} />;
	},
});
