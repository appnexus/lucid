import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';
import LoadingIndicator from './LoadingIndicator';

const { LoadingMessage } = LoadingIndicator;

describe('LoadingIndicator', () => {
	common(LoadingIndicator);

	describe('isLoading', () => {

		describe('default', () => {

			let wrapper;

			beforeEach(() => {
				wrapper = shallow(
					<LoadingIndicator>
						<div>Some content</div>
					</LoadingIndicator>
				);
			});

			it('should not show loading message', () => {
				assert.equal(wrapper.find('.lucid-LoadingIndicator-message-container').length, 0);
				assert.equal(wrapper.find(LoadingMessage).length, 0);
			});

			it('should render other content', () => {
				assert(wrapper.contains(<div>Some content</div>));
			});

		});

		describe('false', () => {

			let wrapper;

			beforeEach(() => {
				wrapper = shallow(
					<LoadingIndicator isLoading={false}>
						<div>Some content</div>
					</LoadingIndicator>
				);
			});

			it('should not show loading message', () => {
				assert.equal(wrapper.find('.lucid-LoadingIndicator-message-container').length, 0);
				assert.equal(wrapper.find(LoadingMessage).length, 0);
			});

			it('should render other content', () => {
				assert(wrapper.contains(<div>Some content</div>));
			});

		});

		describe('true', () => {

			let wrapper;

			beforeEach(() => {
				wrapper = shallow(
					<LoadingIndicator isLoading>
						<div>Some content</div>
					</LoadingIndicator>
				);
			});

			it('should show loading message', () => {
				assert.equal(wrapper.find('.lucid-LoadingIndicator-message-container').length, 1);
				assert.equal(wrapper.find(LoadingMessage).length, 1);
			});

			it('should render other content', () => {
				assert(wrapper.contains(<div>Some content</div>));
			});

		});

	});

	describe('hasOverlay', () => {

		describe('default', () => {
			it('should add `&-has-overlay` class', () => {
				const wrapper = shallow(
					<LoadingIndicator isLoading>
						<div>Some content</div>
					</LoadingIndicator>
				);
				const messageContainer = wrapper.find('.lucid-LoadingIndicator-message-container');
				assert(messageContainer.hasClass('lucid-LoadingIndicator-has-overlay'));
			});
		});

		describe('true', () => {
			it('should add `&-has-overlay` class', () => {
				const wrapper = shallow(
					<LoadingIndicator
						isLoading
						hasOverlay
					>
						<div>Some content</div>
					</LoadingIndicator>
				);
				const messageContainer = wrapper.find('.lucid-LoadingIndicator-message-container');
				assert(messageContainer.hasClass('lucid-LoadingIndicator-has-overlay'));
			});
		});

		describe('false', () => {
			it('should not add `&-has-overlay` class', () => {
				const wrapper = shallow(
					<LoadingIndicator
						isLoading
						hasOverlay={false}
					>
						<div>Some content</div>
					</LoadingIndicator>
				);
				const messageContainer = wrapper.find('.lucid-LoadingIndicator-message-container');
				assert(!messageContainer.hasClass('lucid-LoadingIndicator-has-overlay'));
			});
		});

	});

	describe('custom loading message', () => {
		it('should use custom loading message', () => {
			const message = <LoadingMessage Title='Foo' Body='Bar'/>;
			const wrapper = shallow(
				<LoadingIndicator isLoading>
					<div>Some content</div>
					{message}
				</LoadingIndicator>
			);
			assert(wrapper.contains(message), 'must contain custom loading message');
		});
	});

	describe('overlayKind', () => {
		describe('light', () => {
			it('should add `&-kind-light` class', () => {
				const wrapper = shallow(
					<LoadingIndicator
						isLoading
						overlayKind='light'
					>
						<div>Some content</div>
					</LoadingIndicator>
				);
				const messageContainer = wrapper.find('.lucid-LoadingIndicator-message-container');
				assert(messageContainer.hasClass('lucid-LoadingIndicator-kind-light'));
			});
		});
	});

});
