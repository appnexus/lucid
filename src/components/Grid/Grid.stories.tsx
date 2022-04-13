import React from 'react';
import { Meta, Story } from '@storybook/react';

import Grid, { IGridProps } from './Grid';

export default {
	title: 'Layout/Grid',
	component: Grid,
	parameters: {
		docs: {
			description: {
				component: Grid.peek.description,
			},
		},
	},
} as Meta;

/* Grid Columns */
export const GridColumns: Story<IGridProps> = (args) => {
	const gridStyle = {
		half: { background: '#0089c4' },
		quarter: { background: '#f7403a' },
		third: { background: '#3fa516', color: '#f3f3f3' },
		full: { background: '#333333', color: '#f3f3f3' },
		auto: { background: '#999999', color: '#f3f3f3' },
		flexdefault: { background: '#feb209' },
		sharedStyles: {
			margin: 0,
			padding: 0,
			color: '#f3f3f3',
		},
		vertical: { height: '100px' },
	};

	const fillCells = (count: any) => {
		const cells: any = [];
		for (let i = 0; i < count; i++) {
			cells.push(
				<Grid.Cell key={i}>
					<p style={{ ...gridStyle.auto, ...gridStyle.sharedStyles }}>auto</p>
				</Grid.Cell>
			);
		}
		return cells;
	};

	return (
		<div>
			<Grid>
				<Grid.Cell isFull>
					<p style={{ ...gridStyle.full, ...gridStyle.sharedStyles }}>full</p>
				</Grid.Cell>
			</Grid>
			<Grid>
				<Grid.Cell is2>
					<p style={{ ...gridStyle.flexdefault, ...gridStyle.sharedStyles }}>
						2
					</p>
				</Grid.Cell>
				{fillCells(12 - 2)}
			</Grid>
			<Grid>
				<Grid.Cell is3>
					<p style={{ ...gridStyle.flexdefault, ...gridStyle.sharedStyles }}>
						3
					</p>
				</Grid.Cell>
				{fillCells(12 - 3)}
			</Grid>
			<Grid>
				<Grid.Cell is4>
					<p style={{ ...gridStyle.flexdefault, ...gridStyle.sharedStyles }}>
						4
					</p>
				</Grid.Cell>
				{fillCells(12 - 4)}
			</Grid>
			<Grid>
				<Grid.Cell is5>
					<p style={{ ...gridStyle.flexdefault, ...gridStyle.sharedStyles }}>
						5
					</p>
				</Grid.Cell>
				{fillCells(12 - 5)}
			</Grid>
			<Grid>
				<Grid.Cell is6>
					<p style={{ ...gridStyle.flexdefault, ...gridStyle.sharedStyles }}>
						6
					</p>
				</Grid.Cell>
				{fillCells(12 - 6)}
			</Grid>
			<Grid>
				<Grid.Cell is7>
					<p style={{ ...gridStyle.flexdefault, ...gridStyle.sharedStyles }}>
						7
					</p>
				</Grid.Cell>
				{fillCells(12 - 7)}
			</Grid>
			<Grid>
				<Grid.Cell is8>
					<p style={{ ...gridStyle.flexdefault, ...gridStyle.sharedStyles }}>
						8
					</p>
				</Grid.Cell>
				{fillCells(12 - 8)}
			</Grid>
			<Grid>
				<Grid.Cell is9>
					<p style={{ ...gridStyle.flexdefault, ...gridStyle.sharedStyles }}>
						9
					</p>
				</Grid.Cell>
				{fillCells(12 - 9)}
			</Grid>
			<Grid>
				<Grid.Cell is10>
					<p style={{ ...gridStyle.flexdefault, ...gridStyle.sharedStyles }}>
						10
					</p>
				</Grid.Cell>
				{fillCells(12 - 10)}
			</Grid>
			<Grid>
				<Grid.Cell is11>
					<p style={{ ...gridStyle.flexdefault, ...gridStyle.sharedStyles }}>
						11
					</p>
				</Grid.Cell>
				{fillCells(12 - 11)}
			</Grid>
		</div>
	);
};

