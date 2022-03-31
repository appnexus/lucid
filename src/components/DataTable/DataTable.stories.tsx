import { every, map, reverse, sortBy } from 'lodash';
import React from 'react';
import createReactClass from 'create-react-class';
import { Meta, Story } from '@storybook/react';

import { createClass } from '../../util/component-types';
import SuccessIcon from '../Icon/SuccessIcon/SuccessIcon';
import DataTable, { IDataTableProps } from './DataTable';
import TextField from '../TextField/TextField';
import CheckboxLabeled from '../CheckboxLabeled/CheckboxLabeled';

export default {
	title: 'Table/DataTable',
	component: DataTable,
	parameters: {
		docs: {
			description: {
				component: DataTable.peek.description,
			},
		},
	},
	args: DataTable.defaultProps,
} as Meta;

function addKeys(children) {
	return map(children, (child, index) => ({ ...child, key: index }));
}

const Template: Story<IDataTableProps> = (args) => <DataTable {...args} />;

const defaultColumns = addKeys([
	<DataTable.Column field='id' align='left' key={1}>
		ID
	</DataTable.Column>,

	<DataTable.Column field='first_name' align='left' width={100} key={2}>
		First
	</DataTable.Column>,

	<DataTable.Column field='last_name' align='left' width={100} key={3}>
		Last
	</DataTable.Column>,

	<DataTable.Column field='email' align='left' key={4}>
		E-Mail
	</DataTable.Column>,

	<DataTable.Column field='occupation' align='left' width={100} key={5}>
		Occupation
	</DataTable.Column>,

	<DataTable.Column field='salary' align='right' width={100} key={6}>
		Salary
	</DataTable.Column>,

	<DataTable.Column field='status' align='center' width={100} key={7}>
		Status
	</DataTable.Column>,
]);

const defaultData = [
	{
		id: 1,
		first_name: 'Isaac',
		last_name: 'Newton',
		email: 'inewton@example.com',
		occupation: 'Physicist',
		salary: '$100.01',
		status: <SuccessIcon />,
	},
	{
		id: 2,
		first_name: 'Albert',
		last_name: 'Einstein',
		email: 'aeinstein@example.com',
		occupation: 'Physicist',
		salary: '$100.02',
		status: <SuccessIcon />,
	},
	{
		id: 3,
		first_name: 'Leonardo',
		last_name: 'da Vinci',
		email: 'ldvinci@example.com',
		occupation: 'Engineer',
		salary: '$100.03',
		status: <SuccessIcon />,
	},
	{
		id: 4,
		first_name: 'Aristotle',
		last_name: null,
		email: 'aristotle@example.com',
		occupation: 'Tutor',
		salary: '$100.04',
		status: <SuccessIcon />,
	},
	{
		id: 5,
		first_name: 'Galileo',
		email: 'ggalilei@example.com',
		occupation: 'Physicist',
		salary: '$100.05',
		status: <SuccessIcon />,
	},
	{
		id: 6,
		first_name: 'Charles',
		last_name: 'Darwin',
		email: 'cdarwin@example.com',
		occupation: 'Biologist',
		salary: '$100.06',
		status: <SuccessIcon />,
	},
	{
		id: 7,
		first_name: 'Alexander',
		last_name: 'Macedon',
		email: 'amacedon@example.com',
		occupation: 'Head of State',
		salary: '$100.07',
		status: <SuccessIcon />,
	},
	{
		id: 8,
		first_name: 'Plato',
		last_name: 'Plato',
		email: 'plato@example.com',
		occupation: 'Philosopher',
		salary: '$100.08',
		status: <SuccessIcon />,
	},
	{
		id: 9,
		first_name: 'Mahatma',
		last_name: 'Gandhi',
		email: 'mgandhi@example.com',
		occupation: 'Politician',
		salary: '$100.09',
		status: <SuccessIcon />,
	},
	{
		id: 10,
		first_name: 'William',
		last_name: 'Shakespeare',
		email: 'wshakespear@example.com',
		occupation: 'Playwright',
		salary: '$100.10',
		status: <SuccessIcon />,
	},
];

export const Basic: Story<IDataTableProps> = Template.bind({});
Basic.args = {
	children: defaultColumns,
	data: defaultData,
};

