import _, { forEach, has } from 'lodash';
import React from 'react';
import { mount, shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import SidePanel from './SidePanel';
import Overlay from '../Overlay/Overlay';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';

describe('SidePanel', () => {
	common(SidePanel);

	describe('pass throughs', () => {
		let wrapper: any;
		const defaultProps = SidePanel.defaultProps;

		beforeEach(() => {
			const props = {
				...defaultProps,
				className: 'wut',
				isModal: false,
				isExpanded: false,
				isAnimated: false,
				isResizeDisabled: true,
				position: 'left' as any,
				preventBodyScroll: true,
				topOffset: 10,
				width: 1000,
				minWidth: 500,
				maxWidth: 2000,
				style: { marginRight: 10 },
				initialState: { test: true },
				callbackId: 1,
				'data-testid': 10,
				Header: (
					<div>
						<strong>Rich content</strong>
					</div>
				),
			};
			wrapper = shallow(<SidePanel {...props} />);
		});

		afterEach(() => {
			wrapper.unmount();
		});

		it('passes through props not defined in `propTypes` to the root element.', () => {
			const rootProps = wrapper.find('.lucid-SidePanel').props();

			// Note: 'className', 'style' and 'isAnimated' are plucked from the pass through object
			// but still appear becuase they are also directly passed to the root `Overlay` element as a prop.
			// 'isShown' appears because it is calculated based on the 'isExpanded' prop.
			// The root `Overlay` element is not a DOM element so 'callbackId', if it exists, is also passed through.
			forEach(
				[
					'className',
					'isShown',
					'onEscape',
					'isAnimated',
					'style',
					'isModal',
					'data-testid',
					'callbackId',
					'children',
				],
				(prop) => {
					expect(has(rootProps, prop)).toBe(true);
				}
			);

			expect(wrapper.first().prop(['className'])).toContain('wut');
			expect(wrapper.first().prop(['isShown'])).toBe(false); // set based on isExpaneded
			expect(wrapper.first().prop(['isAnimated'])).toBe(false);
			expect(wrapper.first().prop(['isModal'])).toBe(false);
			expect(wrapper.first().prop(['style'])).toMatchObject({
				marginRight: 10,
			});
			expect(wrapper.first().prop(['data-testid'])).toBe(10);
			expect(wrapper.first().prop(['callbackId'])).toBe(1);
		});

		it('omits the props defined in `propTypes` from the root element, plus, in addition, `initialState`.', () => {
			const rootProps = wrapper.find('.lucid-SidePanel').props();

			forEach(
				[
					'Header',
					'isExpanded',
					'isResizeDisabled',
					'onCollapse',
					'onResize',
					'position',
					'preventBodyScroll',
					'width',
					'minWidth',
					'maxWidth',
					'topOffset',
					'initialState',
				],
				(prop) => {
					expect(has(rootProps, prop)).toBe(false);
				}
			);
		});
	});

	describe('Events', () => {
		describe('onCollapse', () => {
			it('should be called when Overlay background is clicked', () => {
				const onCollapse = jest.fn();
				const wrapper = shallow(<SidePanel onCollapse={onCollapse} />);
				const overlayWrapper = wrapper.find(Overlay);
				const mockEvent: any = new Event('click');
				overlayWrapper.prop('onBackgroundClick')({
					event: mockEvent,
					props: overlayWrapper.props(),
				});
				expect(onCollapse).toHaveBeenCalled();
			});

			it('should be called when Escape key is pressed', () => {
				const onCollapse = jest.fn();
				const wrapper = shallow(<SidePanel onCollapse={onCollapse} />);
				const overlayWrapper = wrapper.find(Overlay);
				const mockEvent: any = new Event('keypress');
				overlayWrapper.prop('onEscape')({
					event: mockEvent,
					props: overlayWrapper.props(),
				});
				expect(onCollapse).toHaveBeenCalled();
			});

			it('should be called when the close icon is clicked', () => {
				const onCollapse = jest.fn();
				const wrapper = shallow(
					<SidePanel isExpanded onCollapse={onCollapse} Header='Foo bar' />
				);
				const crossIconWrapper = wrapper.find(
					'.lucid-SidePanel-header-closer-button'
				);
				crossIconWrapper.simulate('click', { event: 'abc' });
				expect(onCollapse).toHaveBeenCalled();
			});
		});

		describe('onResize', () => {
			it('should be called when the resizer stops being dragged', () => {
				const onResize = jest.fn();
				const wrapper = shallow(<SidePanel onResize={onResize} />);
				const dragCaptureZoneWrapper = wrapper.find(DragCaptureZone);
				const mockEvent = new Event('mouseup');
				dragCaptureZoneWrapper.prop('onDragEnd')(
					{
						dx: 100,
						dy: 0,
						pageX: 100,
						pageY: 0,
					} as any,
					{
						event: mockEvent,
						props: dragCaptureZoneWrapper.props(),
					} as any
				);
				expect(onResize).toHaveBeenCalled();
			});
		});
	});

	describe('preventBodyScroll', () => {
		it('should hide the body overflow to prevent scrolling', () => {
			mount(<SidePanel isExpanded preventBodyScroll />);
			expect(document.body.style.overflow).toEqual('hidden');
		});

		it('should hide the body overflow to prevent scrolling', () => {
			const wrapper = mount(<SidePanel isExpanded preventBodyScroll />);
			wrapper.unmount();
			expect(document.body.style.overflow).toEqual('');
		});
	});

	describe('position', () => {
		it('should match snapshot and apply the appropriate class', () => {
			const wrapper = shallow(<SidePanel position='left' />);
			expect(
				wrapper
					.find('.lucid-SidePanel')
					.hasClass('lucid-SidePanel-position-left')
			).toEqual(true);
			expect(wrapper).toMatchSnapshot();
		});

		it('should match snapshot and apply the appropriate class', () => {
			const wrapper = shallow(<SidePanel position='right' />);
			expect(
				wrapper
					.find('.lucid-SidePanel')
					.hasClass('lucid-SidePanel-position-right')
			).toEqual(true);
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('isResizeDisabled', () => {
		it('should match snapshot', () => {
			const wrapper = shallow(<SidePanel isResizeDisabled />);
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('isAnimated', () => {
		it('should match snapshot and apply the appropriate class', () => {
			const wrapper = shallow(<SidePanel isAnimated={true} />);
			expect(
				wrapper.find('.lucid-SidePanel').hasClass('lucid-SidePanel-is-animated')
			).toEqual(true);
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('isExpanded', () => {
		it('should match snapshot and apply the appropriate class', () => {
			const wrapper = shallow(<SidePanel isExpanded={true} />);

			wrapper.setState({ isExpanded: true });

			expect(wrapper).toMatchSnapshot();
			expect(
				wrapper.find('.lucid-SidePanel').hasClass('lucid-SidePanel-is-expanded')
			).toEqual(true);
		});
	});

	describe('width', () => {
		it('should match snapshot', () => {
			const wrapper = shallow(<SidePanel width={200} />);
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('Header', () => {
		it('should match snapshot', () => {
			const wrapper = shallow(<SidePanel Header='This is a header' />);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
