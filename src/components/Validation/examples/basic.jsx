import React from 'react';
import Validation from '../Validation';

export default React.createClass({
	render() {
		return (
			<div>
				<Validation Error='Method one'>Content</Validation>
				<Validation>
					<Validation.Error>
						<i>Method two</i>
					</Validation.Error>
					Content
				</Validation>
			</div>
		);
	}
});
