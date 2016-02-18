import React from 'react';
import Validation from '../Validation';

export default React.createClass({
	render() {
		return (
			<div>
				<Validation>Content</Validation>
				<Validation Error='Method one'>Content</Validation>
				<Validation Error={<i>Method two</i>}>Content</Validation>
				<Validation>
					<Validation.Error>Method three</Validation.Error>
					Content
				</Validation>
			</div>
		);
	}
});
