import React from 'react';
import { mount, shallow } from 'enzyme';
import { common } from '../../util/generic-tests';
import describeWithDOM from '../../util/describe-with-dom';
import sinon from 'sinon';
import assert from 'assert';

import Modal from './Modal';

describe('Modal', () => {
	common(Modal, {
		selector: '.lucid-Modal',
		getDefaultProps: () => {
			return { isClosed: false };
		},
	});

	it('should render a Header', () => {
		const wrapper = shallow(
			<Modal isClosed={false}>
				<Modal.Header>
					Mobius
				</Modal.Header>
			</Modal>
		);

		assert.equal(wrapper.find('.lucid-Modal-header').text(), 'Mobius');
	});

	it('should render a Footer', () => {
		const wrapper = shallow(
			<Modal isClosed={false}>
				<Modal.Footer>
					Groober
				</Modal.Footer>
			</Modal>
		);

		assert.equal(wrapper.find('.lucid-Modal-footer').text(), 'Groober');
	});

	it('should render body content', () => {
		const wrapper = shallow(
			<Modal isClosed={false}>
				Flux Capacitor
			</Modal>
		);

		assert.equal(wrapper.find('.lucid-Modal-body').text(), 'Flux Capacitor');
	});

	it('should not render when isClosed', () => {
		const wrapper = shallow(
			<Modal isClosed={true}>
				Flux Capacitor
			</Modal>
		);

		assert.equal(wrapper.find('.lucid-Modal').length, 0);
	});

	it('should respect size = "small"', () => {
		const wrapper = shallow(
			<Modal isClosed={false} size='small' />
		);

		assert.equal(wrapper.find('.lucid-Modal-window-is-small').length, 1);
	});

	it('should respect size = "medium"', () => {
		const wrapper = shallow(
			<Modal isClosed={false} size='medium' />
		);

		assert.equal(wrapper.find('.lucid-Modal-window-is-medium').length, 1);
	});

	it('should respect size = "large"', () => {
		const wrapper = shallow(
			<Modal isClosed={false} size='large' />
		);

		assert.equal(wrapper.find('.lucid-Modal-window-is-large').length, 1);
	});
});

describeWithDOM('Modal', () => {
	it('should fire the onEscape handler when escape is typed', () => {
		const onEscape = sinon.spy();

		mount(
			<Modal isClosed={false} onEscape={onEscape} />
		);

		const event = new window.KeyboardEvent('keydown', {
			keyCode: 27
		});

		document.dispatchEvent(event);

		assert(onEscape.called);
	});
});
