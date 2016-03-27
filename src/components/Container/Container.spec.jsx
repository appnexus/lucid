import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';

import Container from './Container';

describe('Container', () => {
	common(Container);

	describe('Header', () => {
		it('renders a header element when included.', () => {
			const wrapper = shallow(<Container><Container.Header>Header</Container.Header><Container.Content>Content</Container.Content></Container>);
			assert.equal(wrapper.find('.lucid-Container-header').length, 1);
		});

		it('does not render a header element when not included.', () => {
			const wrapper = shallow(<Container><Container.Content>Content</Container.Content></Container>);
			assert.equal(wrapper.find('.lucid-Container-header').length, 0);
		});
	});

	describe('Content', () => {
		it('renders a content element when included.', () => {
			const wrapper = shallow(<Container><Container.Content>Content</Container.Content><Container.Footer><button>Save</button></Container.Footer></Container>);
			assert.equal(wrapper.find('.lucid-Container-content').length, 1);
		});

		it('does not render a content element when not included.', () => {
			const wrapper = shallow(<Container><Container.Footer><button>Save</button></Container.Footer></Container>);
			assert.equal(wrapper.find('.lucid-Container-content').length, 0);
		});
	});

	describe('Footer', () => {
		it('renders a footer element when included.', () => {
			const wrapper = shallow(<Container><Container.Content>Content</Container.Content><Container.Footer><button>Save</button></Container.Footer></Container>);
			assert.equal(wrapper.find('.lucid-Container-footer').length, 1);
		});

		it('does not render a footer element when not included.', () => {
			const wrapper = shallow(<Container><Container.Content>Content</Container.Content></Container>);
			assert.equal(wrapper.find('.lucid-Container-footer').length, 0);
		});
	});
});
