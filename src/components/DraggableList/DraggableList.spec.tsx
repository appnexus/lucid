import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import { common } from '../../util/generic-tests';

import { DraggableListDumb as DraggableList } from './DraggableList';

describe('DraggableList', () => {
	common(DraggableList);

	describe('props', () => {
		describe('Item', () => {
			it('Item as children', () => {
				const wrapper = shallow(
					<DraggableList>
						<DraggableList.Item>Item One</DraggableList.Item>
						<DraggableList.Item>Item Two</DraggableList.Item>
					</DraggableList>
				);

				assert.equal(wrapper.find('.lucid-DraggableList-Item').length, 2);
			});
		});

		describe('hasDragHandle', () => {
			it('should have a drag handle on items', () => {
				const wrapper = mount(
					<DraggableList hasDragHandle>
						<DraggableList.Item>Item One</DraggableList.Item>
						<DraggableList.Item>Item Two</DraggableList.Item>
						<DraggableList.Item>Item Three</DraggableList.Item>
						<DraggableList.Item>Item Four</DraggableList.Item>
					</DraggableList>
				);

				assert.equal(
					wrapper.find('.lucid-DraggableList-Item-handle').length,
					4
				);
			});

			it('should not have a drag handle on items', () => {
				const wrapper = mount(
					<DraggableList hasDragHandle={false}>
						<DraggableList.Item>Item One</DraggableList.Item>
						<DraggableList.Item>Item Two</DraggableList.Item>
						<DraggableList.Item>Item Three</DraggableList.Item>
						<DraggableList.Item>Item Four</DraggableList.Item>
					</DraggableList>
				);

				assert.equal(
					wrapper.find('.lucid-DraggableList-Item-handle').length,
					0
				);
			});
		});

		describe('dragOverIndex', () => {
			it('should have a highlighted divider', () => {
				const wrapper = mount(
					<DraggableList dragIndex={0} dragOverIndex={2}>
						<DraggableList.Item>Item One</DraggableList.Item>
						<DraggableList.Item>Item Two</DraggableList.Item>
						<DraggableList.Item>Item Three</DraggableList.Item>
						<DraggableList.Item>Item Four</DraggableList.Item>
					</DraggableList>
				);

				assert.equal(
					wrapper.find('.lucid-DraggableList-Divider-is-visible').length,
					1
				);
			});

			it('should not have a highlighted divider when dragOverIndex is invalid', () => {
				const wrapper = mount(
					<DraggableList dragIndex={0} dragOverIndex={0}>
						<DraggableList.Item>Item One</DraggableList.Item>
						<DraggableList.Item>Item Two</DraggableList.Item>
						<DraggableList.Item>Item Three</DraggableList.Item>
						<DraggableList.Item>Item Four</DraggableList.Item>
					</DraggableList>
				);

				assert.equal(
					wrapper.find('.lucid-DraggableList-Divider-is-visible').length,
					0
				);
			});
		});

		describe('onDrop', () => {
			it('should be called when onDragEnd event handler is called on a DraggableList.Item', () => {
				const onDrop = sinon.spy();
				const wrapper = shallow(
					<DraggableList dragIndex={0} dragOverIndex={3} onDrop={onDrop}>
						<DraggableList.Item>Item One</DraggableList.Item>
						<DraggableList.Item>Item Two</DraggableList.Item>
						<DraggableList.Item>Item Three</DraggableList.Item>
						<DraggableList.Item>Item Four</DraggableList.Item>
					</DraggableList>
				);

				wrapper.find('.lucid-DraggableList-Item').at(3).simulate('dragend');

				assert(onDrop.called, 'must be called');
				assert.deepEqual(
					{ oldIndex: 0, newIndex: 2 },
					onDrop.lastCall.args[0],
					'must pass the old and new item indexes'
				);
			});
		});
	});

	describe('onDragOver', () => {
		it('should be called when over an item', () => {
			const onDragOver = sinon.spy();
			const wrapper = mount(
				<DraggableList dragIndex={0} dragOverIndex={0} onDragOver={onDragOver}>
					<DraggableList.Item>Item One</DraggableList.Item>
					<DraggableList.Item>Item Two</DraggableList.Item>
					<DraggableList.Item>Item Three</DraggableList.Item>
					<DraggableList.Item>Item Four</DraggableList.Item>
				</DraggableList>
			);

			wrapper
				.find('.lucid-DraggableList-Item')
				.at(3)
				.simulate('dragover', { preventDefault: _.noop });

			assert(onDragOver.called, 'must be called');
			assert.equal(3, onDragOver.lastCall.args[0], 'must pass drag over index');
		});

		it('should be called when onDragLeave is called moving past the last item', () => {
			const onDragOver = sinon.spy();
			const wrapper = mount(
				<DraggableList dragIndex={0} dragOverIndex={3} onDragOver={onDragOver}>
					<DraggableList.Item>Item One</DraggableList.Item>
					<DraggableList.Item>Item Two</DraggableList.Item>
					<DraggableList.Item>Item Three</DraggableList.Item>
					<DraggableList.Item>Item Four</DraggableList.Item>
				</DraggableList>
			);

			wrapper.simulate('dragleave', { clientY: 100 });

			assert(onDragOver.called, 'must be called');
			assert.deepEqual(4, onDragOver.lastCall.args[0], 'must pass last index');
		});
	});

	describe('pass throughs', () => {
		it('passes through Item className to the rendered item element', () => {
			const wrapper = shallow(
				<DraggableList>
					<DraggableList.Item className='TestOne'>One</DraggableList.Item>
					<DraggableList.Item className='TestTwo'>Two</DraggableList.Item>
				</DraggableList>
			);
			const itemsWrapper = wrapper.find('.lucid-DraggableList-Item');

			assert.equal(
				itemsWrapper.find('.TestOne').length,
				1,
				'must find one item with className `TestOne`'
			);
			assert.equal(
				itemsWrapper.find('.TestTwo').length,
				1,
				'must find one item with className `TestTwo`'
			);
		});
	});
});
