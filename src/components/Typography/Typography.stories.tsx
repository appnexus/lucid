import createClass from 'create-react-class';
import React from 'react';
import { Typography } from './../../index';
import HelpIcon from './../Icon/HelpIcon/HelpIcon';
import ToolTip from './../ToolTip/ToolTip';

export default {
	title: 'Text/Typography',
	component: Typography,
	parameters: {
		docs: {
			description: {
				component: (Typography as any).peek.description,
			},
		},
	},
};

/* Variants */
export const Variants = () => {
	const { Title, Target } = ToolTip;

	const Component = createClass({
		render() {
			return (
				<div>
					<Typography variant='h1'>h1. Heading</Typography>
					<Typography variant='h2'>h2. Heading</Typography>
					<Typography variant='h3'>h3. Heading</Typography>
					<Typography variant='p'>p. paragraph text</Typography>
					<Typography variant='tabular'>tabular. text for tables</Typography>
					<Typography variant='a'>a. link text</Typography>
					<Typography variant='pre'>pre. preformatted text</Typography>
					<Typography variant='code'>code. snazzy code</Typography> <br />
					<Typography variant='kbd'>kbd. keyboard inputs</Typography> <br />
					<Typography variant='samp'>samp. sample code outputs</Typography>{' '}
					<br />
					<Typography variant='span'>
						span. sample code outputs with help bubble
						<div className='HelpBubble'>
							<ToolTip alignment={'start'} direction={'right'}>
								<Title className='HelpBubble-title'>look at me</Title>
								<Target>
									<HelpIcon size={12} />
								</Target>
							</ToolTip>
						</div>
					</Typography>{' '}
					<br />
				</div>
			);
		},
	});

	return <Component />;
};
Variants.storyName = 'Variants';

/* Nested */
export const Nested = () => {
	const Component = createClass({
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
						rugged boogie nights mouthbrow educated burt reynolds waxy gurn man
						of the year 1986 des lynam charming villain mustachioed cardinal
						richelieu el snort. Borat d’artagnan hungarian testosterone trophy
						frontiersman hairy kiss. beefeater chevron, hairy kiss. cardinal
						richelieu groucho-a-like testosterone trophy d’artagnan dick van
						dyke rugged chevron Droopy frontiersman borat beefeater hungarian
						chevron, cardinal richelieu d’artagnan beefeater el snort Droopy
						dodgy uncle clive groucho-a-like hairy kiss. chevron frontiersman
						chevron dick van dyke walrus leader of men rugged borat bad guy
						testosterone trophy groucho-a-like alpha trion hungarian.
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

	return <Component />;
};
Nested.storyName = 'Nested';
