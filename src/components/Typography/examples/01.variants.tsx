import createClass from 'create-react-class';
import React from 'react';
import { Typography } from '../../../index';
import HelpIcon from '../../Icon/HelpIcon/HelpIcon';
import ToolTip from '../../ToolTip/ToolTip';

const { Title, Target } = ToolTip;

export default createClass({
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
				<Typography variant='samp'>samp. sample code outputs</Typography> <br />
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
				</Typography> <br />
			</div>
		);
	},
});
