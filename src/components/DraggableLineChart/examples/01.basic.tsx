import React from 'react';
import _ from 'lodash';
import createClass from 'create-react-class';
import { DraggableLineChart, TextField } from '../../../index';

const data = [
	{ x: new Date('2015-01-01T00:00:00-08:00'), y: 0 },
	{ x: new Date('2015-01-01T01:00:00-08:00'), y: 0 },
	{ x: new Date('2015-01-01T02:00:00-08:00'), y: 0 },
	{ x: new Date('2015-01-01T03:00:00-08:00'), y: 0 },
	{ x: new Date('2015-01-01T04:00:00-08:00'), y: 0 },
	{ x: new Date('2015-01-01T05:00:00-08:00'), y: 0 },
	{ x: new Date('2015-01-01T06:00:00-08:00'), y: 0 },
	{ x: new Date('2015-01-01T07:00:00-08:00'), y: 0 },
	{ x: new Date('2015-01-01T08:00:00-08:00'), y: 5 },
	{ x: new Date('2015-01-01T09:00:00-08:00'), y: 5 },
	{ x: new Date('2015-01-01T10:00:00-08:00'), y: 5 },
	{ x: new Date('2015-01-01T11:00:00-08:00'), y: 5 },
	{ x: new Date('2015-01-01T12:00:00-08:00'), y: 5 },
	{ x: new Date('2015-01-01T13:00:00-08:00'), y: 5 },
	{ x: new Date('2015-01-01T14:00:00-08:00'), y: 5 },
	{ x: new Date('2015-01-01T15:00:00-08:00'), y: 10 },
	{ x: new Date('2015-01-01T16:00:00-08:00'), y: 5 },
	{ x: new Date('2015-01-01T17:00:00-08:00'), y: 5 },
	{ x: new Date('2015-01-01T18:00:00-08:00'), y: 5 },
	{ x: new Date('2015-01-01T19:00:00-08:00'), y: 5 },
	{ x: new Date('2015-01-01T20:00:00-08:00'), y: 5 },
	{ x: new Date('2015-01-01T21:00:00-08:00'), y: 5 },
	{ x: new Date('2015-01-01T22:00:00-08:00'), y: 0 },
	{ x: new Date('2015-01-01T23:00:00-08:00'), y: 0 },
];

const style = {
	paddingTop: '4rem',
};

export default createClass({
	getInitialState() {
		return {
			data,
		};
	},
	onDragEndHandler(item: any) {
		const temp = _.map(this.state.data, dataPoint => {
			if (dataPoint.x === item.x) {
				dataPoint.y = Number(parseFloat(item.y).toFixed(2));
			}
			return dataPoint;
		});
		this.setState({ data: temp });
	},
	onChangeHandler(item: any, value: any) {
		const temp = _.map(this.state.data, dataPoint => {
			if (dataPoint.x === item.x) {
				dataPoint.y = Number(value);
			}
			return dataPoint;
		});
		this.setState({ data: temp });
	},
	render() {
		const { data } = this.state;
		return (
			<div style={style}>
				<div style={{ display: 'inline', margin: '3px' }}>
					{data.map((d: any, i: number) => (
						<TextField
							value={d.y}
							onChange={this.onChangeHandler.bind(this.onChangeHandler, d)}
							width={'30px'}
							key={`${i}-text`}
							style={{ width: '32px' }}
						/>
					))}
				</div>
				<DraggableLineChart
					data={data}
					width={900}
					onDragEnd={this.onDragEndHandler}
				/>
			</div>
		);
	},
});