export const ColumnGroups: Story<IDataTableProps> = Template.bind({});
ColumnGroups.args = {
	density: 'extended',
	children: addKeys([
		<DataTable.Column field='id'>ID</DataTable.Column>,

		<DataTable.ColumnGroup title='Name'>
			<DataTable.Column
				field='first_name'
				align='left'
				width={100}
				hasBorderLeft
				isSortable
				key='first_name'
			>
				First
			</DataTable.Column>
			<DataTable.Column
				field='last_name'
				align='left'
				width={100}
				hasBorderRight
				isSortable
				key='last_name'
			>
				Last
			</DataTable.Column>
		</DataTable.ColumnGroup>,

		<DataTable.Column field='email' align='left'>
			E-Mail
		</DataTable.Column>,

		<DataTable.Column field='occupation' align='left' width={100} hasBorderLeft>
			Occupation
		</DataTable.Column>,

		<DataTable.Column field='salary' align='right' width={100} hasBorderLeft>
			Salary
		</DataTable.Column>,

		<DataTable.Column field='status' align='center' width={100} hasBorderLeft>
			Status
		</DataTable.Column>,
	]),
	data: defaultData,
};

export const SelectableAndNavigableRows: Story<IDataTableProps> = Template.bind(
	{}
);
SelectableAndNavigableRows.args = {
	density: 'extended',
	isSelectable: true,
	isActionable: true,
	children: addKeys([
		<DataTable.Column field='id' align='left' hasBorderLeft>
			ID
		</DataTable.Column>,

		<DataTable.Column
			field='first_name'
			align='left'
			width={100}
			hasBorderLeft
			isSortable
		>
			First
		</DataTable.Column>,

		<DataTable.Column
			field='last_name'
			align='left'
			width={100}
			hasBorderRight
			isSortable
		>
			Last
		</DataTable.Column>,

		<DataTable.Column field='email' align='left'>
			E-Mail
		</DataTable.Column>,

		<DataTable.Column field='occupation' align='left' width={100} hasBorderLeft>
			Occupation
		</DataTable.Column>,

		<DataTable.Column field='salary' align='right' width={100} hasBorderLeft>
			Salary
		</DataTable.Column>,

		<DataTable.Column field='status' align='center' width={100} hasBorderLeft>
			Status
		</DataTable.Column>,
	]),
	data: defaultData,
};

export const DisabledRows: Story<IDataTableProps> = Template.bind({});
DisabledRows.args = {
	children: defaultColumns,
	data: map(defaultData, (row, index) => ({
		...row,
		isDisabled: !!(index % 2),
	})),
};

export const Empty: Story<IDataTableProps> = Template.bind({});
Empty.args = {
	isFullWidth: true,
	density: 'extended',
	children: addKeys([
		<DataTable.Column field='id'>ID</DataTable.Column>,

		<DataTable.Column field='first_name' width={100}>
			First
		</DataTable.Column>,

		<DataTable.Column field='last_name' align='left' width={100}>
			Last
		</DataTable.Column>,

		<DataTable.Column field='email' align='center'>
			E-Mail
		</DataTable.Column>,

		<DataTable.Column field='occupation' align='right' width={100}>
			Occupation
		</DataTable.Column>,
	]),
	data: [],
};

