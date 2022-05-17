import React, { useState } from 'react';
import createClass from 'create-react-class';
import _, { map } from 'lodash';
import { Meta, Story } from '@storybook/react';

import Resizer from '../Resizer/Resizer';
import SearchableMultiSelect, {
	ISearchableMultiSelectProps,
} from './SearchableMultiSelect';
import Selection from '../Selection/Selection';

//👇 Provide Storybook with the component name, 'section', any subcomponents and a description
export default {
	title: 'Controls/SearchableMultiSelect',
	component: SearchableMultiSelect,
	subcomponents: {
		'SearchableMultiSelect.SelectionOption':
			SearchableMultiSelect.Option.Selection,
		'SearchableMultiSelect.Option.Selected':
			SearchableMultiSelect.Option.Selected,
		'SearchableMultiSelect.OptionGroup': SearchableMultiSelect.OptionGroup,
		'SearchableMultiSelect.SearchFieldComponent':
			SearchableMultiSelect.SearchField,
		'SearchableMultiSelect.Option': SearchableMultiSelect.Option,
	},
	parameters: {
		docs: {
			description: {
				component: SearchableMultiSelect.peek.description,
			},
		},
	},
	args: SearchableMultiSelect.defaultProps,
} as Meta;

//👇 Destructure any child components that we will need
const { Option } = SearchableMultiSelect;

//👇 Add a key prop to each element of the array
function addKeys(children: any) {
	return map(children, (child, index) => ({ ...child, key: index }));
}

/* Basic */
export const Basic: Story<ISearchableMultiSelectProps> = (args) => {
	return <SearchableMultiSelect {...args}></SearchableMultiSelect>;
};
Basic.args = {
	children: addKeys([
		<Option>Alabama</Option>,
		<Option>Alaska</Option>,
		<Option>Arizona</Option>,
		<Option>Arkansas</Option>,
		<Option>California</Option>,
		<Option>Colorado</Option>,
		<Option>Connecticut</Option>,
		<Option>Delaware</Option>,
		<Option>Florida</Option>,
		<Option>Georgia</Option>,
		<Option>Hawaii</Option>,
		<Option>Idaho</Option>,
		<Option>Illinois</Option>,
		<Option>Indiana</Option>,
		<Option>Iowa</Option>,
		<Option>Kansas</Option>,
		<Option>Kentucky</Option>,
		<Option>Louisiana</Option>,
		<Option>Maine</Option>,
		<Option>Maryland</Option>,
		<Option>Massachusetts</Option>,
		<Option>Michigan</Option>,
		<Option>Minnesota</Option>,
		<Option>Mississippi</Option>,
		<Option>Missouri</Option>,
		<Option>Montana Nebraska</Option>,
		<Option>Nevada</Option>,
		<Option>New Hampshire</Option>,
		<Option>New Jersey</Option>,
		<Option>New Mexico</Option>,
		<Option>New York</Option>,
		<Option>North Carolina</Option>,
		<Option>North Dakota</Option>,
		<Option>Ohio</Option>,
		<Option>Oklahoma</Option>,
		<Option>Oregon</Option>,
		<Option>Pennsylvania Rhode Island</Option>,
		<Option>South Carolina</Option>,
		<Option>South Dakota</Option>,
		<Option>Tennessee</Option>,
		<Option>Texas</Option>,
		<Option>Utah</Option>,
		<Option>Vermont</Option>,
		<Option>Virginia</Option>,
		<Option>Washington</Option>,
		<Option>West Virginia</Option>,
		<Option>Wisconsin</Option>,
		<Option>Wyoming</Option>,
	]),
};

