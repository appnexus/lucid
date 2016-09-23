import React from 'react';
import { BarChart, OverlayWrapper } from '../../../index';

export default React.createClass({
	render() {
		return (
			<OverlayWrapper isVisible>
				<OverlayWrapper.Message>Message Goes Here</OverlayWrapper.Message>
				<BarChart
					data={[
						{ x: '2015-01-01', y: 1 },
						{ x: '2015-01-02', y: 2 },
						{ x: '2015-01-03', y: 3 },
						{ x: '2015-01-04', y: 5 },
					]}
				/>
			</OverlayWrapper>
		);
	},
});
