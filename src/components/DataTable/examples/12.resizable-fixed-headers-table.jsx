import React from 'react';
import createClass from 'create-react-class';
import {
	DataTable,
	SuccessIcon,
	TextField,
	CheckboxLabeled,
} from '../../../index';

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

export default createClass({
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
	handleToggle(stateItem) {
		this.setState(prevState => ({ [stateItem]: !prevState[stateItem] }));
	},
	handleNumeric(stateItem, value) {
		this.setState({ [stateItem]: value });
	},
	onChangeFixedColumnCount(prarm) {
		this.handleNumeric('fixedColumnCount', parseInt(prarm, 10));
	},
	onChangeFixedRowHeight(prarm) {
		this.handleNumeric('fixedRowHeight', parseInt(prarm, 10));
	},
	renderDataTable(props) {
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

				<DataTable.Column field='salary' align='right' width={100} isResizable>
					Salary
				</DataTable.Column>

				<DataTable.Column field='status' align='center' width={100} isResizable>
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
						onChange={v => this.onChangeFixedColumnCount(v)}
						placeholder='fixedColumnCount'
						value={this.state.fixedColumnCount}
					/>
					fixedColumnCount
				</label>
				<label style={{ marginBottom: 6, display: 'block', fontSize: 12 }}>
					<TextField
						style={{ marginRight: 9, width: 45 }}
						onChange={v => this.onChangeFixedRowHeight(v)}
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
