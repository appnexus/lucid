import React, { useState } from 'react';
import { Meta } from '@storybook/react';
import Accordion, { AccordionDumb } from './Accordion';

export default {
	title: 'Layout/Accordion',
	component: AccordionDumb,
	subcomponents: { 'Accordion.Item': Accordion.Item },
	parameters: {
		notes: AccordionDumb.peek.description,
		docs: {
			inlineStories: false,
		},
	},
} as Meta;

export const Default = () => (
	<Accordion>
		<Accordion.Item Header='Item 1'>Item 1 Content</Accordion.Item>
	</Accordion>
);

export const Basic = () => (
	<Accordion>
		<Accordion.Item Header='Peter Venkman'>
			Peter Venkman, Ph.D. is a fictional character from the Ghostbusters
			franchise. He appears in the films Ghostbusters and Ghostbusters II and in
			the animated television series The Real Ghostbusters. In both live action
			films, he was portrayed by Bill Murray, and was voiced in the animated
			series first by Lorenzo Music and then by Dave Coulier. He is a
			parapsychologist and the leader of the Ghostbusters.
		</Accordion.Item>
		<Accordion.Item Header='Ray Stantz'>
			Raymond Ray Stantz, Ph.D. is a fictional character from the Ghostbusters
			franchise. He appears in the films Ghostbusters, Ghostbusters II, Casper,
			and the animated television series The Real Ghostbusters. He was portrayed
			by Dan Aykroyd in both live action films, and voiced by Frank Welker in
			the animated series. He is a member of the Ghostbusters and one of the
			three doctors of parapsychology, along with Dr. Peter Venkman and Dr. Egon
			Spengler.
		</Accordion.Item>
		<Accordion.Item Header='Egon Spengler'>
			Egon Spengler, Ph.D. is a fictional character from the Ghostbusters
			franchise. He appears in the films Ghostbusters and Ghostbusters II, in
			the animated television series The Real Ghostbusters, and later in Extreme
			Ghostbusters. Spengler was portrayed by Harold Ramis in the films and
			voiced by him in Ghostbusters: The Video Game, and voiced by Maurice
			LaMarche in the cartoon series. He is a member of the Ghostbusters and one
			of the three doctors of parapsychology, along with Dr. Peter Venkman and
			Dr. Raymond Stantz.
		</Accordion.Item>
	</Accordion>
);

export const InitialIndexSet = () => {
	const [index, setIndex] = useState(2);

	const handleChange = (index: number) => {
		setIndex(index);
	};

	return (
		<Accordion onSelect={handleChange} selectedIndex={index}>
			<Accordion.Item Header='Peter Venkman'>
				Peter Venkman, Ph.D. is a fictional character from the Ghostbusters
				franchise. He appears in the films Ghostbusters and Ghostbusters II and
				in the animated television series The Real Ghostbusters. In both live
				action films, he was portrayed by Bill Murray, and was voiced in the
				animated series first by Lorenzo Music and then by Dave Coulier. He is a
				parapsychologist and the leader of the Ghostbusters.
			</Accordion.Item>
			<Accordion.Item Header='Ray Stantz'>
				Raymond Ray Stantz, Ph.D. is a fictional character from the Ghostbusters
				franchise. He appears in the films Ghostbusters, Ghostbusters II,
				Casper, and the animated television series The Real Ghostbusters. He was
				portrayed by Dan Aykroyd in both live action films, and voiced by Frank
				Welker in the animated series. He is a member of the Ghostbusters and
				one of the three doctors of parapsychology, along with Dr. Peter Venkman
				and Dr. Egon Spengler.
			</Accordion.Item>
			<Accordion.Item Header='Egon Spengler'>
				Egon Spengler, Ph.D. is a fictional character from the Ghostbusters
				franchise. He appears in the films Ghostbusters and Ghostbusters II, in
				the animated television series The Real Ghostbusters, and later in
				Extreme Ghostbusters. Spengler was portrayed by Harold Ramis in the
				films and voiced by him in Ghostbusters: The Video Game, and voiced by
				Maurice LaMarche in the cartoon series. He is a member of the
				Ghostbusters and one of the three doctors of parapsychology, along with
				Dr. Peter Venkman and Dr. Raymond Stantz.
			</Accordion.Item>
		</Accordion>
	);
};
