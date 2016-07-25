import React from 'react';
import {
	Button,
	RadioGroup,
	SearchField,
	Tabs,
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
				<Tabs isOpen={false} isProgressive={true}>
					<Tabs.Tab Title={titleOne}>One content</Tabs.Tab>
					<Tabs.Tab Title={titleTwo}>Two content</Tabs.Tab>
					<Tabs.Tab Title={titleThree}>Three content</Tabs.Tab>
					<Tabs.Tab Title='Disabled' isDisabled={true}>Disabled Content</Tabs.Tab>
					<Tabs.Tab Title='Five' isDisabled={true}>Four content</Tabs.Tab>
				</Tabs>
			</div>
		);
	},
});
