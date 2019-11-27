import React from 'react';
import { ModernHybridToolTip } from '../ToolTip';

const { Title, Target, Body } = ModernHybridToolTip;

console.log('jdlm', ModernHybridToolTip.Title);

export default () => (
	<ModernHybridToolTip>
		<Title>yolo</Title>
		<Body>bro</Body>
		<Target>hover</Target>
	</ModernHybridToolTip>
);
