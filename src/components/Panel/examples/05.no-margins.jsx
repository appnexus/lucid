import React from 'react';
import createClass from 'create-react-class';
import { Panel, Table } from '../../../index';

const { Thead, Tbody, Th, Tr, Td } = Table;

export default createClass({
	render() {
		return (
			<Panel hasMargin={false}>

				<Panel.Header>
					<strong>Header</strong>
				</Panel.Header>

				<Table style={{ width: '100%' }}>
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
		);
	},
});
