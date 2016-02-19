import React from 'react';
import _ from 'lodash';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../../util/generic-tests';

import EditIcon from './EditIcon';

describe('EditIcon', () => {
	common(EditIcon);

	describe('icon', () => {
		it('should have a badge with the "has-badge" class when badge is true', () => {
			const wrapper = shallow(<EditIcon badge={true} />);
			let classNames = wrapper.find('svg').prop('className').split(' ');
			assert(_.includes(classNames, 'lucid-EditIcon'), `'${classNames}' should include 'lucid-EditIcon-has-badge'`);
		});
	});
});
