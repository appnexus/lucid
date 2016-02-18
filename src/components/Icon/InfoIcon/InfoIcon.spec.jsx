import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';

import InfoIcon from './InfoIcon';

describe('InfoIcon', () => {
	common(InfoIcon);

	describe('icon', () => {
		it('should have a badge with the "has-badge" class when badge is true', () => {
			const wrapper = shallow(<InfoIcon badge={true} />);
			let classNames = wrapper.find('svg').prop('className').split(' ');
			assert(_.includes(classNames, 'lucid-InfoIcon'), `'${classNames}' should include 'lucid-InfoIcon-has-badge'`);
		});
	});
});
