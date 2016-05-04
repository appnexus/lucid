import React from 'react';
import { createClass } from '../../util/component-definition';
import { lucidClassNames } from '../../util/style-helpers';
import Table from '../Table/Table';

const boundClassNames = lucidClassNames.bind('&-ScrollTable');

const {
	object,
	string,
	bool,
	node,
	number,
} = React.PropTypes;

/**
 * {"categories": ["table"], "madeFrom": ["Table"]}
 *
 * Table in a scrollable container.
 */
const ScrollTable = createClass({
	displayName: 'ScrollTable',

	statics: {
		Thead: Table.Thead,
		Tbody: Table.Tbody,
		Tr: Table.Tr,
		Th: Table.Th,
		Td: Table.Td,
	},

	propTypes: {
		/**
		 * {Thead, Tbody, Tr, Th, Td} are the child components of Scrolltable, same as Table.
		 */
		children: node,
		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,
		/**
		 * Styles that are passed through to the root container.
		 */
		style: object,
		/**
		 * Set the width of the Table inside the scrollable container.
		 */
		tableWidth: number,
		/**
		 * Set the Table contents to not allow word wrapping.
		 */
		isNowrap: bool,
	},

	render() {
		const {
			children,
			className,
			style,
			tableWidth,
			isNowrap,
			...passThroughs
		} = this.props;

		return (
			<div
				className={boundClassNames('&', className)}
				style={style}
			>
				<Table
					{...passThroughs}
					style={{
						width: tableWidth,
					}}
					className={boundClassNames({'&-nowrap': isNowrap})}
					hasNoBorder={true}
				>
					{children}
				</Table>
			</div>
		);
	},
});

export default ScrollTable;
