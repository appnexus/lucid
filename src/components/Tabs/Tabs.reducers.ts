import { ITabsState } from './Tabs';

export const onSelect = (state: ITabsState, selectedIndex: number) => ({
	...state,
	selectedIndex,
});
