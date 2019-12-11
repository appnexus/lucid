import _ from 'lodash';
import * as DropMenu from '../DropMenu/DropMenu.reducers';
import {
	ISingleSelectState,
	//ISingleSelectOptionGroupState,
} from './SingleSelect';

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

// import _ from 'lodash';
// import * as DropMenu from '../DropMenu/DropMenu.reducers';

// export function onSelect(state, selectedIndex) {
// 	return _.assign({}, state, {
// 		selectedIndex,
// 		DropMenu: DropMenu.onSelect(state.DropMenu, selectedIndex),
// 	});
// }

// export { DropMenu };
