import _ from 'lodash';
import React from 'react';
import ListStateless from '../List';
import { buildStatefulComponent } from '../../../util/state-management';

const List = buildStatefulComponent(ListStateless);

export default React.createClass({
	getInitialState() {
		return {
			currentList: 'one',
			selectedIndices: [0],
		};
	},

	handleSelect(currentList, index) {
		this.setState({
			currentList,
			selectedIndices: [index],
		});
	},

	render() {
		return (
			<List
				onSelect={_.partial(this.handleSelect, 'one')}
				selectedIndices={this.state.currentList === 'one' ? this.state.selectedIndices : []}
			>
				<List.Item>Level one</List.Item>
				<List.Item isExpanded={true}>
					Level one with List
					<List
						onSelect={_.partial(this.handleSelect, 'two')}
						selectedIndices={this.state.currentList === 'two' ? this.state.selectedIndices : []}
					>
						<List.Item>Level two</List.Item>
						<List.Item>Level two</List.Item>
					</List>
				</List.Item>
				<List.Item isExpanded={true}>
					Level one with List
					<List
						onSelect={_.partial(this.handleSelect, 'three')}
						selectedIndices={this.state.currentList === 'three' ? this.state.selectedIndices : []}
					>
						<List.Item>Level two</List.Item>
						<List.Item isExpanded={false}>
							Level two with closed List
							<List
								onSelect={_.partial(this.handleSelect, 'four')}
								selectedIndices={this.state.currentList === 'four' ? this.state.selectedIndices : []}
							>
								<List.Item>Level three</List.Item>
								<List.Item>Level three</List.Item>
								<List.Item>Level three</List.Item>
							</List>
						</List.Item>
						<List.Item>Level two</List.Item>
					</List>
				</List.Item>
				<List.Item>Level one</List.Item>
			</List>
		);
	}
});
