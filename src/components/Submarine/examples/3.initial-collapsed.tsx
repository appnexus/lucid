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
				<Submarine initialState={{ isExpanded: false }}>
					<Submarine.Bar>
						Try-hard cornhole ea artisan, laborum wolf eiusmod chillwave irure.
						Lomo chicharrones taxidermy narwhal. Cronut deep v PBR&B photo booth
						tilde. Asymmetrical waistcoat williamsburg 3 wolf moon, poutine
						magna dreamcatcher disrupt eiusmod thundercats farm-to-table
						lumbersexual nisi mlkshk tote bag.
					</Submarine.Bar>
					<Submarine.Primary>
						Celiac ad skateboard twee PBR&B. XOXO freegan pitchfork, waistcoat
						listicle flexitarian mollit adipisicing. Delectus freegan et
						sartorial, velit occupy exercitation fingerstache +1 ramps.
						Exercitation pitchfork kale chips, eu everyday carry nostrud
						aesthetic etsy health goth DIY nisi fingerstache wolf neutra velit.
						Migas helvetica odio taxidermy. Truffaut meditation cray small
						batch, schlitz master cleanse cliche taxidermy labore gochujang
						bitters. Synth fixie banh mi bushwick shoreditch cold-pressed.
					</Submarine.Primary>
				</Submarine>
			</section>
		);
	},
});
