import _, { omit } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { StandardProps } from '../../util/component-types';
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
				{...omit(passThroughs, [
					'children',
					'className',
					'style',
					'tableWidth',
					'hasWordWrap',
					'hasBorder',
					'initialState',
				])}
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
	description: `\`Table\` in a scrollable container.`,
	categories: ['table'],
	madeFrom: ['Table'],
};

ScrollTable.Thead = Table.Thead;
ScrollTable.Tbody = Table.Tbody;
ScrollTable.Tr = Table.Tr;
ScrollTable.Th = Table.Th;
ScrollTable.Td = Table.Td;

ScrollTable.propTypes = {
	/**
		{Thead, Tbody, Tr, Th, Td} are the child components of Scrolltable, same
		as Table.
	*/
	children: node,

	/**
		Class names that are appended to the defaults.
	*/
	className: string,

	/**
		Styles that are passed through to the root container.
	*/
	style: object,

	/**
		Set the width of the Table inside the scrollable container.
	*/
	tableWidth: oneOfType([number, string]),

	/**
		Set the Table contents to not allow word wrapping.
	*/
	hasWordWrap: bool,

	/**
		render the table with borders on the outer edge.
	*/
	hasBorder: bool,
};

export default ScrollTable;
