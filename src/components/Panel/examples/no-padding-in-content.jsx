import React from 'react';
import Panel from '../Panel';

export default React.createClass({
	render() {
		return (
			<div>
				<Panel isGutterless={true}>
					<Panel.Header>
						<h3 style={{ margin: 0 }}>Title</h3>
					</Panel.Header>
					<table className={'pure-table pure-table-horizontal'} style={{width: '100%'}}>
						<thead>
							<tr>
								<th>Cell</th>
								<th>Cell</th>
								<th>Cell</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Cell</td>
								<td>Cell</td>
								<td>Cell</td>
							</tr>
							<tr>
								<td>Cell</td>
								<td>Cell</td>
								<td>Cell</td>
							</tr>
							<tr>
								<td>Cell</td>
								<td>Cell</td>
								<td>Cell</td>
							</tr>
							<tr>
								<td>Cell</td>
								<td>Cell</td>
								<td>Cell</td>
							</tr>
						</tbody>
					</table>
				</Panel>
			</div>
		);
	}
});
