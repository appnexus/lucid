import React from 'react';
import createClass from 'create-react-class';
import { CheckboxLabeled, DraggableList } from './../../index';

export default {
	title: 'Controls/DraggableList',
	component: DraggableList,
	parameters: {
		docs: {
			description: {
				component: (DraggableList as any).peek.description,
			},
		},
	},
};

/* Default */
export const Default = () => {
	const Component = createClass({
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
				<DraggableList onDrop={this.handleDrop}>
					{items.map((text: string) => (
						<DraggableList.Item key={text}>{text}</DraggableList.Item>
					))}
				</DraggableList>
			);
		},
	});

	return <Component />;
};
Default.storyName = 'Default';

/* No Drag Handle */
export const NoDragHandle = () => {
	const Component = createClass({
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
				<DraggableList onDrop={this.handleDrop} hasDragHandle={false}>
					{items.map((text: string) => (
						<DraggableList.Item key={text}>{text}</DraggableList.Item>
					))}
				</DraggableList>
			);
		},
	});

	return <Component />;
};
NoDragHandle.storyName = 'NoDragHandle';

/* With Children */
export const WithChildren = () => {
	const Component = createClass({
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
							<div
								style={{ display: 'flex', alignItems: 'center', height: 50 }}
							>
								<CheckboxLabeled Label={text} />
							</div>
						</DraggableList.Item>
					))}
				</DraggableList>
			);
		},
	});

	return <Component />;
};
WithChildren.storyName = 'WithChildren';
