import createClass from 'create-react-class';
import _ from 'lodash';
import React, { useCallback } from 'react';
import { DraggableLineChart, TextFieldValidated } from '../../../index';
import { IXAxisRenderProp } from '../d3-helpers';
import { IData, IOnPreselect, ISelectedChartData } from '../DraggableLineChartD3';

const initialCustomSpendDataPoints = [
	{ x: '12 AM', y: 0, ref: React.createRef() },
	{ x: '1 AM', y: 0, ref: React.createRef() },
	{ x: '2 AM', y: 0, ref: React.createRef() },
	{ x: '3 AM', y: 0, ref: React.createRef() },
	{ x: '4 AM', y: 0, ref: React.createRef() },
	{ x: '5 AM', y: 0, ref: React.createRef() },
	{ x: '6 AM', y: 0, ref: React.createRef() },
	{ x: '7 AM', y: 0, ref: React.createRef() },
	{ x: '8 AM', y: 0, ref: React.createRef() },
	{ x: '9 AM', y: 0, ref: React.createRef() },
	{ x: '10 AM', y: 0, ref: React.createRef() },
	{ x: '11 AM', y: 0, ref: React.createRef() },
];

const style = {
	paddingTop: '4rem',
};
type IChangeHandler = (newYValue: string, xValue: string) => void;

const DataInput = ({
	xValue,
	yValue,
	myRef,
	changeHandler,
}: {
	xValue: string;
	yValue: number;
	myRef: any;
	changeHandler: IChangeHandler;
}): JSX.Element => {
	const onChange = useCallback(
		newYValue => {
			changeHandler(newYValue, xValue);
		},
		[changeHandler, xValue]
	);
	return (
		<div style={{ width: '70%', margin: 'auto' }}>
			<TextFieldValidated
				value={yValue || 0}
				onBlur={onChange}
				tabIndex={0}
				ref={myRef}
			/>
			<div
				style={{
					margin: 'auto',
					textAlign: 'center',
					width: '95%',
					marginTop: '15px',
				}}
			>
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
	onDragHandler(
		newYValue: string,
		xValue: string,
		fromOnChangeHandler?: boolean
	): IData {
		const cleanedYValue = fromOnChangeHandler
			? newYValue
			: +Number(newYValue).toFixed(0);
		const newCustomSpendDataPoints = _.map(
			this.state.customSpendDataPoints,
			dataPoint =>
				dataPoint.x === xValue ? { ...dataPoint, y: cleanedYValue } : dataPoint
		);
		this.setState({ customSpendDataPoints: newCustomSpendDataPoints });
		return newCustomSpendDataPoints;
	},
	onPreselectHandler(data: ISelectedChartData[]): void {
		const totalSelected = _.filter(data, ['isSelected', true]).length;
		const avg = Math.round((100 / totalSelected) * 10) / 10;
		const updatedData = _.map(data, (step) => ({ ref: step.ref, x: step.x, y: step.isSelected ? avg : step.y }));

		console.log({data, avg, updatedData})
		this.setState({ customSpendDataPoints: updatedData });
	},
	onChangeHandler(newYValue: string, xValue: string) {
		const currentIndex = _.findIndex(this.state.customSpendDataPoints, [
			'x',
			xValue,
		]);
		const currentYValue = this.state.customSpendDataPoints[currentIndex].y;
		const nextValue = +Number(newYValue).toFixed(0);

		if (currentYValue !== nextValue) {
			const newCustomSpendDataPoints = this.onDragHandler(
				newYValue,
				xValue,
				true
			);
			const nextIndex =
				currentIndex >= newCustomSpendDataPoints.length - 1
					? 0
					: currentIndex + 1;

			const myRef = newCustomSpendDataPoints[nextIndex].ref;
			setTimeout(() => myRef.current.focus(), 1);
		}
	},
	getRenderProp(
		{
			onChangeHandler,
		}: {
			onChangeHandler: (newYValue: string, xValue: string) => void;
		},
		{ x, y, ref }: { x: string; y: number; ref?: any }
	): JSX.Element {
		return (
			<DataInput
				xValue={x}
				yValue={y}
				myRef={ref}
				changeHandler={onChangeHandler}
			/>
		);
	},
	render() {
		const { customSpendDataPoints } = this.state;
		const renderProp: IXAxisRenderProp = _.partial(this.getRenderProp, {
			onChangeHandler: this.onChangeHandler,
		});
		return (
			<div style={style}>
				<DraggableLineChart
					data={customSpendDataPoints}
					width={900}
					dataIsCentered
					onDragEnd={this.onDragHandler}
					xAxisRenderProp={renderProp}
					showPreselect={true}
					onPreselect={this.onPreselectHandler}
				/>
			</div>
		);
	},
});
