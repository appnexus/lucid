import React from 'react';
import createClass from 'create-react-class';
import { Sidebar } from '../../../index';

export default createClass({
	render() {
		return (
			<Sidebar>
				<Sidebar.Title>Sidebar Title <button>Edit</button></Sidebar.Title>
				<Sidebar.Bar>
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
					<code>{'<Sidebar>'}</code>
					{' '}
					or
					{' '}
					<code>{'<Sidebar.Bar>'}</code>
					.
				</Sidebar.Bar>
				<Sidebar.Primary>
					Helvetica narwhal irony, hoodie leggings occaecat tattooed authentic cred. Tumblr cred quinoa normcore, mumblecore cardigan cold-pressed dreamcatcher craft beer ad direct trade vero accusamus cray. Roof party chia shabby chic synth. Pariatur organic before they sold out everyday carry food truck. Labore four loko nihil, narwhal actually kinfolk mustache jean shorts. Meh kickstarter chicharrones williamsburg bushwick yr, PBR&B fap. Lo-fi leggings magna yuccie, tattooed accusamus blog literally gochujang listicle cliche humblebrag swag kombucha tousled.
				</Sidebar.Primary>
			</Sidebar>
		);
	},
});