/* Props */
export const Props: Story<ISearchableMultiSelectProps> = (args) => {
	const { Option } = SearchableMultiSelect;

	return (
		<Resizer>
			{(width) => {
				const responsiveMode = width >= 768 ? 'large' : 'small';

				return (
					<section>
						<h5>Loading</h5>
						<SearchableMultiSelect
							{...args}
							responsiveMode={responsiveMode}
							isLoading={true}
						>
							<Option>Alabama</Option>
						</SearchableMultiSelect>

						<h5>Disabled</h5>
						<SearchableMultiSelect
							{...args}
							responsiveMode={responsiveMode}
							isDisabled={true}
						>
							<Option>Alabama</Option>
						</SearchableMultiSelect>

						<h5>Custom option selections</h5>
						<SearchableMultiSelect
							{...args}
							responsiveMode={responsiveMode}
							selectedIndices={[0, 1, 2, 3]}
						>
							<Option Selection={{ kind: 'warning' }}>Washington</Option>
							<Option Selection={{ kind: 'success' }}>Oregon</Option>
							<Option Selection={{ kind: 'danger' }}>California</Option>
							<Option Selection={{ kind: 'container' }}>Nevada</Option>
						</SearchableMultiSelect>

						<h5>No remove all option</h5>
						<SearchableMultiSelect
							{...args}
							responsiveMode={responsiveMode}
							hasRemoveAll={false}
							initialState={{
								selectedIndices: [0, 1, 2],
							}}
						>
							<Option>Washington</Option>
							<Option>Oregon</Option>
							<Option>California</Option>
						</SearchableMultiSelect>
					</section>
				);
			}}
		</Resizer>
	);
};

/* Asynchronous */
export const Asynchronous: Story<ISearchableMultiSelectProps> = (args) => {
	const { Option } = SearchableMultiSelect;
	const allData: any = {
		100: { name: 'Rita Daniel' },
		101: { name: 'Meghan Mcgowan' },
		102: { name: 'Latisha Kent' },
		103: { name: 'Jeannine Horton' },
		104: { name: 'Noreen Joyner' },
		105: { name: 'Angelique Head' },
		106: { name: 'Kim Salinas' },
		107: { name: 'Alexis Small' },
		108: { name: 'Fernandez Singleton' },
		109: { name: 'Jacqueline Alvarado' },
		110: { name: 'Cornelia Roman' },
		111: { name: 'John Gonzales' },
		112: { name: 'Mcleod Hodge' },
		113: { name: 'Fry Barrera' },
		114: { name: 'Jannie Compton' },
		115: { name: 'June Odom' },
		116: { name: 'Rose Foster' },
		117: { name: 'Kathryn Prince' },
		118: { name: 'Hebert Bowman' },
		119: { name: 'Shawn Burgess' },
	};

	const Component = createClass({
		getInitialState() {
			return {
				selectedIds: [], // aka our full set of selections regardless of currently search
				visibleIds: [], // aka current search results
				isLoading: false,
			};
		},

		componentDidMount() {
			this.handleSearch('');
		},

		handleSearch(searchText: string) {
			this.setState({ isLoading: true });

			// Fake an API call
			setTimeout(() => {
				const visibleIds = _.reduce(
					allData,
					(acc: any[], { name }: { name: string }, id: string) => {
						return _.includes(name.toLowerCase(), searchText.toLowerCase())
							? acc.concat(id)
							: acc;
					},
					[]
				);

				this.setState({
					visibleIds,
					isLoading: false,
				});
			}, 750);
		},

		handleRemove({
			props: { callbackId },
		}: {
			props: {
				callbackId: string;
			};
		}) {
			this.setState({
				selectedIds: _.without(this.state.selectedIds, callbackId),
			});
		},

		handleSelect(
			index: number,
			{
				props: { callbackId },
			}: {
				props: {
					callbackId: string;
				};
			}
		) {
			this.setState({
				selectedIds: _.xor(this.state.selectedIds, [callbackId]),
			});
		},

		render() {
			const { isLoading, visibleIds, selectedIds } = this.state;

			// Calculate selected indices based on selected ids
			const selectedIndices = _.reduce(
				visibleIds,
				(acc: any[], id: string, index: number) => {
					return _.includes(selectedIds, id) ? acc.concat(index) : acc;
				},
				[]
			);

			return (
				<section>
					<SearchableMultiSelect
						{...args}
						hasSelections={false}
						isLoading={isLoading}
						onSelect={this.handleSelect}
						onSearch={this.handleSearch}
						selectedIndices={selectedIndices}
						optionFilter={_.constant(true)}
						SearchField={{
							placeholder: 'Type here to simulate an API backed search',
						}}
					>
						{_.map(visibleIds, (id) => (
							<Option key={id} callbackId={id}>
								{allData[id].name}
							</Option>
						))}
					</SearchableMultiSelect>

					{!_.isEmpty(selectedIds) ? (
						<Selection
							isBold
							hasBackground
							Label='Selected'
							kind='container'
							isRemovable={false}
						>
							{_.map(selectedIds, (id) => (
								<Selection
									key={id}
									Label={allData[id].name}
									callbackId={id}
									onRemove={this.handleRemove}
								/>
							))}
						</Selection>
					) : null}
				</section>
			);
		},
	});

	return <Component />;
};
Asynchronous.args = {
	...Basic.args,
};

