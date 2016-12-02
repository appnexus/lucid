import { common } from '../../util/generic-tests';

import AxisLabel from './AxisLabel';

describe('AxisLabel', () => {
	common(AxisLabel, {
		getDefaultProps: () => ({
			height: 100,
			width: 100,
		}),
	});
});
