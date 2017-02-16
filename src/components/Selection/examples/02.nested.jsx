import React from 'react';
import { Selection } from '../../../index';

export default React.createClass({
	render() {
		return (
			<div>
				<Selection Label='Arts & Entertainment'>
					<Selection Label='Item 1' />
					<Selection Label='Item 2' />
					<Selection Label='Item 3'>
						<Selection Label='Item 1' />
						<Selection Label='Item 2' />
						<Selection Label='Item 3' />
					</Selection>
					<Selection Label='Item 4'>
						<Selection Label='Item 1' />
						<Selection Label='Item 2' />
						<Selection Label='Item 3' />
						<Selection Label='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
					</Selection>
				</Selection>

				<Selection kind='info' Label='Arts & Entertainment'>
					<Selection kind='info' Label='Item 1' />
					<Selection kind='info' Label='Item 2' />
					<Selection kind='info' Label='Item 3'>
						<Selection kind='info' Label='Item 1' />
						<Selection kind='info' Label='Item 2' />
						<Selection kind='info' Label='Item 3' />
					</Selection>
					<Selection kind='warning' Label='Item 4'>
						<Selection kind='warning' Label='Item 1' />
						<Selection kind='warning' Label='Item 2' />
						<Selection kind='warning' Label='Item 3' />
						<Selection kind='warning' Label='Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' />
					</Selection>
				</Selection>

				<Selection
					kind='success'
					hasBackground
					isBold
					Label='Leisure'
				>
					<Selection kind='danger' Label='Item 1' />
					<Selection kind='danger' Label='Item 2' />
					<Selection kind='danger' Label='Item 3' />
				</Selection>

				<Selection
					kind='danger'
					hasBackground
					isBold
					Label='Arts & Entertainment'
				>
					<Selection kind='success' Label='Item 1' />
					<Selection kind='success' Label='Item 2' />
					<Selection kind='success' Label='Item 3' />
				</Selection>
			</div>
		);
	},
});
