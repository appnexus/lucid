import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';

import CheckIcon from './CheckIcon';

describe('CheckIcon', () => {
	common(CheckIcon);

	describe('icon', () => {
		it('should have a badge with the "has-badge" class when badge is true', () => {
			const wrapper = shallow(<CheckIcon badge={true} />);
			let classNames = wrapper.find('svg').prop('className').split(' ');
			assert(_.includes(classNames, 'lucid-CheckIcon'), `'${classNames}' should include 'lucid-CheckIcon-has-badge'`);
		});
	});
});
