import React from 'react';
import createClass from 'create-react-class';
import { Submarine } from '../../../index';

export default createClass({
	render() {
		return (
			<section
				style={{
					height: 600,
					background: 'lightgray',
					outline: '1px solid lightgray',
				}}
			>

				<Submarine position="top">
					<Submarine.Bar>
						Bitters shabby chic tacos, sapiente drinking vinegar readymade gochujang typewriter. Gluten-free cred sartorial pop-up commodo.
					</Submarine.Bar>
					<Submarine.Primary>

						<Submarine position="bottom">
							<Submarine.Bar>
								Id mumblecore blue bottle vegan, fingerstache commodo health goth man bun bitters. Ad ennui authentic, offal humblebrag paleo minim vero hammock kickstarter reprehenderit gastropub.
							</Submarine.Bar>
							<Submarine.Primary>
								Dreamcatcher jean shorts veniam paleo humblebrag, nihil venmo consequat. Tempor kickstarter fingerstache veniam austin, assumenda lomo eu YOLO small batch 3 wolf moon. Chia offal cliche, thundercats try-hard before they sold out tofu freegan ethical scenester polaroid quis next level jean shorts. Sed hoodie ullamco, XOXO laboris yuccie farm-to-table narwhal jean shorts odio affogato irure. Marfa echo park mixtape pinterest accusamus, ullamco normcore deep v hammock. Odio cronut authentic id sunt, knausgaard YOLO. Roof party mollit kickstarter sustainable sriracha.
							</Submarine.Primary>
						</Submarine>

					</Submarine.Primary>
				</Submarine>

			</section>
		);
	},
});
