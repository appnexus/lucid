import React from 'react';
import createClass from 'create-react-class';
import { Sidebar } from '../../../index';

export default createClass({
	render() {
		return (
			<Sidebar position="right">
				<Sidebar.Bar>
					Paleo art party disrupt, consequat kogi fashion axe tofu trust fund raw denim readymade. Seitan banjo salvia organic ethical. Next level pork belly sustainable tumblr nostrud.
				</Sidebar.Bar>
				<Sidebar.Primary>
					Do nesciunt lumbersexual excepteur adipisicing tacos green juice readymade semiotics, pinterest tofu VHS. Paleo dreamcatcher mollit, hoodie four dollar toast typewriter kitsch magna aliquip ethical sunt tattooed. Four dollar toast stumptown umami gastropub heirloom flexitarian. Nihil williamsburg incididunt whatever. Godard commodo bespoke tofu. Selvage polaroid echo park hella, beard flexitarian roof party dolor. Consequat kickstarter ea, sint minim selfies wolf cupidatat everyday carry.
				</Sidebar.Primary>
			</Sidebar>
		);
	},
});
