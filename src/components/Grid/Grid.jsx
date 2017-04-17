import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Grid');

const { string, bool, node } = PropTypes;

/**
 * {"categories": ["layout"]}
 *
 * This component is designed to be used in Composites as a layout tool.
 * You can use the Grid components themselves or create your own components using the Grid styles from Grid.less.
 * Please see examples for more information.
 */
const Grid = createClass({
	displayName: 'Grid',

	components: {
		/**
		 * Renders an `<article>` as the grid cell
		 */
		Cell: createClass({
			displayName: 'Grid.Cell',
			propTypes: {
				/**
				 * fill all twelve columns of the primary grid axis
				 */
				isFull: bool,
				/**
				 * fill six columns of the primary grid axis
				 */
				isHalf: bool,
				/**
				 * fill four columns of the primary grid axis
				 */
				isThird: bool,
				/**
				 * fill three columns of the primary grid axis
				 */
				isQuarter: bool,

				/**
				 * fill 2 columns of 12
				 */
				is2: bool,
				/**
				 *  fill 3 columns of 12
				 */
				is3: bool,
				/**
				 * fill 4 columns of 12
				 */
				is4: bool,
				/**
				 * fill 5 columns of 12
				 */
				is5: bool,
				/**
				 * fill 6 columns of 12
				 */
				is6: bool,
				/**
				 * fill 7 columns of 12
				 */
				is7: bool,
				/**
				 * fill 8 columns of 12
				 */
				is8: bool,
				/**
				 * fill 9 columns of 12
				 */
				is9: bool,
				/**
				 * fill 10 columns of 12
				 */
				is10: bool,
				/**
				 * fill 11 columns of 12
				 */
				is11: bool,
				/**
				 * offset a grid cell by three columns
				 */
				isOffsetQuarter: bool,
				/**
				 * offset a grid cell by four columns
				 */
				isOffsetThird: bool,
				/**
				 * offset a grid cell by six columns
				 */
				isOffsetHalf: bool,
			},
		}),
	},

	propTypes: {
		/**
		 * Appended to the component-specific class names set on the root
		 * element.
		 */
		className: string,

		/**
		 * explicitly set the primary axis of the grid to Y
		 */
		isVertical: bool,

		/**
		 * explicitly set the primary axis of the grid to X
		 */
		isHorizontal: bool,

		/**
		 * a grid without padding separating grid cells
		 */
		isGutterless: bool,

		/**
		 * Allow Grids to wrap multiple lines
		 */
		isMultiline: bool,

		/**
		 * Any valid React component
		 */
		children: node,
	},

	render() {
		const {
			className,
			children,
			isVertical,
			isHorizontal,
			isGutterless,
			isMultiline,
			...passThroughs
		} = this.props;

		const cellChildProps = _.map(findTypes(this.props, Grid.Cell), 'props');

		return (
			<section
				{...omitProps(passThroughs, Grid)}
				className={cx(
					'&',
					{
						'&-is-vertical': isVertical,
						'&-is-horizontal': isHorizontal,
						'&-is-gutterless': isGutterless,
						'&-is-multiline': isMultiline,
					},
					className
				)}
			>
				{_.map(cellChildProps, (cellChildProp, index) => {
					return (
						<article
							{...omitProps(cellChildProp, Grid.Cell)}
							key={index}
							className={cx(
								'&-Cell',
								{
									'&-Cell-is-full': cellChildProp.isFull,
									'&-Cell-is-half': cellChildProp.isHalf,
									'&-Cell-is-quarter': cellChildProp.isQuarter,
									'&-Cell-is-third': cellChildProp.isThird,
									'&-Cell-is-2': cellChildProp.is2,
									'&-Cell-is-3': cellChildProp.is3,
									'&-Cell-is-4': cellChildProp.is4,
									'&-Cell-is-5': cellChildProp.is5,
									'&-Cell-is-6': cellChildProp.is6,
									'&-Cell-is-7': cellChildProp.is7,
									'&-Cell-is-8': cellChildProp.is8,
									'&-Cell-is-9': cellChildProp.is9,
									'&-Cell-is-10': cellChildProp.is10,
									'&-Cell-is-11': cellChildProp.is11,
									'&-Cell-is-offset-quarter': cellChildProp.isOffsetQuarter,
									'&-Cell-is-offset-third': cellChildProp.isOffsetThird,
									'&-Cell-is-offset-half': cellChildProp.isOffsetHalf,
								},
								cellChildProp.className
							)}
						>
							{cellChildProp.children}
						</article>
					);
				})}
				{children}
			</section>
		);
	},
});

export default Grid;
