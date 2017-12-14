import { common, controls } from '../../util/generic-tests';

import IconBox from './IconBox';

describe('IconBox', () => {
	debugger;
	common(IconBox);
	controls(IconBox, {
		callbackName: 'onClick',
		controlSelector: '.lucid-IconBox',
		eventType: 'click',
	});
});
