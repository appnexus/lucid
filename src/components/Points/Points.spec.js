import * as d3Scale from 'd3-scale';
import { common } from '../../util/generic-tests';

import Points from './Points';

describe('Points', () => {
	common(Points, {
		exemptFunctionProps: [
			'xScale',
			'yScale',
		],
		getDefaultProps: () => ({
			data: [{x: new Date('2015-01-01T00:00:00Z'), y: 1}],
			xScale: d3Scale.scaleTime(),
			yScale: d3Scale.scaleLinear(),
		}),
	});
});
