import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';

import WarningIcon from './WarningIcon';

describe('WarningIcon', () => {
	common(WarningIcon);

	describe('icon', () => {
		it('should have a badge with the "has-badge" class when badge is true', () => {
			const wrapper = shallow(<WarningIcon badge={true} />);
			let classNames = wrapper.find('svg').prop('className').split(' ');
			assert(_.includes(classNames, 'lucid-WarningIcon'), `'${classNames}' should include 'lucid-WarningIcon-has-badge'`);
		});
	});
});
