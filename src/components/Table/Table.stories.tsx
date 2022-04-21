import React from 'react';
import { Meta, Story } from '@storybook/react';

import Table, { ITableProps } from './Table';
import Checkbox from '../Checkbox/Checkbox';
import SuccessIcon from '../Icon/SuccessIcon/SuccessIcon';
import Button from '../Button/Button';

export default {
	title: 'Table/Table',
	component: Table,
	parameters: {
		docs: {
			description: {
				component: (Table as any).peek.description,
			},
		},
	},
	args: Table.defaultProps,
} as Meta;

export const Basic: Story<ITableProps> = (args) => (
	<Table {...args}>
		<Table.Thead>
			<Table.Tr>
				<Table.Th>
					<Checkbox />
				</Table.Th>
				<Table.Th>Lorem</Table.Th>
				<Table.Th>Ipsum</Table.Th>
				<Table.Th>Solit</Table.Th>
				<Table.Th>Dolar</Table.Th>
			</Table.Tr>
		</Table.Thead>
		<Table.Tbody>
			<Table.Tr>
				<Table.Td>
					<Checkbox />
				</Table.Td>
				<Table.Td>Bar</Table.Td>
				<Table.Td>Foo</Table.Td>
				<Table.Td>FooBar</Table.Td>
				<Table.Td>BarFoo</Table.Td>
			</Table.Tr>
		</Table.Tbody>
	</Table>
);

/* Standard */
export const Standard: Story<ITableProps> = (args) => {
	const { Thead, Tbody, Tr, Th, Td } = Table;

	return (
		<Table {...args}>
			<Thead>
				<Tr>
					<Th rowSpan={2}>
						<Checkbox />
					</Th>
					<Th rowSpan={2} isSortable>
						Lorem.
					</Th>
					<Th rowSpan={2}>
						<SuccessIcon />
					</Th>
					<Th rowSpan={2}>Button</Th>
					<Th rowSpan={2} isSorted sortDirection='up'>
						Sorted Column
					</Th>
					<Th colSpan={3} align='center'>
						Alignments
					</Th>
				</Tr>
				<Tr>
					<Th align='left'>align left</Th>
					<Th align='center'>align center</Th>
					<Th align='right' isSortable isSorted>
						align right
					</Th>
				</Tr>
			</Thead>
			<Tbody>
				<Tr>
					<Td>
						<Checkbox />
					</Td>
					<Td>Text</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActive>
					<Td>
						<Checkbox />
					</Td>
					<Td>Row active</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>isDisabled</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td>Text && isActionable</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td>isDisabled && isActionable</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>Link</a>
					</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>isDisabled Link</a>
					</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>Link && isActionable</a>
					</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>isDisabled Link && isActionable</a>
					</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isDisabled>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected && isDisabled</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isActionable>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected && isActionable</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isDisabled isActionable>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected && isDisabled && isActionable</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable isActive>
					<Td>
						<Checkbox />
					</Td>
					<Td>isActive</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable isActive isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>isActive && isDisabled</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
			</Tbody>
		</Table>
	);
};

/* Gray Header */
export const GrayHeader: Story<ITableProps> = (args) => {
	const { Thead, Tbody, Tr, Th, Td } = Table;

	return (
		<Table {...args} hasLightHeader={false}>
			<Thead>
				<Tr>
					<Th rowSpan={2}>RS</Th>
					<Th rowSpan={2}>
						<Checkbox />
					</Th>
					<Th rowSpan={2} isSortable>
						Lorem.
					</Th>
					<Th rowSpan={2}>
						<SuccessIcon />
					</Th>
					<Th rowSpan={2}>Button</Th>
					<Th rowSpan={2} isSorted sortDirection='up'>
						Sorted Column
					</Th>
					<Th align='left'>align left</Th>
					<Th align='center'>align center</Th>
					<Th align='right' isSortable isSorted>
						align right
					</Th>
				</Tr>
			</Thead>
			<Tbody>
				<Tr>
					<Td rowSpan={14} hasBorderRight>
						RS
					</Td>
					<Td>
						<Checkbox />
					</Td>
					<Td>Text</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>isDisabled</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td>Text && isActionable</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td>isDisabled && isActionable</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>Link</a>
					</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>isDisabled Link</a>
					</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>Link && isActionable</a>
					</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>isDisabled Link && isActionable</a>
					</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isDisabled>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected && isDisabled</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isActionable>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected && isActionable</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isDisabled isActionable>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected && isDisabled && isActionable</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable isActive>
					<Td>
						<Checkbox />
					</Td>
					<Td>isActive</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable isActive isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>isActive && isDisabled</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
			</Tbody>
		</Table>
	);
};

