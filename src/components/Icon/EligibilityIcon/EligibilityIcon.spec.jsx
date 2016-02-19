import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../../util/generic-tests';

import EligibilityIcon from './EligibilityIcon';

describe('EligibilityIcon', () => {
	common(EligibilityIcon);

	describe('icon', () => {
		it('should have a badge with the "has-badge" class when badge is true', () => {
			const wrapper = shallow(<EligibilityIcon badge={true} />);
			let classNames = wrapper.find('svg').prop('className').split(' ');
			assert(_.includes(classNames, 'lucid-EligibilityIcon'), `'${classNames}' should include 'lucid-EligibilityIcon-has-badge'`);
		});
	});
});
