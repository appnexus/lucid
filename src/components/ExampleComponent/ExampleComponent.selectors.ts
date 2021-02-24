import _ from 'lodash';

function exampleSelector({ number }: any) {
	return _.isNumber(number);
}

export default {
	selector: exampleSelector,
};
