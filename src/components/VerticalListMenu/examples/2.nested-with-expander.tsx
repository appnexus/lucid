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
			style={{ width: 250 }}
			onSelect={_.partial(handleSelect, 'one')}
			selectedIndices={currentList === 'one' ? selectedIndices : []}
		>
			<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
			<VerticalListMenu.Item hasExpander={true}>
				Level one with VerticalListMenu
				<VerticalListMenu
					onSelect={_.partial(handleSelect, 'two')}
					selectedIndices={currentList === 'two' ? selectedIndices : []}
				>
					<VerticalListMenu.Item>Level two</VerticalListMenu.Item>
					<VerticalListMenu.Item hasExpander={true}>
						Level two with VerticalListMenu and lots of text. Lorem quos natus
						mollitia nihil quasi! Necessitatibus corporis aliquam quam laborum
						nesciunt quaerat. Nostrum distinctio officiis adipisci nulla unde
						repellat. Soluta eaque ex obcaecati molestiae provident aspernatur
						sit! Expedita et.
						<VerticalListMenu
							onSelect={_.partial(handleSelect, 'three')}
							selectedIndices={currentList === 'three' ? selectedIndices : []}
						>
							{_.times(50, (n) => {
								return (
									<VerticalListMenu.Item key={n}>
										Level three
									</VerticalListMenu.Item>
								);
							})}
						</VerticalListMenu>
					</VerticalListMenu.Item>
					<VerticalListMenu.Item>Level two</VerticalListMenu.Item>
				</VerticalListMenu>
			</VerticalListMenu.Item>
			<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
		</VerticalListMenu>
	);
};