/* Interactive Table */
export const InteractiveTable: Story<IDataTableProps> = (args) => {
	const Component = createReactClass({
		getInitialState() {
			return {
				activeIndex: 1,
				currentlySortedField: 'id',
				currentlySortedFieldDirection: 'down',
				data: [
					{
						id: '01',
						first_name: 'Isaac',
						last_name: 'Newton',
						email: 'inewton@example.com',
						occupation: 'Physicist',
						isSelected: true,
						salary: '$100.01',
						status: <SuccessIcon />,
					},
					{
						id: '02',
						first_name: 'Albert',
						last_name: 'Einstein',
						email: 'aeinstein@example.com',
						occupation: 'Physicist',
						salary: '$100.02',
						status: <SuccessIcon />,
					},
					{
						id: '03',
						first_name: (
							<div>
								Leon <div className='child'>The Silly</div>
							</div>
						),
						last_name: 'da Vinci',
						email: 'ldvinci@example.com',
						occupation: 'Engineer',
						salary: '$100.03',
						status: <SuccessIcon />,
					},
					{
						id: '04',
						first_name: 'Aristotle',
						last_name: '--',
						email: 'aristotle@example.com',
						occupation: 'Tutor',
						salary: '$100.04',
						status: <SuccessIcon />,
					},
					{
						id: '05',
						first_name: 'Galileo',
						last_name: 'Galilei',
						email: 'ggalilei@example.com',
						occupation: 'Physicist',
						salary: '$100.05',
						status: <SuccessIcon />,
					},
					{
						id: '06',
						first_name: 'Charles',
						last_name: 'Darwin',
						email: 'cdarwin@example.com',
						occupation: 'Biologist',
						salary: '$100.06',
						status: <SuccessIcon />,
					},
					{
						id: '07',
						first_name: 'Alexander',
						last_name: 'Macedon',
						email: 'amacedon@example.com',
						occupation: 'Head of State',
						salary: '$100.07',
						status: <SuccessIcon />,
					},
					{
						id: '08',
						first_name: 'Plato',
						last_name: 'Plato',
						email: 'plato@example.com',
						occupation: 'Philosopher',
						salary: '$100.08',
						status: <SuccessIcon />,
					},
					{
						id: '09',
						first_name: 'Mahatma',
						last_name: 'Gandhi',
						email: 'mgandhi@example.com',
						occupation: 'Politician',
						salary: '$100.09',
						status: <SuccessIcon />,
					},
					{
						id: '10',
						first_name: 'William',
						last_name: 'Shakespeare',
						email: 'wshakespear@example.com',
						occupation: 'Playwright',
						salary: '$100.10',
						status: <SuccessIcon />,
					},
				],
			};
		},

		handleSelect(_item: any, selectedIndex: any) {
			const { data } = this.state;

			this.setState({
				data: map(data, (row, rowIndex) => {
					if (rowIndex === selectedIndex) {
						return {
							...row,
							isSelected: !row.isSelected,
						};
					} else {
						return row;
					}
				}),
			});
		},

		handleSelectAll() {
			const { data } = this.state;

			const allSelected = every(data, 'isSelected');

			this.setState({
				data: map(data, (row) => {
					return {
						...row,
						isSelected: !allSelected,
					};
				}),
			});
		},

		handleRowClick(_item: any, rowIndex: any) {
			this.setState({
				activeIndex: rowIndex,
			});
		},

		handleSort(field: any) {
			const { currentlySortedField, currentlySortedFieldDirection, data } =
				this.state;

			const nextCurrentlySortedFieldDirection =
				currentlySortedField === field && currentlySortedFieldDirection === 'up'
					? 'down'
					: 'up';
			const nextData = sortBy(data, field);

			this.setState({
				currentlySortedField: field,
				currentlySortedFieldDirection: nextCurrentlySortedFieldDirection,
				data:
					nextCurrentlySortedFieldDirection === 'down'
						? nextData
						: reverse(nextData),
				activeIndex: null,
			});
		},

		render() {
			const {
				activeIndex,
				data,
				currentlySortedField,
				currentlySortedFieldDirection,
			} = this.state;

			return (
				<div>
					<style>
						{
							'.child { display: none; } .lucid-Table-Tr:hover .child { display: block; }'
						}
					</style>
					<DataTable
						{...args}
						data={map(data, (row, index) =>
							index === activeIndex ? { ...row, isActive: true } : row
						)}
						density='extended'
						isSelectable
						isActionable
						onRowClick={this.handleRowClick}
						onSelect={this.handleSelect}
						onSelectAll={this.handleSelectAll}
						onSort={this.handleSort}
					>
						<DataTable.Column
							field='id'
							width={41}
							align='left'
							hasBorderLeft
							isSortable
							isSorted={currentlySortedField === 'id'}
							sortDirection={currentlySortedFieldDirection}
						>
							ID
						</DataTable.Column>

						<DataTable.Column
							className='parent'
							field='first_name'
							width={100}
							hasBorderLeft
							hasBorderRight
							isResizable
							isSortable
							isSorted={currentlySortedField === 'first_name'}
							sortDirection={currentlySortedFieldDirection}
						>
							First
						</DataTable.Column>

						<DataTable.Column
							field='last_name'
							align='left'
							width={100}
							hasBorderRight
							isResizable
							isSortable
							isSorted={currentlySortedField === 'last_name'}
							sortDirection={currentlySortedFieldDirection}
						>
							Last
						</DataTable.Column>

						<DataTable.Column
							field='email'
							align='left'
							isSortable
							isSorted={currentlySortedField === 'email'}
							sortDirection={currentlySortedFieldDirection}
						>
							E-Mail
						</DataTable.Column>

						<DataTable.Column
							field='occupation'
							align='left'
							width={100}
							hasBorderLeft
							isSortable
							isSorted={currentlySortedField === 'occupation'}
							sortDirection={currentlySortedFieldDirection}
						>
							Occupation
						</DataTable.Column>

						<DataTable.Column
							field='salary'
							align='right'
							width={100}
							hasBorderLeft
							isSortable
							isSorted={currentlySortedField === 'salary'}
							sortDirection={currentlySortedFieldDirection}
						>
							Salary
						</DataTable.Column>

						<DataTable.Column
							field='status'
							align='center'
							width={100}
							hasBorderLeft
						>
							Status
						</DataTable.Column>
					</DataTable>
				</div>
			);
		},
	});

	return <Component />;
};

