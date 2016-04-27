import React from 'react';
import NexTable from '../NexTable';
//import Checkbox from '../../Checkbox/Checkbox';
//import Button from '../../Button/Button';
//import SuccessIcon from '../../Icon/SuccessIcon/SuccessIcon';

//const {
//	Thead,
//	Tbody,
//	Tr,
//	Th,
//	Td,
//} = Table;

export default React.createClass({

	_render() {
		return (
			<NexTable>
			</NexTable>
		);
	},
	
	componentWillMount() {
		const vTable = NexTable.createVirtualTable();
		this.vTable = vTable;
	},

	handleReflow() {
		this.vTable.reflow();
	},

	render() {
		let { Fragment } = NexTable;
		const vTable = this.vTable;

		return (
			<section>
				<Fragment xRef='Z' cols={2} rows={1} vTable={vTable}>
					<tr>
						<td>row 1 cell 1-</td>
						{/*<td colSpan={2}>row 1 cell 1-</td>*/}
						{/*<td>row 1 cell 2--=======<br />-<br />-</td>*/}
						<td>row 1 cell 2--=======<br />-<br />-</td>
					</tr>
				</Fragment>
				<Fragment xRef='Y' cols={2} rows={1} rowSnapTo={['Z']} vTable={vTable}>
					<tr>
						<td>row 1 cell 3---</td><td>row 1 cell 4----</td>
					</tr>
				</Fragment>
				<div>
					<Fragment xRef='X' cols={4} rows={1} colSnapTo={['Z', 'Y']} vTable={vTable}>
						<tr>
							<td>row 2 cell 1</td><td>row 2 cell 2</td><td>row 2 cell 3</td><td>row 2 cell 4</td>
						</tr>
					</Fragment>
				</div>
				<button onClick={this.handleReflow}>reflow</button>
			</section>
		);
	}
});
