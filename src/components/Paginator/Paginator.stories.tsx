import { useState } from '@storybook/addons';
import { Story } from '@storybook/react';
import React from 'react';
import Paginator, { IPaginatorProps } from './Paginator';

export default {
	title: 'Navigation/Paginator',
	component: Paginator,
	parameters: {
		docs: {
			description: {
				component: Paginator.description,
			},
		},
	},
};

export const Basic: Story<IPaginatorProps> = (args) => {
	const [pageIndex, setPageIndex] = useState(0);
	const [pageSizeIndex, setPageSizeIndex] = useState(0);
	const onPageSelect = (pageIndex) => {
		setPageIndex(pageIndex);
	};
	const onPageSizeSelect = (pageSizeIndex) => {
		setPageSizeIndex(pageSizeIndex);
	};

	return (
		<>
			<p>Page Index: {pageIndex}</p>
			<p>Page Size Index: {pageSizeIndex}</p>
			<Paginator
				{...args}
				selectedPageIndex={pageIndex}
				onPageSelect={onPageSelect}
				selectedPageSizeIndex={pageSizeIndex}
				onPageSizeSelect={onPageSizeSelect}
			/>
		</>
	);
};
Basic.args = {
	hasPageSizeSelector: true,
	totalCount: 500,
	isDisabled: false,
};

export const PageSizeSelector: Story<IPaginatorProps> = (args) => (
	<Paginator {...args} />
);
PageSizeSelector.args = {
	hasPageSizeSelector: true,
	totalCount: 500,
};

export const Disabled: Story<IPaginatorProps> = (args) => (
	<Paginator {...args} />
);
Disabled.args = {
	isDisabled: true,
};

export const ObjectCounts: Story<IPaginatorProps> = (args) => (
	<Paginator {...args} />
);
ObjectCounts.args = {
	hasPageSizeSelector: true,
	totalCount: 100,
	showTotalObjects: true,
	objectLabel: 'Object',
	objectLabelPlural: 'Objects',
};
