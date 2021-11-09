import React from 'react';
import createClass from 'create-react-class';
import { Button, Checkbox, SuccessIcon, Table } from './../../index';

export default {
	title: 'Controls/Table',
	component: Table,
	parameters: {
		docs: {
			description: {
				component: (Table as any).peek.description,
			},
		},
	},
};

/* Standard */
export const Standard = () => {
	const { Thead, Tbody, Tr, Th, Td } = Table;

	const Component = createClass({
		render() {
			return (
				<Table>
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
		},
	});

	return <Component />;
};
Standard.storyName = 'Standard';

/* Gray Header */
export const GrayHeader = () => {
	const { Thead, Tbody, Tr, Th, Td } = Table;

	const Component = createClass({
		render() {
			return (
				<Table hasLightHeader={false}>
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
		},
	});

	return <Component />;
};
GrayHeader.storyName = 'GrayHeader';

/* Compressed */
export const Compressed = () => {
	const { Thead, Tbody, Tr, Th, Td } = Table;

	const Component = createClass({
		render() {
			return (
				<Table density='compressed'>
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
		},
	});

	return <Component />;
};
Compressed.storyName = 'Compressed';

/* With Border */
export const WithBorder = () => {
	const { Thead, Tbody, Tr, Th, Td } = Table;

	const Component = createClass({
		render() {
			return (
				<Table hasBorder>
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
		},
	});

	return <Component />;
};
WithBorder.storyName = 'WithBorder';

/* With Empty Column */
export const WithEmptyColumn = () => {
	const { Thead, Tbody, Tr, Th, Td } = Table;

	const Component = createClass({
		render() {
			return (
				<Table>
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
		},
	});

	return <Component />;
};
WithEmptyColumn.storyName = 'WithEmptyColumn';

/* No Hover */
export const NoHover = () => {
	const { Thead, Tbody, Tr, Th, Td } = Table;

	const Component = createClass({
		render() {
			return (
				<Table hasHover={false}>
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
		},
	});

	return <Component />;
};
NoHover.storyName = 'NoHover';