/* Grouped Options */
export const GroupedOptions: Story<ISearchableMultiSelectProps> = (args) => {
	const { Option, OptionGroup } = SearchableMultiSelect;

	return (
		<SearchableMultiSelect
			{...args}
			hasSelectAll
			initialState={{
				selectedIndices: [0, 1, 2, 3, 11, 12, 48, 49],
			}}
		>
			<OptionGroup>
				Northeast
				<Option>Connecticut</Option>
				<Option>Delaware</Option>
				<Option>Maine</Option>
				<Option>Maryland</Option>
				<Option>Massachusetts</Option>
				<Option>New Hampshire</Option>
				<Option>New Jersey</Option>
				<Option>New York</Option>
				<Option>Pennsylvania</Option>
				<Option>Rhode Island</Option>
				<Option>Vermont</Option>
			</OptionGroup>
			<OptionGroup>
				Southeast
				<Option>Alabama</Option>
				<Option>Arkansas</Option>
				<Option>Florida</Option>
				<Option>Georgia</Option>
				<Option>Kentucky</Option>
				<Option>Louisiana</Option>
				<Option>Mississippi</Option>
				<Option>North Carolina</Option>
				<Option>South Carolina</Option>
				<Option>Tennessee</Option>
				<Option>Virginia</Option>
				<Option>West Virginia</Option>
			</OptionGroup>
			<OptionGroup>
				Midwest
				<Option>Illinois</Option>
				<Option>Indiana</Option>
				<Option>Iowa</Option>
				<Option>Kansas</Option>
				<Option>Michigan</Option>
				<Option>Minnesota</Option>
				<Option>Missouri</Option>
				<Option>Nebraska</Option>
				<Option>North Dakota</Option>
				<Option>Ohio</Option>
				<Option>South Dakota</Option>
				<Option>Wisconsin</Option>
			</OptionGroup>
			<OptionGroup>
				Southwest
				<Option>Arizona</Option>
				<Option>New Mexico</Option>
				<Option>Oklahoma</Option>
				<Option>Texas</Option>
			</OptionGroup>
			<OptionGroup>
				West
				<Option>California</Option>
				<Option>Colorado</Option>
				<Option>Idaho</Option>
				<Option>Montana</Option>
				<Option>Nevada</Option>
				<Option>Oregon</Option>
				<Option>Utah</Option>
				<Option>Washington</Option>
				<Option>Wyoming</Option>
			</OptionGroup>
			<Option>Alaska</Option>
			<Option>Hawaii</Option>
		</SearchableMultiSelect>
	);
};

