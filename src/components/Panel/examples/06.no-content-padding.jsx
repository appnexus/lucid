import React from 'react';
import createReactClass from 'create-react-class';
import { Panel, Table } from '../../../index';

const { Thead, Tbody, Th, Tr, Td } = Table;

export default createReactClass({
	render() {
		return (
			<Panel isGutterless={true}>

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
