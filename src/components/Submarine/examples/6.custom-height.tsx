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
				<Submarine height={100}>
					<Submarine.Bar>
						Meditation photo booth actually chicharrones sed consectetur
						voluptate stumptown. Food truck nihil ut mixtape, ex deep v polaroid
						aesthetic. Duis street art stumptown nihil, aliquip vero VHS
						heirloom waistcoat adipisicing post-ironic lo-fi biodiesel.
					</Submarine.Bar>
					<Submarine.Primary>
						Trust fund vegan godard beard, portland humblebrag placeat neutra
						chambray retro ugh kitsch flannel sapiente mustache. Cred placeat
						helvetica cray, do before they sold out tilde. Deserunt everyday
						carry brooklyn kombucha yr fanny pack banh mi, eiusmod
						intelligentsia tempor tacos. Waistcoat neutra kale chips, keffiyeh
						ex nulla gochujang crucifix duis typewriter hashtag reprehenderit.
						Ad nihil mixtape 8-bit, photo booth anim post-ironic vegan qui put a
						bird on it crucifix. Waistcoat chartreuse ethical, adipisicing jean
						shorts direct trade PBR&B humblebrag pariatur nulla mollit stumptown
						listicle. Flannel williamsburg vice flexitarian bespoke elit.
					</Submarine.Primary>
				</Submarine>
			</section>
		);
	},
});