/* Compressed */
export const Compressed: Story<ITableProps> = (args) => {
	const { Thead, Tbody, Tr, Th, Td } = Table;

	return (
		<Table {...args} density='compressed'>
			<Thead>
				<Tr>
					<Th rowSpan={2}>RS</Th>
					<Th rowSpan={2}>
						<Checkbox />
					</Th>
					<Th rowSpan={2} isSortable isResizable>
						Sortable and resizable.
					</Th>
					<Th rowSpan={2}>
						<SuccessIcon />
					</Th>
					<Th rowSpan={2}>Button</Th>
					<Th rowSpan={2} isSorted sortDirection='up' isResizable>
						Sorted Column
					</Th>
					<Th colSpan={3} align='center'>
						Alignments
					</Th>
				</Tr>
				<Tr>
					<Th align='left'>align left</Th>
					<Th align='center' isResizable>
						align center
					</Th>
					<Th align='right' isSortable isSorted>
						align right
					</Th>
				</Tr>
			</Thead>
			<Tbody>
				<Tr>
					<Td rowSpan={14} hasBorderRight>
						RS
					</Td>
					<Td>
						<Checkbox />
					</Td>
					<Td>Text</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>isDisabled</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td>Text && isActionable</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td>isDisabled && isActionable</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>Link</a>
					</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>isDisabled Link</a>
					</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>Link && isActionable</a>
					</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>isDisabled Link && isActionable</a>
					</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isDisabled>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected && isDisabled</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isActionable>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected && isActionable</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isDisabled isActionable>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected && isDisabled && isActionable</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable isActive>
					<Td>
						<Checkbox />
					</Td>
					<Td>isActive</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable isActive isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>isActive && isDisabled</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
			</Tbody>
		</Table>
	);
};

/* With Border */
export const WithBorder: Story<ITableProps> = (args) => {
	const { Thead, Tbody, Tr, Th, Td } = Table;

	return (
		<Table {...args} hasBorder>
			<Thead>
				<Tr>
					<Th rowSpan={2}>
						<Checkbox />
					</Th>
					<Th rowSpan={2} isSortable>
						Lorem.
					</Th>
					<Th rowSpan={2}>
						<SuccessIcon />
					</Th>
					<Th rowSpan={2}>Button</Th>
					<Th rowSpan={2} isSorted sortDirection='up'>
						Sorted Column
					</Th>
					<Th colSpan={3} align='center'>
						Alignments
					</Th>
				</Tr>
				<Tr>
					<Th align='left'>align left</Th>
					<Th align='center'>align center</Th>
					<Th align='right' isSortable isSorted>
						align right
					</Th>
				</Tr>
			</Thead>
			<Tbody>
				<Tr>
					<Td>
						<Checkbox />
					</Td>
					<Td>Text</Td>
					<Td>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left'>align left</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>isDisabled</Td>
					<Td>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left'>align left</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td>Text && isActionable</Td>
					<Td>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left'>align left</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td>isDisabled && isActionable</Td>
					<Td>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left'>align left</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>Link</a>
					</Td>
					<Td>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left'>align left</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>isDisabled Link</a>
					</Td>
					<Td>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left'>align left</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>Link && isActionable</a>
					</Td>
					<Td>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left'>align left</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>isDisabled Link && isActionable</a>
					</Td>
					<Td>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left'>align left</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected</Td>
					<Td>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left'>align left</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isDisabled>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected && isDisabled</Td>
					<Td>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left'>align left</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isActionable>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected && isActionable</Td>
					<Td>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left'>align left</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isDisabled isActionable>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected && isDisabled && isActionable</Td>
					<Td>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left'>align left</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable isActive>
					<Td>
						<Checkbox />
					</Td>
					<Td>isActive</Td>
					<Td>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left'>align left</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable isActive isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>isActive && isDisabled</Td>
					<Td>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left'>align left</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
			</Tbody>
		</Table>
	);
};

