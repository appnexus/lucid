import React from 'react';
import createClass from 'create-react-class';
import { CheckboxLabeled, DraggableList } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			items: ['Item One', 'Item Two', 'Item Three', 'Item Four', 'Item Five'],
		};
	},

	handleDrop({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) {
		const { items } = this.state;
		const updatedItems = items.filter(
			(column: string, index: number) => index !== oldIndex
		);
		updatedItems.splice(newIndex, 0, items[oldIndex]);
		this.setState({ items: updatedItems });
	},

	render() {
		const { items } = this.state;

		return (
			<DraggableList onDrop={this.handleDrop} style={{ width: 500 }}>
				{items.map((text: string) => (
					<DraggableList.Item key={text}>
						<div style={{ display: 'flex', alignItems: 'center', height: 50 }}>
							<CheckboxLabeled Label={text} />
						</div>
					</DraggableList.Item>
				))}
			</DraggableList>
		);
	},
});
