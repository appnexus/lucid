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
				style={{ width: '200px' }}
				onSelect={_.partial(this.handleSelect, 'one')}
				selectedIndices={this.state.currentList === 'one' ? this.state.selectedIndices : []}
			>
				<List.Item>Level one</List.Item>
				<List.Item hasExpander={true}>
					Level one with List
					<List
						onSelect={_.partial(this.handleSelect, 'two')}
						selectedIndices={this.state.currentList === 'two' ? this.state.selectedIndices : []}
					>
						<List.Item>Level two</List.Item>
						<List.Item hasExpander={true}>
							Level two with List and lots of text. Lorem quos natus mollitia nihil quasi! Necessitatibus corporis aliquam quam laborum nesciunt quaerat. Nostrum distinctio officiis adipisci nulla unde repellat. Soluta eaque ex obcaecati molestiae provident aspernatur sit! Expedita et.
							<List
								onSelect={_.partial(this.handleSelect, 'three')}
								selectedIndices={this.state.currentList === 'three' ? this.state.selectedIndices : []}
							>
								{_.times(50, (n) => {
									return <List.Item key={n}>Level three</List.Item>;
								})}
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