/* Empty With Custom Title And Body */
export const EmptyWithCustomTitleAndBody: Story<IDataTableProps> = (args) => {
	const {
		EmptyStateWrapper,
		EmptyStateWrapper: { Title, Body },
	} = DataTable;

	const Component = createClass({
		getInitialState() {
			return {
				data: [],
			};
		},

		render() {
			const { data } = this.state;

			return (
				<DataTable
					{...args}
					data={data}
					density='extended'
					isFullWidth
					minRows={15}
				>
					<EmptyStateWrapper>
						<Title>Something went wrong.</Title>
						<Body style={{ fontSize: '12px' }}>
							Echo park poutine esse tempor squid do. Lo-fi ramps XOXO
							chicharrones laboris, portland fugiat locavore. Fap four dollar
							toast keytar, cronut kogi fingerstache distillery microdosing
							everyday carry austin DIY dreamcatcher. Distillery flexitarian
							meditation laboris roof party. Cred raclette gastropub tilde
							PBR&B. Shoreditch poke adipisicing, reprehenderit lumbersexual
							succulents mustache officia franzen vinyl nostrud af. Hashtag
							bitters organic, before they sold out butcher cronut sapiente.
						</Body>
					</EmptyStateWrapper>
					<DataTable.Column field='id'>ID</DataTable.Column>

					<DataTable.Column field='first_name' width={100}>
						First
					</DataTable.Column>

					<DataTable.Column field='last_name' align='left' width={100}>
						Last
					</DataTable.Column>

					<DataTable.Column field='email' align='center'>
						E-Mail
					</DataTable.Column>

					<DataTable.Column field='occupation' align='right' width={100}>
						Occupation
					</DataTable.Column>
				</DataTable>
			);
		},
	});

	return <Component />;
};

/* Empty With Image */
export const EmptyWithImage: Story<IDataTableProps> = (args) => {
	const {
		EmptyStateWrapper,
		EmptyStateWrapper: { Title, Body },
	} = DataTable;

	const Component = createClass({
		getInitialState() {
			return {
				data: [],
			};
		},

		render() {
			const { data } = this.state;

			return (
				<DataTable {...args} data={data} density='extended' isFullWidth>
					<EmptyStateWrapper>
						<Title>No items found.</Title>
						<Body>
							<img src='https://dummyimage.com/375x150/ff69/fff' />
						</Body>
					</EmptyStateWrapper>
					<DataTable.Column
						field='id'
						width={41}
						align='center'
						hasBorderLeft
						isSortable
					>
						ID
					</DataTable.Column>

					<DataTable.Column field='first_name' width={100} hasBorderLeft>
						First
					</DataTable.Column>

					<DataTable.Column
						field='last_name'
						align='left'
						width={100}
						hasBorderRight
					>
						Last
					</DataTable.Column>

					<DataTable.Column field='email' align='center'>
						E-Mail
					</DataTable.Column>

					<DataTable.Column
						field='occupation'
						align='right'
						width={100}
						hasBorderLeft
					>
						Occupation
					</DataTable.Column>
				</DataTable>
			);
		},
	});

	return <Component />;
};

/* Empty With Anchored Message */
export const EmptyWithAnchoredMessage: Story<IDataTableProps> = (args) => {
	const Component = createClass({
		getInitialState() {
			return {
				activeIndex: 1,
				data: [],
			};
		},

		render() {
			const { activeIndex, data } = this.state;

			return (
				<DataTable
					{...args}
					data={map(data, (row, index) =>
						index === activeIndex ? { ...row, isActive: true } : row
					)}
					density='extended'
					isFullWidth
					anchorMessage
					minRows={15}
				>
					<DataTable.Column field='id'>ID</DataTable.Column>

					<DataTable.Column field='first_name' width={100}>
						First
					</DataTable.Column>

					<DataTable.Column field='last_name' align='left' width={100}>
						Last
					</DataTable.Column>

					<DataTable.Column field='email' align='center'>
						E-Mail
					</DataTable.Column>

					<DataTable.Column field='occupation' align='right' width={100}>
						Occupation
					</DataTable.Column>
				</DataTable>
			);
		},
	});

	return <Component />;
};