/* Custom Selection Label */
export const CustomSelectionLabel: Story<ISearchableMultiSelectProps> = (
	args
) => {
	const { Option, SelectionLabel } = SearchableMultiSelect;

	return (
		<SearchableMultiSelect {...args}>
			<SelectionLabel>Selected States</SelectionLabel>
			<Option>Alabama</Option>
			<Option>Alaska</Option>
			<Option>Arizona</Option>
			<Option>Arkansas</Option>
			<Option>California</Option>
			<Option>Colorado</Option>
			<Option>Connecticut</Option>
			<Option>Delaware</Option>
			<Option>Florida</Option>
			<Option>Georgia</Option>
			<Option>Hawaii</Option>
			<Option>Idaho</Option>
			<Option>Illinois</Option>
			<Option>Indiana</Option>
			<Option>Iowa</Option>
			<Option>Kansas</Option>
			<Option>Kentucky</Option>
			<Option>Louisiana</Option>
			<Option>Maine</Option>
			<Option>Maryland</Option>
			<Option>Massachusetts</Option>
			<Option>Michigan</Option>
			<Option>Minnesota</Option>
			<Option>Mississippi</Option>
			<Option>Missouri</Option>
			<Option>Montana Nebraska</Option>
			<Option>Nevada</Option>
			<Option>New Hampshire</Option>
			<Option>New Jersey</Option>
			<Option>New Mexico</Option>
			<Option>New York</Option>
			<Option>North Carolina</Option>
			<Option>North Dakota</Option>
			<Option>Ohio</Option>
			<Option>Oklahoma</Option>
			<Option>Oregon</Option>
			<Option>Pennsylvania Rhode Island</Option>
			<Option>South Carolina</Option>
			<Option>South Dakota</Option>
			<Option>Tennessee</Option>
			<Option>Texas</Option>
			<Option>Utah</Option>
			<Option>Vermont</Option>
			<Option>Virginia</Option>
			<Option>Washington</Option>
			<Option>West Virginia</Option>
			<Option>Wisconsin</Option>
			<Option>Wyoming</Option>
		</SearchableMultiSelect>
	);
};

/* Select All */
export const SelectAll: Story<ISearchableMultiSelectProps> = (args) => {
	const { Option } = SearchableMultiSelect;

	return (
		<section style={{ marginBottom: '300px' }}>
			<Resizer>
				{(width) => {
					const responsiveMode = width >= 768 ? 'large' : 'small';

					return (
						<SearchableMultiSelect
							{...args}
							hasSelectAll
							selectAllText='Custom Select All Text'
							responsiveMode={responsiveMode}
						>
							<Option>Alabama</Option>
							<Option>Alaska</Option>
							<Option>Arizona</Option>
							<Option>Arkansas</Option>
							<Option>California</Option>
							<Option>Colorado</Option>
							<Option>Connecticut</Option>
							<Option>Delaware</Option>
							<Option>Florida</Option>
							<Option>Georgia</Option>
							<Option>Hawaii</Option>
							<Option>Idaho</Option>
							<Option>Illinois</Option>
							<Option>Indiana</Option>
							<Option>Iowa</Option>
							<Option>Kansas</Option>
							<Option>Kentucky</Option>
							<Option>Louisiana</Option>
							<Option>Maine</Option>
							<Option>Maryland</Option>
							<Option>Massachusetts</Option>
							<Option>Michigan</Option>
							<Option>Minnesota</Option>
							<Option>Mississippi</Option>
							<Option>Missouri</Option>
							<Option>Montana Nebraska</Option>
							<Option>Nevada</Option>
							<Option>New Hampshire</Option>
							<Option>New Jersey</Option>
							<Option>New Mexico</Option>
							<Option>New York</Option>
							<Option>North Carolina</Option>
							<Option>North Dakota</Option>
							<Option>Ohio</Option>
							<Option>Oklahoma</Option>
							<Option>Oregon</Option>
							<Option>Pennsylvania Rhode Island</Option>
							<Option>South Carolina</Option>
							<Option>South Dakota</Option>
							<Option>Tennessee</Option>
							<Option>Texas</Option>
							<Option>Utah</Option>
							<Option>Vermont</Option>
							<Option>Virginia</Option>
							<Option>Washington</Option>
							<Option>West Virginia</Option>
							<Option>Wisconsin</Option>
							<Option>Wyoming</Option>
						</SearchableMultiSelect>
					);
				}}
			</Resizer>
		</section>
	);
};

