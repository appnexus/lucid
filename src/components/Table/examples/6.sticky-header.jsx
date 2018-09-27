import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { Button, Checkbox, SuccessIcon, Table } from '../../../index';

const { Thead, Tbody, Tr, Th, Td } = Table;

function renderHeader(onlyFirstColumn) {
	return (
		<Thead>
			<Tr>
				{onlyFirstColumn ? (
					<Th rowSpan={2} style={{ width: '10%' }}>
						RS
					</Th>
				) : (
					[
						<Th rowSpan={2} style={{ width: '10%' }}>
							RS
						</Th>,
						<Th rowSpan={2} style={{ width: '10%' }}>
							<Checkbox />
						</Th>,
						<Th rowSpan={2} style={{ width: '10%' }} isSortable>
							Empty
						</Th>,
						<Th rowSpan={2} style={{ width: '10%' }}>
							<SuccessIcon />
						</Th>,
						<Th rowSpan={2} style={{ width: '10%' }}>
							Button
						</Th>,
						<Th
							rowSpan={2}
							style={{ width: '10%' }}
							isSorted
							sortDirection="up"
						>
							Sorted Column
						</Th>,
					]
				)}
			</Tr>
		</Thead>
	);
}

function renderRow(n, onlyFirstColumn) {
	const style = n === 0 ? { width: '10%' } : {};
	return (
		<Tr style={{ height: '60px' }} isActionable>
			{onlyFirstColumn ? (
				/*<Td style={style}>prettylongtextthatdoesnthaveanywordbreaksinitimgoingtomessupyourtablehehehe</Td>*/
				<Td style={style}>one</Td>
			) : (
				[
					<Td style={style}>one</Td>,
					<Td style={style}>
						<Checkbox />
					</Td>,
					<Td style={style} isEmpty>
						No Data
					</Td>,
					<Td style={style} hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>,
					<Td style={style}>
						<Button size="small">button</Button>
					</Td>,
					<Td style={style}>Sorted Column</Td>,
				]
			)}
		</Tr>
	);
}

export default createClass({
	render() {
		return (
			<div>
				<div
					style={{ width: '100%', overflow: 'hidden' }}
					ref={ref => (this.header = ref)}
				>
					<Table style={{ width: '150%', tableLayout: 'fixed' }}>
						{renderHeader(false)}
					</Table>
				</div>

				<div
					style={{ width: '100%', height: '300px', overflow: 'auto' }}
					onScroll={e => {
						this.header.scrollLeft = e.target.scrollLeft;
					}}
				>
					<Table style={{ width: '150%', tableLayout: 'fixed' }}>
						<Tbody>{_.times(50, n => renderRow(n, false))}</Tbody>
					</Table>
				</div>
			</div>
		);
	},
});
