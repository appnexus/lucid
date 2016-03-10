import { controls } from '../../util/generic-tests';

import Banner from './Banner';

describe('Banner', () => {
	// TODO: fix the common tests to work with react css transition groups
	// common(Banner);
	controls(Banner, {
		callbackName: 'onClose',
		controlSelector: '.lucid-Banner-close',
		eventType: 'click',
	});
});
