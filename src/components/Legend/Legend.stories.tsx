import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { Legend, ToolTip, chartConstants } from './../../index';

export default {
	title: 'Visualizations/Chart Primitives/Legend',
	component: Legend,
	parameters: {
		docs: {
			description: {
				component: (Legend as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	const { Item } = Legend;

	const Component = createClass({
		render() {
			return (
				<div>
					<Legend>
						{_.map(chartConstants.PALETTE_7, (color, i) => (
							<Item key={color} hasPoint color={color}>
								{`Partner ${i}`}
							</Item>
						))}
					</Legend>

					<br />

					<Legend>
						{_.map(chartConstants.PALETTE_7, (color, i) => (
							<Item key={color} hasPoint pointKind={i} color={color}>
								{`Partner ${i}`}
							</Item>
						))}
					</Legend>

					<br />

					<Legend>
						{_.map(chartConstants.PALETTE_7, (color, i) => (
							<Item key={color} hasLine color={color}>
								{`Partner ${i}`}
							</Item>
						))}
					</Legend>

					<br />

					<Legend>
						{_.map(chartConstants.PALETTE_7, (color, i) => (
							<Item key={color} hasPoint hasLine pointKind={i} color={color}>
								{`Partner ${i}`}
							</Item>
						))}
					</Legend>

					<br />

					<Legend isReversed>
						{_.map(chartConstants.PALETTE_7, (color, i) => (
							<Item key={color} hasPoint hasLine pointKind={i} color={color}>
								{`Partner ${i}`}
							</Item>
						))}
					</Legend>

					<br />

					<Legend orient='horizontal'>
						<Item hasLine color={chartConstants.COLOR_GOOD}>
							Revenue
						</Item>
						<Item hasLine color={chartConstants.COLOR_BAD}>
							Loss
						</Item>
						<Item hasPoint color={chartConstants.COLOR_0}>
							Partner 0
						</Item>
						<Item hasPoint color={chartConstants.COLOR_1}>
							Partner 1
						</Item>
					</Legend>

					<br />

					<Legend orient='horizontal' isReversed>
						<Item hasLine color={chartConstants.COLOR_GOOD}>
							Revenue
						</Item>
						<Item hasLine color={chartConstants.COLOR_BAD}>
							Loss
						</Item>
						<Item hasPoint color={chartConstants.COLOR_0}>
							Partner 0
						</Item>
						<Item hasPoint color={chartConstants.COLOR_1}>
							Partner 1
						</Item>
					</Legend>

					<br />

					<Legend>
						<Item hasLine color={chartConstants.COLOR_GOOD}>
							Revenue
						</Item>
						<Item hasLine color={chartConstants.COLOR_BAD}>
							Loss
						</Item>
						<Item hasPoint color={chartConstants.COLOR_0}>
							Partner 0
						</Item>
						<Item hasPoint color={chartConstants.COLOR_1}>
							Partner 1
						</Item>
					</Legend>

					<br />
					<br />
					<br />

					<ToolTip
						isExpanded={true}
						direction='right'
						alignment='end'
						isLight={true}
					>
						<ToolTip.Target>Tooltip example</ToolTip.Target>

						<ToolTip.Body>
							<Legend hasBorders={false}>
								<Item hasLine color={chartConstants.COLOR_GOOD}>
									Revenue
								</Item>
								<Item hasLine color={chartConstants.COLOR_BAD}>
									Loss
								</Item>
								<Item hasPoint color={chartConstants.COLOR_0}>
									Partner 0
								</Item>
								<Item hasPoint color={chartConstants.COLOR_1}>
									Partner 1
								</Item>
							</Legend>
						</ToolTip.Body>
					</ToolTip>
				</div>
			);
		},
	});

	return <Component />;
};
Default.storyName = 'Default';
