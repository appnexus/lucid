import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { StandardProps, omitProps } from '../../util/component-types';
import { lucidClassNames } from '../../util/style-helpers';
import Table from '../Table/Table';

const cx = lucidClassNames.bind('&-ScrollTable');

const { object, string, bool, node, number, oneOfType } = PropTypes;

const defaultProps = {
	hasWordWrap: false,
	hasBorder: false,
};

export interface IScrollTableProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {
	/** Set the width of the Table inside the scrollable container. */
	tableWidth?: number | string;

	/** Set the Table contents to not allow word wrapping. */
	hasWordWrap: boolean;

	/** render the table with borders on the outer edge. */
	hasBorder: boolean;
}

export const ScrollTable = (props: IScrollTableProps): React.ReactElement => {
	const {
		children,
		className,
		style,
		tableWidth,
		hasWordWrap,
		hasBorder,
		...passThroughs
	} = props;

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
				{...omitProps(
					passThroughs,
					undefined,
					_.keys(ScrollTable.propTypes),
					false
				)}
				style={{
					width: tableWidth,
				}}
				hasWordWrap={hasWordWrap}
			>
				{children}
			</Table>
		</div>
	);
};

ScrollTable.defaultProps = defaultProps;

ScrollTable.displayName = 'ScrollTable';

ScrollTable.peek = {
	description: `
		Table in a scrollable container.
	`,
	categories: ['table'],
	madeFrom: ['Table'],
};

ScrollTable.Thead = Table.Thead;
ScrollTable.Tbody = Table.Tbody;
ScrollTable.Tr = Table.Tr;
ScrollTable.Th = Table.Th;
ScrollTable.Td = Table.Td;

ScrollTable.propTypes = {
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
		render the table with borders on the outer edge.
	`,
};

export default ScrollTable;
