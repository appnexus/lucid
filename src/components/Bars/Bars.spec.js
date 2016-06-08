import * as d3Scale from 'd3-scale';
import { common } from '../../util/generic-tests';

import Bars from './Bars';

describe('Bars', () => {
	common(Bars, {
		exemptFunctionProps: [
			'xScale',
			'yScale',
		],
		getDefaultProps: () => ({
			data: [{x: 'one', y: 2}],
			xScale: d3Scale.scaleBand(),
			yScale: d3Scale.scaleLinear(),
		}),
	});
});
