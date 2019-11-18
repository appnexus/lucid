import { ISidebarState } from './Sidebar';

export function onToggle(state: ISidebarState): ISidebarState {
	return {
		...state,
		isExpanded: !state.isExpanded,
	};
}

export function onResize(state: ISidebarState, width: number): ISidebarState {
	return {
		...state,
		width,
		isExpanded: true,
	};
}
