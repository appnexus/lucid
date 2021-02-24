import * as d3Scale from 'd3-scale';
import { common } from '../../util/generic-tests';

import Axis from './Axis';

describe('Axis', () => {
	common(Axis, {
		exemptFunctionProps: ['scale', 'tickFormat'] as any,
		getDefaultProps: () => ({
			scale: d3Scale.scaleLinear(),
		}),
	});
});
