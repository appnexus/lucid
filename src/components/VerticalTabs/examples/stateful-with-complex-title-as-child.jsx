import React from 'react';
import {
	Button,
	RadioGroup,
	SearchField,
	VerticalTabs,
} from '../../../index';

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
					<VerticalTabs.Tab>
						<VerticalTabs.Title>
							One<br />
							<Button>Button</Button>
						</VerticalTabs.Title>
						One content
					</VerticalTabs.Tab>

					<VerticalTabs.Tab>
						<VerticalTabs.Title>
							Two<br/>
							Line Two
							<SearchField />
						</VerticalTabs.Title>
						Two content
					</VerticalTabs.Tab>

					<VerticalTabs.Tab>
						<VerticalTabs.Title>{titleThree}</VerticalTabs.Title>
						Three content
					</VerticalTabs.Tab>

					<VerticalTabs.Tab>
						<VerticalTabs.Title>Four</VerticalTabs.Title>
						Four content
					</VerticalTabs.Tab>
				</VerticalTabs>
			</div>
		);
	},
});
