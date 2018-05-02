import React from 'react';
import { shallow } from 'enzyme';

import { common } from '../../util/generic-tests';
import SidePanel from './SidePanel';
import Overlay from '../Overlay/Overlay';
import CrossIcon from '../Icon/CrossIcon/CrossIcon';
import DragCaptureZone from '../DragCaptureZone/DragCaptureZone';

describe('SidePanel', () => {
	common(SidePanel);

	describe('Events', () => {
		describe('onCollapse', () => {
			it('should be called when Overlay background is clicked', () => {
				const onCollapse = jest.fn();
				const wrapper = shallow(<SidePanel onCollapse={onCollapse} />);
				const overlayWrapper = wrapper.find(Overlay);
				const mockEvent = new Event('click');
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
				const mockEvent = new Event('keypress');
				overlayWrapper.prop('onEscape')({
					event: mockEvent,
					props: overlayWrapper.props(),
				});
				expect(onCollapse).toHaveBeenCalled();
			});

			it('should be called when the close icon is clicked', () => {
				const onCollapse = jest.fn();
				const wrapper = shallow(
					<SidePanel isExpanded onCollapse={onCollapse} Header="Foo bar" />
				);
				const crossIconWrapper = wrapper.find(CrossIcon);
				crossIconWrapper.simulate('click');
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
					},
					{
						event: mockEvent,
						props: dragCaptureZoneWrapper.props(),
					}
				);
				expect(onResize).toHaveBeenCalled();
			});
		});
	});

	describe('position', () => {
		it('should match snapshot', () => {
			const wrapper = shallow(<SidePanel position="left" />);
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
		it('should match snapshot', () => {
			const wrapper = shallow(<SidePanel isAnimated={false} />);
			expect(wrapper).toMatchSnapshot();
		});
	});

	describe('isExpanded', () => {
		it('should match snapshot', () => {
			const wrapper = shallow(<SidePanel isExpanded={false} />);
			expect(wrapper).toMatchSnapshot();
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
			const wrapper = shallow(<SidePanel Header="This is a header" />);
			expect(wrapper).toMatchSnapshot();
		});
	});
});
