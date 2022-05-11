import _, { forEach, has, noop } from 'lodash';
import React from 'react';
import { shallow, mount } from 'enzyme';

import { common } from '../../util/generic-tests';
import * as domHelpers from '../../util/dom-helpers';
import SlidePanel from './SlidePanel';
import CalendarIcon from '../Icon/CalendarIcon/CalendarIcon';

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
				</SlidePanel>,
				{ disableLifecycleMethods: true }
			);
			const slidePanelInstance: any = wrapper.instance();
			slidePanelInstance.rootHTMLDivElement.current = {
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
				</SlidePanel>,
				{ disableLifecycleMethods: true }
			);
			const slidePanelInstance: any = wrapper.instance();
			slidePanelInstance.rootHTMLDivElement.current = {
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
			let wrapper: any;
			let slidePanelInstance: any;

			beforeEach(() => {
				(domHelpers as any).shiftChildren = jest.fn(); // eslint-disable-line no-import-assign

				wrapper = shallow(
					<SlidePanel isLooped offset={0}>
						<Slide>foo</Slide>
						<Slide>bar</Slide>
						<Slide>baz</Slide>
						<Slide>spam</Slide>
						<Slide>eggs</Slide>
						<Slide>quux</Slide>
					</SlidePanel>,
					{ disableLifecycleMethods: true }
				);
				slidePanelInstance = wrapper.instance();
				slidePanelInstance.rootHTMLDivElement.current = {
					getBoundingClientRect: jest.fn(() => ({ width: 100 })),
				};
				slidePanelInstance.slideStrip.current = {};
				jest.useFakeTimers();
			});

			afterEach(() => {
				(domHelpers as any).shiftChildren = shiftChildren; // eslint-disable-line no-import-assign
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

		describe('root pass throughs', () => {
			let wrapper: any;
			let props: any;
			const defaultProps = SlidePanel.defaultProps;

			beforeEach(() => {
				props = {
					...defaultProps,
					slidesToShow: 2,
					offset: 1,
					isAnimated: false,
					onSwipe: noop,
					Slide: <CalendarIcon style={{ width: '100%', height: '30vh' }} />,
					isLooped: true,
					className: 'wut',
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = shallow(<SlidePanel {...props} />);
			});

			afterEach(() => {
				wrapper.unmount();
			});

			it('passes through props not defined in `propTypes` to the root element.', () => {
				const rootProps = wrapper.find('.lucid-SlidePanel').props();

				expect(wrapper.first().prop(['className'])).toContain('wut');
				expect(wrapper.first().prop(['style'])).toMatchObject({
					marginRight: 10,
				});
				expect(wrapper.first().prop(['data-testid'])).toBe(10);

				// 'className' and 'style' are plucked from the pass through object
				// but still appear becuase they are also directly passed to the root element as a prop
				forEach(['className', 'data-testid', 'style', 'children'], (prop) => {
					expect(has(rootProps, prop)).toBe(true);
				});
			});
			it('omits all the props defined in `propTypes` (plus, in addition, `initialState`, and `callbackId`) to the root element', () => {
				const rootProps = wrapper.find('.lucid-SlidePanel').props();

				forEach(
					[
						'Slide',
						'slidesToShow',
						'offset',
						'isAnimated',
						'isLooped',
						'onSwipe',
						'initialState',
						'callbackId',
					],
					(prop) => {
						expect(has(rootProps, prop)).toBe(false);
					}
				);
			});

			describe('slidestrip child component', () => {
				let slidestripWrapper: any;

				beforeEach(() => {
					slidestripWrapper = mount(
						<SlidePanel {...props} className='dub' data-testid={11} />
					);
				});

				afterEach(() => {
					slidestripWrapper.unmount();
				});

				it('passes through props not defined in `propTypes` to the slidestrip element.', () => {
					const slidestripProps = slidestripWrapper
						.find('.lucid-SlidePanel-slidestrip')
						.props();

					expect(slidestripWrapper.first().prop(['className'])).toContain(
						'dub'
					);
					expect(slidestripWrapper.first().prop(['data-testid'])).toBe(11);

					// 'className' and 'style' are plucked from the pass through object
					// but still appear becuase they are also directly passed to the root element as a prop
					forEach(['className', 'data-testid', 'style', 'children'], (prop) => {
						expect(has(slidestripProps, prop)).toBe(true);
					});
				});
				it('omits all the props defined in `propTypes` (plus, in addition, `initialState`, and `callbackId`) from the slidestrip element', () => {
					const slidestripProps = slidestripWrapper
						.find('.lucid-SlidePanel-slidestrip')
						.props();

					forEach(
						[
							'Slide',
							'slidesToShow',
							'offset',
							'isAnimated',
							'isLooped',
							'onSwipe',
							'initialState',
							'callbackId',
						],
						(prop) => {
							expect(has(slidestripProps, prop)).toBe(false);
						}
					);
				});
			});
		});
	});
});