/* Formatted Options */
export const FormattedOptions: Story<ISearchableMultiSelectProps> = (args) => {
	// eslint-disable-next-line react/prop-types
	interface Props extends React.HTMLProps<HTMLParagraphElement> {
		match?: any;
	}
	function P({ children, ...rest }: Props) {
		return <p {...rest}>{children}</p>;
	}

	const OptionCols: any = ({
		col1,
		col2,
		textMatch,
	}: {
		col1: string;
		col2: string;
		textMatch: string;
	}) => (
		<div style={{ display: 'flex' }}>
			<div style={{ width: 100 }}>
				<P match={textMatch}>{col1}</P>
			</div>
			<div>
				<P match={textMatch}>{col2}</P>
			</div>
		</div>
	);

	const optionFilter = (
		searchText: string,
		{
			filterText,
		}: {
			filterText: string;
		}
	) => {
		if (filterText) {
			return new RegExp(_.escapeRegExp(searchText), 'i').test(filterText);
		}
		return true;
	};

	return (
		<SearchableMultiSelect {...args} optionFilter={optionFilter}>
			<SearchableMultiSelect.OptionGroup Selected=''>
				<div style={{ marginLeft: 27 }}>
					<OptionCols col1='ID' col2='NAME' />
				</div>

				<SearchableMultiSelect.Option filterText='Foo' Selected='Foo (1234)'>
					{({ searchText }: { searchText: string }) => (
						<OptionCols col1='1234' col2='Foo' textMatch={searchText} />
					)}
				</SearchableMultiSelect.Option>

				<SearchableMultiSelect.Option filterText='Bar' Selected='Bar (2345)'>
					{({ searchText }: { searchText: string }) => (
						<OptionCols col1='2345' col2='Bar' textMatch={searchText} />
					)}
				</SearchableMultiSelect.Option>

				<SearchableMultiSelect.Option filterText='Baz' Selected='Baz (3456)'>
					{({ searchText }: { searchText: string }) => (
						<OptionCols col1='3456' col2='Baz' textMatch={searchText} />
					)}
				</SearchableMultiSelect.Option>
			</SearchableMultiSelect.OptionGroup>
		</SearchableMultiSelect>
	);
};
FormattedOptions.args = {
	...Basic.args,
};

/* Invalid */
export const Invalid: Story<ISearchableMultiSelectProps> = (args) => {
	const { Option } = SearchableMultiSelect;

	const [selectedLength, setSelectedLength] = useState(0);

	const handleChange = (option: string, event: any) => {
		let count = selectedLength;
		if (typeof event.props.children === 'string') {
			count--;
		} else {
			event.props.children.props.isSelected ? count-- : count++;
		}
		setSelectedLength(count);
	};

	const handleRemoveAll = (option: string, event: any) => {
		setSelectedLength(0);
	};

	return (
		<SearchableMultiSelect
			{...(args as any)}
			onRemoveAll={handleRemoveAll}
			onSelect={handleChange}
			Error={selectedLength > 1 ? null : 'Please select at least two options'}
		>
			<Option>Alabama</Option>
			<Option>Alaska</Option>
			<Option>Arizona</Option>
			<Option>Arkansas</Option>
			<Option>California</Option>
			<Option>Colorado</Option>
			<Option>Connecticut</Option>
			<Option>Delaware</Option>
			<Option>Florida</Option>
			<Option>Georgia</Option>
			<Option>Hawaii</Option>
			<Option>Idaho</Option>
			<Option>Illinois</Option>
			<Option>Indiana</Option>
			<Option>Iowa</Option>
			<Option>Kansas</Option>
			<Option>Kentucky</Option>
			<Option>Louisiana</Option>
			<Option>Maine</Option>
			<Option>Maryland</Option>
			<Option>Massachusetts</Option>
			<Option>Michigan</Option>
			<Option>Minnesota</Option>
			<Option>Mississippi</Option>
			<Option>Missouri</Option>
			<Option>Montana Nebraska</Option>
			<Option>Nevada</Option>
			<Option>New Hampshire</Option>
			<Option>New Jersey</Option>
			<Option>New Mexico</Option>
			<Option>New York</Option>
			<Option>North Carolina</Option>
			<Option>North Dakota</Option>
			<Option>Ohio</Option>
			<Option>Oklahoma</Option>
			<Option>Oregon</Option>
			<Option>Pennsylvania Rhode Island</Option>
			<Option>South Carolina</Option>
			<Option>South Dakota</Option>
			<Option>Tennessee</Option>
			<Option>Texas</Option>
			<Option>Utah</Option>
			<Option>Vermont</Option>
			<Option>Virginia</Option>
			<Option>Washington</Option>
			<Option>West Virginia</Option>
			<Option>Wisconsin</Option>
			<Option>Wyoming</Option>
		</SearchableMultiSelect>
	);
};
