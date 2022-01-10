import React from 'react';
import { Story, Meta } from '@storybook/react';

import OverlayWrapper, { IOverlayWrapperProps } from './OverlayWrapper';
import BarChart from '../BarChart/BarChart';

export default {
	title: 'Utility/OverlayWrapper',
	component: OverlayWrapper,
	parameters: {
		docs: {
			description: {
				component: OverlayWrapper.peek.description,
			},
		},
	},
} as Meta;

/* Basic */
export const Basic: Story<IOverlayWrapperProps> = (args) => {
	return (
		<OverlayWrapper {...args} isVisible>
			<OverlayWrapper.Message>Message Goes Here</OverlayWrapper.Message>
			<BarChart
				data={[
					{ x: '2015-01-01', y: 1 },
					{ x: '2015-01-02', y: 2 },
					{ x: '2015-01-03', y: 3 },
					{ x: '2015-01-04', y: 5 },
				]}
			/>
		</OverlayWrapper>
	);
};
