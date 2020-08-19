import React, { useCallback, useMemo } from 'react';
import createClass from 'create-react-class';
import _ from 'lodash';
import { DraggableLineChart, TextField } from '../../../index';
import { IXAxisRenderProp } from '../d3-helpers';
import { IChartData, IData } from '../DraggableLineChartD3';

const initialCustomSpendDataPoints = [
	{ x: '12 AM', y: 0, ref: React.createRef() },
	{ x: '1 AM', y: 0, ref: React.createRef() },
	{ x: '2 AM', y: 0, ref: React.createRef() },
	{ x: '3 AM', y: 0, ref: React.createRef() },
	{ x: '4 AM', y: 0, ref: React.createRef() },
	{ x: '5 AM', y: 5, ref: React.createRef() },
	{ x: '6 AM', y: 5, ref: React.createRef() },
	{ x: '7 AM', y: 10, ref: React.createRef() },
	{ x: '8 AM', y: 5, ref: React.createRef() },
	{ x: '9 AM', y: 5, ref: React.createRef() },
	{ x: '10 AM', y: 5, ref: React.createRef() },
	{ x: '11 AM', y: 5, ref: React.createRef() },
];

const style = {
	paddingTop: '4rem',
};
type IChangeHandler = (
	newYValue: string,
	xValue: string,
	customSpendDataPoints: IData
) => void;

const DataInput = ({
	xValue,
	customSpendDataPoints,
	changeHandler,
}: {
	xValue: string;
	customSpendDataPoints: IData;
	changeHandler: IChangeHandler;
}): JSX.Element => {
	const customSpendDataPoint = useMemo(() => {
		return (
			_.find(customSpendDataPoints, ({ x }: IChartData) => x === xValue) || {
				x: '',
				y: 0,
			}
		);
	}, [customSpendDataPoints, xValue]);
	const onChange = useCallback(
		newYValue => {
			changeHandler(newYValue, xValue, customSpendDataPoints);
		},
		[customSpendDataPoints, changeHandler, xValue]
	);
	return (
		<div style={{ width: '70%', margin: 'auto' }}>
			<TextField
				value={customSpendDataPoint.y || 0}
				onBlur={onChange}
				tabIndex={1}
				ref={customSpendDataPoint.ref}
			/>
			<div style={{ margin: 'auto', textAlign: 'center', width: '95%' }}>
				{xValue}
			</div>
		</div>
	);
};
export default createClass({
	getInitialState() {
		return {
			customSpendDataPoints: initialCustomSpendDataPoints,
		};
	},
	onChangeHandler(newYValue: string, xValue: string) {
		const currentIndex = _.findIndex(this.state.customSpendDataPoints, [
			'x',
			xValue,
		]);
		const newCustomSpendDataPoints = _.map(
			this.state.customSpendDataPoints,
			dataPoint =>
				dataPoint.x === xValue
					? { ...dataPoint, y: +Number(newYValue).toFixed(0) }
					: dataPoint
		);
		this.setState({ customSpendDataPoints: newCustomSpendDataPoints });

		const nextIndex =
			currentIndex >= newCustomSpendDataPoints.length - 1
				? 0
				: currentIndex + 1;
		const myRef = newCustomSpendDataPoints[nextIndex].ref;
		setTimeout(() => myRef.current.focus(), 100);
	},
	getRenderProp(
		{
			onDragEnd,
		}: {
			onDragEnd: (newYValue: string, xValue: string) => void;
		},
		xValue: string
	): JSX.Element {
		return (
			<DataInput
				xValue={xValue}
				customSpendDataPoints={this.state.customSpendDataPoints}
				changeHandler={onDragEnd}
			/>
		);
	},
	render() {
		const { customSpendDataPoints } = this.state;
		const onDragEnd = _.partial(this.onChangeHandler, _, _);
		const renderProp: IXAxisRenderProp = _.partial(this.getRenderProp, {
			onDragEnd,
		});
		return (
			<div style={style}>
				<DraggableLineChart
					data={customSpendDataPoints}
					width={900}
					dataIsCentered
					onDragEnd={onDragEnd}
					xAxisRenderProp={renderProp}
				/>
			</div>
		);
	},
});
