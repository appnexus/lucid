// export const onSelect = (state, selectedIndex) => ({ ...state, selectedIndex });

import { IVerticalTabsState } from './VerticalTabs';

export function onSelect(
    state: IVerticalTabsState,
    selectedIndex: number
): IVerticalTabsState {
    return {
        ...state,
        selectedIndex
    }
}