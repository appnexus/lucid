import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { Selection, SearchableMultiSelect } from '../../../index';

const { Option } = SearchableMultiSelect;
const allData = {
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

export default createClass({
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

	handleSearch(searchText) {
		this.setState({ isLoading: true });

		// Fake an API call
		setTimeout(() => {
			const visibleIds = _.reduce(
				allData,
				(acc, { name }, id) => {
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

	handleRemove({ props: { callbackId } }) {
		this.setState({
			selectedIds: _.without(this.state.selectedIds, callbackId),
		});
	},

	handleSelect(index, { props: { callbackId } }) {
		this.setState({
			selectedIds: _.xor(this.state.selectedIds, [callbackId]),
		});
	},

	render() {
		const { isLoading, visibleIds, selectedIds } = this.state;

		// Calculate selected indices based on selected ids
		const selectedIndices = _.reduce(
			visibleIds,
			(acc, id, index) => {
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
					{_.map(visibleIds, id => (
						<Option key={id} callbackId={id}>{allData[id].name}</Option>
					))}
				</SearchableMultiSelect>

				{!_.isEmpty(selectedIds)
					? <Selection
							isBold
							hasBackground
							Label="Selected"
							kind="container"
							isRemovable={false}
						>
							{_.map(selectedIds, id => (
								<Selection
									key={id}
									Label={allData[id].name}
									callbackId={id}
									onRemove={this.handleRemove}
								/>
							))}
						</Selection>
					: null}
			</section>
		);
	},
});
