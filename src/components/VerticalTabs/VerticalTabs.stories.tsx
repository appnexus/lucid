import { map } from 'lodash';
import React from 'react';
import { Meta } from '@storybook/react';

import {
	d3Scale,
	Lines,
	SuccessIcon,
	VerticalTabs,
	WarningIcon,
} from '../../index';

//👇 Provide Storybook with the component name, 'section', any subcomponents and a description
export default {
	title: 'Navigation/VerticalTabs',
	component: VerticalTabs,
	parameters: {
		docs: {
			description: {
				component: VerticalTabs.peek.description,
			},
		},
	},
} as Meta;

//👇 Destructure any child components that we will need
const { Tab, Title } = VerticalTabs;

//👇 Add a key prop to each child element of the array
function addKeys(children: any) {
	return map(children, (child, index) => ({ ...child, key: index }));
}

//👇 Create a “template” of how args map to rendering
const Template: any = (args) => {
	return (
		<section>
			<VerticalTabs {...args} />
		</section>
	);
};

//👇 Each story then reuses that template

/** Default: Title as Prop */
export const Default = Template.bind({});
Default.args = {
	children: addKeys([
		<Tab Title='One'>One content</Tab>,
		<Tab Title='Two'>Two content</Tab>,
		<Tab Title='Three'>Three content</Tab>,
		<Tab Title='Four'>Four content</Tab>,
	]),
};

/** Title as Child */
export const TitleAsChild = Template.bind({});
TitleAsChild.args = {
	children: addKeys([
		<Tab>
			<Title>One</Title>
			One content
		</Tab>,

		<Tab>
			<Title>Two</Title>
			Two content
		</Tab>,

		<Tab>
			<Title>Three</Title>
			Three content
		</Tab>,

		<Tab>
			<Title>Four</Title>
			Four content
		</Tab>,
	]),
};

/** Complex Title as Child */
const dataSet = [
	{ x: 'OR', y: 1 },
	{ x: 'CA', y: 0 },
	{ x: 'WA', y: 3 },
	{ x: 'NY', y: 2 },
	{ x: 'TX', y: 1 },
	{ x: 'WV', y: 3 },
];

const width = 200;
const height = 50;
const xScale = d3Scale.scalePoint().domain(map(dataSet, 'x')).range([0, width]);

const yScale = d3Scale.scaleLinear().domain([0, 4]).range([height, 0]);

const titleThree = (
	<span>
		<h2 style={{ margin: 0 }}>Performance</h2>
		<svg width={width} height={height}>
			<Lines data={dataSet} xScale={xScale} yScale={yScale} />
		</svg>
	</span>
);

export const ComplexTitleAsChild = Template.bind({});
ComplexTitleAsChild.args = {
	children: addKeys([
		<VerticalTabs.Tab>
			<Title>
				<h2 style={{ margin: 0 }}>One</h2>
				<SuccessIcon />
				<span
					style={{
						fontWeight: 'normal',
						marginLeft: '5px',
					}}
				>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				</span>
			</Title>
			One content
		</VerticalTabs.Tab>,

		<VerticalTabs.Tab>
			<VerticalTabs.Title>
				<h2 style={{ margin: 0 }}>Two</h2>
				<WarningIcon />
				<span
					style={{
						fontWeight: 'normal',
						marginLeft: '5px',
					}}
				>
					Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</span>
			</VerticalTabs.Title>
			Two content
		</VerticalTabs.Tab>,

		<VerticalTabs.Tab>
			<VerticalTabs.Title>{titleThree}</VerticalTabs.Title>
			Three content
		</VerticalTabs.Tab>,

		<VerticalTabs.Tab>
			<VerticalTabs.Title>Four</VerticalTabs.Title>
			Four content
		</VerticalTabs.Tab>,
	]),
};
