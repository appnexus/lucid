import { common } from '../../util/generic-tests';

import Banner from './Banner';

describe('Banner', () => {
	common(Banner, {
		selectRoot: (wrapper: any) => wrapper.find('.lucid-Banner'),
	} as any);
});
