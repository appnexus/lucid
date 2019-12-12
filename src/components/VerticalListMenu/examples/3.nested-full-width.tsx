import _ from 'lodash';
import React, { useState } from 'react';
import { VerticalListMenu } from '../../../index';

export default () => {
	const [currentList, setCurrentList] = useState('one');
	const [selectedIndices, setSelectedIndices] = useState([0]);
	const handleSelect = (currentList: string, index: number) => {
		setCurrentList(currentList);
		setSelectedIndices([index]);
	};
	return (
		<VerticalListMenu
			onSelect={_.partial(handleSelect, 'one')}
			selectedIndices={currentList === 'one' ? selectedIndices : []}
		>
			<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
			<VerticalListMenu.Item isExpanded={true}>
				Level one with VerticalListMenu
				<VerticalListMenu
					onSelect={_.partial(handleSelect, 'two')}
					selectedIndices={currentList === 'two' ? selectedIndices : []}
				>
					<VerticalListMenu.Item>Level two</VerticalListMenu.Item>
					<VerticalListMenu.Item>Level two</VerticalListMenu.Item>
				</VerticalListMenu>
			</VerticalListMenu.Item>
			<VerticalListMenu.Item isExpanded={true}>
				Level one with VerticalListMenu
				<VerticalListMenu
					onSelect={_.partial(handleSelect, 'three')}
					selectedIndices={currentList === 'three' ? selectedIndices : []}
				>
					<VerticalListMenu.Item>Level two</VerticalListMenu.Item>
					<VerticalListMenu.Item isExpanded={false}>
						Level two with closed VerticalListMenu
						<VerticalListMenu
							onSelect={_.partial(handleSelect, 'four')}
							selectedIndices={currentList === 'four' ? selectedIndices : []}
						>
							<VerticalListMenu.Item>Level three</VerticalListMenu.Item>
							<VerticalListMenu.Item>Level three</VerticalListMenu.Item>
							<VerticalListMenu.Item>Level three</VerticalListMenu.Item>
						</VerticalListMenu>
					</VerticalListMenu.Item>
					<VerticalListMenu.Item>Level two</VerticalListMenu.Item>
				</VerticalListMenu>
			</VerticalListMenu.Item>
			<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
		</VerticalListMenu>
	);
};
