import React from 'react';
import { Selection } from '../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<Selection Label='Arts & Entertainment'>
					<Selection Label='Item 1' />
					<Selection Label='Item 2' />
					<Selection Label='Item 3' />
					<Selection Label='Item 4'>
						<Selection Label='Item 1' />
						<Selection Label='Item 2' />
						<Selection Label='Item 3' />
					</Selection>
				</Selection>
				<Selection kind='success' Label='Arts & Entertainment'>
					<Selection kind='danger' Label='Item 1' />
					<Selection kind='danger' Label='Item 2' />
					<Selection kind='danger' Label='Item 3' />
				</Selection>
				<Selection kind='danger' Label='Arts & Entertainment'>
					<Selection kind='success' Label='Item 1' />
					<Selection kind='success' Label='Item 2' />
					<Selection kind='success' Label='Item 3' />
				</Selection>
			</div>
		);
	},
});
