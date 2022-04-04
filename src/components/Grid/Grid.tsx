import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { findTypes, StandardProps } from '../../util/component-types';

const cx = lucidClassNames.bind('&-Grid');

const { string, bool, node } = PropTypes;

// -----------------------------------------------------------------------------
// Cell child component
// -----------------------------------------------------------------------------
export interface ICellProps extends StandardProps {
	/** fill all twelve columns of the primary grid axis */
	isFull?: boolean;

	/** fill six columns of the primary grid axis */
	isHalf?: boolean;

	/** fill four columns of the primary grid axis */
	isThird?: boolean;

	/** fill three columns of the primary grid axis */
	isQuarter?: boolean;

	/** fill 2 columns of 12 */
	is2?: boolean;

	/** fill 3 columns of 12 */
	is3?: boolean;

	/** fill 4 columns of 12 */
	is4?: boolean;

	/** fill 5 columns of 12 */
	is5?: boolean;

	/** fill 6 columns of 12 */
	is6?: boolean;

	/** fill 7 columns of 12 */
	is7?: boolean;

	/** fill 8 columns of 12 */
	is8?: boolean;

	/** fill 9 columns of 12 */
	is9?: boolean;

	/** fill 10 columns of 12 */
	is10?: boolean;

	/** fill 11 columns of 12 */
	is11?: boolean;

	/** offset a grid cell by three columns */
	isOffsetQuarter?: boolean;

	/** offset a grid cell by four columns */
	isOffsetThird?: boolean;

	/** offset a grid cell by six columns */
	isOffsetHalf?: boolean;
}

const Cell = (_props: ICellProps): null => null;
Cell.displayName = 'Grid.Cell';
Cell.peek = {
	description: `Renders an \`<article>\` as the grid cell`,
};
Cell.propTypes = {
	/**
		fill all twelve columns of the primary grid axis
	*/
	isFull: bool,

	/**
		fill six columns of the primary grid axis
	*/
	isHalf: bool,

	/**
		fill four columns of the primary grid axis
	*/
	isThird: bool,

	/**
		fill three columns of the primary grid axis
	*/
	isQuarter: bool,

	/**
		fill 2 columns of 12
	*/
	is2: bool,

	/**
		fill 3 columns of 12
	*/
	is3: bool,

	/**
		fill 4 columns of 12
	*/
	is4: bool,

	/**
		fill 5 columns of 12
	*/
	is5: bool,

	/**
		fill 6 columns of 12
	*/
	is6: bool,

	/**
		fill 7 columns of 12
	*/
	is7: bool,

	/**
		fill 8 columns of 12
	*/
	is8: bool,

	/**
		fill 9 columns of 12
	*/
	is9: bool,

	/**
		fill 10 columns of 12
	*/
	is10: bool,

	/**
		fill 11 columns of 12
	*/
	is11: bool,

	/**
		offset a grid cell by three columns
		*/
	isOffsetQuarter: bool,

	/**
		offset a grid cell by four columns
	*/
	isOffsetThird: bool,

	/**
		offset a grid cell by six columns
	*/
	isOffsetHalf: bool,
};
Cell.peek = {
	description: `Renders an \`<article>\` as the grid cell.`,
};

// -----------------------------------------------------------------------------
// Grid
// -----------------------------------------------------------------------------
export interface IGridProps
	extends StandardProps,
		React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
	/** explicitly set the primary axis of the grid to Y */
	isVertical?: boolean;

	/** explicitly set the primary axis of the grid to X */
	isHorizontal?: boolean;

	/** a grid without padding separating grid cells */
	isGutterless?: boolean;

	/** Allow Grids to wrap multiple lines */
	isMultiline?: boolean;

	/** Any valid React component */
	children?: React.ReactNode;
}

// TODO: This functional component should be refactored so it doesn't have to omit props
const nonPassThroughs = [
	'isFull',
	'isHalf',
	'isThird',
	'isQuarter',
	'is2',
	'is3',
	'is4',
	'is5',
	'is6',
	'is7',
	'is8',
	'is9',
	'is10',
	'is11',
	'isOffsetQuarter',
	'isOffsetThird',
	'isOffsetHalf',
	'initialState',
	'callbackId',
];

export const Grid = (props: IGridProps): React.ReactElement => {
	const {
		className,
		children,
		isVertical,
		isHorizontal,
		isGutterless,
		isMultiline,
		...passThroughs
	} = props;

	const cellChildProps = _.map(findTypes(props, Grid.Cell), 'props');

	return (
		<section
			{...passThroughs}
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
			{_.map(cellChildProps, (cellChildProp, index): React.ReactElement => {
				return (
					<article
						{...omit(cellChildProp, nonPassThroughs)}
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
};

Grid.Cell = Cell;
Grid.displayName = 'Grid';
Grid.peek = {
	description: `This component is designed to be used in \`Composites\` as a layout tool. You can use the \`Grid\` components themselves or create your own components using the \`Grid\` styles from \`Grid.less\`. Please see examples for more information.`,
	categories: ['layout'],
};
Grid.propTypes = {
	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,

	/**
		explicitly set the primary axis of the grid to Y
	*/
	isVertical: bool,

	/**
		explicitly set the primary axis of the grid to X
	*/
	isHorizontal: bool,

	/**
		a grid without padding separating grid cells
	*/
	isGutterless: bool,

	/**
		Allow Grids to wrap multiple lines
	*/
	isMultiline: bool,

	/**
		Any valid React component
	*/
	children: node,
};

export default Grid;
