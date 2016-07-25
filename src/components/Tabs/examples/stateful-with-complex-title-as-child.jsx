import React from 'react';
import {
	Button,
	RadioGroup,
	SearchField,
	Tabs,
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
				<Tabs>
					<Tabs.Tab>
						<Tabs.Title>
							<span>
								One<br />
								<Button>Button</Button>
							</span>
						</Tabs.Title>
						One content
					</Tabs.Tab>

					<Tabs.Tab>
						<Tabs.Title>
							<span>
								Two<br/>
								Line Two
								<SearchField />
							</span>
						</Tabs.Title>
						Two content
					</Tabs.Tab>

					<Tabs.Tab>
						<Tabs.Title>{titleThree}</Tabs.Title>
						Three content
					</Tabs.Tab>

					<Tabs.Tab isDisabled={true}>
						<Tabs.Title>Four</Tabs.Title>
						Four content
					</Tabs.Tab>
				</Tabs>
			</div>
		);
	},
});
