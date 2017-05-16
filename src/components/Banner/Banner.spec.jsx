import { common } from '../../util/generic-tests';

import Banner from './Banner';

describe('Banner', () => {
	common(Banner, {
		selectRoot: wrapper => wrapper.find('.lucid-Banner'),
	});
});