/* Loading */
export const Loading: Story<IDataTableProps> = (args) => {
	const Component = createClass({
		render() {
			return (
				<DataTable
					{...args}
					minRows={50}
					anchorMessage
					isFullWidth
					isLoading
					data={[]}
				>
					<DataTable.Column field='id'>ID</DataTable.Column>

					<DataTable.Column field='first_name' width={100}>
						First
					</DataTable.Column>

					<DataTable.Column field='last_name' align='left' width={100}>
						Last
					</DataTable.Column>

					<DataTable.Column field='email' align='center'>
						E-Mail
					</DataTable.Column>

					<DataTable.Column field='occupation' align='right' width={100}>
						Occupation
					</DataTable.Column>
				</DataTable>
			);
		},
	});

	return <Component />;
};

/* Loading With Anchored Message */
export const LoadingWithAnchoredMessage: Story<IDataTableProps> = (args) => {
	const Component = createClass({
		render() {
			return (
				<DataTable
					{...args}
					minRows={15}
					anchorMessage
					isFullWidth
					isLoading
					data={[]}
				>
					<DataTable.Column field='id'>ID</DataTable.Column>

					<DataTable.Column field='first_name' width={100}>
						First
					</DataTable.Column>

					<DataTable.Column field='last_name' align='left' width={100}>
						Last
					</DataTable.Column>

					<DataTable.Column field='email' align='center'>
						E-Mail
					</DataTable.Column>

					<DataTable.Column field='occupation' align='right' width={100}>
						Occupation
					</DataTable.Column>
				</DataTable>
			);
		},
	});

	return <Component />;
};

/* Min Rows */
export const MinRows: Story<IDataTableProps> = (args) => {
	const data = [
		{
			id: 1,
			first_name: 'Isaac',
			last_name: 'Newton',
			email: 'inewton@example.com',
			occupation: 'Physicist',
			salary: '$100.01',
			status: <SuccessIcon />,
		},
		{
			id: 2,
			first_name: 'Albert',
			last_name: 'Einstein',
			email: 'aeinstein@example.com',
			occupation: 'Physicist',
			salary: '$100.02',
			status: <SuccessIcon />,
		},
		{
			id: 3,
			first_name: 'Leonardo',
			last_name: 'da Vinci',
			email: 'ldvinci@example.com',
			occupation: 'Engineer',
			salary: '$100.03',
			status: <SuccessIcon />,
		},
		{
			id: 4,
			first_name: 'Aristotle',
			last_name: null,
			email: 'aristotle@example.com',
			occupation: 'Tutor',
			salary: '$100.04',
			status: <SuccessIcon />,
		},
	];

	const Component = createClass({
		getInitialState() {
			return {
				activeIndex: 1,
				data,
			};
		},

		render() {
			const { activeIndex, data } = this.state;

			return (
				<DataTable
					{...args}
					data={map(data, (row, index) =>
						index === activeIndex ? { ...row, isActive: true } : row
					)}
					density='extended'
					isSelectable
					isActionable
					isFullWidth
					minRows={7}
				>
					<DataTable.Column field='id'>ID</DataTable.Column>

					<DataTable.Column field='first_name' width={100}>
						First
					</DataTable.Column>

					<DataTable.Column field='last_name' align='left' width={100}>
						Last
					</DataTable.Column>

					<DataTable.Column field='email' align='left'>
						E-Mail
					</DataTable.Column>

					<DataTable.Column field='occupation' align='left' width={100}>
						Occupation
					</DataTable.Column>

					<DataTable.Column field='salary' align='right' width={100}>
						Salary
					</DataTable.Column>

					<DataTable.Column field='status' align='center' width={100}>
						Status
					</DataTable.Column>
				</DataTable>
			);
		},
	});

	return <Component />;
};

