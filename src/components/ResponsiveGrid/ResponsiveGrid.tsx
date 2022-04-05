import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps, findTypes } from '../../util/component-types';
import Resizer from '../Resizer/Resizer';

const cx = lucidClassNames.bind('&-ResponsiveGrid');

const { string, number, arrayOf } = PropTypes;

export interface IResponsiveGridCellProps extends StandardProps {}

/** Cell */
const Cell = (_props: IResponsiveGridCellProps): null => null;
Cell.displayName = 'ResponsiveGrid.Cell';
Cell.peek = {
	description: `Renders a \`<article>\` as the grid cell.`,
};

/** Responsive Grid */

export interface IResponsiveGridProps extends IResponsiveGridWrapperProps {
	/**
	 * Width of the grid. Note: this does not set the width of the grid, and should be
	 * provided by calculating the width of the parent element.
	 */
	width: number;
}

const defaultProps = {
	breakPoints: [960, 1430],
};

export class ResponsiveGrid extends React.Component<IResponsiveGridProps> {
	static displayName = 'ResponsiveGrid';

	static propTypes = {
		/** 
			Width of the grid. Note: this does not set the width of the grid, and should be
			provided by calculating the width of the parent element.
		*/
		width: number,

		/**
			Break points for the grid to switch column layouts. Break points should be provided
			in ascending order. Currently only two break points are used. Example: [960, 1430]
		*/
		breakPoints: arrayOf(number),

		/**
			Appended to the component-specific class names set on the root elements.
		*/
		className: string,
	};

	getColumnLayout = (numberOfColumns: number) => {
		const cellProps: IResponsiveGridCellProps[] = _.map(
			findTypes(this.props, ResponsiveGridWrapper.Cell),
			'props'
		);

		const columns = _.reduce(
			_.map(cellProps, (props: IResponsiveGridCellProps, key: number) => (
				<article key={key} className={cx('&-Cell')}>
					{props.children}
				</article>
			)),
			(columns: React.ReactElement[][], cell, idx: number) => {
				columns[idx % numberOfColumns].push(cell);
				return columns;
			},
			_.times(numberOfColumns, () => [])
		);

		return (
			<div
				className={cx('&', {
					'&-one-column': numberOfColumns === 1,
				})}
			>
				{_.map(columns, (col, index) => {
					return (
						<div key={index} className={cx('&-Column')}>
							{col}
						</div>
					);
				})}
			</div>
		);
	};

	shouldComponentUpdate(nextProps: IResponsiveGridProps) {
		const { width, breakPoints } = this.props;
		const { width: nextWidth } = nextProps;
		const [breakOne, breakTwo] = breakPoints;

		if (nextWidth < width) {
			return (
				(nextWidth < breakOne && width >= breakOne) ||
				(nextWidth < breakTwo && width >= breakTwo)
			);
		} else if (nextWidth > width) {
			return (
				(nextWidth > breakOne && width <= breakOne) ||
				(nextWidth > breakTwo && width <= breakTwo)
			);
		}

		return false;
	}

	render() {
		const { width, breakPoints } = this.props;
		const [breakOne, breakTwo] = breakPoints;

		if (width < breakTwo) {
			if (width < breakOne) {
				return this.getColumnLayout(1);
			}
			return this.getColumnLayout(2);
		}
		return this.getColumnLayout(3);
	}
}

/** Responsive Grid Wrapper */
export interface IResponsiveGridWrapperProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/**
	 * Break points for the grid to switch column layouts. Break points should be provided
	 * in ascending order. Currently only two break points are used. Example: [960, 1430]
	 */
	breakPoints: number[];
}

const ResponsiveGridWrapper = (props: IResponsiveGridWrapperProps) => {
	const { breakPoints, children, className, ...passThroughs } = props;

	return (
		<Resizer
			className={cx('&', className)}
			{...(omit(passThroughs, ['breakPoints', 'initialState']) as any)}
		>
			{(width) => {
				return (
					<ResponsiveGrid width={width} breakPoints={breakPoints}>
						{children}
					</ResponsiveGrid>
				);
			}}
		</Resizer>
	);
};
ResponsiveGridWrapper.Cell = Cell;
ResponsiveGridWrapper.defaultProps = defaultProps;
ResponsiveGridWrapper.displayName = ResponsiveGrid.displayName;
ResponsiveGridWrapper.propTypes = {
	/**
		Break points for the grid to switch column layouts. Break points should be provided 
		in ascending order. Currently only two break points are used. Example: [960, 1430]
	*/
	breakPoints: arrayOf(number),

	/**
		Appended to the component-specific class names set on the root elements.
	*/
	className: string,
};
ResponsiveGridWrapper.peek = {
	description: `A grid container that changes the number of grid columns in response to width changes. By default, the grid cells are displayed in a single column for widths less than \`960px\`, two columns for widths greater than \`960px\` and less than \`1430px\`, and three columns for widths greater than \`1430px\`. Custom break points can be provided through the \`breakPoints\` prop.`,
	categories: ['utility'],
	madeFrom: ['Resizer'],
};

export default ResponsiveGridWrapper;
