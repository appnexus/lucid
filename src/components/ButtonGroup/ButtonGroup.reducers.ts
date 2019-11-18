import _ from 'lodash';
import { IButtonGroupState } from './ButtonGroup';

export default {
	onSelect(
		state: IButtonGroupState = { selectedIndices: [] },
		index: number
	): IButtonGroupState {
		const currentIndices = _.get(state, 'selectedIndices', []);

		return {
			...state,
			selectedIndices: _.xor(currentIndices, [index]),
		};
	},
};