/* Fixed Headers */
export const FixedHeaders: Story<IDataTableProps> = () => {
	const data = [
		{
			id: 1,
			first_name: 'Isaac',
			last_name: 'Newton',
			email: 'inewton@example.com',
			occupation: 'Physicist',
			salary: '$100.01',
			status: <SuccessIcon />,
		},
		{
			id: 2,
			first_name: 'Albert',
			last_name: 'Einstein',
			email: 'aeinstein@example.com',
			occupation: 'Physicist',
			salary: '$100.02',
			status: <SuccessIcon />,
			isSelected: true,
		},
		{
			id: 3,
			first_name: 'Leonardo',
			last_name: 'da Vinci',
			email: 'ldvinci@example.com',
			occupation: 'Engineer',
			salary: '$100.03',
			status: <SuccessIcon />,
			isActive: true,
		},
		{
			id: 4,
			first_name: 'Aristotle',
			last_name: null,
			email: 'aristotle@example.com',
			occupation: 'Tutor',
			salary: '$100.04',
			status: <SuccessIcon />,
		},
		{
			id: 5,
			first_name: 'Galileo',
			email: 'ggalilei@example.com',
			occupation: 'Physicist',
			salary: '$100.05',
			status: <SuccessIcon />,
		},
		{
			id: 6,
			first_name: 'Charles',
			last_name: 'Darwin',
			email: 'cdarwin@example.com',
			occupation: 'Biologist',
			salary: '$100.06',
			status: <SuccessIcon />,
		},
		{
			id: 7,
			first_name: 'Alexander',
			last_name: 'Macedon',
			email: 'amacedon@example.com',
			occupation: 'Head of State',
			salary: '$100.07',
			status: <SuccessIcon />,
		},
		{
			id: 8,
			first_name: 'Plato',
			last_name: 'Plato',
			email: 'plato@example.com',
			occupation: 'Philosopher',
			salary: '$100.08',
			status: <SuccessIcon />,
		},
		{
			id: 9,
			first_name: 'Mahatma',
			last_name: 'Gandhi',
			email: 'mgandhi@example.com',
			occupation: 'Politician',
			salary: '$100.09',
			status: <SuccessIcon />,
		},
		{
			id: 10,
			first_name: 'William',
			last_name: 'Shakespeare',
			email: 'wshakespear@example.com',
			occupation: 'Playwright',
			salary: '$100.10',
			status: <SuccessIcon />,
		},
	];

	const Component = createClass({
		getInitialState() {
			return {
				hasFixedHeader: true,
				isSelectable: true,
				hasLightHeader: false,
				fixedColumnCount: 2,
				fixedRowHeight: 50,
				isActionable: false,
			};
		},
		handleToggle(stateItem: any) {
			this.setState({ [stateItem]: !this.state[stateItem] });
		},
		handleNumeric(stateItem: any, value: any) {
			this.setState({ [stateItem]: value });
		},
		renderDataTable(props: any) {
			return (
				<DataTable data={data} {...props}>
					<DataTable.Column field='id' align='left' width={35}>
						ID
					</DataTable.Column>

					<DataTable.Column field='first_name' align='left' width={100}>
						First
					</DataTable.Column>

					<DataTable.Column field='last_name' align='left' width={100}>
						Last
					</DataTable.Column>

					<DataTable.Column field='email' align='left' width={900}>
						E-Mail
					</DataTable.Column>

					<DataTable.Column field='occupation' align='left' width={100}>
						Occupation
					</DataTable.Column>

					<DataTable.Column field='salary' align='right' width={100}>
						Salary
					</DataTable.Column>

					<DataTable.Column field='status' align='center' width={100}>
						Status
					</DataTable.Column>
				</DataTable>
			);
		},
		render() {
			return (
				<div>
					<label style={{ marginBottom: 6, display: 'block', fontSize: 12 }}>
						<TextField
							style={{ marginRight: 9, width: 45 }}
							onChangeDebounced={(v) =>
								this.handleNumeric('fixedColumnCount', parseInt(v, 10))
							}
							placeholder='fixedColumnCount'
							value={this.state.fixedColumnCount}
						/>
						fixedColumnCount
					</label>
					<label style={{ marginBottom: 6, display: 'block', fontSize: 12 }}>
						<TextField
							style={{ marginRight: 9, width: 45 }}
							onChangeDebounced={(v) =>
								this.handleNumeric('fixedRowHeight', parseInt(v, 10))
							}
							placeholder='fixedRowHeight'
							value={this.state.fixedRowHeight}
						/>
						fixedRowHeight
					</label>
					<CheckboxLabeled
						Label='hasFixedHeader'
						isSelected={this.state.hasFixedHeader}
						onSelect={() => this.handleToggle('hasFixedHeader')}
					/>
					<CheckboxLabeled
						Label='isSelectable'
						isSelected={this.state.isSelectable}
						onSelect={() => this.handleToggle('isSelectable')}
					/>
					<CheckboxLabeled
						Label='hasLightHeader'
						isSelected={this.state.hasLightHeader}
						onSelect={() => this.handleToggle('hasLightHeader')}
					/>
					<CheckboxLabeled
						Label='isActionable'
						isSelected={this.state.isActionable}
						onSelect={() => this.handleToggle('isActionable')}
					/>
					<div style={{ height: '200px' }}>
						{this.renderDataTable(this.state)}
					</div>
				</div>
			);
		},
	});

	return <Component />;
};

