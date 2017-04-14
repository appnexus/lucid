import { shallow } from 'enzyme';
import React from 'react';
import { common } from '../../util/generic-tests';
import * as domHelpers from '../../util/dom-helpers';
import SlidePanel from './SlidePanel';

const { Slide } = SlidePanel;

describe('SlidePanel', () => {
	common(SlidePanel);

	describe('event handlers', () => {
		it('should trigger `onSwipe` when touch events are fired', () => {
			const onSwipe = jest.fn();
			const wrapper = shallow(
				<SlidePanel onSwipe={onSwipe} slidesToShow={2}>
					<Slide>foo</Slide>
					<Slide>bar</Slide>
					<Slide>baz</Slide>
				</SlidePanel>
			);
			const slidePanelInstance = wrapper.instance();
			slidePanelInstance.rootNode = {
				getBoundingClientRect: jest.fn(() => ({ width: 100 })),
			};

			const touchStartEvent = { touches: [{ screenX: 100 }] };
			const touchEndEvent = { changedTouches: [{ screenX: 0 }] };
			slidePanelInstance.handleTouchStart(touchStartEvent);
			slidePanelInstance.handleTouchEnd(touchEndEvent);

			expect(onSwipe).toHaveBeenCalledWith(2, {
				event: touchEndEvent,
				props: slidePanelInstance.props,
			});
		});

		it('should update component when while being swiped', () => {
			const onSwipe = jest.fn();
			const wrapper = shallow(
				<SlidePanel onSwipe={onSwipe} slidesToShow={2}>
					<Slide>foo</Slide>
					<Slide>bar</Slide>
					<Slide>baz</Slide>
				</SlidePanel>
			);
			const slidePanelInstance = wrapper.instance();
			slidePanelInstance.rootNode = {
				getBoundingClientRect: jest.fn(() => ({ width: 100 })),
			};

			slidePanelInstance.handleTouchStart({ touches: [{ screenX: 100 }] });
			slidePanelInstance.handleTouchMove({ touches: [{ screenX: 50 }] });

			expect(slidePanelInstance.state.translateXPixel).toBe(-50);
		});
	});

	describe('props', () => {
		describe('isLooped', () => {
			const shiftChildren = domHelpers.shiftChildren;
			const slidestripElement = {};
			let wrapper;
			let slidePanelInstance;

			beforeEach(() => {
				domHelpers.shiftChildren = jest.fn();

				wrapper = shallow(
					<SlidePanel isLooped offset={0}>
						<Slide>foo</Slide>
						<Slide>bar</Slide>
						<Slide>baz</Slide>
						<Slide>spam</Slide>
						<Slide>eggs</Slide>
						<Slide>quux</Slide>
					</SlidePanel>
				);
				slidePanelInstance = wrapper.instance();
				slidePanelInstance.rootNode = {
					querySelector: jest.fn(() => slidestripElement),
				};
				jest.useFakeTimers();
			});

			afterEach(() => {
				domHelpers.shiftChildren = shiftChildren;
				jest.useRealTimers();
			});

			it('should shift child elements in slidestrip by half the total number of slides with `offset` 0', () => {
				slidePanelInstance.componentDidMount();

				expect(domHelpers.shiftChildren).toHaveBeenCalledWith(
					slidestripElement,
					3
				);
			});

			it('should shift child elements in slidestrip relative to number of slides and `offset` value', () => {
				const prevProps = slidePanelInstance.props;
				wrapper.setProps({
					...slidePanelInstance.props,
					offset: -2,
				});
				slidePanelInstance.componentDidUpdate(prevProps);
				jest.runAllTimers();

				expect(slidePanelInstance.offsetTranslate).toBe(5);
			});
		});
	});
});
