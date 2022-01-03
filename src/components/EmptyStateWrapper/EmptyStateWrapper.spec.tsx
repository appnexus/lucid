import React from 'react';
import { shallow } from 'enzyme';
import { common } from '../../util/generic-tests';
import assert from 'assert';

import EmptyStateWrapper from './EmptyStateWrapper';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import OverlayWrapper from '../OverlayWrapper/OverlayWrapper';

describe('EmptyStateWrapper', () => {
	common(EmptyStateWrapper);

	it('should render a `LoadingIndicator` if `isLoading` is true', () => {
		const wrapper = shallow(<EmptyStateWrapper isLoading />);

		assert(wrapper.is(LoadingIndicator));
	});

	it('should render an `OverlayWrapper` if `isLoading` is false', () => {
		const wrapper = shallow(<EmptyStateWrapper />);

		assert(wrapper.is(OverlayWrapper));
	});

	it('should pass appropriate props through to `OverlayWrapper`', () => {
		const wrapper = shallow(<EmptyStateWrapper isEmpty />);

		assert(wrapper.prop('isVisible'));
		assert.strictEqual(wrapper.prop('hasOverlay'), false);
	});
});
