import React from 'react';
import createClass from 'create-react-class';
import { Grid } from '../../../index';

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

const fillCells = count => {
	const cells = [];
	for (var i = 0; i < count; i++) {
		cells.push(
			<Grid.Cell key={i}>
				<p style={{ ...gridStyle.auto, ...gridStyle.sharedStyles }}>auto</p>
			</Grid.Cell>
		);
	}
	return cells;
};

export default createClass({
	render() {
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
	},
});
