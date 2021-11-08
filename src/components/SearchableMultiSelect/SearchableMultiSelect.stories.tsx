import React from 'react';
import createClass from 'create-react-class';
import { Selection, SearchableMultiSelect } from './../../index';
import _ from 'lodash';
import Resizer from '../Resizer/Resizer';

export default {
	title: 'Controls/Selectors/SearchableMultiSelect',
	component: SearchableMultiSelect,
	parameters: {
		docs: {
			description: {
				component: (SearchableMultiSelect as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	const { Option } = SearchableMultiSelect;

	const Component = createClass({
		render() {
			return (
				<Resizer>
					{(width) => {
						const responsiveMode = width >= 400 ? 'large' : 'small';

						return (
							<SearchableMultiSelect responsiveMode={responsiveMode}>
								<Option isDisabled>Alabama</Option>
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
			);
		},
	});

	return <Component />;
};
Default.storyName = 'Default';

/* Props */
export const Props = () => {
	const { Option } = SearchableMultiSelect;

	const Component = createClass({
		getInitialState() {
			return {
				isRequired: false,
			};
		},

		handleChange(event: any) {
			this.setState({
				isRequired: event.length > 0,
			});
		},

		render() {
			return (
				<Resizer>
					{(width) => {
						const responsiveMode = width >= 768 ? 'large' : 'small';

						return (
							<section>
								<h5>Loading</h5>
								<SearchableMultiSelect
									responsiveMode={responsiveMode}
									isLoading={true}
								>
									<Option>Alabama</Option>
								</SearchableMultiSelect>

								<h5>Disabled</h5>
								<SearchableMultiSelect
									responsiveMode={responsiveMode}
									isDisabled={true}
								>
									<Option>Alabama</Option>
								</SearchableMultiSelect>

								<h5>Custom option selections</h5>
								<SearchableMultiSelect
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
		},
	});

	return <Component />;
};
Props.storyName = 'Props';

/* Asynchronous */
export const Asynchronous = () => {
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
Asynchronous.storyName = 'Asynchronous';

/* Grouped Options */
export const GroupedOptions = () => {
	const { Option, OptionGroup } = SearchableMultiSelect;

	const Component = createClass({
		render() {
			return (
				<SearchableMultiSelect
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
		},
	});

	return <Component />;
};
GroupedOptions.storyName = 'GroupedOptions';

/* Custom Selection Label */
export const CustomSelectionLabel = () => {
	const { Option, SelectionLabel } = SearchableMultiSelect;

	const Component = createClass({
		render() {
			return (
				<SearchableMultiSelect>
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
		},
	});

	return <Component />;
};
CustomSelectionLabel.storyName = 'CustomSelectionLabel';

/* Select All */
export const SelectAll = () => {
	const { Option } = SearchableMultiSelect;

	const Component = createClass({
		render() {
			return (
				<section style={{ marginBottom: '300px' }}>
					<Resizer>
						{(width) => {
							const responsiveMode = width >= 768 ? 'large' : 'small';

							return (
								<SearchableMultiSelect
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
		},
	});

	return <Component />;
};
SelectAll.storyName = 'SelectAll';

/* Formatted Options */
export const FormattedOptions = () => {
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

	class Component extends React.Component {
		render() {
			return (
				<SearchableMultiSelect optionFilter={optionFilter}>
					<SearchableMultiSelect.OptionGroup Selected=''>
						<div style={{ marginLeft: 27 }}>
							<OptionCols col1='ID' col2='NAME' />
						</div>

						<SearchableMultiSelect.Option
							filterText='Foo'
							Selected='Foo (1234)'
						>
							{({ searchText }: { searchText: string }) => (
								<OptionCols col1='1234' col2='Foo' textMatch={searchText} />
							)}
						</SearchableMultiSelect.Option>

						<SearchableMultiSelect.Option
							filterText='Bar'
							Selected='Bar (2345)'
						>
							{({ searchText }: { searchText: string }) => (
								<OptionCols col1='2345' col2='Bar' textMatch={searchText} />
							)}
						</SearchableMultiSelect.Option>

						<SearchableMultiSelect.Option
							filterText='Baz'
							Selected='Baz (3456)'
						>
							{({ searchText }: { searchText: string }) => (
								<OptionCols col1='3456' col2='Baz' textMatch={searchText} />
							)}
						</SearchableMultiSelect.Option>
					</SearchableMultiSelect.OptionGroup>
				</SearchableMultiSelect>
			);
		}
	}
	return <Component />;
};
FormattedOptions.storyName = 'FormattedOptions';

/* Invalid */
export const Invalid = () => {
	const { Option } = SearchableMultiSelect;

	const Component = createClass({
		getInitialState() {
			return {
				selectedLength: 0,
			};
		},
		handleChange(option: string, event: any) {
			let count = this.state.selectedLength;
			if (typeof event.props.children === 'string') {
				count--;
			} else {
				event.props.children.props.isSelected ? count-- : count++;
			}
			this.setState({
				selectedLength: count,
			});
		},
		handleRemoveAll(option: string, event: any) {
			this.setState({
				selectedLength: 0,
			});
		},
		render() {
			return (
				<Resizer>
					{(width) => {
						const responsiveMode = width >= 400 ? 'large' : 'small';

						return (
							<SearchableMultiSelect
								responsiveMode={responsiveMode}
								onRemoveAll={this.handleRemoveAll}
								onSelect={this.handleChange}
								Error={
									this.state.selectedLength > 1
										? null
										: 'Please select at least two options'
								}
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
			);
		},
	});

	return <Component />;
};
Invalid.storyName = 'Invalid';
