import React from 'react';
import createClass from 'create-react-class';
import { Sidebar } from '../../../index';

export default createClass({
	render() {
		return (
			<Sidebar>
				<Sidebar.Bar>
					Bitters shabby chic tacos, sapiente drinking vinegar readymade gochujang typewriter. Gluten-free cred sartorial pop-up commodo.
				</Sidebar.Bar>
				<Sidebar.Primary>
					<Sidebar position="right">
						<Sidebar.Bar>
							Id mumblecore blue bottle vegan, fingerstache commodo health goth man bun bitters. Ad ennui authentic, offal humblebrag paleo minim vero hammock kickstarter reprehenderit gastropub.
						</Sidebar.Bar>
						<Sidebar.Primary>
							Dreamcatcher jean shorts veniam paleo humblebrag, nihil venmo consequat. Tempor kickstarter fingerstache veniam austin, assumenda lomo eu YOLO small batch 3 wolf moon. Chia offal cliche, thundercats try-hard before they sold out tofu freegan ethical scenester polaroid quis next level jean shorts. Sed hoodie ullamco, XOXO laboris yuccie farm-to-table narwhal jean shorts odio affogato irure. Marfa echo park mixtape pinterest accusamus, ullamco normcore deep v hammock. Odio cronut authentic id sunt, knausgaard YOLO. Roof party mollit kickstarter sustainable sriracha.
						</Sidebar.Primary>
					</Sidebar>
				</Sidebar.Primary>
			</Sidebar>
		);
	},
});
