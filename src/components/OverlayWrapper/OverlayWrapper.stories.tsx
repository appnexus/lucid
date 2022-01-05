import React from 'react';
import createClass from 'create-react-class';
import OverlayWrapper from './OverlayWrapper';
import BarChart from '../BarChart/BarChart';

export default {
	title: 'Utility/OverlayWrapper',
	component: OverlayWrapper,
	parameters: {
		docs: {
			description: {
				component: (OverlayWrapper as any).peek.description,
			},
		},
	},
};

/* Basic */
export const Basic = () => {
	const Component = createClass({
		render() {
			return (
				<OverlayWrapper isVisible>
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
		},
	});

	return <Component />;
};
