import React from 'react';
import { mount, shallow } from 'enzyme';
import assert from 'assert';
import sinon from 'sinon';
import describeWithDOM from '../../util/describe-with-dom';
import _ from 'lodash';
import { common } from '../../util/generic-tests';

import Banner from './Banner';

describe('Banner', () => {
	common(Banner);	
});
