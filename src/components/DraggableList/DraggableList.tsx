import _ from 'lodash';
import React, { useRef } from 'react';
import PropTypes from 'react-peek/prop-types';
import { lucidClassNames } from '../../util/style-helpers';
import { buildModernHybridComponent } from '../../util/state-management';
import DotsIcon from '../Icon/DotsIcon/DotsIcon';

import * as reducers from './DraggableList.reducers';
import { IDraggableListState } from './DraggableList.reducers';

import {
	findTypes,
	omitProps,
	StandardProps,
	Overwrite,
} from '../../util/component-types';

const cx = lucidClassNames.bind('&-DraggableList');

const { bool, func, object, number, string } = PropTypes;

export interface IDraggableListItemProps
	extends StandardProps,
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		> {}

const DraggableListItem = (_props: IDraggableListItemProps): null => null;
DraggableListItem.displayName = 'DraggableList.Item';
DraggableListItem.peek = {
	description: `
	Renders a \`<div>\` that acts as an item in the list
	`,
};
DraggableListItem.propName = 'ContextMenu';
DraggableListItem.propTypes = {
	children: PropTypes.node``,
};

interface IDraggableListPropsRaw extends StandardProps {
	hasDragHandle: boolean;
	dragIndex: number;
	dragOverIndex: number;
	onDragStart: (
		dragIndex: number,
		{ event, props }: { event: React.DragEvent; props: IDraggableListProps }
	) => void;
	onDragEnd: ({
		event,
		props,
	}: {
		event: React.DragEvent;
		props: IDraggableListProps;
	}) => void;
	onDragOver: (
		dragOverIndex: number,
		{ event, props }: { event: React.DragEvent; props: IDraggableListProps }
	) => void;
	onDrop: (
		{ oldIndex, newIndex }: { newIndex: number; oldIndex: number },
		{ event, props }: { event: React.DragEvent; props: IDraggableListProps }
	) => void;
}

export interface IDraggableListProps
	extends Overwrite<
		React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
		IDraggableListPropsRaw
	> {}

const DraggableList = (props: IDraggableListProps) => {
	const {
		style,
		className,
		hasDragHandle,
		dragIndex,
		dragOverIndex,
		onDragStart,
		onDragEnd,
		onDragOver,
		onDrop,
		...passThroughs
	} = props;

	const lastItemEl = useRef(null);

	const isValidDropIndex = (index: number) => {
		const { dragIndex } = props;
		return index < dragIndex || index > dragIndex + 1;
	};

	const handleDragStart = (index: number) => {
		return (event: React.DragEvent) => {
			const { dataTransfer } = event;
			dataTransfer.effectAllowed = 'move';
			dataTransfer.dropEffect = 'move';
			dataTransfer.setData('drag', 'drag');
			onDragStart(index, { event, props });
		};
	};

	const handleDragEnd = (event: React.DragEvent) => {
		onDragEnd({ event, props });
		if (isValidDropIndex(dragOverIndex)) {
			onDrop(
				{
					oldIndex: dragIndex,
					newIndex:
						dragOverIndex > dragIndex ? dragOverIndex - 1 : dragOverIndex,
				},
				{ event, props }
			);
		}
	};

	const handleDragOver = (index: number) => {
		return (event: React.DragEvent) => {
			event.preventDefault();
			if (dragOverIndex !== index) {
				onDragOver(index, { event, props });
			}
		};
	};

	const handleDragLeave = (event: React.DragEvent) => {
		const { dragIndex, onDragOver } = props;
		const childCount = findTypes(props, DraggableList.Item).length;
		const currentLastItemEl = lastItemEl.current;

		if (currentLastItemEl !== null) {
			//@ts-ignore
			const { bottom } = currentLastItemEl.getBoundingClientRect();
			if (_.isFinite(dragIndex) && event.clientY > bottom) {
				onDragOver(childCount, { event, props: props });
			}
		}
	};

	const itemChildProps = _.map(findTypes(props, DraggableList.Item), 'props');

	const dividerIndex =
		_.isNumber(dragIndex) && isValidDropIndex(dragOverIndex)
			? dragOverIndex
			: -1;

	return (
		<div
			{...omitProps(passThroughs, undefined, _.keys(DraggableList.propTypes))}
			className={cx(
				'&',
				{
					'&-is-dragging': _.isNumber(dragIndex),
				},
				className
			)}
			style={style}
			onDragLeave={handleDragLeave}
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
							onDragStart={handleDragStart(index)}
							onDragEnd={handleDragEnd}
							onDragOver={handleDragOver(index)}
						>
							<div
								{...itemChildProp}
								className={cx('&-Item-content')}
								ref={index === itemChildProps.length - 1 ? lastItemEl : null}
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
};
DraggableList.Item = DraggableListItem;
DraggableList.displayName = 'DraggableList';
DraggableList.peek = {
	description: `
	This is a container that renders divs in a list that
	can be drag and drop reordered.
	`,
	categories: ['controls'],
};
DraggableList.propTypes = {
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
};

export default buildModernHybridComponent<
	IDraggableListProps,
	IDraggableListState,
	typeof DraggableList
>(DraggableList, { reducers });

export { DraggableList as DraggableListDumb };
