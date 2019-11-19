import { IAccordionState } from './Accordion';

export function onSelect(state: IAccordionState, selectedIndex: number) {
	return {
		...state,
		selectedIndex,
	};
}