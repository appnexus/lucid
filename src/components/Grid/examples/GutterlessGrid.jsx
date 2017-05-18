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
	},
});
