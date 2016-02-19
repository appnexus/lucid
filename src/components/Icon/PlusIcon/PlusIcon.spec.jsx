import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../../util/generic-tests';

import PlusIcon from './PlusIcon';

describe('PlusIcon', () => {
	common(PlusIcon);

	describe('icon', () => {
		it('should have a badge with the "has-badge" class when badge is true', () => {
			const wrapper = shallow(<PlusIcon badge={true} />);
			let classNames = wrapper.find('svg').prop('className').split(' ');
			assert(_.includes(classNames, 'lucid-PlusIcon'), `'${classNames}' should include 'lucid-PlusIcon-has-badge'`);
		});
	});
});
