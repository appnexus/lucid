import React from 'react';
import { mount, shallow } from 'enzyme';
import { common } from '../../util/generic-tests';
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

describe('Overlay', () => {
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

		const event = document.createEvent('MouseEvents');
		event.initMouseEvent(
			'click', //event type : click, mousedown, mouseup, mouseover, mousemove, mouseout.
			true, //canBubble
			false, //cancelable
			window, //event's AbstractView : should be window
			1, // detail : Event's mouse click count
			50, // screenX
			50, // screenY
			50, // clientX
			50, // clientY
			false, // ctrlKey
			false, // altKey
			false, // shiftKey
			false, // metaKey
			0, // button : 0 = click, 1 = middle button, 2 = right button
			null // relatedTarget : Only used with some event types (e.g. mouseover and mouseout). In other cases, pass null.
		);

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

		const event = document.createEvent('MouseEvents');
		event.initMouseEvent(
			'click', //event type : click, mousedown, mouseup, mouseover, mousemove, mouseout.
			true, //canBubble
			false, //cancelable
			window, //event's AbstractView : should be window
			1, // detail : Event's mouse click count
			50, // screenX
			50, // screenY
			50, // clientX
			50, // clientY
			false, // ctrlKey
			false, // altKey
			false, // shiftKey
			false, // metaKey
			0, // button : 0 = click, 1 = middle button, 2 = right button
			null // relatedTarget : Only used with some event types (e.g. mouseover and mouseout). In other cases, pass null.
		);

		document.querySelector('#regiewat #foo').dispatchEvent(event);

		assert(onBackgroundClick.notCalled);
		wrapper.unmount();
	});

	it('should fire the onEscape handler when escape is typed', () => {
		const onEscape = sinon.spy();
		const wrapper = mount(
			<Overlay isShown={true} onEscape={onEscape} />
		);

		const event = document.createEvent('Event');
		event.initEvent('keydown', true, true);

		event.keyCode = 27;

		document.dispatchEvent(event);

		assert(onEscape.called);
		wrapper.unmount();
	});
});
