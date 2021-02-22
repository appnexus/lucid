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
		textAlign: 'center',
	},
	vertical: { height: '100px' },
};

export default createClass({
	render() {
		return (
			<div>
				<Grid>
					<Grid.Cell isHalf isOffsetHalf>
						<p style={{ ...gridStyle.half, ...gridStyle.sharedStyles }}>
							half with offset half
						</p>
					</Grid.Cell>
				</Grid>
				<Grid>
					<Grid.Cell isQuarter isOffsetQuarter>
						<p style={{ ...gridStyle.quarter, ...gridStyle.sharedStyles }}>
							quarter with offset quarter
						</p>
					</Grid.Cell>
				</Grid>
				<Grid>
					<Grid.Cell isThird isOffsetThird>
						<p style={{ ...gridStyle.third, ...gridStyle.sharedStyles }}>
							third with offset third
						</p>
					</Grid.Cell>
				</Grid>
			</div>
		);
	},
});
