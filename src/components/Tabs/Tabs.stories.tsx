import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Button, RadioGroup, SearchField, Tabs } from './../../index';
import { ITabsProps } from './Tabs';

export default {
	title: 'Navigation/Tabs',
	component: Tabs,
	parameters: {
		docs: {
			description: {
				component: Tabs.peek.description,
			},
		},
	},
} as Meta;

/* Title As Prop */
export const TitleAsProp: Story<ITabsProps> = (args) => {
	return (
		<div>
			<Tabs {...args}>
				<Tabs.Tab Title='One' className='one'>
					One content
				</Tabs.Tab>
				<Tabs.Tab Title='Two' isDisabled={true}>
					Two content
				</Tabs.Tab>
				<Tabs.Tab Title='Three'>Three content</Tabs.Tab>
				<Tabs.Tab Title='Four'>Four content</Tabs.Tab>
			</Tabs>
		</div>
	);
};
TitleAsProp.storyName = 'Title As Prop';

/* Title As Child */
export const TitleAsChild: Story<ITabsProps> = (args) => {
	return (
		<div>
			<Tabs {...args}>
				<Tabs.Tab>
					<Tabs.Title>One</Tabs.Title>
					One content
				</Tabs.Tab>

				<Tabs.Tab isDisabled={true}>
					<Tabs.Title>Two</Tabs.Title>
					Two content
				</Tabs.Tab>

				<Tabs.Tab>
					<Tabs.Title>Three</Tabs.Title>
					Three content
				</Tabs.Tab>

				<Tabs.Tab>
					<Tabs.Title>Four</Tabs.Title>
					Four content
				</Tabs.Tab>
			</Tabs>
		</div>
	);
};
TitleAsChild.storyName = 'Title As Child';

/* Complex Title As Child */
export const ComplexTitleAsChild: Story<ITabsProps> = (args) => {
	const titleThree = (
		<RadioGroup {...RadioGroup.defaultProps} selectedIndex={1}>
			<RadioGroup.RadioButton {...RadioGroup.RadioButton.defaultProps}>
				<RadioGroup.Label>Captain America</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton {...RadioGroup.RadioButton.defaultProps}>
				<RadioGroup.Label>Iron Man</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton {...RadioGroup.RadioButton.defaultProps}>
				<RadioGroup.Label>Thor</RadioGroup.Label>
			</RadioGroup.RadioButton>
		</RadioGroup>
	);

	const tabStyle = {
		height: '100px',
		width: '200px',
	};

	return (
		<div>
			<Tabs {...args} hasMultilineTitle={true}>
				<Tabs.Tab style={tabStyle}>
					<Tabs.Title>
						One
						<br />
						<Button {...Button.defaultProps}>Button</Button>
					</Tabs.Title>
					One content
				</Tabs.Tab>

				<Tabs.Tab style={tabStyle}>
					<Tabs.Title>
						Two
						<br />
						Line Two
						<SearchField />
					</Tabs.Title>
					Two content
				</Tabs.Tab>

				<Tabs.Tab style={tabStyle}>
					<Tabs.Title>{titleThree}</Tabs.Title>
					Three content
				</Tabs.Tab>

				<Tabs.Tab isDisabled={true} style={tabStyle}>
					<Tabs.Title>Four</Tabs.Title>
					Four content
				</Tabs.Tab>
			</Tabs>
		</div>
	);
};
ComplexTitleAsChild.storyName = 'Complex Title As Child';

/* Tab As Prop */
export const TabAsProp: Story<ITabsProps> = (args) => {
	return (
		<div>
			<Tabs
				{...args}
				Tab={
					[
						{ Title: 'Bert', children: 'Bert' },
						{ Title: 'Ernie', children: 'Ernie' },
					] as any
				}
			/>
		</div>
	);
};
TabAsProp.storyName = 'Tab As Prop';

/* Full Width */
export const FullWidth: Story<ITabsProps> = (args) => {
	return (
		<div>
			<Tabs {...args} hasFullWidthTabs={true}>
				<Tabs.Tab>
					<Tabs.Title>One</Tabs.Title>
					One content
				</Tabs.Tab>
				<Tabs.Tab>
					<Tabs.Title>Two</Tabs.Title>
					Two content
				</Tabs.Tab>
				<Tabs.Tab>
					<Tabs.Title>Three</Tabs.Title>
					Three content
				</Tabs.Tab>
			</Tabs>
		</div>
	);
};
FullWidth.storyName = 'Full Width';

