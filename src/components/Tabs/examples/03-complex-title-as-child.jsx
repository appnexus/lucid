import React from 'react';
import createClass from 'create-react-class';
import { Button, RadioGroup, SearchField, Tabs } from '../../../index';

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

export default createClass({
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
