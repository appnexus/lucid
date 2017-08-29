import React from 'react';
import { Accordion } from '../../../index';
import createReactClass from 'create-react-class';

export default createReactClass({
	getInitialState() {
		return {
			index: 2,
		};
	},

	handleChange(index) {
		this.setState({
			index,
		});
	},

	render() {
		return (
			<Accordion onSelect={this.handleChange} selectedIndex={this.state.index}>
				<Accordion.Item Header="Peter Venkman">
					Peter Venkman, Ph.D. is a fictional character from the Ghostbusters franchise. He appears in the films Ghostbusters and Ghostbusters II and in the animated television series The Real Ghostbusters. In both live action films, he was portrayed by Bill Murray, and was voiced in the animated series first by Lorenzo Music and then by Dave Coulier. He is a parapsychologist and the leader of the Ghostbusters.
				</Accordion.Item>
				<Accordion.Item Header="Ray Stantz">
					Raymond "Ray" Stantz, Ph.D. is a fictional character from the Ghostbusters franchise. He appears in the films Ghostbusters, Ghostbusters II, Casper, and the animated television series The Real Ghostbusters. He was portrayed by Dan Aykroyd in both live action films, and voiced by Frank Welker in the animated series. He is a member of the Ghostbusters and one of the three doctors of parapsychology, along with Dr. Peter Venkman and Dr. Egon Spengler.
				</Accordion.Item>
				<Accordion.Item Header="Egon Spengler">
					Egon Spengler, Ph.D. is a fictional character from the Ghostbusters franchise. He appears in the films Ghostbusters and Ghostbusters II, in the animated television series The Real Ghostbusters, and later in Extreme Ghostbusters. Spengler was portrayed by Harold Ramis in the films and voiced by him in Ghostbusters: The Video Game, and voiced by Maurice LaMarche in the cartoon series. He is a member of the Ghostbusters and one of the three doctors of parapsychology, along with Dr. Peter Venkman and Dr. Raymond Stantz.
				</Accordion.Item>
			</Accordion>
		);
	},
});
