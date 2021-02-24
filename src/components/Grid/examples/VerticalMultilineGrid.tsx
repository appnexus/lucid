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
	vertical: { height: '200px' },
	verticalSharedStyles: {
		margin: 0,
		padding: 0,
		color: '#f3f3f3',
		flex: 1,
	},
};

export default createClass({
	render() {
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
						style={{ ...gridStyle.quarter, ...gridStyle.verticalSharedStyles }}
					>
						quarter
					</p>
				</Grid.Cell>
				<Grid.Cell isQuarter>
					<p
						style={{ ...gridStyle.quarter, ...gridStyle.verticalSharedStyles }}
					>
						quarter
					</p>
				</Grid.Cell>
				<Grid.Cell isQuarter>
					<p
						style={{ ...gridStyle.quarter, ...gridStyle.verticalSharedStyles }}
					>
						quarter
					</p>
				</Grid.Cell>
			</Grid>
		);
	},
});
