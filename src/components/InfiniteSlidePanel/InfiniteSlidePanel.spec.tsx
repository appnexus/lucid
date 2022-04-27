import _, { forEach, has, noop } from 'lodash';
import React from 'react';
import { shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import InfiniteSlidePanel from './InfiniteSlidePanel';
import ImageIcon from '../Icon/ImageIcon/ImageIcon';
import SlidePanel from '../SlidePanel/SlidePanel';

describe('InfiniteSlidePanel', () => {
	common(InfiniteSlidePanel, {
		getDefaultProps() {
			return {
				children: (slideOffset: any) => <span>{slideOffset}</span>,
			};
		},
	});

	describe('props', () => {
		describe('root pass throughs', () => {
			let wrapper: any;
			const Slide = SlidePanel.Slide;

			beforeEach(() => {
				const props = {
					...InfiniteSlidePanel.defaultProps,
					totalSlides: 11,
					className: 'wut',
					style: { marginRight: 10 },
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = shallow(
					<InfiniteSlidePanel {...props}>
						{(slideOffset) => {
							<div>{slideOffset}</div>;
						}}
					</InfiniteSlidePanel>
				);
			});

			afterEach(() => {
				if (wrapper) {
					wrapper.unmount();
				}
			});

			it('passes through props not defined in `propTypes` to the root element.', () => {
				const rootProps = wrapper.find('.lucid-InfiniteSlidePanel').props();

				expect(wrapper.first().prop(['className'])).toContain('wut');
				expect(wrapper.first().prop(['style'])).toMatchObject({
					marginRight: 10,
				});
				expect(wrapper.first().prop(['data-testid'])).toBe(10);
				expect(wrapper.first().prop(['callbackId'])).toBe(1);

				// 'className', 'offset', 'slidesToShow' and 'onSwipe' are plucked from the pass through object
				// but still appears becuase each one is also directly added to the root element as a prop
				// callbackId is not omitted because the root <SlidePanel /> element is not a DOM element
				forEach(
					[
						'isAnimated',
						'isLooped',
						'offset',
						'slidesToShow',
						'onSwipe',
						'className',
						'data-testid',
						'style',
						'children',
						'callbackId',
					],
					(prop) => {
						expect(has(rootProps, prop)).toBe(true);
					}
				);
			});
			it('omits the props defined in `propTypes` (plus, in addition, `initialState`, and `callbackId`) from the root element', () => {
				const rootProps = wrapper.find('.lucid-InfiniteSlidePanel').props();

				forEach(['totalSlides', 'Slide', 'initialState'], (prop) => {
					expect(has(rootProps, prop)).toBe(false);
				});
			});
		});
	});

	describe('required children', () => {
		it('should throw if not passed a function or Slide as children', () => {
			expect(() => {
				shallow(<InfiniteSlidePanel />);
			}).toThrowErrorMatchingSnapshot();
		});

		it('should throw if child slide not passed a function child', () => {
			expect(() => {
				shallow(
					<InfiniteSlidePanel>
						<InfiniteSlidePanel.Slide>foo</InfiniteSlidePanel.Slide>
					</InfiniteSlidePanel>
				);
			}).toThrowErrorMatchingSnapshot();
		});

		it('should not throw if passed a Slide child element with function child', () => {
			expect(() => {
				shallow(
					<InfiniteSlidePanel>
						<InfiniteSlidePanel.Slide>{() => null}</InfiniteSlidePanel.Slide>
					</InfiniteSlidePanel>
				);
			}).not.toThrow();
		});

		it('should not throw if passed a function child', () => {
			expect(() => {
				shallow(<InfiniteSlidePanel>{() => null}</InfiniteSlidePanel>);
			}).not.toThrow();
		});
	});
});
