import React from 'react';
import { Story, Meta } from '@storybook/react';

import HelpIcon from './../Icon/HelpIcon/HelpIcon';
import ToolTip from './../ToolTip/ToolTip';
import Typography, { ITypographyProps } from './Typography';

export default {
	title: 'Text/Typography',
	component: Typography,
	parameters: {
		docs: {
			description: {
				component: Typography.peek.description,
			},
		},
	},
} as Meta;

/* Variants */
export const Variants: Story<ITypographyProps> = (args) => {
	const { Title, Target } = ToolTip;

	return (
		<section>
			<Typography {...args} variant='h1'>
				h1. Heading
			</Typography>
			<br />
			<Typography {...args} variant='h2'>
				h2. Heading
			</Typography>
			<br />
			<Typography {...args} variant='h3'>
				h3. Heading
			</Typography>
			<br />
			<Typography {...args} variant='p'>
				p. paragraph text
			</Typography>
			<br />
			<Typography {...args} variant='tabular'>
				tabular. text for tables
			</Typography>
			<br />
			<Typography {...args} variant='a'>
				a. link text
			</Typography>
			<br />
			<Typography {...args} variant='pre'>
				pre. preformatted text
			</Typography>
			<br />
			<Typography {...args} variant='code'>
				code. snazzy code
			</Typography>
			<br />
			<Typography {...args} variant='kbd'>
				kbd. keyboard inputs
			</Typography>
			<br />
			<Typography {...args} variant='samp'>
				samp. sample code outputs
			</Typography>
			<br />
			<Typography {...args} variant='span'>
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
		</section>
	);
};

/* Nested */
export const Nested: Story<ITypographyProps> = (args) => {
	return (
		<section>
			<Typography {...args} variant='h1'>
				Title
			</Typography>
			<Typography {...args} variant='h2'>
				subtitle
			</Typography>
			<Typography {...args} variant='p'>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Pencil mustachioed
				graeme souness, mustachioed waxy gurn rugged el snort graeme souness
				burt reynolds educated village people boogie nights pencil man of the
				year 1986, pencil village people graeme souness rugged boogie nights
				mouthbrow educated burt reynolds waxy gurn man of the year 1986 des
				lynam charming villain mustachioed cardinal richelieu el snort. Borat
				d’artagnan hungarian testosterone trophy frontiersman hairy kiss.
				beefeater chevron, hairy kiss. cardinal richelieu groucho-a-like
				testosterone trophy d’artagnan dick van dyke rugged chevron Droopy
				frontiersman borat beefeater hungarian chevron, cardinal richelieu
				d’artagnan beefeater el snort Droopy dodgy uncle clive groucho-a-like
				hairy kiss. chevron frontiersman chevron dick van dyke walrus leader of
				men rugged borat bad guy testosterone trophy groucho-a-like alpha trion
				hungarian.
			</Typography>
			<br />
			<Typography {...args} variant='a' style={{ display: 'block' }}>
				Like!
			</Typography>
			<br />
			<Typography {...args} variant='a' style={{ display: 'block' }}>
				Subscribe!
			</Typography>
			<br />
			<Typography {...args} variant='h3'>
				Code Example
			</Typography>
			<Typography {...args} variant='code'>
				npm install all-the-things
			</Typography>
		</section>
	);
};
