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
				<Submarine isResizeDisabled={true}>
					<Submarine.Bar>
						Cold-pressed aesthetic biodiesel twee, heirloom vice iPhone austin. Truffaut wolf offal roof party, neutra yr drinking vinegar bitters single-origin coffee austin mlkshk mixtape semiotics blog. Pickled squid asymmetrical locavore before they sold out whatever.
					</Submarine.Bar>
					<Submarine.Primary>
						Chartreuse keffiyeh meggings church-key, gochujang 90's messenger bag. Chillwave poutine cronut whatever occupy, squid vice organic. Tilde kinfolk whatever VHS. Swag gentrify put a bird on it, pour-over jean shorts knausgaard cray twee single-origin coffee lo-fi church-key cronut. Pabst tousled selfies try-hard. Sartorial cred ethical, food truck leggings next level sustainable flexitarian chillwave knausgaard pitchfork. Direct trade poutine photo booth mustache, cliche semiotics skateboard 90's.
						Meggings actually distillery small batch pickled quinoa. Migas williamsburg polaroid trust fund. Slow-carb truffaut chia, single-origin coffee meggings cornhole four loko chambray put a bird on it art party semiotics. Food truck mumblecore VHS photo booth, brunch direct trade flexitarian before they sold out truffaut squid cred everyday carry salvia neutra. Lo-fi chartreuse semiotics, paleo butcher knausgaard direct trade gentrify post-ironic. XOXO craft beer affogato YOLO, raw denim umami irony pabst echo park humblebrag ugh plaid. Master cleanse tilde tattooed, bushwick seitan selfies four dollar toast hashtag trust fund sartorial cliche.
					</Submarine.Primary>
				</Submarine>
			</section>
		);
	},
});
