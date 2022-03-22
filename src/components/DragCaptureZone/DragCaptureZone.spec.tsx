import _, { forEach, has } from 'lodash';
import assert from 'assert';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { common } from '../../util/generic-tests';

import DragCaptureZone from './DragCaptureZone';

describe('DragCaptureZone', () => {
	common(DragCaptureZone);

	describe('props', () => {
		describe('onDrag', () => {
			it('defaults to the Lodash `noop` method.', () => {
				const wrapper = mount(<DragCaptureZone />);

				assert.equal(wrapper.prop('onDrag'), _.noop);
			});
		});

		describe('onDragEnd', () => {
			it('defaults to the Lodash `noop` method.', () => {
				const wrapper = mount(<DragCaptureZone />);

				assert.equal(wrapper.prop('onDragEnd'), _.noop);
			});
		});

		describe('onDragStart', () => {
			it('defaults to the Lodash `noop` method.', () => {
				const wrapper = mount(<DragCaptureZone />);

				assert.equal(wrapper.prop('onDragStart'), _.noop);
			});
		});

		describe('onDragCancel', () => {
			it('defaults to the Lodash `noop` method.', () => {
				const wrapper = mount(<DragCaptureZone />);

				assert.equal(wrapper.prop('onDragCancel'), _.noop);
			});
		});

		describe('pass throughs', () => {
			let wrapper: any;
			const defaultProps = DragCaptureZone.defaultProps;

			beforeEach(() => {
				const props = {
					...defaultProps,
					onDrag: () => {},
					onDragEnd: () => {},
					onDragStart: () => {},
					onDragCancel: () => {},
					initialState: { test: true },
					callbackId: 1,
					'data-testid': 10,
				};
				wrapper = shallow(<DragCaptureZone {...props} />);
			});

			afterEach(() => {
				wrapper.unmount();
			});

			it('passes through select props to the root div element.', () => {
				const rootProps = wrapper.find('div').props();

				// 'className' is plucked from the pass through this.props object
				// but still appears becuase it is also directly passed to the root element as a prop
				forEach(
					['className', 'onMouseDown', 'onTouchStart', 'data-testid'],
					(prop) => {
						expect(has(rootProps, prop)).toBe(true);
					}
				);
			});
			it('omits the component props, "initialState" and "callbackId" from the root div element', () => {
				const rootProps = wrapper.find('div').props();

				forEach(
					[
						'onDrag',
						'onDragEnd',
						'onDragStart',
						'onDragCancel',
						'initialState',
						'callbackId',
					],
					(prop) => {
						expect(has(rootProps, prop)).toBe(false);
					}
				);
			});
		});
	});
});

describe('DragCaptureZone', () => {
	const dragCoordinates = {
		pageX: 75,
		pageY: 25,
	};
	const dragEndCoordinates = {
		pageX: 25,
		pageY: 50,
	};
	const dragStartCoordinates = {
		pageX: 50,
		pageY: 75,
	};

	describe('user presses the mouse button down over the rendered component', () => {
		let onDragStart: any;

		beforeEach(() => {
			onDragStart = sinon.spy();

			mount(<DragCaptureZone onDragStart={onDragStart} />)
				.find('div')
				.simulate('mousedown', dragStartCoordinates);
		});

		it('calls the function passed in as the `onDragStart` prop...', () => {
			assert(onDragStart.calledOnce);
		});

		it('...passes along a map of coordinate data as the first argument...', () => {
			const expectedData = _.assign(
				{
					dX: 0,
					dY: 0,
				},
				dragStartCoordinates
			);

			assert.deepEqual(_.first(onDragStart.args[0]), expectedData);
		});

		it('...and passes along a React synthetic event as part of the second argument.', () => {
			assert((_.last(onDragStart.args[0]) as any).event);
		});
	});

	describe('user moves the mouse button after having started a drag interaction', () => {
		let event;
		let onDrag: any;

		beforeEach(() => {
			event = document.createEvent('Event');
			_.assign(event, dragCoordinates);
			event.initEvent('mousemove', true, true);

			onDrag = sinon.spy();

			mount(<DragCaptureZone onDrag={onDrag} />)
				.find('div')
				.simulate('mousedown', dragStartCoordinates);
			window.document.dispatchEvent(event);
		});

		it('calls the function passed in as the `onDrag` prop...', () => {
			assert(onDrag.calledOnce);
		});

		it('...passes along a map of coordinate data as the first argument...', () => {
			const expectedData = _.assign(
				{
					dX: dragCoordinates.pageX - dragStartCoordinates.pageX,
					dY: dragCoordinates.pageY - dragStartCoordinates.pageY,
				},
				dragCoordinates
			);

			assert.deepEqual(_.first(onDrag.args[0]), expectedData);
		});

		it('...and passes along a native event as part of the second argument.', () => {
			assert((_.last(onDrag.args[0]) as any).event instanceof window.Event);
		});
	});

	describe('user releases the mouse button after having started a drag interaction', () => {
		let event;
		let onDragEnd: any;

		beforeEach(() => {
			event = document.createEvent('Event');
			_.assign(event, dragEndCoordinates);
			event.initEvent('mouseup', true, true);

			onDragEnd = sinon.spy();

			mount(<DragCaptureZone onDragEnd={onDragEnd} />)
				.find('div')
				.simulate('mousedown', dragStartCoordinates);
			window.document.dispatchEvent(event);
		});

		it('calls the function passed in as the `onDragEnd` prop...', () => {
			assert(onDragEnd.calledOnce);
		});

		it('...passes along a map of coordinate data as the first argument...', () => {
			const expectedData = _.assign(
				{
					dX: dragEndCoordinates.pageX - dragStartCoordinates.pageX,
					dY: dragEndCoordinates.pageY - dragStartCoordinates.pageY,
				},
				dragEndCoordinates
			);

			assert.deepEqual(_.first(onDragEnd.args[0]), expectedData);
		});

		it('...and passes along a native event as part of the second argument.', () => {
			assert((_.last(onDragEnd.args[0]) as any).event instanceof window.Event);
		});
	});

	describe('the drag action is canceled', () => {
		const mockEvent = {};
		let onDragCancel: any;

		beforeEach(() => {
			onDragCancel = sinon.spy();

			const wrapper: any = shallow(
				<DragCaptureZone onDragCancel={onDragCancel} />,
				{
					disableLifecycleMethods: true,
				}
			);
			wrapper.instance().handleDragCancel(mockEvent);
		});

		it('calls the function passed in as the `onDragCancel` prop...', () => {
			assert(onDragCancel.calledOnce);
		});

		it('...and passes along a React synthetic event as part of the last argument.', () => {
			assert((_.last(onDragCancel.args[0]) as any).event);
		});
	});
});
