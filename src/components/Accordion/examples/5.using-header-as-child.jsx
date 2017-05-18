import React from 'react';
import createClass from 'create-react-class';
import { Accordion } from '../../../index';

export default createClass({
	render() {
		return (
			<Accordion>
				<Accordion.Item>
					<Accordion.Header>Peter Venkman</Accordion.Header>
					Peter Venkman, Ph.D. is a fictional character from the Ghostbusters franchise. He appears in the films Ghostbusters and Ghostbusters II and in the animated television series The Real Ghostbusters. In both live action films, he was portrayed by Bill Murray, and was voiced in the animated series first by Lorenzo Music and then by Dave Coulier. He is a parapsychologist and the leader of the Ghostbusters.
				</Accordion.Item>
				<Accordion.Item isDisabled={true}>
					<Accordion.Header>Ray Stantz</Accordion.Header>
					Raymond "Ray" Stantz, Ph.D. is a fictional character from the Ghostbusters franchise. He appears in the films Ghostbusters, Ghostbusters II, Casper, and the animated television series The Real Ghostbusters. He was portrayed by Dan Aykroyd in both live action films, and voiced by Frank Welker in the animated series. He is a member of the Ghostbusters and one of the three doctors of parapsychology, along with Dr. Peter Venkman and Dr. Egon Spengler.
				</Accordion.Item>
				<Accordion.Item>
					<Accordion.Header>Egon Spengler</Accordion.Header>
					Egon Spengler, Ph.D. is a fictional character from the Ghostbusters franchise. He appears in the films Ghostbusters and Ghostbusters II, in the animated television series The Real Ghostbusters, and later in Extreme Ghostbusters. Spengler was portrayed by Harold Ramis in the films and voiced by him in Ghostbusters: The Video Game, and voiced by Maurice LaMarche in the cartoon series. He is a member of the Ghostbusters and one of the three doctors of parapsychology, along with Dr. Peter Venkman and Dr. Raymond Stantz.
				</Accordion.Item>
			</Accordion>
		);
	},
});