/* Gutterless Grid */
export const GutterlessGrid: Story<IGridProps> = (args) => {
	const gridStyle = {
		half: { background: '#0089c4' },
		quarter: { background: '#f7403a' },
		third: { background: '#3fa516', color: '#f3f3f3' },
		full: { background: '#333333', color: '#f3f3f3' },
		auto: { background: '#999999', color: '#f3f3f3' },
		flexdefault: { background: '#feb209' },
		sharedStyles: {
			margin: 0,
			padding: 0,
			color: '#f3f3f3',
		},
		vertical: { height: '100px' },
	};

	const fillCells = (count: any) => {
		const cells: any = [];
		for (let i = 0; i < count; i++) {
			cells.push(
				<Grid.Cell key={i}>
					<p style={{ ...gridStyle.auto, ...gridStyle.sharedStyles }}>auto</p>
				</Grid.Cell>
			);
		}
		return cells;
	};

	return (
		<Grid isGutterless isMultiline>
			<Grid.Cell isHalf>
				<p style={{ ...gridStyle.half, ...gridStyle.sharedStyles }}>
					gutterless half
				</p>
			</Grid.Cell>
			<Grid.Cell
				style={{ ...gridStyle.quarter, ...gridStyle.sharedStyles }}
				isQuarter
			>
				gutterless quarter
			</Grid.Cell>
			{fillCells(1)}
			<Grid.Cell isQuarter>
				<p style={{ ...gridStyle.quarter, ...gridStyle.sharedStyles }}>
					gutterless quarter
				</p>
			</Grid.Cell>
			<Grid.Cell isQuarter>
				<p style={{ ...gridStyle.quarter, ...gridStyle.sharedStyles }}>
					gutterless quarter
				</p>
			</Grid.Cell>
			<Grid.Cell isHalf>
				<p style={{ ...gridStyle.half, ...gridStyle.sharedStyles }}>
					gutterless half
				</p>
			</Grid.Cell>
		</Grid>
	);
};

/* Horizontal Multiline Grid */
export const HorizontalMultilineGrid: Story<IGridProps> = (args) => {
	const gridStyle = {
		half: { background: '#0089c4' },
		quarter: { background: '#f7403a' },
		third: { background: '#3fa516', color: '#f3f3f3' },
		full: { background: '#333333', color: '#f3f3f3' },
		auto: { background: '#999999', color: '#f3f3f3' },
		flexdefault: { background: '#feb209' },
		sharedStyles: {
			margin: 0,
			padding: 0,
			color: '#f3f3f3',
		},
		vertical: { height: '100px' },
	};

	return (
		<Grid isHorizontal isMultiline>
			<Grid.Cell isHalf>
				<p style={{ ...gridStyle.half, ...gridStyle.sharedStyles }}>half</p>
			</Grid.Cell>
			<Grid.Cell isHalf>
				<p style={{ ...gridStyle.half, ...gridStyle.sharedStyles }}>half</p>
			</Grid.Cell>
			<Grid.Cell isHalf>
				<p style={{ ...gridStyle.half, ...gridStyle.sharedStyles }}>half</p>
			</Grid.Cell>
			<Grid.Cell isFull>
				<p style={{ ...gridStyle.full, ...gridStyle.sharedStyles }}>full</p>
			</Grid.Cell>
			<Grid.Cell isThird>
				<p style={{ ...gridStyle.third, ...gridStyle.sharedStyles }}>third</p>
			</Grid.Cell>
			<Grid.Cell isThird>
				<p style={{ ...gridStyle.third, ...gridStyle.sharedStyles }}>third</p>
			</Grid.Cell>
			<Grid.Cell isThird>
				<p style={{ ...gridStyle.third, ...gridStyle.sharedStyles }}>third</p>
			</Grid.Cell>
			<Grid.Cell isThird>
				<p style={{ ...gridStyle.third, ...gridStyle.sharedStyles }}>third</p>
			</Grid.Cell>
			<Grid.Cell isQuarter>
				<p style={{ ...gridStyle.quarter, ...gridStyle.sharedStyles }}>
					quarter
				</p>
			</Grid.Cell>
			<Grid.Cell isQuarter>
				<p style={{ ...gridStyle.quarter, ...gridStyle.sharedStyles }}>
					quarter
				</p>
			</Grid.Cell>
			<Grid.Cell isQuarter>
				<p style={{ ...gridStyle.quarter, ...gridStyle.sharedStyles }}>
					quarter
				</p>
			</Grid.Cell>
		</Grid>
	);
};

