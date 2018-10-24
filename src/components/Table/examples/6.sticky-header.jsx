import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { Button, Checkbox, SuccessIcon, Table } from '../../../index';

const { Thead, Tbody, Tr, Th, Td } = Table;

const COLUMN_WIDTH = '200px';
const FIRST_COLUMN_WIDTH = '150px';
const TABLE_HEIGHT = '300px';

function renderHeader(onlyFixedColumns) {
	return (
		<Thead>
			<Tr>
				{onlyFixedColumns ? (
					<Th style={{ width: FIRST_COLUMN_WIDTH }}>RS</Th>
				) : (
					[
						<Th style={{ width: COLUMN_WIDTH }}>
							<Checkbox />
						</Th>,
						<Th style={{ width: COLUMN_WIDTH }} isSortable>
							Empty
						</Th>,
						<Th style={{ width: COLUMN_WIDTH }}>
							<SuccessIcon />
						</Th>,
						<Th style={{ width: COLUMN_WIDTH }}>Button</Th>,
						<Th style={{ width: COLUMN_WIDTH }} isSorted sortDirection="up">
							Sorted Column
						</Th>,
					]
				)}
			</Tr>
		</Thead>
	);
}

function renderRow(n, onlyFixedColumns) {
	const style =
		n === 0
			? {
					width: onlyFixedColumns ? FIRST_COLUMN_WIDTH : COLUMN_WIDTH,
					boxSizing: 'border-box',
				}
			: { boxSizing: 'border-box' };
	return (
		<Tr style={{ height: '150px' }} isActionable>
			{onlyFixedColumns ? (
				/*<Td style={style}>prettylongtextthatdoesnthaveanywordbreaksinitimgoingtomessupyourtablehehehe</Td>*/
				<Td style={style}>
					<div>
						one tw tw tw tw tw tw tw tw tw tw tw tw tw tw tw tw tw tw tw tw tw
						tw tw tw tw tw tw tw tw tw tw tw tw tw tw tw tw tw tw tw tw tw tw tw
						twooooooooooooooooooooooooooooooooooooooooooooo
					</div>
				</Td>
			) : (
				[
					<Td style={style}>
						<Checkbox />
					</Td>,
					<Td style={style} isEmpty>
						No Data
					</Td>,
					<Td style={style}>
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
				<div style={{ display: 'flex' }}>
					{/* table header fixed column(s) */}
					<div style={{ width: FIRST_COLUMN_WIDTH, flexShrink: 0 }}>
						<Table style={{ tableLayout: 'fixed' }}>{renderHeader(true)}</Table>
					</div>

					{/* table header unfixed column(s) */}
					<div
						style={{
							overflowY: 'scroll',
							overflowX: 'hidden',
						}}
						ref={ref => (this.headerUnfixedColumns = ref)}
					>
						<Table style={{ tableLayout: 'fixed', width: '100%' }}>
							{renderHeader(false)}
						</Table>
					</div>
				</div>

				<div style={{ display: 'flex' }}>
					{/* table body fixed column(s) */}
					<div
						style={{
							width: FIRST_COLUMN_WIDTH,
							height: TABLE_HEIGHT,
							overflowY: 'hidden',
							overflowX: 'scroll',
							flexShrink: 0,
						}}
						ref={ref => (this.bodyFixedColumns = ref)}
					>
						<Table style={{ tableLayout: 'fixed', width: '100%' }}>
							<Tbody>{_.times(50, n => renderRow(n, true))}</Tbody>
						</Table>
					</div>

					{/* table body unfixed column(s) */}
					<div
						style={{
							height: TABLE_HEIGHT,
							overflowY: 'scroll',
							overflowX: 'scroll',
						}}
						onScroll={e => {
							this.headerUnfixedColumns.scrollLeft = e.target.scrollLeft;
							this.bodyFixedColumns.scrollTop = e.target.scrollTop;
						}}
					>
						<Table style={{ tableLayout: 'fixed', width: '100%' }}>
							<Tbody>{_.times(50, n => renderRow(n, false))}</Tbody>
						</Table>
					</div>
				</div>
			</div>
		);
	},
});
