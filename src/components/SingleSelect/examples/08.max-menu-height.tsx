import React from 'react';
import createClass from 'create-react-class';
import { SingleSelect } from '../../../index';

const { Placeholder, Option } = SingleSelect;

export default createClass({
	render() {
		return (
			<section>
				<SingleSelect maxMenuHeight='12em'>
					<Placeholder>Select Color</Placeholder>
					<Option>Aliceblue</Option>
					<Option>Antiquewhite</Option>
					<Option>Aqua</Option>
					<Option>Aquamarine</Option>
					<Option>Azure</Option>
					<Option>Beige</Option>
					<Option>Bisque</Option>
					<Option>Black</Option>
					<Option>Blanchedalmond</Option>
					<Option>Blue</Option>
					<Option>Blueviolet</Option>
					<Option>Brown</Option>
					<Option>Burlywood</Option>
					<Option>Cadetblue</Option>
					<Option>Chartreuse</Option>
				</SingleSelect>
			</section>
		);
	},
});

// begin-hide-from-docs
export let notes = `
You can provide a fixed menu height to accommodate your layout. This will allow users to scroll through the options within a fixed space.
`;
// end-hide-from-docs
