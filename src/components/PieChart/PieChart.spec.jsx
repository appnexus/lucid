import { common } from '../../util/generic-tests';

import PieChart from './PieChart';

describe('PieChart', () => {
	common(PieChart, {
		exemptFunctionProps: [
			'xAxisFormatter',
			'yAxisFormatter',
		],
	});
});
