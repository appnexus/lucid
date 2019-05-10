import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';
import LoadingIndicator from './LoadingIndicator';

const { LoadingMessage } = LoadingIndicator;

describe('LoadingIndicator', () => {
	common(LoadingIndicator);

	describe('custom loading message', () => {
		it('should use custom loading message', () => {
			const message = <LoadingMessage Title='Foo' Body='Bar' />;
			const wrapper = shallow(
				<LoadingIndicator isLoading>
					<div>Some content</div>
					{message}
				</LoadingIndicator>
			);
			assert(wrapper.contains(message), 'must contain custom loading message');
		});
	});
});
