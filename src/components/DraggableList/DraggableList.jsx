import _ from 'lodash';
import React from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { createClass, findTypes, omitProps } from '../../util/component-types';
import { buildHybridComponent } from '../../util/state-management';
import DotsIcon from '../Icon/DotsIcon/DotsIcon';

import * as reducers from '../DraggableList/DraggableList.reducers';

const cx = lucidClassNames.bind('&-DraggableList');

const { bool, func, object, number, string } = PropTypes;

const DraggableList = createClass({
	statics: {
		peek: {
			description: `
				This is a container that renders divs in a list that
				can be drag and drop reordered.
			`,
			categories: ['controls'],
		},
	},

	displayName: 'DraggableList',

	components: {
		Item: createClass({
			displayName: 'DraggableList.Item',
			statics: {
				peek: {
					description: `
						Renders a \`<div>\` that acts as an item in the list
					`,
				},
			},
			propName: 'Item',
		}),
	},

	reducers,

	propTypes: {
		className: string`
			Appended to the component-specific class names set on the root element.
		`,
		style: object`
			Passed through to the root element.
		`,
		hasDragHandle: bool`
			Render a drag handle on list items
		`,
		dragIndex: number`
			Index of the item the drag was started on
		`,
		dragOverIndex: number`
			Index of the item the dragged item is hovered over
		`,
		onDragStart: func`
			Called when the user starts to drag an item.
			Signature: \`(dragIndex, { event, props }) => {}\`
		`,
		onDragEnd: func`
			Called when the user stops to dragging an item.
			Signature: \`({ event, props }) => {}\`
		`,
		onDragOver: func`
			Called when the user drags an item over another item.
			Signature: \`(dragOverIndex, { event, props }) => {}\`
		`,
		onDrop: func`
			Called when the user drops an item in the list
			Signature: \`({oldIndex, newIndex}, { event, props }) => {}\`
		`,
	},

	getDefaultProps() {
		return {
			hasDragHandle: true,
			onDragStart: _.noop,
			onDragEnd: _.noop,
			onDragOver: _.noop,
			onDrop: _.noop,
		};
	},

	isValidDropIndex(index) {
		const { dragIndex } = this.props;
		return index < dragIndex || index > dragIndex + 1;
	},

	handleDragStart(index) {
		return event => {
			const { dataTransfer } = event;
			dataTransfer.effectAllowed = 'move';
			dataTransfer.dropEffect = 'move';
			dataTransfer.setData('drag', 'drag');
			this.props.onDragStart(index, { event, props: this.props });
		};
	},

	handleDragEnd(event) {
		const { dragIndex, dragOverIndex, onDragEnd, onDrop } = this.props;
		onDragEnd({ event, props: this.props });
		if (this.isValidDropIndex(dragOverIndex)) {
			onDrop(
				{
					oldIndex: dragIndex,
					newIndex:
						dragOverIndex > dragIndex ? dragOverIndex - 1 : dragOverIndex,
				},
				{ event, props: this.props }
			);
		}
	},

	handleDragOver(index) {
		return event => {
			event.preventDefault();
			const { dragOverIndex, onDragOver } = this.props;
			if (dragOverIndex !== index) {
				onDragOver(index, { event, props: this.props });
			}
		};
	},

	handleDragLeave(event) {
		const { dragIndex, onDragOver } = this.props;
		const childCount = findTypes(this.props, DraggableList.Item).length;

		if (this.lastItemEl) {
			const { bottom } = this.lastItemEl.getBoundingClientRect();
			if (_.isFinite(dragIndex) && event.clientY > bottom) {
				onDragOver(childCount, { event, props: this.props });
			}
		}
	},

	render() {
		const {
			style,
			className,
			hasDragHandle,
			dragIndex,
			dragOverIndex,
			...passThroughs
		} = this.props;

		const itemChildProps = _.map(
			findTypes(this.props, DraggableList.Item),
			'props'
		);

		const dividerIndex =
			_.isNumber(dragIndex) && this.isValidDropIndex(dragOverIndex)
				? dragOverIndex
				: -1;

		return (
			<div
				{...omitProps(passThroughs, DraggableList)}
				className={cx(
					'&',
					{
						'&-is-dragging': _.isNumber(dragIndex),
					},
					className
				)}
				style={style}
				onDragLeave={this.handleDragLeave}
			>
				{_.map(itemChildProps, (itemChildProp, index) => {
					return (
						<div key={index}>
							<hr
								className={cx('&-Divider', {
									'&-Divider-is-visible': dividerIndex === index,
								})}
							/>
							<div
								className={cx(
									'&-Item',
									{
										'&-Item-is-dragging': dragIndex === index,
										'&-Item-is-drag-over': dragOverIndex === index,
									},
									itemChildProp.className
								)}
								draggable
								onDragStart={this.handleDragStart(index)}
								onDragEnd={this.handleDragEnd}
								onDragOver={this.handleDragOver(index)}
							>
								<div
									{...itemChildProp}
									className={cx('&-Item-content')}
									ref={ref => {
										if (index === itemChildProps.length - 1) {
											this.lastItemEl = ref;
										}
									}}
								/>
								{hasDragHandle && (
									<span className={cx('&-Item-handle')}>
										<DotsIcon size={8} />
										<DotsIcon size={8} />
									</span>
								)}
							</div>
						</div>
					);
				})}
				<hr
					key='divider'
					className={cx('&-Divider', {
						'&-Divider-is-visible': dividerIndex >= itemChildProps.length,
					})}
				/>
			</div>
		);
	},
});

export default buildHybridComponent(DraggableList);
export { DraggableList as DraggableListDumb };
