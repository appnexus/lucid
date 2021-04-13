import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { SearchableSingleSelect } from '../../../index';

const { Option } = SearchableSingleSelect;
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

export default createClass({
	getInitialState() {
		return {
			selectedId: null, // current selection
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

	handleSelect(index: string, event: any) {
		this.setState({
			selectedId: _.get(event, 'props.callbackId', null),
		});
	},

	render() {
		const { isLoading, visibleIds, selectedId } = this.state;

		const selectedIndex =
			_.indexOf(visibleIds, selectedId) === -1
				? null
				: _.indexOf(visibleIds, selectedId);

		return (
			<section>
				<SearchableSingleSelect
					hasSelections={false}
					isLoading={isLoading}
					onSelect={this.handleSelect}
					onSearch={this.handleSearch}
					selectedIndex={selectedIndex}
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
				</SearchableSingleSelect>
			</section>
		);
	},
});
