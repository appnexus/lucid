import React from 'react';
import createClass from 'create-react-class';
import { Submarine } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			isHidden: true,
		};
	},

	handleToggleIsHidden() {
		this.setState({
			isHidden: !this.state.isHidden,
		});
	},

	render() {
		return (
			<section>
				<button onClick={this.handleToggleIsHidden}>toggle `isHidden`</button>

				<section
					style={{
						height: 300,
						background: 'lightgray',
						outline: '1px solid lightgray',
					}}
				>

					<Submarine isHidden={this.state.isHidden}>

						<Submarine.Title>
							This can be totally hidden from view
						</Submarine.Title>

						<Submarine.Bar>
							Slow-carb meditation four loko, kickstarter umami tilde craft
							beer kombucha deep v plaid yr cardigan gastropub ennui snackwave.
							Vape health goth selvage twee lumbersexual, tattooed iceland cred
							street art slow-carb craft beer pinterest banjo typewriter
							pop-up. Echo park bicycle rights put a bird on it, sriracha blue
							bottle ethical pinterest readymade messenger bag. Tousled
							slow-carb occupy messenger bag readymade, leggings celiac cloud
							bread tofu. Wayfarers chia jianbing, twee yuccie seitan meggings
							food truck meh neutra bushwick mlkshk four loko. Franzen unicorn
							tofu lumbersexual waistcoat. Taxidermy gluten-free yuccie vinyl
							waistcoat.
						</Submarine.Bar>

						<Submarine.Primary>
							Pickled pinterest hot chicken taxidermy edison bulb. Butcher austin
							listicle fingerstache unicorn flexitarian. Tumblr cred quinoa
							normcore, mumblecore cardigan cold-pressed dreamcatcher craft beer
							ad direct trade vero accusamus cray. Roof party chia shabby chic
							synth.
						</Submarine.Primary>

					</Submarine>

				</section>
			</section>
		);
	},
});
