import React from 'react';
import { mount } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';

import Panel from './Panel';

describe('Panel', () => {
	common(Panel);

	describe('Panel.Header', () => {
		it('renders a header element when included.', () => {
			const wrapper = mount(
				<Panel>
					<Panel.Header>Header</Panel.Header>
					Content
				</Panel>
			);
			assert.equal(wrapper.find('.lucid-Panel-header').length, 1);
		});

		it('does not render a header element when not included.', () => {
			const wrapper = mount(
				<Panel>
					Content
				</Panel>
			);
			assert.equal(wrapper.find('.lucid-Panel-header').length, 0);
		});
	});

	describe('Panel.Footer', () => {
		it('renders a footer element when included.', () => {
			const wrapper = mount(
				<Panel>
					Content
					<Panel.Footer>
						<button>Save</button>
					</Panel.Footer>
				</Panel>
			);
			assert.equal(wrapper.find('.lucid-Panel-footer').length, 1);
		});

		it('does not render a footer element when not included.', () => {
			const wrapper = mount(
				<Panel>
					Content
				</Panel>
			);
			assert.equal(wrapper.find('.lucid-Panel-footer').length, 0);
		});
	});

	describe('any other children', () => {
		it('renders any children that are not instances of `Panel.Header` or `Panel.Footer`.', () => {
			const wrapper = mount(
				<Panel>
					<Panel.Header>Header</Panel.Header>
					A Cool Content
					<Panel.Footer>Footer</Panel.Footer>
				</Panel>
			);
			assert.equal(wrapper.find('.lucid-Panel-content').length, 1);
			assert.equal(wrapper.find('.lucid-Panel-content').text(), 'A Cool Content');
		});
	});
});