/* With Empty Column */
export const WithEmptyColumn: Story<ITableProps> = (args) => {
	const { Thead, Tbody, Tr, Th, Td } = Table;

	return (
		<Table {...args}>
			<Thead>
				<Tr>
					<Th rowSpan={2}>RS</Th>
					<Th rowSpan={2}>
						<Checkbox />
					</Th>
					<Th rowSpan={2} isSortable>
						Empty
					</Th>
					<Th rowSpan={2}>
						<SuccessIcon />
					</Th>
					<Th rowSpan={2}>Button</Th>
					<Th rowSpan={2} isSorted sortDirection='up'>
						Sorted Column
					</Th>
					<Th colSpan={3} align='center'>
						Alignments
					</Th>
				</Tr>
				<Tr>
					<Th align='left'>align left</Th>
					<Th align='center'>align center</Th>
					<Th align='right' isSortable isSorted>
						align right
					</Th>
				</Tr>
			</Thead>
			<Tbody>
				<Tr>
					<Td rowSpan={14} hasBorderRight>
						RS
					</Td>
					<Td>
						<Checkbox />
					</Td>
					<Td isEmpty>No Data</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td isEmpty>No Data</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td isEmpty>No Data</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td isEmpty>No Data</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr>
					<Td>
						<Checkbox />
					</Td>
					<Td isEmpty>No Data</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td isEmpty>No Data</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td isEmpty>No Data</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td isEmpty>No Data</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td isEmpty>No Data</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isDisabled>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td isEmpty>No Data</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isActionable>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td isEmpty>No Data</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isDisabled isActionable>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td isEmpty>No Data</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable isActive>
					<Td>
						<Checkbox />
					</Td>
					<Td isEmpty>No Data</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable isActive isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td isEmpty>No Data</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
			</Tbody>
		</Table>
	);
};

/* No Hover */
export const NoHover: Story<ITableProps> = (args) => {
	const { Thead, Tbody, Tr, Th, Td } = Table;

	return (
		<Table {...args} hasHover={false}>
			<Thead>
				<Tr>
					<Th rowSpan={2}>
						<Checkbox />
					</Th>
					<Th rowSpan={2} isSortable>
						Lorem.
					</Th>
					<Th rowSpan={2}>
						<SuccessIcon />
					</Th>
					<Th rowSpan={2}>Button</Th>
					<Th rowSpan={2} isSorted sortDirection='up'>
						Sorted Column
					</Th>
					<Th colSpan={3} align='center'>
						Alignments
					</Th>
				</Tr>
				<Tr>
					<Th align='left'>align left</Th>
					<Th align='center'>align center</Th>
					<Th align='right' isSortable isSorted>
						align right
					</Th>
				</Tr>
			</Thead>
			<Tbody>
				<Tr>
					<Td>
						<Checkbox />
					</Td>
					<Td>Text</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>isDisabled</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td>Text && isActionable</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td>isDisabled && isActionable</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>Link</a>
					</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>isDisabled Link</a>
					</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>Link && isActionable</a>
					</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isActionable isDisabled>
					<Td>
						<Checkbox />
					</Td>
					<Td>
						<a href='#'>isDisabled Link && isActionable</a>
					</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isDisabled>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected && isDisabled</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isActionable>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected && isActionable</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small'>button</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
				<Tr isSelected isDisabled isActionable>
					<Td>
						<Checkbox isSelected={true} />
					</Td>
					<Td>isSelected && isDisabled && isActionable</Td>
					<Td hasBorderLeft hasBorderRight>
						<SuccessIcon />
					</Td>
					<Td>
						<Button size='small' isDisabled={true}>
							button
						</Button>
					</Td>
					<Td>Sorted Column</Td>
					<Td align='left' hasBorderLeft>
						align left
					</Td>
					<Td align='center'>align center</Td>
					<Td align='right'>align right</Td>
				</Tr>
			</Tbody>
		</Table>
	);
};
