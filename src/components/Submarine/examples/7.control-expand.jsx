import React from 'react';
import createClass from 'create-react-class';
import { Submarine } from '../../../index';

export default createClass({
	getInitialState() {
		return {
			isExpanded: false,
		};
	},

	handleToggle() {
		this.setState({ isExpanded: !this.state.isExpanded });
	},

	render() {
		return (
			<section>
				<button onClick={this.handleToggle}>toggle</button>

				<section
					style={{
						height: 300,
						background: 'lightgray',
						outline: '1px solid lightgray',
					}}
				>

					<Submarine
						isExpanded={this.state.isExpanded}
						onToggle={this.handleToggle}
					>
						<Submarine.Bar>
							Paleo williamsburg retro, mumblecore deserunt typewriter magna raw denim taxidermy. Quinoa incididunt hoodie, ea synth four loko everyday carry lomo vice humblebrag forage assumenda ad small batch reprehenderit.
						</Submarine.Bar>
						<Submarine.Primary>
							Migas esse paleo nesciunt, mollit velit franzen tempor YOLO iPhone thundercats. Keytar tilde raw denim shabby chic quinoa typewriter. Shabby chic tousled labore jean shorts, veniam XOXO mustache. Marfa dreamcatcher hammock cupidatat kitsch, selvage cornhole dolor. Odio salvia slow-carb hammock XOXO, nulla normcore jean shorts magna master cleanse tote bag ea. Pitchfork marfa tote bag shoreditch, retro selvage tempor 90's kogi adipisicing asymmetrical tousled. Pork belly asymmetrical nesciunt, keytar jean shorts mlkshk scenester sriracha man bun placeat tacos post-ironic officia art party.
						</Submarine.Primary>
					</Submarine>

				</section>
			</section>
		);
	},
});
