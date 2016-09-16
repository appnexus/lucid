import React from 'react';
import {
	Button,
	RadioGroup,
	SearchField,
	VerticalTabs,
} from '../../../index';

const titleOne = (
	<span>
		One<br />
		<Button>Button</Button>
	</span>
);
const titleTwo = (
	<span>
		Two<br/>
		Line Two
		<SearchField />
	</span>
);
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

export default React.createClass({
	render() {
		return (
			<div>
				<VerticalTabs>
					<VerticalTabs.Tab Title={titleOne}>One content</VerticalTabs.Tab>
					<VerticalTabs.Tab Title={titleTwo}>Two content</VerticalTabs.Tab>
					<VerticalTabs.Tab Title={titleThree}>Three content</VerticalTabs.Tab>
					<VerticalTabs.Tab Title='Four'>Four content</VerticalTabs.Tab>
				</VerticalTabs>
			</div>
		);
	},
});
