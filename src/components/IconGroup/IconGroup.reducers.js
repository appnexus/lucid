import _ from 'lodash';

export default {
	onSelect(state = {}, index, obj) {
		const currentIndices = _.get(state, 'selectedIndices', []);
		const selectedIndices = currentIndices[0];
		const indeterminateIndices = currentIndices[1];

		let newIndices = [];

		if (_.isEqual(obj.props.kind, 'radio')) {
			newIndices = [[index], []];
		} else if (obj.props.hasIndeterminate) {
			if (_.every(currentIndices, array => _.includes(array, index))) {
				newIndices = [
					_.without(selectedIndices, index),
					_.without(indeterminateIndices, index),
				];
			} else if (_.includes(selectedIndices, index)) {
				newIndices = [selectedIndices, _.xor(indeterminateIndices, [index])];
			} else {
				newIndices = [_.xor(selectedIndices, [index]), indeterminateIndices];
			}
		} else {
			newIndices = [_.xor(selectedIndices, [index]), []];
		}

		return {
			...state,
			selectedIndices: newIndices,
		};
	},
};
