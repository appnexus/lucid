import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';
import OverlayWrapper from './OverlayWrapper';

const { Message } = OverlayWrapper;

describe('OverlayWrapper', () => {
	common(OverlayWrapper);

	describe('isVisible', () => {
		describe('default', () => {
			let wrapper;

			beforeEach(() => {
				wrapper = shallow(
					<OverlayWrapper>
						<div>Some content</div>
					</OverlayWrapper>
				);
			});

			it('should not show the overlay message', () => {
				assert.equal(
					wrapper.find('.lucid-OverlayWrapper-message-container').length,
					0
				);
				assert.equal(wrapper.find(Message).length, 0);
			});

			it('should render other content', () => {
				assert(wrapper.contains(<div>Some content</div>));
			});
		});

		describe('false', () => {
			let wrapper;

			beforeEach(() => {
				wrapper = shallow(
					<OverlayWrapper isVisible={false}>
						<div>Some content</div>
					</OverlayWrapper>
				);
			});

			it('should not show the overlay message', () => {
				assert.equal(
					wrapper.find('.lucid-OverlayWrapper-message-container').length,
					0
				);
				assert.equal(wrapper.find(Message).length, 0);
			});

			it('should render other content', () => {
				assert(wrapper.contains(<div>Some content</div>));
			});
		});

		describe('true', () => {
			let wrapper;

			beforeEach(() => {
				wrapper = shallow(
					<OverlayWrapper isVisible>
						<Message className="overlay-message">Danger!</Message>
						<div>Some content</div>
					</OverlayWrapper>
				);
			});

			it('should show the overlay message', () => {
				assert.equal(
					wrapper.find('.lucid-OverlayWrapper-message-container').length,
					1
				);
				assert.equal(wrapper.find('.overlay-message').length, 1);
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
					<OverlayWrapper isVisible>
						<div>Some content</div>
					</OverlayWrapper>
				);
				const messageContainer = wrapper.find(
					'.lucid-OverlayWrapper-message-container'
				);
				assert(messageContainer.hasClass('lucid-OverlayWrapper-has-overlay'));
			});
		});

		describe('true', () => {
			it('should add `&-has-overlay` class', () => {
				const wrapper = shallow(
					<OverlayWrapper isVisible hasOverlay>
						<div>Some content</div>
					</OverlayWrapper>
				);
				const messageContainer = wrapper.find(
					'.lucid-OverlayWrapper-message-container'
				);
				assert(messageContainer.hasClass('lucid-OverlayWrapper-has-overlay'));
			});
		});

		describe('false', () => {
			it('should not add `&-has-overlay` class', () => {
				const wrapper = shallow(
					<OverlayWrapper isVisible hasOverlay={false}>
						<div>Some content</div>
					</OverlayWrapper>
				);
				const messageContainer = wrapper.find(
					'.lucid-OverlayWrapper-message-container'
				);
				assert(!messageContainer.hasClass('lucid-OverlayWrapper-has-overlay'));
			});
		});
	});

	describe('overlayKind', () => {
		describe('light', () => {
			it('should add `&-kind-light` class', () => {
				const wrapper = shallow(
					<OverlayWrapper isVisible overlayKind="light">
						<div>Some content</div>
					</OverlayWrapper>
				);
				const messageContainer = wrapper.find(
					'.lucid-OverlayWrapper-message-container'
				);
				assert(messageContainer.hasClass('lucid-OverlayWrapper-kind-light'));
			});
		});
	});
});
