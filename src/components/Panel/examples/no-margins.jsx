import React from 'react';
import { Panel, Table } from '../../../index';

const {
	Thead,
	Tbody,
	Th,
	Tr,
	Td,
} = Table;

export default React.createClass({
	render() {
		return (
			<div>
				<Panel hasMargin={false}>
					<Panel.Header>
						<h3 style={{ margin: 0 }}>Title</h3>
					</Panel.Header>
					<Table style={{width: '100%'}}>
						<Thead>
							<Tr>
								<Th>Cell</Th>
								<Th>Cell</Th>
								<Th>Cell</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr>
								<Td>Cell</Td>
								<Td>Cell</Td>
								<Td>Cell</Td>
							</Tr>
							<Tr>
								<Td>Cell</Td>
								<Td>Cell</Td>
								<Td>Cell</Td>
							</Tr>
							<Tr>
								<Td>Cell</Td>
								<Td>Cell</Td>
								<Td>Cell</Td>
							</Tr>
							<Tr>
								<Td>Cell</Td>
								<Td>Cell</Td>
								<Td>Cell</Td>
							</Tr>
						</Tbody>
					</Table>
				</Panel>
			</div>
		);
	},
});
