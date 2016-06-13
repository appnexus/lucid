import _ from 'lodash';
import React from 'react';
import { ExpanderPanel } from '../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<ExpanderPanel>
					<ExpanderPanel.Header>Show More</ExpanderPanel.Header>
					{_.times(100, (n) => (
						<div>{_.repeat('-', 75 * Math.sin(n / 5))}</div>
					))}
				</ExpanderPanel>
			</div>
		);
	},
});
