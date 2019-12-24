import _ from 'lodash';
import * as DropMenu from '../DropMenu/DropMenu.reducers';
import { ISingleSelectState } from './SingleSelect';

export function onSelect(
	state: ISingleSelectState,
	selectedIndex: number
): ISingleSelectState {
	return _.assign({}, state, {
		selectedIndex,
		DropMenu: DropMenu.onSelect(state.DropMenu, selectedIndex),
	});
}

export { DropMenu };
