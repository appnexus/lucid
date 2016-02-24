import React from 'react';
import {Grid, Cell} from '../Grid';

export default React.createClass({
	render() {
		return (
			<Grid>
				<Grid>
					<Cell is-full> full </Cell>
				</Grid>
				<Grid>
					<Cell is-half> half </Cell>
					<Cell>auto</Cell>
				</Grid>
				<Grid is-vertical>
					<Cell is-third>third</Cell>
					<Cell>auto</Cell>
					<Cell>auto</Cell>
				</Grid>
				<Grid is-horizontal>
					<Cell is-quarter>quarter</Cell>
					<Cell>auto</Cell>
				</Grid>
				<Grid is-multiline>
					<Cell is-2>2</Cell>
					<Cell is-3>3</Cell>
					<Cell is-4>4</Cell>
					<Cell is-5>5</Cell>
					<Cell is-6>6</Cell>
					<Cell is-7>7</Cell>
					<Cell is-8>8</Cell>
					<Cell is-9>9</Cell>
					<Cell is-10>10</Cell>
					<Cell is-11>11</Cell>
				</Grid>
				<Grid is-multiline>
					<Cell is-2 is-offset-quarter>2 with offset quarter</Cell>
					<Cell is-3 is-offset-third>3 with offset third</Cell>
					<Cell is-4 is-offset-half>4 with offset half</Cell>
					<Cell is-5 is-offset-1>5 with offset 1</Cell>
				</Grid>
				<Grid is-gutterless>
					<Cell is-half>gutterless half</Cell>
					<Cell is-quarter>gutterless quarter</Cell>
					<Cell>auto</Cell>
				</Grid>
			</Grid>
		);
	}
});