/* Offset Cells */
export const OffsetCells: Story<IGridProps> = (args) => {
	const gridStyle = {
		half: { background: '#0089c4' },
		quarter: { background: '#f7403a' },
		third: { background: '#3fa516', color: '#f3f3f3' },
		full: { background: '#333333', color: '#f3f3f3' },
		auto: { background: '#999999', color: '#f3f3f3' },
		flexdefault: { background: '#feb209' },
		sharedStyles: {
			margin: 0,
			padding: 0,
			color: '#f3f3f3',
			textAlign: 'center',
		},
		vertical: { height: '100px' },
	};

	return (
		<div>
			<Grid>
				<Grid.Cell isHalf isOffsetHalf>
					<p style={{ ...gridStyle.half, ...gridStyle.sharedStyles } as any}>
						half with offset half
					</p>
				</Grid.Cell>
			</Grid>
			<Grid>
				<Grid.Cell isQuarter isOffsetQuarter>
					<p style={{ ...gridStyle.quarter, ...gridStyle.sharedStyles } as any}>
						quarter with offset quarter
					</p>
				</Grid.Cell>
			</Grid>
			<Grid>
				<Grid.Cell isThird isOffsetThird>
					<p style={{ ...gridStyle.third, ...gridStyle.sharedStyles } as any}>
						third with offset third
					</p>
				</Grid.Cell>
			</Grid>
		</div>
	);
};

/* Vertical Multiline Grid */
export const VerticalMultilineGrid: Story<IGridProps> = (args) => {
	const gridStyle = {
		half: { background: '#0089c4' },
		quarter: { background: '#f7403a' },
		third: { background: '#3fa516', color: '#f3f3f3' },
		full: { background: '#333333', color: '#f3f3f3' },
		auto: { background: '#999999', color: '#f3f3f3' },
		flexdefault: { background: '#feb209' },
		sharedStyles: {
			margin: 0,
			padding: 0,
			color: '#f3f3f3',
		},
		vertical: { height: '200px' },
		verticalSharedStyles: {
			margin: 0,
			padding: 0,
			color: '#f3f3f3',
			flex: 1,
		},
	};

	return (
		<Grid style={{ ...gridStyle.vertical }} isVertical isMultiline>
			<Grid.Cell isHalf>
				<p style={{ ...gridStyle.half, ...gridStyle.verticalSharedStyles }}>
					half
				</p>
			</Grid.Cell>
			<Grid.Cell isHalf>
				<p style={{ ...gridStyle.half, ...gridStyle.verticalSharedStyles }}>
					half
				</p>
			</Grid.Cell>
			<Grid.Cell isHalf>
				<p style={{ ...gridStyle.half, ...gridStyle.verticalSharedStyles }}>
					half
				</p>
			</Grid.Cell>
			<Grid.Cell isFull>
				<p style={{ ...gridStyle.full, ...gridStyle.verticalSharedStyles }}>
					full
				</p>
			</Grid.Cell>
			<Grid.Cell isThird>
				<p style={{ ...gridStyle.third, ...gridStyle.verticalSharedStyles }}>
					third
				</p>
			</Grid.Cell>
			<Grid.Cell isThird>
				<p style={{ ...gridStyle.third, ...gridStyle.verticalSharedStyles }}>
					third
				</p>
			</Grid.Cell>
			<Grid.Cell isThird>
				<p style={{ ...gridStyle.third, ...gridStyle.verticalSharedStyles }}>
					third
				</p>
			</Grid.Cell>
			<Grid.Cell isThird>
				<p style={{ ...gridStyle.third, ...gridStyle.verticalSharedStyles }}>
					third
				</p>
			</Grid.Cell>
			<Grid.Cell isQuarter>
				<p
					style={{
						...gridStyle.quarter,
						...gridStyle.verticalSharedStyles,
					}}
				>
					quarter
				</p>
			</Grid.Cell>
			<Grid.Cell isQuarter>
				<p
					style={{
						...gridStyle.quarter,
						...gridStyle.verticalSharedStyles,
					}}
				>
					quarter
				</p>
			</Grid.Cell>
			<Grid.Cell isQuarter>
				<p
					style={{
						...gridStyle.quarter,
						...gridStyle.verticalSharedStyles,
					}}
				>
					quarter
				</p>
			</Grid.Cell>
		</Grid>
	);
};
