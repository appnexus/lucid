import _ from 'lodash';
import assert from 'assert';
import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import describeWithDOM from '../../util/describe-with-dom';
import { common } from '../../util/generic-tests';
import Accordion from './Accordion';
import ExpanderPanel from '../ExpanderPanel/ExpanderPanel';

let items = [
	{
		title: 'Peter Venkman',
		content: 'Peter Venkman, Ph.D. is a fictional character from the Ghostbusters franchise. He appears in the films Ghostbusters and Ghostbusters II and in the animated television series The Real Ghostbusters. In both live action films, he was portrayed by Bill Murray, and was voiced in the animated series first by Lorenzo Music and then by Dave Coulier. He is a parapsychologist and the leader of the Ghostbusters.',
	},
	{
		title: 'Ray Stantz',
		content: 'Raymond "Ray" Stantz, Ph.D. is a fictional character from the Ghostbusters franchise. He appears in the films Ghostbusters, Ghostbusters II, Casper, and the animated television series The Real Ghostbusters. He was portrayed by Dan Aykroyd in both live action films, and voiced by Frank Welker in the animated series. He is a member of the Ghostbusters and one of the three doctors of parapsychology, along with Dr. Peter Venkman and Dr. Egon Spengler.',
	},
	{
		title: 'Egon Spengler',
		content: 'Egon Spengler, Ph.D. is a fictional character from the Ghostbusters franchise. He appears in the films Ghostbusters and Ghostbusters II, in the animated television series The Real Ghostbusters, and later in Extreme Ghostbusters. Spengler was portrayed by Harold Ramis in the films and voiced by him in Ghostbusters: The Video Game, and voiced by Maurice LaMarche in the cartoon series. He is a member of the Ghostbusters and one of the three doctors of parapsychology, along with Dr. Peter Venkman and Dr. Raymond Stantz.',
	},
];

describe('Accordion', () => {
	common(Accordion);

	describe('props', () => {
		describe('items', () => {
			it('renders ExpanderPanel components on it', () => {
				const wrapper = mount(
					<Accordion items={items} index={1} />
				);

				assert(wrapper.find(ExpanderPanel), 3);
			});
		});

		describe('index', () => {
			it('should have an expanded item when set via props', () => {
				const wrapper = mount(
					<Accordion index={1} />
				);

				assert(wrapper.find('.lucid-ExpanderPanel-content-is-expanded'), 1);
			});
		});

		describe('pass throughs', () => {
			it('passes through all props not defined in `propTypes` to the root element', () => {
				const wrapper = shallow(
					<Accordion
							className='wut'
							style={{ marginRight: 10 }}
							foo={1}
							bar={2}
					/>
				);
				const rootProps = wrapper.find('.lucid-Accordion').props();

				assert(_.has(rootProps, 'foo'), 'props missing "foo" prop');
				assert(_.has(rootProps, 'bar'), 'props missing "bar" prop');
			});
		});
	});
});

describeWithDOM('Accordion', () => {
	let wrapper;

	afterEach(() => {
		if (wrapper) {
			wrapper.unmount();
		}
	});

	describe('user picks one of the items', () => {
		it('calls the function passed in as the `onChange` prop', () => {
			const onChange = sinon.spy();
			wrapper = mount(
				<Accordion onChange={onChange} items={items} />
			);

			const firstPanel = wrapper.find('.lucid-ExpanderPanel').at(0);

			firstPanel.find('.lucid-ExpanderPanel-header').simulate('click');
			firstPanel.find('.lucid-ExpanderPanel-icon').simulate('click');

			assert.equal(
				onChange.callCount,
				2,
				`onChange called the wrong number of times, actual: ${onChange.callCount}, expected: 2`
			);
		});
	});
});