/* Resizable Fixed Headers Table */
export const ResizableFixedHeadersTable: Story<IDataTableProps> = () => {
	const data = [
		{
			id: 1,
			first_name: 'Isaac',
			last_name: 'Newton',
			email: 'inewton@example.com',
			occupation: 'Physicist',
			salary: '$100.01',
			status: <SuccessIcon />,
		},
		{
			id: 2,
			first_name: 'Albert',
			last_name: 'Einstein',
			email: 'aeinstein@example.com',
			occupation: 'Physicist',
			salary: '$100.02',
			status: <SuccessIcon />,
			isSelected: true,
		},
		{
			id: 3,
			first_name: 'Leonardo',
			last_name: 'da Vinci',
			email: 'ldvinci@example.com',
			occupation: 'Engineer',
			salary: '$100.03',
			status: <SuccessIcon />,
			isActive: true,
		},
		{
			id: 4,
			first_name: 'Aristotle',
			last_name: null,
			email: 'aristotle@example.com',
			occupation: 'Tutor',
			salary: '$100.04',
			status: <SuccessIcon />,
		},
		{
			id: 5,
			first_name: 'Galileo',
			email: 'ggalilei@example.com',
			occupation: 'Physicist',
			salary: '$100.05',
			status: <SuccessIcon />,
		},
		{
			id: 6,
			first_name: 'Charles',
			last_name: 'Darwin',
			email: 'cdarwin@example.com',
			occupation: 'Biologist',
			salary: '$100.06',
			status: <SuccessIcon />,
		},
		{
			id: 7,
			first_name: 'Alexander',
			last_name: 'Macedon',
			email: 'amacedon@example.com',
			occupation: 'Head of State',
			salary: '$100.07',
			status: <SuccessIcon />,
		},
		{
			id: 8,
			first_name: 'Plato',
			last_name: 'Plato',
			email: 'plato@example.com',
			occupation: 'Philosopher',
			salary: '$100.08',
			status: <SuccessIcon />,
		},
		{
			id: 9,
			first_name: 'Mahatma',
			last_name: 'Gandhi',
			email: 'mgandhi@example.com',
			occupation: 'Politician',
			salary: '$100.09',
			status: <SuccessIcon />,
		},
		{
			id: 10,
			first_name: 'William',
			last_name: 'Shakespeare',
			email: 'wshakespear@example.com',
			occupation: 'Playwright',
			salary: '$100.10',
			status: <SuccessIcon />,
		},
	];

	const Component = createClass({
		getInitialState() {
			return {
				hasFixedHeader: true,
				isSelectable: true,
				hasLightHeader: false,
				fixedColumnCount: 2,
				fixedRowHeight: 50,
				isActionable: false,
			};
		},
		handleToggle(stateItem: any) {
			this.setState((prevState: any) => ({
				[stateItem]: !prevState[stateItem],
			}));
		},
		handleNumeric(stateItem: any, value: any) {
			this.setState({ [stateItem]: value });
		},
		onChangeFixedColumnCount(prarm: any) {
			this.handleNumeric('fixedColumnCount', parseInt(prarm, 10));
		},
		onChangeFixedRowHeight(prarm: any) {
			this.handleNumeric('fixedRowHeight', parseInt(prarm, 10));
		},
		renderDataTable(props: any) {
			return (
				<DataTable data={data} {...props}>
					<DataTable.Column field='id' align='left' width={35} isResizable>
						ID
					</DataTable.Column>

					<DataTable.Column
						field='first_name'
						align='left'
						width={100}
						isResizable
					>
						First
					</DataTable.Column>

					<DataTable.Column
						field='last_name'
						align='left'
						width={100}
						isResizable
					>
						Last
					</DataTable.Column>

					<DataTable.Column field='email' align='left' width={900} isResizable>
						E-Mail
					</DataTable.Column>

					<DataTable.Column
						field='occupation'
						align='left'
						width={100}
						isResizable
					>
						Occupation
					</DataTable.Column>

					<DataTable.Column
						field='salary'
						align='right'
						width={100}
						isResizable
					>
						Salary
					</DataTable.Column>

					<DataTable.Column
						field='status'
						align='center'
						width={100}
						isResizable
					>
						Status
					</DataTable.Column>
				</DataTable>
			);
		},
		render() {
			return (
				<div>
					<label style={{ marginBottom: 6, display: 'block', fontSize: 12 }}>
						<TextField
							style={{ marginRight: 9, width: 45 }}
							onChange={(v) => this.onChangeFixedColumnCount(v)}
							placeholder='fixedColumnCount'
							value={this.state.fixedColumnCount}
						/>
						fixedColumnCount
					</label>
					<label style={{ marginBottom: 6, display: 'block', fontSize: 12 }}>
						<TextField
							style={{ marginRight: 9, width: 45 }}
							onChange={(v) => this.onChangeFixedRowHeight(v)}
							placeholder='fixedRowHeight'
							value={this.state.fixedRowHeight}
						/>
						fixedRowHeight
					</label>
					<CheckboxLabeled
						Label='hasFixedHeader'
						isSelected={this.state.hasFixedHeader}
						onSelect={() => this.handleToggle('hasFixedHeader')}
					/>
					<CheckboxLabeled
						Label='isSelectable'
						isSelected={this.state.isSelectable}
						onSelect={() => this.handleToggle('isSelectable')}
					/>
					<CheckboxLabeled
						Label='hasLightHeader'
						isSelected={this.state.hasLightHeader}
						onSelect={() => this.handleToggle('hasLightHeader')}
					/>
					<CheckboxLabeled
						Label='isActionable'
						isSelected={this.state.isActionable}
						onSelect={() => this.handleToggle('isActionable')}
					/>
					<div style={{ height: '200px' }}>
						{this.renderDataTable(this.state)}
					</div>
				</div>
			);
		},
	});

	return <Component />;
};

