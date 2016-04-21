import React from 'react';
import ScrollTable from '../ScrollTable';
import Checkbox from '../../Checkbox/Checkbox';
import Button from '../../Button/Button';
import SuccessIcon from '../../Icon/SuccessIcon/SuccessIcon';

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
				hasExtraWhitespace
				tableWidth={2000}
			>
				<Thead>
					<Tr>
						<Th rowSpan={2}>RS</Th>
						<Th hasCheckbox rowSpan={2}>
							<Checkbox></Checkbox>
						</Th>
						<Th rowSpan={2} isSortable isResizable>Sortable and resizable.</Th>
						<Th hasIcon rowSpan={2}><SuccessIcon/></Th>
						<Th rowSpan={2}>Button</Th>
						<Th rowSpan={2} isSorted sortDirection='up' isResizable>Sorted Column</Th>
						<Th colSpan={3} align='center'>Alignments</Th>
					</Tr>
					<Tr>
						<Th align='left'>align left</Th>
						<Th align='center' isResizable>align center</Th>
						<Th align='right' isSortable isSorted>align right</Th>
					</Tr>
				</Thead>
				<Tbody>
					<Tr>
						<Td rowSpan={14} hasBorderRight>RS</Td>
						<Td hasCheckbox><Checkbox/></Td>
						<Td>Text</Td>
						<Td hasIcon hasBorderLeft hasBorderRight><SuccessIcon/></Td>
						<Td hasButton><Button size='small'>button</Button></Td>
						<Td>Sorted Column</Td>
						<Td align='left' hasBorderLeft>align left</Td>
						<Td align='center'>align center</Td>
						<Td align='right'>align right</Td>
					</Tr>
					<Tr isDisabled>
						<Td hasCheckbox><Checkbox/></Td>
						<Td>isDisabled</Td>
						<Td hasIcon hasBorderLeft hasBorderRight><SuccessIcon/></Td>
						<Td hasButton><Button size='small' isDisabled={true}>button</Button></Td>
						<Td>Sorted Column</Td>
						<Td align='left' hasBorderLeft>align left</Td>
						<Td align='center'>align center</Td>
						<Td align='right'>align right</Td>
					</Tr>
					<Tr hasDetails>
						<Td hasCheckbox><Checkbox/></Td>
						<Td>Text && hasDetails</Td>
						<Td hasIcon hasBorderLeft hasBorderRight><SuccessIcon/></Td>
						<Td hasButton><Button size='small'>button</Button></Td>
						<Td>Sorted Column</Td>
						<Td align='left' hasBorderLeft>align left</Td>
						<Td align='center'>align center</Td>
						<Td align='right'>align right</Td>
					</Tr>
					<Tr isDisabled hasDetails>
						<Td hasCheckbox><Checkbox/></Td>
						<Td>isDisabled && hasDetails</Td>
						<Td hasIcon hasBorderLeft hasBorderRight><SuccessIcon/></Td>
						<Td hasButton><Button size='small' isDisabled={true}>button</Button></Td>
						<Td>Sorted Column</Td>
						<Td align='left' hasBorderLeft>align left</Td>
						<Td align='center'>align center</Td>
						<Td align='right'>align right</Td>
					</Tr>
					<Tr>
						<Td hasCheckbox><Checkbox/></Td>
						<Td><a href='#'>Link</a></Td>
						<Td hasIcon hasBorderLeft hasBorderRight><SuccessIcon/></Td>
						<Td hasButton><Button size='small'>button</Button></Td>
						<Td>Sorted Column</Td>
						<Td align='left' hasBorderLeft>align left</Td>
						<Td align='center'>align center</Td>
						<Td align='right'>align right</Td>
					</Tr>
					<Tr isDisabled>
						<Td hasCheckbox><Checkbox/></Td>
						<Td><a href='#'>isDisabled Link</a></Td>
						<Td hasIcon hasBorderLeft hasBorderRight><SuccessIcon/></Td>
						<Td hasButton><Button size='small' isDisabled={true}>button</Button></Td>
						<Td>Sorted Column</Td>
						<Td align='left' hasBorderLeft>align left</Td>
						<Td align='center'>align center</Td>
						<Td align='right'>align right</Td>
					</Tr>
					<Tr hasDetails>
						<Td hasCheckbox><Checkbox/></Td>
						<Td><a href='#'>Link && hasDetails</a></Td>
						<Td hasIcon hasBorderLeft hasBorderRight><SuccessIcon/></Td>
						<Td hasButton><Button size='small'>button</Button></Td>
						<Td>Sorted Column</Td>
						<Td align='left' hasBorderLeft>align left</Td>
						<Td align='center'>align center</Td>
						<Td align='right'>align right</Td>
					</Tr>
					<Tr hasDetails isDisabled>
						<Td hasCheckbox><Checkbox/></Td>
						<Td><a href='#'>isDisabled Link && hasDetails</a></Td>
						<Td hasIcon hasBorderLeft hasBorderRight><SuccessIcon/></Td>
						<Td hasButton><Button size='small' isDisabled={true}>button</Button></Td>
						<Td>Sorted Column</Td>
						<Td align='left' hasBorderLeft>align left</Td>
						<Td align='center'>align center</Td>
						<Td align='right'>align right</Td>
					</Tr>
					<Tr isSelected>
						<Td hasCheckbox><Checkbox isSelected={true}/></Td>
						<Td>isSelected</Td>
						<Td hasIcon hasBorderLeft hasBorderRight><SuccessIcon/></Td>
						<Td hasButton><Button size='small'>button</Button></Td>
						<Td>Sorted Column</Td>
						<Td align='left' hasBorderLeft>align left</Td>
						<Td align='center'>align center</Td>
						<Td align='right'>align right</Td>
					</Tr>
					<Tr isSelected isDisabled>
						<Td hasCheckbox><Checkbox isSelected={true}/></Td>
						<Td>isSelected && isDisabled</Td>
						<Td hasIcon hasBorderLeft hasBorderRight><SuccessIcon/></Td>
						<Td hasButton><Button size='small' isDisabled={true}>button</Button></Td>
						<Td>Sorted Column</Td>
						<Td align='left' hasBorderLeft>align left</Td>
						<Td align='center'>align center</Td>
						<Td align='right'>align right</Td>
					</Tr>
					<Tr isSelected hasDetails>
						<Td hasCheckbox><Checkbox isSelected={true}/></Td>
						<Td>isSelected && hasDetails</Td>
						<Td hasIcon hasBorderLeft hasBorderRight><SuccessIcon/></Td>
						<Td hasButton><Button size='small'>button</Button></Td>
						<Td>Sorted Column</Td>
						<Td align='left' hasBorderLeft>align left</Td>
						<Td align='center'>align center</Td>
						<Td align='right'>align right</Td>
					</Tr>
					<Tr isSelected isDisabled hasDetails>
						<Td hasCheckbox><Checkbox isSelected={true}/></Td>
						<Td>isSelected && isDisabled && hasDetails</Td>
						<Td hasIcon hasBorderLeft hasBorderRight><SuccessIcon/></Td>
						<Td hasButton><Button size='small' isDisabled={true}>button</Button></Td>
						<Td>Sorted Column</Td>
						<Td align='left' hasBorderLeft>align left</Td>
						<Td align='center'>align center</Td>
						<Td align='right'>align right</Td>
					</Tr>
					<Tr hasDetails isActive>
						<Td hasCheckbox><Checkbox/></Td>
						<Td>isActive</Td>
						<Td hasIcon hasBorderLeft hasBorderRight><SuccessIcon/></Td>
						<Td hasButton><Button size='small'>button</Button></Td>
						<Td>Sorted Column</Td>
						<Td align='left' hasBorderLeft>align left</Td>
						<Td align='center'>align center</Td>
						<Td align='right'>align right</Td>
					</Tr>
					<Tr hasDetails isActive isDisabled>
						<Td hasCheckbox><Checkbox/></Td>
						<Td>isActive && isDisabled</Td>
						<Td hasIcon hasBorderLeft hasBorderRight><SuccessIcon/></Td>
						<Td hasButton><Button size='small' isDisabled={true}>button</Button></Td>
						<Td>Sorted Column</Td>
						<Td align='left' hasBorderLeft>align left</Td>
						<Td align='center'>align center</Td>
						<Td align='right'>align right</Td>
					</Tr>
				</Tbody>
			</ScrollTable>
		);
	}
});
