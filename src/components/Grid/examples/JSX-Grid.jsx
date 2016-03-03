import React from 'react';
import _ from 'lodash';
import {Grid, Cell} from '../Grid';

const gridStyle = {
	half: {
		background: '#0089c4',
	},
	quarter: { background: '#f7403a' },
	third: {background: '#3fa516', color: '#f3f3f3'},
	auto: {background: '#c5c5c5', color: '#f3f3f3'},
	flexdefault: {background: '#feb209'},
	sharedStyles: {
		padding: '5px 10px',
		borderRadius: '5px',
		color: '#f3f3f3',
	},
	vertical: {height: '100px'}
}

const fillCells = (count) => {
	const cells = [];
	for (var i=0; i < count; i++) {
		cells.push(
			<Cell key={i}>
				<p style={assign(gridStyle.auto)}>auto</p>
			</Cell>
		);
	}
	return cells;
}
const assign = (styles) => {
	return _.assign(styles, gridStyle.sharedStyles)
};

export default React.createClass({
	render() {
		return (
			<Grid is-vertical>
				<Grid is-horizontal>
					<Cell is-half>
						<p  style={assign(gridStyle.half)}>half</p>
					</Cell>
					{fillCells(1)}
					<Cell is-third>
						<p style={assign(gridStyle.third)}>third</p>
					</Cell>
					<Cell is-quarter>
						<p style={assign(gridStyle.quarter)}>quarter</p>
					</Cell>
				</Grid>
				<Grid>
					<Cell is-full>
						<p style={assign(gridStyle.full)}>full</p>
					</Cell>
				</Grid>
				<Grid>
					<Cell is-2>
						<p>2</p>
					</Cell>
					{fillCells(12-2)}
				</Grid>
				<Grid>
					<Cell is-3>
						<p style={assign(gridStyle.flexdefault)}>3</p>
					</Cell>
					{fillCells(12-3)}
				</Grid>
				<Grid>
					<Cell is-4>
						<p style={assign(gridStyle.flexdefault)}>4</p>
					</Cell>
					{fillCells(12-4)}
				</Grid>
				<Grid>
					<Cell is-5>
						<p style={assign(gridStyle.flexdefault)}>5</p>
					</Cell>
					{fillCells(12-5)}
				</Grid>
				<Grid>
					<Cell is-6>
						<p style={assign(gridStyle.flexdefault)}>6</p>
					</Cell>
					{fillCells(12-6)}
				</Grid>
				<Grid>
					<Cell is-7>
						<p style={assign(gridStyle.flexdefault)}>7</p>
					</Cell>
					{fillCells(12-7)}
				</Grid>
				<Grid>
					<Cell is-8>
						<p style={assign(gridStyle.flexdefault)}>8</p>
					</Cell>
					{fillCells(12-8)}
				</Grid>
				<Grid>
					<Cell is-9>
						<p style={assign(gridStyle.flexdefault)}>9</p>
					</Cell>
					{fillCells(12-9)}
				</Grid>
				<Grid>
					<Cell is-10>
						<p style={assign(gridStyle.flexdefault)}>10</p>
					</Cell>
					{fillCells(12-10)}
				</Grid>
				<Grid>
					<Cell is-11>
						<p style={assign(gridStyle.flexdefault)}>11</p>
					</Cell>
					{fillCells(12-11)}
				</Grid>
				<Grid>
					<Cell is-quarter is-offset-quarter>
						<p style={assign(gridStyle.quarter)}>quarter with offset quarter</p>
					</Cell>
				</Grid>
				<Grid>
					<Cell is-third is-offset-third>
						<p style={assign(gridStyle.quarter)}>third with offset third</p>
					</Cell>
				</Grid>
				<Grid is-gutterless>
					<Cell is-half>
						<p style={assign(gridStyle.half)}>gutterless half</p>
				</Cell>
				<Cell style={assign(gridStyle.quarter)} is-quarter>gutterless quarter</Cell>
					{fillCells(1)}
				</Grid>
			</Grid>
		)
	}
});
