import React from 'react';
import _ from 'lodash';
import createClass from 'create-react-class';
import { DraggableLineChart } from '../../../index';

const data = [
	{ x: '12 AM', y: 0 },
	{ x: '1 AM', y: 0 },
	{ x: '2 AM', y: 0 },
	{ x: '3 AM', y: 0 },
	{ x: '4 AM', y: 0 },
	{ x: '5 AM', y: 5 },
	{ x: '6 AM', y: 5 },
	{ x: '7 AM', y: 10 },
	{ x: '8 AM', y: 5 },
	{ x: '9 AM', y: 5 },
	{ x: '10 AM', y: 5 },
	{ x: '11 AM', y: 5 },
];

const style = {
	paddingTop: '4rem',
};
const HourField = ({
	data: localData,
	onChangeHandler,
}: {
	data: any;
	onChangeHandler: any;
}) => (
	<>
		{localData.map((d: any, i: number) => (
			<input
				type='number'
				value={d.y}
				max={100}
				min={0}
				onChange={x => onChangeHandler(x, d)}
				key={`${i}-text`}
				style={{ width: '40px', marginRight: '20px', padding: '2px' }}
			/>
		))}
	</>
);

export default createClass({
	getInitialState() {
		return {
			data,
		};
	},
	onDragEndHandler(item: any) {
		const temp = _.map(this.state.data, dataPoint => {
			if (dataPoint.x === item.x) {
				dataPoint.y = Number(parseFloat(item.y).toFixed(0));
			}
			return dataPoint;
		});
		this.setState({ data: temp });
	},
	onChangeHandler({ target: { value } }: any, item: any) {
		const temp = _.map(this.state.data, dataPoint => {
			if (dataPoint.x === item.x) {
				dataPoint.y = Number(value);
			}
			return dataPoint;
		});
		this.setState({ data: temp });
	},
	render() {
		const { data: stateData } = this.state;
		return (
			<div style={style}>
				<div style={{ width: '85%', margin: 'auto' }}>
					<HourField data={stateData} onChangeHandler={this.onChangeHandler} />
				</div>
				<DraggableLineChart
					data={stateData}
					width={900}
					onDragEnd={this.onDragEndHandler}
					dataIsCentered={true}
				/>
			</div>
		);
	},
});