/* Variable Width */
export const VariableWidth: Story<ITabsProps> = (args) => {
	const tabStyle = { width: '100px' };
	return (
		<div>
			<Tabs {...args} hasFullWidthTabs={false}>
				<Tabs.Tab style={tabStyle}>
					<Tabs.Title>One</Tabs.Title>
					One content
				</Tabs.Tab>
				<Tabs.Tab style={tabStyle}>
					<Tabs.Title>Two</Tabs.Title>
					Two content
				</Tabs.Tab>
				<Tabs.Tab style={tabStyle}>
					<Tabs.Title>Three</Tabs.Title>
					Three content
				</Tabs.Tab>
			</Tabs>
		</div>
	);
};
VariableWidth.storyName = 'Variable Width';

/* Progression */
export const Progression: Story<ITabsProps> = (args) => {
	return (
		<div>
			<Tabs {...args} isOpen={false} isProgressive={true}>
				<Tabs.Tab Title='One'>One content</Tabs.Tab>
				<Tabs.Tab Title='Two'>Two content</Tabs.Tab>
				<Tabs.Tab Title='Three'>Three content</Tabs.Tab>
				<Tabs.Tab Title='Disabled' isDisabled={true}>
					Disabled Content
				</Tabs.Tab>
				<Tabs.Tab Title='Five' isDisabled={true}>
					Four content
				</Tabs.Tab>
			</Tabs>
		</div>
	);
};
Progression.storyName = 'Progression';

/* Progression Variable Width */
export const ProgressionVariableWidth = (args) => {
	const tabStyle = { width: '100px' };
	return (
		<div>
			<Tabs {...args} hasFullWidthTabs={false} isOpen={false} isProgressive>
				<Tabs.Tab style={tabStyle} Title='One'>
					One content
				</Tabs.Tab>
				<Tabs.Tab style={tabStyle} Title='Two'>
					Two content
				</Tabs.Tab>
				<Tabs.Tab style={tabStyle} Title='Three'>
					Three content
				</Tabs.Tab>
				<Tabs.Tab style={tabStyle} Title='Disabled' isDisabled={true}>
					Disabled Content
				</Tabs.Tab>
				<Tabs.Tab style={tabStyle} Title='Five' isDisabled={true}>
					Four content
				</Tabs.Tab>
			</Tabs>
		</div>
	);
};
ProgressionVariableWidth.storyName = 'Progression Variable Width';

/* With Count */
export const WithCount: Story<ITabsProps> = (args) => {
	return (
		<div>
			<h4>Static Width</h4>
			<Tabs {...args} hasFullWidthTabs={false}>
				<Tabs.Tab count={12}>
					<Tabs.Title>One</Tabs.Title>
					One content
				</Tabs.Tab>
				<Tabs.Tab count={15}>
					<Tabs.Title>Two</Tabs.Title>
					Two content
				</Tabs.Tab>
				<Tabs.Tab count={7}>
					<Tabs.Title>Three</Tabs.Title>
					Three content
				</Tabs.Tab>
				<Tabs.Tab count={3} isDisabled>
					<Tabs.Title>Four</Tabs.Title>
					Four content
				</Tabs.Tab>
				<Tabs.Tab count={0} isDisabled>
					<Tabs.Title>Five</Tabs.Title>
					Five content
				</Tabs.Tab>
			</Tabs>

			<h4>Variable Width</h4>
			<Tabs {...args} hasFullWidthTabs={false}>
				<Tabs.Tab count={1231321} isVariableCountWidth={true}>
					<Tabs.Title>One</Tabs.Title>
					One content
				</Tabs.Tab>
				<Tabs.Tab count={6546541612} isVariableCountWidth={true}>
					<Tabs.Title>Two</Tabs.Title>
					Two content
				</Tabs.Tab>
				<Tabs.Tab count={7} isVariableCountWidth={true}>
					<Tabs.Title>Three</Tabs.Title>
					Three content
				</Tabs.Tab>
				<Tabs.Tab count={123} isDisabled isVariableCountWidth={true}>
					<Tabs.Title>Four</Tabs.Title>
					Four content
				</Tabs.Tab>
			</Tabs>
		</div>
	);
};
WithCount.storyName = 'With Count';

/* 10 Floating */
export const Floating: Story<ITabsProps> = (args) => {
	return (
		<div>
			<Tabs {...args} hasFullWidthTabs={false} isFloating>
				<Tabs.Tab count={12}>
					<Tabs.Title>One</Tabs.Title>
					One content
				</Tabs.Tab>
				<Tabs.Tab count={15}>
					<Tabs.Title>Two</Tabs.Title>
					Two content
				</Tabs.Tab>
				<Tabs.Tab count={7}>
					<Tabs.Title>Three</Tabs.Title>
					Three content
				</Tabs.Tab>
				<Tabs.Tab count={3} isDisabled>
					<Tabs.Title>Three</Tabs.Title>
					Three content
				</Tabs.Tab>
			</Tabs>
		</div>
	);
};
Floating.storyName = 'Floating';
