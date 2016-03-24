import React from 'react';
import { shallow } from 'enzyme';
import assert from 'assert';
import { common } from '../../util/generic-tests';

import Container from './Container';

describe('Container', () => {
	common(Container);

	describe('header', () => {
		it('should exists', () => {
			const wrapper = shallow(<Container><Container.Header>Header</Container.Header><Container.Body>Body</Container.Body></Container>);
			const header = wrapper.find(Container.Header);
			assert.equal(header.length, 1);
		});

		it('should not exists', () => {
			const wrapper = shallow(<Container><Container.Body>Body</Container.Body></Container>);
			assert.equal(wrapper.find(Container.Header).length, 0);
		});
	});

	describe('title', () => {
		it('should exists', () => {
			const wrapper = shallow(<Container title={'Title'}><Container.Body>Body</Container.Body></Container>);
			const header = wrapper.find(Container.Header);
			assert.equal(header.length, 1);
			assert.equal(header.prop('title'), 'Title');
		});

		it('should not exists', () => {
			const wrapper = shallow(<Container><Container.Body>Body</Container.Body></Container>);
			assert.equal(wrapper.find(Container.Header).length, 0);
		});
	});

	describe('body', () => {
		it('should exists', () => {
			const wrapper = shallow(<Container><Container.Body>Body</Container.Body><Container.Footer><button>Save</button></Container.Footer></Container>);
			assert.equal(wrapper.find(Container.Body).length, 1);
		});

		it('should not exists', () => {
			const wrapper = shallow(<Container><Container.Footer><button>Save</button></Container.Footer></Container>);
			assert.equal(wrapper.find(Container.Body).length, 0);
		});
	});

	describe('footer', () => {
		it('should exists', () => {
			const wrapper = shallow(<Container><Container.Body>Body</Container.Body><Container.Footer><button>Save</button></Container.Footer></Container>);
			assert.equal(wrapper.find(Container.Footer).length, 1);
		});

		it('should not exists', () => {
			const wrapper = shallow(<Container><Container.Body>Body</Container.Body></Container>);
			assert.equal(wrapper.find(Container.Footer).length, 0);
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

		it('should have the Container Body class', () => {
			const wrapper = shallow(<Container><Container.Body>Body</Container.Body><Container.Footer><button>Save</button></Container.Footer></Container>);
			assert(wrapper.find('.lucid-Container-body'), `Body should include 'lucid-Container-body' class`);
		});

		it('should have the Container Footer class', () => {
			const wrapper = shallow(<Container><Container.Body>Body</Container.Body><Container.Footer><button>Save</button></Container.Footer></Container>);
			assert(wrapper.find('.lucid-Container-footer'), `Footer should include 'lucid-Container-footer' class`);
		});
	});
});
