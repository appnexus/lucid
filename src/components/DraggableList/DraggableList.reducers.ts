export function onDragStart(state = {}, dragIndex: number) {
	return {
		...state,
		dragIndex,
	};
}
export function onDragEnd(state = {}) {
	return {
		...state,
		dragIndex: undefined,
		dragOverIndex: undefined,
	};
}
export function onDragOver(state = {}, dragOverIndex: number) {
	return {
		...state,
		dragOverIndex,
	};
}

export interface IDraggableListState {
	dragIndex: number;
	dragOverIndex: number;
}
