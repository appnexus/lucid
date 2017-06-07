import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { VerticalListMenu } from '../../../index';

export default createClass({
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
			<VerticalListMenu
				style={{ width: 250 }}
				onSelect={_.partial(this.handleSelect, 'one')}
				selectedIndices={
					this.state.currentList === 'one' ? this.state.selectedIndices : []
				}
			>
				<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
				<VerticalListMenu.Item hasExpander={true}>
					Level one with VerticalListMenu
					<VerticalListMenu
						onSelect={_.partial(this.handleSelect, 'two')}
						selectedIndices={
							this.state.currentList === 'two' ? this.state.selectedIndices : []
						}
					>
						<VerticalListMenu.Item>Level two</VerticalListMenu.Item>
						<VerticalListMenu.Item hasExpander={true}>
							Level two with VerticalListMenu and lots of text. Lorem quos natus mollitia nihil quasi! Necessitatibus corporis aliquam quam laborum nesciunt quaerat. Nostrum distinctio officiis adipisci nulla unde repellat. Soluta eaque ex obcaecati molestiae provident aspernatur sit! Expedita et.
							<VerticalListMenu
								onSelect={_.partial(this.handleSelect, 'three')}
								selectedIndices={
									this.state.currentList === 'three'
										? this.state.selectedIndices
										: []
								}
							>
								{_.times(50, n => {
									return (
										<VerticalListMenu.Item key={n}>
											Level three
										</VerticalListMenu.Item>
									);
								})}
							</VerticalListMenu>
						</VerticalListMenu.Item>
						<VerticalListMenu.Item>Level two</VerticalListMenu.Item>
					</VerticalListMenu>
				</VerticalListMenu.Item>
				<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
			</VerticalListMenu>
		);
	},
});
