import React from 'react';
import { DotsIcon } from '../../../../index';

const blockStyle = {
	display: 'block',
	margin: '10px',
};

export default () => (
	<div>
		<DotsIcon style={blockStyle} />
		<DotsIcon style={blockStyle} color='secondary-one' />
		<DotsIcon style={blockStyle} color='secondary-two' />
		<DotsIcon style={blockStyle} color='secondary-three' />
		<DotsIcon style={blockStyle} color='success' />
		<DotsIcon style={blockStyle} color='neutral-dark' />
		<DotsIcon style={blockStyle} color='neutral-light' />
		<DotsIcon style={blockStyle} direction='vertical' />
		<DotsIcon style={blockStyle} direction='vertical' color='secondary-one' />
		<DotsIcon style={blockStyle} direction='vertical' color='secondary-two' />
		<DotsIcon style={blockStyle} direction='vertical' color='secondary-three' />
		<DotsIcon style={blockStyle} direction='vertical' color='success' />
		<DotsIcon style={blockStyle} direction='vertical' color='neutral-dark' />
		<DotsIcon style={blockStyle} direction='vertical' color='neutral-light' />
	</div>
);
