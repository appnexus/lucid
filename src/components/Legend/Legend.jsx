import _ from 'lodash';
import React from 'react';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes } from '../../util/component-types';

import Point from '../Point/Point';
import Line from '../Line/Line';

const cx = lucidClassNames.bind('&-Legend');

const POINT_SIZE = 12;
const LINE_WIDTH = 22;

const {
	number,
	string,
	oneOf,
	bool,
	func,
} = React.PropTypes;

/**
 * {"categories": ["visualizations", "chart primitives"]}
 *
 * Contrary to the other chart primitives, this component is not rendered in
 * svg. In order to sanely render horizontal legends, we need to know the width
 * of the text elements ahead of rendering time. Since we're using a variable
 * width font, the only way I know of to correctly get the width is with the
 * DOM function `getComputedTextLength`. Variable widths are much more easy to
 * implement outside of svg.
 */
const Legend = createClass({
	displayName: 'Legend',

	statics: {
		HEIGHT: 28, // exposed for consumer convenience
	},

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root element.
		 */
		className: string,
		/**
		 * Determine orientation of the legend.
		 */
		orient: oneOf(['horizontal', 'vertical']),
		/**
		 * Show the legend borders. Turn this off if you want to put the legend in
		 * a `ToolTip` for example.
		 */
		hasBorders: bool,
	},

	getDefaultProps() {
		return {
			orient: 'vertical',
			hasBorders: true,
		};
	},

	components: {
		Item: createClass({
			displayName: 'Legend.Item',
			propsName: 'Item',
			propTypes: {
				hasPoint: bool,
				hasLine: bool,
				/**
				 * Strings should match an existing color class unless they start with a
				 * '#' for specific colors. E.g.:
				 *
				 * - `COLOR_0`
				 * - `COLOR_GOOD`
				 * - `'#123abc'`
				 */
				color: string,
				pointKind: number,
				onClick: func,
			},
		}),
	},

	handleItemClick(index, props, event) {
		if (!props.onClick) {
			return null;
		}

		props.onClick(index, { props, event });
	},

	render() {
		const {
			orient,
			className,
			hasBorders,
			...passThroughs,
		} = this.props;

		const isHorizontal = orient === 'horizontal';
		const isVertical = orient === 'vertical';
		const itemProps = _.map(findTypes(this.props, Legend.Item), 'props');
		const hasSomeLines = isVertical && _.some(itemProps, ({ hasLine }) => hasLine);

		return (
			<ul
				{...passThroughs}
				className={cx(className, '&', {
					'&-is-horizontal': isHorizontal,
					'&-is-vertical': isVertical,
					'&-has-borders': hasBorders,
				})}
			>
				{_.map(itemProps, ({
					hasLine,
					hasPoint,
					pointKind = 1,
					color,
					onClick,
					children,
				}, index) => (
					<li
						key={index}
						className={cx('&-Item')}
						onClick={_.partial(this.handleItemClick, index, itemProps)}
					>
						{hasPoint || hasLine ?
							<svg
								className={cx('&-Item-indicator')}
								width={hasLine || hasSomeLines ? LINE_WIDTH : POINT_SIZE}
								height={POINT_SIZE}
							>
								{hasPoint ?
									<Point
										x={hasLine || hasSomeLines ? LINE_WIDTH / 2 : POINT_SIZE / 2}
										y={POINT_SIZE / 2}
										color={color}
										kind={pointKind}
									/>
								: null}
								{hasLine ?
									<Line
										d={`M0,${POINT_SIZE / 2} L${LINE_WIDTH},${POINT_SIZE / 2}`}
										color={color}
									/>
								: null}
							</svg>
						: null}
						{children}
					</li>
				))}
			</ul>
		);
	},
});

export default Legend;