/* Truncate Content */
export const TruncateContent: Story<IDataTableProps> = () => {
	const data = [
		{
			id: 1,
			first_name: 'Isaac',
			last_name: 'Newton',
			email: 'inewton@example.com',
			occupation: 'Physicist mathematician',
			salary: '$100.01',
			status: <SuccessIcon />,
		},
		{
			id: 2,
			first_name: 'Albert',
			last_name: 'Einstein',
			email: 'aeinstein@example.com',
			occupation: 'Physicist',
			salary: '$100.02',
			status: <SuccessIcon />,
		},
		{
			id: 3,
			first_name: 'Leonardo',
			last_name: 'da Vinci',
			email: 'ldvinci@example.com',
			occupation: 'Engineer',
			salary: '$100.03',
			status: <SuccessIcon />,
		},
		{
			id: 4,
			first_name: 'Aristotle',
			last_name: null,
			email: 'aristotle@example.com',
			occupation: 'Tutor',
			salary: '$100.04',
			status: <SuccessIcon />,
		},
		{
			id: 5,
			first_name: 'Galileo',
			email: 'ggalilei@example.com',
			occupation: 'Physicist',
			salary: '$100.05',
			status: <SuccessIcon />,
		},
		{
			id: 6,
			first_name: 'Charles',
			last_name: 'Darwin',
			email: 'cdarwin@example.com',
			occupation: 'Biologist',
			salary: '$100.06',
			status: <SuccessIcon />,
		},
		{
			id: 7,
			first_name: 'Alexander',
			last_name: 'Macedon',
			email: 'amacedon@example.com',
			occupation: 'Head of State',
			salary: '$100.07',
			status: <SuccessIcon />,
		},
		{
			id: 8,
			first_name: 'Plato',
			last_name: 'Plato',
			email: 'plato@example.com',
			occupation: 'Philosopher',
			salary: '$100.08',
			status: <SuccessIcon />,
		},
		{
			id: 9,
			first_name: 'Mahatma',
			last_name: 'Gandhi',
			email: 'mgandhi@example.com',
			occupation: 'Politician',
			salary: '$100.09',
			status: <SuccessIcon />,
		},
		{
			id: 10,
			first_name: 'William',
			last_name: 'Shakespeare',
			email: 'wshakespear@example.com',
			occupation: 'Playwright',
			salary: '$100.10',
			status: <SuccessIcon />,
		},
	];

	const Component = createClass({
		render() {
			return (
				<DataTable data={data} hasFixedHeader={true} truncateContent={true}>
					<DataTable.Column field='id' align='left' width={50}>
						ID
					</DataTable.Column>

					<DataTable.Column field='first_name' align='left' width={100}>
						First
					</DataTable.Column>

					<DataTable.Column field='last_name' align='left' width={100}>
						Last
					</DataTable.Column>

					<DataTable.Column field='email' align='left'>
						E-Mail
					</DataTable.Column>

					<DataTable.Column field='occupation' align='left' width={100}>
						Long Occupation
					</DataTable.Column>

					<DataTable.Column field='salary' align='right' width={90}>
						Large Salary
					</DataTable.Column>

					<DataTable.Column field='status' align='center' width={100}>
						Status
					</DataTable.Column>
				</DataTable>
			);
		},
	});

	return <Component />;
};
