import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';

import Container from './Container';

describe('Container', () => {
	common(Container);

	describe('header', () => {
		it('should exists', () => {
			const wrapper = shallow(<Container><Container.Header>Header</Container.Header><Container.Content>Content</Container.Content></Container>);
			assert.equal(wrapper.find('.lucid-Container-header').length, 1);
		});

		it('should not exists', () => {
			const wrapper = shallow(<Container><Container.Content>Content</Container.Content></Container>);
			assert.equal(wrapper.find('.lucid-Container-header').length, 0);
		});
	});

	describe('title', () => {
		it('should exists', () => {
			const wrapper = shallow(<Container title={'Title'}><Container.Content>Content</Container.Content></Container>);
			const header = wrapper.find('.lucid-Container-header');
			assert.equal(header.length, 1);
			assert.equal(header.text(), 'Title');
		});

		it('should not exists', () => {
			const wrapper = shallow(<Container><Container.Content>Content</Container.Content></Container>);
			assert.equal(wrapper.find('.lucid-Container-header').length, 0);
		});
	});

	describe('content', () => {
		it('should exists', () => {
			const wrapper = shallow(<Container><Container.Content>Content</Container.Content><Container.Footer><button>Save</button></Container.Footer></Container>);
			assert.equal(wrapper.find('.lucid-Container-content').length, 1);
		});

		it('should not exists', () => {
			const wrapper = shallow(<Container><Container.Footer><button>Save</button></Container.Footer></Container>);
			assert.equal(wrapper.find('.lucid-Container-content').length, 0);
		});
	});

	describe('footer', () => {
		it('should exists', () => {
			const wrapper = shallow(<Container><Container.Content>Content</Container.Content><Container.Footer><button>Save</button></Container.Footer></Container>);
			assert.equal(wrapper.find('.lucid-Container-footer').length, 1);
		});

		it('should not exists', () => {
			const wrapper = shallow(<Container><Container.Content>Content</Container.Content></Container>);
			assert.equal(wrapper.find('.lucid-Container-footer').length, 0);
		});
	});

	describe('css classes', () => {
		it('should have the Container class', () => {
			const wrapper = shallow(<Container />);
			assert(wrapper.hasClass('lucid-Container'), `Container should include 'lucid-Container' class`);
		});

		it('should have the Container Header class', () => {
			const wrapper = shallow(<Container title={'Title'} />);
			assert(wrapper.find('.lucid-Container-header'), `Header should include 'lucid-Container-header' class`);
		});

		it('should have the Container Content class', () => {
			const wrapper = shallow(<Container><Container.Content>Content</Container.Content><Container.Footer><button>Save</button></Container.Footer></Container>);
			assert(wrapper.find('.lucid-Container-content'), `Content should include 'lucid-Container-content' class`);
		});

		it('should have the Container Footer class', () => {
			const wrapper = shallow(<Container><Container.Content>Content</Container.Content><Container.Footer><button>Save</button></Container.Footer></Container>);
			assert(wrapper.find('.lucid-Container-footer'), `Footer should include 'lucid-Container-footer' class`);
		});
	});
});
