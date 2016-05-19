import React from 'react';
import { mount, shallow } from 'enzyme';
import { common } from '../../util/generic-tests';
import describeWithDOM from '../../util/describe-with-dom';
import sinon from 'sinon';
import assert from 'assert';

import Overlay from './Overlay';

describe('Overlay', () => {
	common(Overlay, {
		selector: '.lucid-Overlay',
		getDefaultProps: () => {
			return { isShown: true }
		},
	});

	it('should render body content', () => {
		const wrapper = shallow(
			<Overlay isShown={true}>
				Flux Capacitor
			</Overlay>
		);

		assert(wrapper.contains('Flux Capacitor'));
	});

	it('should not render when isShown is false', () => {
		const wrapper = shallow(
			<Overlay isShown={false}>
				Flux Capacitor
			</Overlay>
		);

		assert(!wrapper.contains('Flux Capacitor'));
	});

	it('should have the correct class when isModal is false', () => {
		const wrapper = shallow(
			<Overlay isShown={true} isModal={false}>Nerp</Overlay>
		);

		assert.equal(wrapper.find('.lucid-Overlay-is-not-modal').length, 1);
	});


});

describeWithDOM('Overlay', () => {
	it('should fire onBackgroundClick', () => {
		const onBackgroundClick = sinon.spy();
		const wrapper = mount(
			<Overlay
				isShown={true}
				isModal={false}
				onBackgroundClick={onBackgroundClick}
				portalId={'brolo'}
			/>
		);

		const event = new window.MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window,
		});

		document.querySelector('#brolo .lucid-Overlay').dispatchEvent(event);

		assert(onBackgroundClick.called);
		wrapper.unmount();
	});

	it('should not fire onBackgroundClick when content is clicked', () => {
		const onBackgroundClick = sinon.spy();
		const wrapper = mount(
			<Overlay
				isShown={true}
				isModal={false}
				onBackgroundClick={onBackgroundClick}
				portalId={'regiewat'}
			>
				<div id='foo'>Nope</div>
			</Overlay>
		);

		const event = new window.MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window,
		});

		document.querySelector('#regiewat #foo').dispatchEvent(event);

		assert(onBackgroundClick.notCalled);
		wrapper.unmount();
	});

	it('should fire the onEscape handler when escape is typed', () => {
		const onEscape = sinon.spy();
		const wrapper = mount(
			<Overlay isShown={true} onEscape={onEscape} />
		);

		const event = new window.KeyboardEvent('keydown', {
			keyCode: 27,
		});

		document.dispatchEvent(event);

		assert(onEscape.called);
		wrapper.unmount();
	});
});
