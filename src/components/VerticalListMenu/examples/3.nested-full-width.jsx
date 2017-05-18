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
				onSelect={_.partial(this.handleSelect, 'one')}
				selectedIndices={
					this.state.currentList === 'one' ? this.state.selectedIndices : []
				}
			>
				<VerticalListMenu.Item>Level one</VerticalListMenu.Item>
				<VerticalListMenu.Item isExpanded={true}>
					Level one with VerticalListMenu
					<VerticalListMenu
						onSelect={_.partial(this.handleSelect, 'two')}
						selectedIndices={
							this.state.currentList === 'two' ? this.state.selectedIndices : []
						}
					>
						<VerticalListMenu.Item>Level two</VerticalListMenu.Item>
						<VerticalListMenu.Item>Level two</VerticalListMenu.Item>
					</VerticalListMenu>
				</VerticalListMenu.Item>
				<VerticalListMenu.Item isExpanded={true}>
					Level one with VerticalListMenu
					<VerticalListMenu
						onSelect={_.partial(this.handleSelect, 'three')}
						selectedIndices={
							this.state.currentList === 'three'
								? this.state.selectedIndices
								: []
						}
					>
						<VerticalListMenu.Item>Level two</VerticalListMenu.Item>
						<VerticalListMenu.Item isExpanded={false}>
							Level two with closed VerticalListMenu
							<VerticalListMenu
								onSelect={_.partial(this.handleSelect, 'four')}
								selectedIndices={
									this.state.currentList === 'four'
										? this.state.selectedIndices
										: []
								}
							>
								<VerticalListMenu.Item>Level three</VerticalListMenu.Item>
								<VerticalListMenu.Item>Level three</VerticalListMenu.Item>
								<VerticalListMenu.Item>Level three</VerticalListMenu.Item>
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
