import React from 'react';
import { Header } from '../../../index';

export default React.createClass({
	render() {
		return (
			<section>
				<Header size='small'>
					small header
				</Header>
				<Header size='medium'>
					medium header
				</Header>
				<Header size='large'>
					large Header
				</Header>
				<Header size='largeXL'>
					ExtraLarge Header
				</Header>
			</section>
		);
	},
});
