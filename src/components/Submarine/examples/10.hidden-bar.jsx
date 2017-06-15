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
				<Submarine isHidden={true}>
					<Submarine.Bar>
						You will never see me!
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
		);
	},
});
