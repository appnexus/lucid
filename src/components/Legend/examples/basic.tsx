import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../../util/style-helpers';
import {
	FC,
	omitProps,
	StandardProps,
	FixDefaults
} from '../../../util/component-types';
//import createClass from 'create-react-class';
import { ToolTip, chartConstants } from '../../../index';

//TODO: Ask Jon how to handle Item
//const { Item } = Legend;

const cx = lucidClassNames.bind('&-Legend');

const { number, bool, string, object } = PropTypes;

export interface ILegendProps
	extends StandardProps {
	/** Determines if the legend has points */
	hasPoint?: boolean;

	/** Determines the kind of point  */
	pointKind?: string;
		
	/** Determines if the legend has lines */
	hasLine?: boolean;

	/** Determines if the sort order of legend items is reversed or not */
	isReversed?: boolean;

	/** Strings should match an existing color class unless they start with a '#'
		for specific colors. E.g.:

		- \`COLOR_0\`
		- \`COLOR_GOOD\`
		- \`'#123abc'\`
	 */
	color?: string;
}

const defaultProps = {
	hasPoint: true,
	pointKind: "",
	hasLine: true,
	isReversed: false,
	color: chartConstants.COLOR_0,
}

//export default createClass({
//	render() {

export const Legend: FC<ILegendProps> = (props): React.ReactElement => {
	const {
		className,
		hasPoint,
		pointKind,
		hasLine,
		isReversed,
		color,
		style,
		...passThroughs
	} = props as FixDefaults<ILegendProps, typeof defaultProps>;

	const isCustomColor = _.startsWith(color, '#');
	const colorStyle = isCustomColor ? { fill: color } : null;

	return (
		<div 	
			{...omitProps<ILegendProps>(passThroughs, undefined, _.keys(Legend.propTypes))}
			className={cx(className, '&', {
				'&-has-point': hasPoint,
				[`&-${color}`]: !isCustomColor,
			})}
			pointKind={pointKind}
			hasLine
			isReversed
			style={{
				...style,
				...colorStyle,
			}}
		>
			<Legend>
				{_.map(chartConstants.PALETTE_7, (color: string, i: number) => (
					<Item key={color} hasPoint color={color}>
						{`Partner ${i}`}
					</Item>
				))}
			</Legend>

			<br />

			<Legend>
				{_.map(chartConstants.PALETTE_7, (color: string, i: number) => (
					<Item key={color} hasPoint pointKind={i} color={color}>
						{`Partner ${i}`}
					</Item>
				))}
			</Legend>

			<br />

			<Legend>
				{_.map(chartConstants.PALETTE_7, (color: string, i: number) => (
					<Item key={color} hasLine color={color}>
						{`Partner ${i}`}
					</Item>
				))}
			</Legend>

			<br />

			<Legend>
				{_.map(chartConstants.PALETTE_7, (color: string, i: number) => (
					<Item key={color} hasPoint hasLine pointKind={i} color={color}>
						{`Partner ${i}`}
					</Item>
				))}
			</Legend>

			<br />

			<Legend isReversed>
				{_.map(chartConstants.PALETTE_7, (color: string, i: number) => (
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

			<ToolTip isExpanded={true} direction='right' alignment='end' isLight={true}>
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
};

Legend.defaultProps = defaultProps;

export default Legend;