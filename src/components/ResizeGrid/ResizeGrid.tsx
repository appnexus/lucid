import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { StandardProps } from '../../util/component-types';
import Resizer from '../Resizer/Resizer';

const cx = lucidClassNames.bind('&-ResizeGrid');

const { func, string, object } = PropTypes;

interface IResizeGridProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	cards: Array<any>;
}

interface IResizeGridState {
	width: number;
	height: number;
}

class ResizeGrid extends React.Component<IResizeGridProps, IResizeGridState> {
	static displayName = 'ResizeGrid';

	static peek = {
		description: `
			This is a helper component used for getting the width and height of a
			containing element. This component doesn't take normal children. It
			expects you to pass a single function for children. It will then call
			that function with new \`width\` and \`height\` values if the container
			size changes.
		`,
		categories: ['utility'],
	};

	static propTypes = {
		cards: object`
			Cards to be arranged in a grid
		`,

		className: string`
			Appended to the component-specific class names set on the root elements.
		`,

		children: func`
			A function that returns your rendered content with the signature:
			\`(width, height) => {}\`
		`,
	};

	getColumnLayout = (n: number) => {
		const { cards } = this.props;
		const columns = _.reduce(
			cards,
			(cols: Array<any>, card: any, idx: number) => {
				const insertIndex = idx % n;
				cols[insertIndex] = [...cols[insertIndex], card];
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

	render() {
		return (
			<Resizer>
				{width => {
					if (width < 960) {
						return this.getOneColumnLayout();
					} else if (width >= 960 && width < 1249) {
						return this.getTwoColumnLayout();
					} else {
						return this.getThreeColumnLayout();
					}
				}}
			</Resizer>
		);
	}
}

export default ResizeGrid;
