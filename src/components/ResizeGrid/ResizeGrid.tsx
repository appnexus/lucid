import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps, findTypes } from '../../util/component-types';
import Resizer from '../Resizer/Resizer';

const cx = lucidClassNames.bind('&-ResizeGrid');

const { string, object, bool } = PropTypes;

interface IResizeGridCellProps extends StandardProps {
	isFullWidth: boolean;
}

const Cell = (_props: IResizeGridCellProps): React.ReactElement => {
	return <span>{_props.children}</span>;
};
Cell.displayName = 'ResizeGrid.Cell';
Cell.peek = {
	description: `
		Renders an \`<article>\` as the grid cell
	`,
};
Cell.propTypes = {
	isFullWidth: bool`
	`,
};
Cell.peek = {
	description: `
		Renders a grid cell
	`,
};
Cell.defaultProps = {
	isFullWidth: false,
};

interface IResizeGridProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	cards?: Array<any>;
	breakPoints: number[];
	width: number;
}

class ResizeGrid extends React.Component<IResizeGridProps> {
	static displayName = 'ResizeGrid';

	static peek = {
		description: `
		
		`,
		categories: ['utility'],
	};

	static propTypes = {
		cards: object`
			Cards to be arranged in a grid.
		`,

		className: string`
			Appended to the component-specific class names set on the root elements.
		`,
	};

	static defaultProps = {
		breakPoints: [960, 1430],
	};

	static Cell = Cell;

	getColumnLayout = (n: number) => {
		// const cells = _.map(findTypes(this.props, Cell), 'props');
		//@ts-ignore
		const cells = _.map(this.props.children, 'props');

		const fullWidth = _.reduce(
			cells,
			(acc: { [key: number]: any }, cell: any) => {
				if (cell.isFullWidth) {
					acc.push(cell);
				} else {
				}

				return acc;
			},
			{}
		);

		console.log('redo column layout');
		const columns = _.reduce(
			_.map(cells, (cellChildProps: IResizeGridCellProps) => (
				<span>{cellChildProps.children}</span>
			)),
			(cols: Array<any>, card: any, idx: number) => {
				cols[idx % n] = [...cols[idx % n], card];
				return cols;
			},
			_.times(n, () => [])
		);

		return (
			<div className={`cards-container ${n === 1 ? 'oneColumn' : ''}`}>
				{_.map(columns, col => {
					return <div>{col}</div>;
				})}
			</div>
		);
	};

	getOneColumnLayout = () => this.getColumnLayout(1);

	getTwoColumnLayout = () => this.getColumnLayout(2);

	getThreeColumnLayout = () => this.getColumnLayout(3);

	shouldComponentUpdate(nextProps: IResizeGridProps) {
		const { width, breakPoints } = this.props;
		const { width: nextWidth } = nextProps;
		const [breakOne, breakTwo] = breakPoints;

		if (nextWidth < width) {
			return (
				(nextWidth < breakOne && width > breakOne) ||
				(nextWidth < breakTwo && width > breakTwo)
			);
		} else if (nextWidth > width) {
			return (
				(nextWidth > breakOne && width < breakOne) ||
				(nextWidth > breakTwo && width < breakTwo)
			);
		}
		return false;
	}

	render() {
		const { width, breakPoints } = this.props;
		const [breakOne, breakTwo] = breakPoints;

		if (width < breakTwo) {
			if (width < breakOne) {
				return this.getOneColumnLayout();
			}
			return this.getTwoColumnLayout();
		}
		return this.getThreeColumnLayout();
	}
}

export default ResizeGrid;
