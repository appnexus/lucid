// import React from 'react';
import * as d3Scale from 'd3-scale';
import { common } from '../../util/generic-tests';
// import { shallow } from 'enzyme';
// import { shallowToJson } from 'enzyme-to-json';

import Axis from './Axis';

describe('Axis', () => {
	common(Axis, {
		exemptFunctionProps: ['scale', 'tickFormat'],
		getDefaultProps: () => ({
			scale: d3Scale.scaleLinear(),
		}),
	});
});
