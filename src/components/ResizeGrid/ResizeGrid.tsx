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

interface IResizeGridProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	cards: Array<any>;
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

	static Cell = Cell;

	getColumnLayout = (n: number) => {
		// const cells = _.map(findTypes(this.props, Cell), 'props');
		//@ts-ignore
		const cells = _.map(this.props.children, 'props');

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
		const { width } = this.props;
		const { width: nextWidth } = nextProps;

		if (nextWidth < width) {
			return (
				(nextWidth < 420 && width > 420) || (nextWidth < 800 && width > 800)
			);
		} else if (nextWidth > width) {
			return (
				(nextWidth > 420 && width < 420) || (nextWidth > 800 && width < 800)
			);
		}
		return false;
	}

	render() {
		const { width } = this.props;

		if (width < 420) {
			return this.getOneColumnLayout();
		} else if (width >= 420 && width < 800) {
			return this.getTwoColumnLayout();
		} else {
			return this.getThreeColumnLayout();
		}
	}
}

export default ResizeGrid;
