import React from 'react';
import createClass from 'create-react-class';
import { Line, chartConstants } from './../../index';

export default {
	title: 'Visualizations/Geoms/Line',
	component: Line,
	parameters: {
		docs: {
			description: {
				component: (Line as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	const Component = createClass({
		render() {
			return (
				<div>
					<svg width={200} height={120}>
						<Line color={chartConstants.COLOR_0} d='M0,0 L120,120' />
						<Line color={chartConstants.COLOR_1} d='M0,20 L120,100' />
						<Line color={chartConstants.COLOR_2} d='M0,40 L120,80' />
						<Line color={chartConstants.COLOR_3} d='M0,60 L120,60' />
						<Line color={chartConstants.COLOR_4} d='M0,80 L120,40' />
						<Line color={chartConstants.COLOR_5} d='M0,100 L120,20' />
						<Line color={chartConstants.COLOR_6} d='M0,120 L120,0' />
					</svg>

					<svg width={200} height={120}>
						<Line isDotted color={chartConstants.COLOR_0} d='M0,0 L120,120' />
						<Line isDotted color={chartConstants.COLOR_1} d='M0,20 L120,100' />
						<Line isDotted color={chartConstants.COLOR_2} d='M0,40 L120,80' />
						<Line isDotted color={chartConstants.COLOR_3} d='M0,60 L120,60' />
						<Line isDotted color={chartConstants.COLOR_4} d='M0,80 L120,40' />
						<Line isDotted color={chartConstants.COLOR_5} d='M0,100 L120,20' />
						<Line isDotted color={chartConstants.COLOR_6} d='M0,120 L120,0' />
					</svg>
				</div>
			);
		},
	});

	return <Component />;
};
Default.storyName = 'Default';
