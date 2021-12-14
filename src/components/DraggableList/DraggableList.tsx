import _ from 'lodash';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { lucidClassNames } from '../../util/style-helpers';
import { buildModernHybridComponent } from '../../util/state-management';
import DotsIcon from '../Icon/DotsIcon/DotsIcon';
import * as reducers from './DraggableList.reducers';
import { IDraggableListState } from './DraggableList.reducers';

import {
	findTypes,
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
DraggableListItem.propName = 'Item';
DraggableListItem.propTypes = {
	children: PropTypes.node /**/,
};

interface IDraggableListPropsRaw extends StandardProps {
	/** Render a drag handle on list items */
	hasDragHandle?: boolean;
	/** Index of the item the drag was started on */
	dragIndex?: number;
	/** Index of the item the dragged item is hovered over */
	dragOverIndex?: number;
	/** Called when the user starts to drag an item.
	Signature: \`(dragIndex, { event, props }) => {}\` */
	onDragStart?: (
		dragIndex: number,
		{ event, props }: { event: React.DragEvent; props: IDraggableListProps }
	) => void;
	/** Called when the user stops to dragging an item.
	Signature: \`({ event, props }) => {}\` */
	onDragEnd?: ({
		event,
		props,
	}: {
		event: React.DragEvent;
		props: IDraggableListProps;
	}) => void;
	/** Called when the user drags an item over another item.
	Signature: \`(dragOverIndex, { event, props }) => {}\` */
	onDragOver?: (
		dragOverIndex: number,
		{ event, props }: { event: React.DragEvent; props: IDraggableListProps }
	) => void;
	/** Called when the user drops an item in the list
	Signature: \`({oldIndex, newIndex}, { event, props }) => {}\` */
	onDrop?: (
		{ oldIndex, newIndex }: { newIndex: number; oldIndex: number },
		{ event, props }: { event: React.DragEvent; props: IDraggableListProps }
	) => void;
	/** Props for DraggableList.Item */
	Item?: React.ReactNode & { props: IDraggableListItemProps };
}

export interface IDraggableListProps
	extends Overwrite<
		React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>,
		IDraggableListPropsRaw
	> {}

interface IDraggableIndexes {
	dragIndex: number;
	dragOverIndex: number;
}

/** Verifies its ok to drop an item given the current drag indexes and
 * provides a typeguard that dragIndex and dragOverIndex aren't undefined
 */
const isValidDropIndex = (dragIndexes: {
	dragIndex?: number;
	dragOverIndex?: number;
}): dragIndexes is IDraggableIndexes => {
	const { dragOverIndex, dragIndex } = dragIndexes;
	return (
		_.isNumber(dragOverIndex) &&
		_.isNumber(dragIndex) &&
		(dragOverIndex < dragIndex || dragOverIndex > dragIndex + 1)
	);
};

const DraggableList = (props: IDraggableListProps) => {
	const {
		style,
		className,
		dragIndex,
		dragOverIndex,
		hasDragHandle = true,
		onDragStart = _.noop,
		onDragEnd = _.noop,
		onDragOver = _.noop,
		onDrop = _.noop,
		...passThroughs
	} = props;

	const lastItemEl = useRef(null);

	//This object helps handle 'undefined' indexes in a way that makes typescript happy
	const dragIndexes = { dragIndex, dragOverIndex };

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
		if (isValidDropIndex(dragIndexes)) {
			onDrop(
				{
					oldIndex: dragIndex,
					newIndex:
						dragIndexes.dragOverIndex > dragIndexes.dragIndex
							? dragIndexes.dragOverIndex - 1
							: dragOverIndex,
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

	const dividerIndex = isValidDropIndex(dragIndexes)
		? dragIndexes.dragOverIndex
		: -1;

	return (
		<div
			{...(passThroughs as any)}
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
	description: `A container that renders \`divs\` in a list that can be drag-and-drop reordered.`,
	categories: ['controls'],
};
DraggableList.propTypes = {
	/**
		Appended to the component-specific class names set on the root element.
	*/
	className: string,

	/**
		Passed through to the root element.
	*/
	style: object,

	/**
		Render a drag handle on list items
	*/
	hasDragHandle: bool,

	/**
		Index of the item the drag was started on
	*/
	dragIndex: number,

	/**
		Index of the item the dragged item is hovered over
	*/
	dragOverIndex: number,

	/**
		Called when the user starts to drag an item.
		Signature: \`(dragIndex, { event, props }) => {}\`
	*/
	onDragStart: func,

	/**
		Called when the user stops to dragging an item.
		Signature: \`({ event, props }) => {}\`
	*/
	onDragEnd: func,

	/**
		Called when the user drags an item over another item.
		Signature: \`(dragOverIndex, { event, props }) => {}\`
	*/
	onDragOver: func,

	/**
		Called when the user drops an item in the list
		Signature: \`({oldIndex, newIndex}, { event, props }) => {}\`
	*/
	onDrop: func,

	/**
		Props for DraggableList.Item
	*/
	Item: PropTypes.any,
};

export default buildModernHybridComponent<
	IDraggableListProps,
	IDraggableListState,
	typeof DraggableList
>(DraggableList, { reducers });

export { DraggableList as DraggableListDumb };
