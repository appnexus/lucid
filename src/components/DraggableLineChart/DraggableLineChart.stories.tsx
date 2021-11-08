import React, { useCallback } from 'react';
import createClass from 'create-react-class';
import { DraggableLineChart, TextFieldValidated } from './../../index';
import _ from 'lodash';
import { IXAxisRenderProp } from './d3-helpers';
import { IData, ISelectedChartData } from './DraggableLineChartD3';

export default {
	title: 'Visualizations/Charts/DraggableLineChart',
	component: DraggableLineChart,
	parameters: {
		docs: {
			description: {
				component: (DraggableLineChart as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
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

	const Component = createClass({
		render() {
			return (
				<div style={style}>
					<DraggableLineChart
						onDragEnd={(x, y) => console.log({ x, y })}
						data={data}
						width={900}
						xAxisTicksVertical={true}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
Default.storyName = 'Default';

/* Example With External X Axis Render Prop */
export const ExampleWithExternalXAxisRenderProp = () => {
	const initialCustomSpendDataPoints = [
		{ x: '12 AM', y: 0, ref: React.createRef() },
		{ x: '1 AM', y: 1, ref: React.createRef() },
		{ x: '2 AM', y: 1.5, ref: React.createRef() },
		{ x: '3 AM', y: 2, ref: React.createRef() },
		{ x: '4 AM', y: 3.8, ref: React.createRef() },
		{ x: '5 AM', y: 3.66, ref: React.createRef() },
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
			(newYValue) => {
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
	const Component = createClass({
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
				(dataPoint) =>
					dataPoint.x === xValue
						? { ...dataPoint, y: cleanedYValue }
						: dataPoint
			);
			this.setState({ customSpendDataPoints: newCustomSpendDataPoints });
			return newCustomSpendDataPoints;
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
					/>
				</div>
			);
		},
	});

	return <Component />;
};
ExampleWithExternalXAxisRenderProp.storyName =
	'ExampleWithExternalXAxisRenderProp';

/* Example With No Data With Preselect */
export const ExampleWithNoDataWithPreselect = () => {
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
			(newYValue) => {
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
	const Component = createClass({
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
				(dataPoint) =>
					dataPoint.x === xValue
						? { ...dataPoint, y: cleanedYValue }
						: dataPoint
			);
			this.setState({ customSpendDataPoints: newCustomSpendDataPoints });
			return newCustomSpendDataPoints;
		},
		onPreselectHandler(data: ISelectedChartData[]): void {
			const totalSelected = _.filter(data, ['isSelected', true]).length;
			const avg = Math.round((100 / totalSelected) * 10) / 10;
			const updatedData = _.map(data, (step) => ({
				ref: step.ref,
				x: step.x,
				y: step.isSelected ? avg : step.y,
			}));

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
						onPreselect={this.onPreselectHandler}
						preSelectText='Click and drag to select hours'
					/>
				</div>
			);
		},
	});

	return <Component />;
};
ExampleWithNoDataWithPreselect.storyName = 'ExampleWithNoDataWithPreselect';

/* Example With No Data Without Preselect */
export const ExampleWithNoDataWithoutPreselect = () => {
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
			(newYValue) => {
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
	const Component = createClass({
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
				(dataPoint) =>
					dataPoint.x === xValue
						? { ...dataPoint, y: cleanedYValue }
						: dataPoint
			);
			this.setState({ customSpendDataPoints: newCustomSpendDataPoints });
			return newCustomSpendDataPoints;
		},
		onPreselectHandler(data: IData): void {
			this.setState({ customSpendDataPoints: data });
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
						onPreselect={this.onPreselectHandler}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
ExampleWithNoDataWithoutPreselect.storyName =
	'ExampleWithNoDataWithoutPreselect';

/* Example With Y Axis Formatter */
export const ExampleWithYAxisFormatter = () => {
	const initialCustomSpendDataPoints = [
		{ x: '12 AM', y: 0, ref: React.createRef() },
		{ x: '1 AM', y: 1, ref: React.createRef() },
		{ x: '2 AM', y: 1.5, ref: React.createRef() },
		{ x: '3 AM', y: 2, ref: React.createRef() },
		{ x: '4 AM', y: 3.8, ref: React.createRef() },
		{ x: '5 AM', y: 3.66, ref: React.createRef() },
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
			(newYValue) => {
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
	const Component = createClass({
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
				(dataPoint) =>
					dataPoint.x === xValue
						? { ...dataPoint, y: cleanedYValue }
						: dataPoint
			);
			this.setState({ customSpendDataPoints: newCustomSpendDataPoints });
			return newCustomSpendDataPoints;
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
						yAxisFormatter={(value) => `${value}%`}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
ExampleWithYAxisFormatter.storyName = 'ExampleWithYAxisFormatter';
