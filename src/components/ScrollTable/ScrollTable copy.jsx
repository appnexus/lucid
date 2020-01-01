import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { createClass, omitProps } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';
import Table from '../Table/Table';

const cx = lucidClassNames.bind('&-ScrollTable');

const { object, string, bool, node, number, oneOfType } = PropTypes;

const ScrollTable = createClass({
	displayName: 'ScrollTable',

	statics: {
		peek: {
			description: `
				Table in a scrollable container.
			`,
			categories: ['table'],
			madeFrom: ['Table'],
		},
	},

	components: {
		Thead: Table.Thead,
		Tbody: Table.Tbody,
		Tr: Table.Tr,
		Th: Table.Th,
		Td: Table.Td,
	},

	propTypes: {
		children: node`
			{Thead, Tbody, Tr, Th, Td} are the child components of Scrolltable, same
			as Table.
		`,

		className: string`
			Class names that are appended to the defaults.
		`,

		style: object`
			Styles that are passed through to the root container.
		`,

		tableWidth: oneOfType([number, string])`
			Set the width of the Table inside the scrollable container.
		`,

		hasWordWrap: bool`
			Set the Table contents to not allow word wrapping.
		`,

		hasBorder: bool`
			render the table with borders on the outer edge
		`,
	},

	getDefaultProps() {
		return {
			hasWordWrap: false,
			hasBorder: false,
		};
	},

	render() {
		const {
			children,
			className,
			style,
			tableWidth,
			hasWordWrap,
			hasBorder,
			...passThroughs
		} = this.props;

		return (
			<div
				className={cx(
					'&',
					{
						'&-has-border': hasBorder,
					},
					className
				)}
				style={style}
			>
				<Table
					{...omitProps(passThroughs, ScrollTable, [], false)}
					style={{
						width: tableWidth,
					}}
					hasWordWrap={hasWordWrap}
				>
					{children}
				</Table>
			</div>
		);
	},
});

export default ScrollTable;
