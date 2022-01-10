import { map, times, partial } from 'lodash';
import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import VerticalListMenu from './VerticalListMenu';

//👇 Provide Storybook with the component name, 'section', any subcomponents and a description
export default {
	title: 'Navigation/VerticalListMenu',
	component: VerticalListMenu,
	parameters: {
		docs: {
			description: {
				component: VerticalListMenu.peek.description,
			},
		},
	},
} as Meta;

//👇 Add a key prop to each child element of the array
function addKeys(children: any) {
	return map(children, (child, index) => ({ ...child, key: index }));
}

//👇 Create a “template” of how args map to rendering
const Template: any = (args) => {
	return (
		<section>
			<VerticalListMenu {...args} style={{ width: 250 }} />
		</section>
	);
};

//👇 Each story then reuses that template

/**Default */
export const Basic = Template.bind({});
Basic.args = {
	children: addKeys([
		<VerticalListMenu.Item>Level one</VerticalListMenu.Item>,
		<VerticalListMenu.Item>Level one</VerticalListMenu.Item>,
		<VerticalListMenu.Item>Level one</VerticalListMenu.Item>,
	]),
};

/** Nested With Expander */
export const NestedWithExpander = () => {
	const [currentList, setCurrentList] = useState('one');
	const [selectedIndices, setSelectedIndices] = useState([0]);
	const handleSelect = (currentList: string, index: number) => {
		setCurrentList(currentList);
		setSelectedIndices([index]);
	};
	return (
		<VerticalListMenu
			style={{ width: 250 }}
			onSelect={partial(handleSelect, 'one')}
			selectedIndices={currentList === 'one' ? selectedIndices : []}
		>
			<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
			<VerticalListMenu.Item hasExpander={true}>
				Level one with VerticalListMenu
				<VerticalListMenu
					onSelect={partial(handleSelect, 'two')}
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
							onSelect={partial(handleSelect, 'three')}
							selectedIndices={currentList === 'three' ? selectedIndices : []}
						>
							{times(20, (n) => {
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

/** Nested Full Width */
export const NestedFullWidth = () => {
	const [currentList, setCurrentList] = useState('one');
	const [selectedIndices, setSelectedIndices] = useState([0]);
	const handleSelect = (currentList: string, index: number) => {
		setCurrentList(currentList);
		setSelectedIndices([index]);
	};
	return (
		<VerticalListMenu
			onSelect={partial(handleSelect, 'one')}
			selectedIndices={currentList === 'one' ? selectedIndices : []}
		>
			<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
			<VerticalListMenu.Item isExpanded={true}>
				Level one with VerticalListMenu
				<VerticalListMenu
					onSelect={partial(handleSelect, 'two')}
					selectedIndices={currentList === 'two' ? selectedIndices : []}
				>
					<VerticalListMenu.Item>Level two</VerticalListMenu.Item>
					<VerticalListMenu.Item>Level two</VerticalListMenu.Item>
				</VerticalListMenu>
			</VerticalListMenu.Item>
			<VerticalListMenu.Item isExpanded={true}>
				Level one with VerticalListMenu
				<VerticalListMenu
					onSelect={partial(handleSelect, 'three')}
					selectedIndices={currentList === 'three' ? selectedIndices : []}
				>
					<VerticalListMenu.Item>Level two</VerticalListMenu.Item>
					<VerticalListMenu.Item isExpanded={false}>
						Level two with closed VerticalListMenu
						<VerticalListMenu
							onSelect={partial(handleSelect, 'four')}
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

/** No Animations */
export const NoAnimations = Template.bind({});
NoAnimations.args = {
	children: addKeys([
		<VerticalListMenu.Item>Level one</VerticalListMenu.Item>,
		<VerticalListMenu.Item
			Collapsible={{
				isAnimated: false, // don't animate
				isMountControlled: false, // don't remove items from the dom when they are hidden
			}}
			hasExpander={true}
		>
			Level one with VerticalListMenu
			<VerticalListMenu>
				{times(20, (n) => {
					return (
						<VerticalListMenu.Item key={n}>Level two</VerticalListMenu.Item>
					);
				})}
			</VerticalListMenu>
		</VerticalListMenu.Item>,
		<VerticalListMenu.Item>Level one</VerticalListMenu.Item>,
	]),
};
