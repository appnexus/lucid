import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { ExpanderPanel } from '../../../index';

export default createClass({
	render() {
		return (
			<div>
				<ExpanderPanel>
					<ExpanderPanel.Header>Show More</ExpanderPanel.Header>
					{_.times(100, n => (
						<div key={n}>{_.repeat('-', 75 * Math.sin(n / 5))}</div>
					))}
				</ExpanderPanel>
			</div>
		);
	},
});
