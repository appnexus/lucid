import React from 'react';
import createClass from 'create-react-class';
import { Button, Panel } from '../../../index';

export default createClass({
	render() {
		return (
			<Panel>

				<Panel.Header>
					<strong>Header</strong>
				</Panel.Header>

				Thundercats fam glossier, affogato microdosing +1 photo booth yuccie flannel iceland. Umami wayfarers tousled, deep v glossier fanny pack single-origin coffee la croix tofu crucifix mlkshk edison bulb. Tofu four loko tbh, trust fund semiotics schlitz succulents snackwave. Tilde live-edge XOXO, stumptown skateboard flexitarian distillery trust fund semiotics selvage. Kale chips artisan twee humblebrag selfies. Scenester woke truffaut plaid meditation freegan. Prism everyday carry post-ironic +1 wolf, copper mug kale chips tilde ethical jianbing jean shorts flexitarian.
				Fanny pack quinoa heirloom put a bird on it, venmo banjo church-key +1 sartorial cardigan paleo edison bulb DIY. Scenester four loko synth unicorn cardigan shoreditch. Ugh seitan chambray swag vice. Pork belly hammock cardigan, live-edge snackwave intelligentsia biodiesel. Vegan meggings drinking vinegar crucifix iPhone hoodie. Kickstarter before they sold out distillery, next level umami echo park chillwave iceland fanny pack XOXO actually. Street art try-hard master cleanse listicle, microdosing sartorial raw denim squid.

				<Panel.Footer>
					<Button>Save</Button>
				</Panel.Footer>

			</Panel>
		);
	},
});
