import _ from 'lodash';
import React from 'react';
import createClass from 'create-react-class';
import { Paginator, TextField } from '../../../index';

export default createClass({
	getInitialState() {
		return { count: 45 };
	},

	render() {
		return (
			<div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 10,
					}}
				>
					Total number of items:
					<TextField
						style={{
							width: 45,
							textAlign: 'center',
							marginLeft: 6,
						}}
						onSubmit={count => this.setState({ count })}
						value={this.state.count}
					/>
				</div>
				<Paginator
					hasPageSizeSelector
					pageSizeOptions={[10, 25, 50]}
					totalCount={_.parseInt(this.state.count)}
					SingleSelect={{
						DropMenu: { direction: 'up' },
					}}
				/>
			</div>
		);
	},
});
