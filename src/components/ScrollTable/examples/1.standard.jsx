import React from 'react';
import _ from 'lodash';
import ScrollTable from '../ScrollTable';
const {
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
} = ScrollTable;

export default React.createClass({
	render() {
		return(
			<ScrollTable
				style={{
					width: 200,
					height: 300,
				}}
			>
				<Thead>
					<Tr>
						<Th>column a</Th>
						<Th>column b</Th>
						<Th>column c</Th>
						<Th>column c</Th>
						<Th>column c</Th>
						<Th>column c</Th>
						<Th>column c</Th>
					</Tr>
				</Thead>
				<Tbody>
					{_.times(20, () => (
						<Tr>
							<Td>row a</Td>
							<Td>row b</Td>
							<Td>row c</Td>
							<Td>row c</Td>
							<Td>row c</Td>
							<Td>row c</Td>
							<Td>row c</Td>
						</Tr>
					))}
				</Tbody>
			</ScrollTable>
		);
	}
});
