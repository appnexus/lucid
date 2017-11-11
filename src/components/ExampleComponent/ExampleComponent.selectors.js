import _ from 'lodash';

function exampleSelector({ number }) {
	return _.isNumber(number);
}

export default {
	selector: exampleSelector,
};
