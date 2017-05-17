import React from 'react';
import createClass from 'create-react-class';
import { Submarine } from '../../../index';

export default createClass({
	render() {
		return (
			<section
				style={{
					height: 300,
					background: 'lightgray',
					outline: '1px solid lightgray',
				}}
			>
				<Submarine>
					<Submarine.Title>
						Submarine Title <button>Edit</button>
					</Submarine.Title>
					<Submarine.Bar>
						You can also set the
						{' '}
						<code>title</code>
						{' '}
						or
						{' '}
						<code>Title</code>
						{' '}
						prop on
						{' '}
						<code>{'<Submarine>'}</code>
						{' '}
						or
						{' '}
						<code>{'<Submarine.Bar>'}</code>
						.
					</Submarine.Bar>
					<Submarine.Primary>
						Helvetica narwhal irony, hoodie leggings occaecat tattooed authentic cred. Tumblr cred quinoa normcore, mumblecore cardigan cold-pressed dreamcatcher craft beer ad direct trade vero accusamus cray. Roof party chia shabby chic synth. Pariatur organic before they sold out everyday carry food truck. Labore four loko nihil, narwhal actually kinfolk mustache jean shorts. Meh kickstarter chicharrones williamsburg bushwick yr, PBR&B fap. Lo-fi leggings magna yuccie, tattooed accusamus blog literally gochujang listicle cliche humblebrag swag kombucha tousled.
					</Submarine.Primary>
				</Submarine>
			</section>
		);
	},
});
