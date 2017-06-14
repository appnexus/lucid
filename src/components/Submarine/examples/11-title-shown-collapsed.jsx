import React from 'react';
import createClass from 'create-react-class';
import { Submarine } from '../../../index';

export default createClass({
	render() {
		return (
			<section
				style={{
					height: 300,
					background: 'lightgray',
					outline: '1px solid lightgray',
				}}
			>
				<Submarine isTitleShownCollapsed={true}>
					<Submarine.Title>
						Submarine Title Stays While Collapsed!
					</Submarine.Title>
					<Submarine.Bar>
						Minim 90's paleo retro, fugiat aliqua hashtag enim photo booth
						listicle next level. Consectetur proident magna culpa. Art party meh
						ad, four loko slow-carb venmo distillery wolf cornhole nisi.
						Truffaut meditation cray small batch, schlitz master cleanse cliche
						taxidermy labore gochujang bitters. Synth fixie banh mi bushwick
						shoreditch cold-pressed.
					</Submarine.Bar>
					<Submarine.Primary>
						Helvetica narwhal irony, hoodie leggings occaecat tattooed authentic
						cred. Tumblr cred quinoa normcore, mumblecore cardigan cold-pressed
						dreamcatcher craft beer ad direct trade vero accusamus cray. Roof
						party chia shabby chic synth. Pariatur organic before they sold out
						everyday carry food truck. Labore four loko nihil, narwhal actually
						infolk mustache jean shorts. Meh kickstarter chicharrones
						williamsburg bushwick yr, PBR&B fap. Lo-fi leggings magna yuccie,
						tattooed accusamus blog literally gochujang listicle cliche
						humblebrag swag kombucha tousled.
					</Submarine.Primary>
				</Submarine>
			</section>
		);
	},
});
