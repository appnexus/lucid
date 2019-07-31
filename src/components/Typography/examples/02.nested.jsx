import React from 'react';
import createClass from 'create-react-class';
import { Typography } from '../../../index';

export default createClass({
	render() {
		return (
			<section>
				<Typography variant='h1'>Title</Typography>
				<Typography variant='h2'>subtitle</Typography>
				<Typography variant='p'>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Pencil
					mustachioed graeme souness, mustachioed waxy gurn rugged el snort
					graeme souness burt reynolds educated village people boogie nights
					pencil man of the year 1986, pencil village people graeme souness
					rugged boogie nights mouthbrow educated burt reynolds waxy gurn man of
					the year 1986 des lynam charming villain mustachioed cardinal
					richelieu el snort. Borat d’artagnan hungarian testosterone trophy
					frontiersman hairy kiss. beefeater chevron, hairy kiss. cardinal
					richelieu groucho-a-like testosterone trophy d’artagnan dick van dyke
					rugged chevron Droopy frontiersman borat beefeater hungarian chevron,
					cardinal richelieu d’artagnan beefeater el snort Droopy dodgy uncle
					clive groucho-a-like hairy kiss. chevron frontiersman chevron dick van
					dyke walrus leader of men rugged borat bad guy testosterone trophy
					groucho-a-like alpha trion hungarian.
					<br />
					<br />
					<Typography variant='a' style={{ display: 'block' }}>
						Like!
					</Typography>
					<Typography variant='a' style={{ display: 'block' }}>
						Subscribe!
					</Typography>
					<br />
					<Typography variant='h3'>Code Example</Typography>
					<Typography variant='code'>npm install all-the-things</Typography>
				</Typography>
			</section>
		);
	},
});
