import React from 'react';
import { mount, shallow } from 'enzyme';
import { common } from '../../util/generic-tests';
import assert from 'assert';

import Dialog from './Dialog';
import Overlay from '../Overlay/Overlay';

describe('Dialog', () => {
	common(Dialog, {
		getDefaultProps: () => {
			return { isShown: true };
		},
		selectRoot: wrapper => wrapper.find('.lucid-Dialog'),
	});

	it('should pass `isModal` to underlying Overlay', () => {
		const wrapper = shallow(<Dialog isModal={false} />);

		assert.equal(wrapper.find(Overlay).prop('isModal'), false);
	});

	it('should render a Header', () => {
		const wrapper = shallow(
			<Dialog isShown={true}>
				<Dialog.Header>
					Mobius
				</Dialog.Header>
			</Dialog>
		);

		assert.equal(wrapper.find('.lucid-Dialog-header').text(), 'Mobius');
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

	it('should not render a Footer', () => {
		const wrapper = shallow(<Dialog isShown={true} />);

		assert(!wrapper.contains('.lucid-Dialog-footer'));
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
		const wrapper = shallow(<Dialog isShown={true} size="small" />);

		assert.equal(wrapper.find('.lucid-Dialog-window-is-small').length, 1);
	});

	it('should respect size = "medium"', () => {
		const wrapper = shallow(<Dialog isShown={true} size="medium" />);

		assert.equal(wrapper.find('.lucid-Dialog-window-is-medium').length, 1);
	});

	it('should respect size = "large"', () => {
		const wrapper = shallow(<Dialog isShown={true} size="large" />);

		assert.equal(wrapper.find('.lucid-Dialog-window-is-large').length, 1);
	});
});

describe('Dialog', () => {
	it('should render when isShown', () => {
		const wrapper = mount(
			<Dialog isShown={true}>
				<div id="holler">
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
				<div id="flux">
					Flux Capacitor
				</div>
			</Dialog>
		);

		assert.equal(document.querySelectorAll('#flux').length, 0);
		wrapper.unmount();
	});
});
