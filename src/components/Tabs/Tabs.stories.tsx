import React from 'react';
import createClass from 'create-react-class';
import { Button, RadioGroup, SearchField, Tabs } from './../../index';

export default {
	title: 'Navigation/Tabs',
	component: Tabs,
	parameters: {
		docs: {
			description: {
				component: (Tabs as any).peek.description,
			},
		},
	},
};

/* Title As Prop */
export const TitleAsProp = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<Tabs>
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
		},
	});

	return <Component />;
};
TitleAsProp.storyName = 'TitleAsProp';

/* Title As Child */
export const TitleAsChild = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<Tabs>
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
		},
	});

	return <Component />;
};
TitleAsChild.storyName = 'TitleAsChild';

/* Complex Title As Child */
export const ComplexTitleAsChild = () => {
	const titleThree = (
		<RadioGroup selectedIndex={1}>
			<RadioGroup.RadioButton>
				<RadioGroup.Label>Captain America</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton>
				<RadioGroup.Label>Iron Man</RadioGroup.Label>
			</RadioGroup.RadioButton>
			<RadioGroup.RadioButton>
				<RadioGroup.Label>Thor</RadioGroup.Label>
			</RadioGroup.RadioButton>
		</RadioGroup>
	);

	const Component = createClass({
		render() {
			const tabStyle = {
				height: '100px',
				width: '200px',
			};

			return (
				<div>
					<Tabs hasMultilineTitle={true}>
						<Tabs.Tab style={tabStyle}>
							<Tabs.Title>
								One
								<br />
								<Button>Button</Button>
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
		},
	});

	return <Component />;
};
ComplexTitleAsChild.storyName = 'ComplexTitleAsChild';

/* Tab As Prop */
export const TabAsProp = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<Tabs
						Tab={
							[
								{ Title: 'Bert', children: 'Bert' },
								{ Title: 'Ernie', children: 'Ernie' },
							] as any
						}
					/>
				</div>
			);
		},
	});

	return <Component />;
};
TabAsProp.storyName = 'TabAsProp';

/* Full Width */
export const FullWidth = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<Tabs hasFullWidthTabs={true}>
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
		},
	});

	return <Component />;
};
FullWidth.storyName = 'FullWidth';

/* Variable Width */
export const VariableWidth = () => {
	const Component = createClass({
		render() {
			const tabStyle = { width: '100px' };
			return (
				<div>
					<Tabs hasFullWidthTabs={false}>
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
		},
	});

	return <Component />;
};
VariableWidth.storyName = 'VariableWidth';

/* Progression */
export const Progression = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<Tabs isOpen={false} isProgressive={true}>
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
		},
	});

	return <Component />;
};
Progression.storyName = 'Progression';

/* Progression Variable Width */
export const ProgressionVariableWidth = () => {
	const Component = createClass({
		render() {
			const tabStyle = { width: '100px' };
			return (
				<div>
					<Tabs hasFullWidthTabs={false} isOpen={false} isProgressive>
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
		},
	});

	return <Component />;
};
ProgressionVariableWidth.storyName = 'ProgressionVariableWidth';

/* With Count */
export const WithCount = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<h4>Static Width</h4>
					<Tabs hasFullWidthTabs={false}>
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
					<Tabs hasFullWidthTabs={false}>
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
		},
	});

	return <Component />;
};
WithCount.storyName = 'WithCount';

/* 10 Floating */
export const Floating = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<Tabs hasFullWidthTabs={false} isFloating>
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
		},
	});

	return <Component />;
};
Floating.storyName = 'Floating';
