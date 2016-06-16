import React from 'react';
import { mount, shallow } from 'enzyme';
import { common } from '../../util/generic-tests';
import describeWithDOM from '../../util/describe-with-dom';
import assert from 'assert';

import Dialog from './Dialog';

describe('Dialog', () => {
	common(Dialog, {
		selector: '.lucid-Dialog',
		getDefaultProps: () => {
			return { isShown: true };
		},
	});

	it('should render a Header', () => {
		const wrapper = shallow(
			<Dialog isShown={true}>
				<Dialog.Header>
					Mobius
				</Dialog.Header>
			</Dialog>
		);
		const headerText = wrapper.find('.lucid-Dialog-header').children().text();
		assert.equal(headerText, 'Mobius', `Header text was wrong, actual: "${headerText}", expected: "Mobius"`);
	});

	it('should render a Footer', () => {
		const wrapper = shallow(
			<Dialog isShown={true}>
				<Dialog.Footer>
					Groober
				</Dialog.Footer>
			</Dialog>
		);

		assert.equal(wrapper.find('.lucid-Dialog-footer').text(), 'Groober');
	});

	it('should render body content', () => {
		const wrapper = shallow(
			<Dialog isShown={true}>
				Flux Capacitor
			</Dialog>
		);

		assert.equal(wrapper.find('.lucid-Dialog-body').text(), 'Flux Capacitor');
	});

	it('should respect size = "small"', () => {
		const wrapper = shallow(
			<Dialog isShown={true} size='small' />
		);

		assert.equal(wrapper.find('.lucid-Dialog-window-is-small').length, 1);
	});

	it('should respect size = "medium"', () => {
		const wrapper = shallow(
			<Dialog isShown={true} size='medium' />
		);

		assert.equal(wrapper.find('.lucid-Dialog-window-is-medium').length, 1);
	});

	it('should respect size = "large"', () => {
		const wrapper = shallow(
			<Dialog isShown={true} size='large' />
		);

		assert.equal(wrapper.find('.lucid-Dialog-window-is-large').length, 1);
	});
});

describeWithDOM('Dialog', () => {
	it('should render when isShown', () => {
		const wrapper = mount(
			<Dialog isShown={true}>
				<div id='holler'>
					bro
				</div>
			</Dialog>
		);

		assert.equal(document.querySelectorAll('#holler').length, 1);
		wrapper.unmount();
	});

	it('should not render when not isShown', () => {
		const wrapper = mount(
			<Dialog isShown={false}>
				<div id='flux'>
					Flux Capacitor
				</div>
			</Dialog>
		);

		assert.equal(document.querySelectorAll('#flux').length, 0);
		wrapper.unmount();
	});
})
