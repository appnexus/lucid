import { IAccordionState } from './Accordion';

export function onSelect(
	state: IAccordionState,
	selectedIndex: number
): IAccordionState {
	return {
		...state,
		selectedIndex,
	};
}
