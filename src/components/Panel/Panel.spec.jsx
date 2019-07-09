import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';

import Panel from './Panel';

describe('Panel', () => {
	common(Panel);

	describe('render', () => {
		it('should render any children that are not instances of `Panel.Header` or `Panel.Footer`', () => {
			const wrapper = shallow(
				<Panel>
					<Panel.Header>Header</Panel.Header>A Cool Content
					<Panel.Footer>Footer</Panel.Footer>
				</Panel>
			);
			assert.equal(wrapper.find('.lucid-Panel-content').length, 1);
			assert(wrapper.contains('A Cool Content'));
		});
	});

	describe('props', () => {
		describe('isGutterless', () => {
			it('should apply the correct class', () => {
				const wrapper = shallow(<Panel />);
				assert.equal(wrapper.find('.lucid-Panel-is-not-gutterless').length, 1);
			});
		});

		describe('hasMargin', () => {
			it('should apply the correct class', () => {
				const wrapper = shallow(<Panel />);
				assert(wrapper.hasClass('lucid-Panel-has-margin'));
			});

			it('should not apply the class', () => {
				const wrapper = shallow(<Panel hasMargin={false} />);
				assert(!wrapper.hasClass('lucid-Panel-has-margin'));
			});
		});

		describe('isScrollable', () => {
			it('should apply the correct class', () => {
				const wrapper = shallow(<Panel />);
				assert(wrapper.hasClass('lucid-Panel-is-scrollable'));
			});

			it('should not apply the class', () => {
				const wrapper = shallow(<Panel isScrollable={false} />);
				assert(!wrapper.hasClass('lucid-Panel-is-scrollable'));
			});
		});
	});

	describe('childComponents', () => {
		describe('Header', () => {
			it('should render', () => {
				const wrapper = shallow(
					<Panel>
						<Panel.Header>Header</Panel.Header>
						Content
					</Panel>
				);
				assert.equal(wrapper.find('.lucid-Panel-Header').length, 1);
			});

			it('should not render when not included', () => {
				const wrapper = shallow(<Panel>Content</Panel>);
				assert.equal(wrapper.find('.lucid-Panel-Header').length, 0);
			});

			it('should pass through className', () => {
				const wrapper = shallow(
					<Panel>
						<Panel.Header className='foo'>Header</Panel.Header>
						Content
					</Panel>
				);
				assert.equal(wrapper.find('.lucid-Panel-Header.foo').length, 1);
			});
		});

		describe('Footer', () => {
			it('should render', () => {
				const wrapper = shallow(
					<Panel>
						Content
						<Panel.Footer>
							<button>Save</button>
						</Panel.Footer>
					</Panel>
				);
				assert.equal(wrapper.find('.lucid-Panel-Footer').length, 1);
			});

			it('should pass through className', () => {
				const wrapper = shallow(
					<Panel>
						<Panel.Footer className='bar'>Footer</Panel.Footer>
						Content
					</Panel>
				);
				assert.equal(wrapper.find('.lucid-Panel-Footer.bar').length, 1);
			});

			it('should not render when not included', () => {
				const wrapper = shallow(<Panel>Content</Panel>);
				assert.equal(wrapper.find('.lucid-Panel-footer').length, 0);
			});
		});
	});

	describe('any other children', () => {});
});
