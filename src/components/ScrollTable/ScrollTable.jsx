import React from 'react';
import ReactDOM from 'react-dom';
import { createLucidComponentDefinition } from '../../util/component-definition';
import { lucidClassNames } from '../../util/style-helpers';
import { findElementsByType } from '../../util/child-component';
import Table from '../Table/Table';

const boundClassNames = lucidClassNames.bind('&-ScrollTable');

const {
	object,
	string,
	bool,
	node,
} = React.PropTypes;

/**
 * {"categories": ["table"]}
 *
 * Renders.
 */
const ScrollTable = React.createClass(createLucidComponentDefinition({
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
		 * children
		 */
		children: node,
		/**
		 * Class names that are appended to the defaults.
		 */
		className: string,
		/**
		 * style
		 */
		style: object,
	},

	render() {
		const {
			children,
			className,
			style,
			...passThrus
		} = this.props;

		return (
			<div
				className={boundClassNames('&', className)}
				style={{
					overflow: 'auto',
					position: 'relative',
					...style
				}}
				ref='scrollContainer'
			>
				<Table {...passThrus}>
					{children}
				</Table>
			</div>
		);
	},
}));

export default ScrollTable;
